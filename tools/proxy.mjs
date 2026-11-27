// Records token usage of every model call. Dry mode can only reach the local fake. Live mode needs explicit approval flags and stops at a hard token cap.
import http from 'node:http'; import fs from 'node:fs';
const PORT = +(process.env.PROXY_PORT || 18100), MODE = process.env.EVAL_MODE || 'dry', OUT = process.env.EVAL_CALLS;
const CAP = +(process.env.EVAL_TOKEN_CAP || 0);
// EVAL_UPSTREAM=openrouter (model comparison): each model is pinned to its own maker's endpoint so prompt caches hit and
// every call reaches the same provider; Anthropic gets top-level automatic caching, which OpenAI and Google do on their own.
// EVAL_COST_CAPS = {"v30":1.2,...}: USD per route, from OpenRouter's billed usage.cost; a route at its cap gets HTTP 429.
const UP = process.env.EVAL_UPSTREAM || 'openai', COST_CAPS = JSON.parse(process.env.EVAL_COST_CAPS || '{}'), spent = {};
// Google: Vertex first, AI Studio second (AI Studio refused some calls with "User location is not supported").
const PIN = { openai: 'openai', anthropic: 'anthropic', google: ['google-vertex', 'google-ai-studio'] };
const shape = raw => {
  if (UP !== 'openrouter') return raw;
  const b = JSON.parse(raw.toString('utf8')), maker = String(b.model || '').split('/')[0];
  b.usage = { include: true };
  if (PIN[maker]) b.provider = { order: [].concat(PIN[maker]), allow_fallbacks: false };
  if (process.env.EVAL_DUMP_BODY) fs.writeFileSync(`${process.env.EVAL_DUMP_BODY}/body-${maker}.json`, raw);
  if (maker === 'anthropic') {
    b.cache_control = { type: 'ephemeral' };
    // Anthropic's constrained output allows at most 16 nullable/union parameters; ANGI's angi_agent_turn schema has 39,
    // so it is refused even when sent non-strict. Claude gets JSON mode plus the same schema as a system instruction:
    // not grammar-constrained, so the backend's own schema validation and one repair do the checking.
    const fmt = b.response_format?.json_schema;
    if (fmt) {
      b.response_format = { type: 'json_object' };
      b.messages.push({ role: 'system', content: 'Return only one JSON object that matches this JSON Schema exactly (all required keys present, null where not applicable), with no text around it:\n' + JSON.stringify(fmt.schema) });
    }
    for (const t of b.tools || []) if (t.function) t.function.strict = false;
  }
  // Gemini rejects a forced tool call together with a JSON response format. A forced call must return that tool call,
  // so the response format has no effect there and is left out for Google only.
  if (maker === 'google' && typeof b.tool_choice === 'object') delete b.response_format;
  return Buffer.from(JSON.stringify(b));
};
if (!OUT) throw new Error('EVAL_CALLS is required');
let upstream;
if (MODE === 'dry') upstream = 'http://127.0.0.1:18199/v1/';
else if (MODE === 'live' && process.env.EVAL_ALLOW_PAID === 'yes' && CAP > 0) upstream = UP === 'openrouter' ? 'https://openrouter.ai/api/v1/' : 'https://api.openai.com/v1/';
else throw new Error('Live mode needs EVAL_ALLOW_PAID=yes and EVAL_TOKEN_CAP');
// One context per version route, so the versions can run in parallel without mislabelling calls.
const ctxs = {}; let used = 0, calls = 0;
const send = (res, code, o) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)); };
http.createServer((req, res) => {
  const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', async () => {
    const raw = Buffer.concat(chunks);
    if (req.url === '/__ctx' && req.method === 'POST') { const c = JSON.parse(raw.toString('utf8') || '{}'); if (c.version) ctxs[c.version] = c.scenario ? c : {}; return send(res, 200, { ok: true }); }
    if (req.url === '/__stats') return send(res, 200, { mode: MODE, calls, used, cap: CAP, spent });
    const m = req.url.match(/^\/run\/(v11|v20|v30|v31|v40)\/v1\/(chat\/completions)$/);
    if (!m || req.method !== 'POST') return send(res, 404, { error: { message: 'unknown eval route' } });
    if (CAP > 0 && used >= CAP) return send(res, 429, { error: { code: 'eval_token_cap', message: 'Evaluation token cap reached' } });
    if (COST_CAPS[m[1]] && (spent[m[1]] || 0) >= COST_CAPS[m[1]]) return send(res, 429, { error: { code: 'eval_cost_cap', message: 'Evaluation cost cap reached' } });
    const started = Date.now(); let status = 0, text = '';
    try {
      const r = await fetch(upstream + m[2], { method: 'POST', headers: { 'content-type': 'application/json', authorization: req.headers.authorization || '' }, body: shape(raw) });
      status = r.status; text = await r.text();
    } catch (e) { status = 502; text = JSON.stringify({ error: { message: 'upstream failed' } }); }
    let j = {}; try { j = JSON.parse(text); } catch {}
    const u = j.usage || {}, total = u.total_tokens || 0; used += total; calls++; spent[m[1]] = (spent[m[1]] || 0) + (u.cost || 0);
    fs.appendFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), route: m[1], ...(ctxs[m[1]] || {}), status, ms: Date.now() - started, requestChars: raw.length,
      promptTokens: u.prompt_tokens || 0, cachedTokens: u.prompt_tokens_details?.cached_tokens || 0, completionTokens: u.completion_tokens || 0,
      reasoningTokens: u.completion_tokens_details?.reasoning_tokens || 0, totalTokens: total, finishReason: j.choices?.[0]?.finish_reason || null, model: j.model || null,
      ...(UP === 'openrouter' ? { provider: j.provider || null, costUsd: u.cost || 0, cacheWriteTokens: u.prompt_tokens_details?.cache_write_tokens || 0, error: j.error ? (String(j.error.message || '') + ' ' + String(j.error.metadata?.raw || '')).slice(0, 1200) : undefined } : {}) }) + '\n');
    res.writeHead(status, { 'content-type': 'application/json' }); res.end(text);
  });
}).listen(PORT, '127.0.0.1', () => console.log('proxy', MODE, 'on', PORT, 'cap', CAP));
