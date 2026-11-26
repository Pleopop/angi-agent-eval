// Records token usage of every model call. Dry mode can only reach the local fake. Live mode needs explicit approval flags and stops at a hard token cap.
import http from 'node:http'; import fs from 'node:fs';
const PORT = +(process.env.PROXY_PORT || 18100), MODE = process.env.EVAL_MODE || 'dry', OUT = process.env.EVAL_CALLS;
const CAP = +(process.env.EVAL_TOKEN_CAP || 0);
if (!OUT) throw new Error('EVAL_CALLS is required');
let upstream;
if (MODE === 'dry') upstream = 'http://127.0.0.1:18199/v1/';
else if (MODE === 'live' && process.env.EVAL_ALLOW_PAID === 'yes' && CAP > 0) upstream = 'https://api.openai.com/v1/';
else throw new Error('Live mode needs EVAL_ALLOW_PAID=yes and EVAL_TOKEN_CAP');
// One context per version route, so the versions can run in parallel without mislabelling calls.
const ctxs = {}; let used = 0, calls = 0;
const send = (res, code, o) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)); };
http.createServer((req, res) => {
  const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', async () => {
    const raw = Buffer.concat(chunks);
    if (req.url === '/__ctx' && req.method === 'POST') { const c = JSON.parse(raw.toString('utf8') || '{}'); if (c.version) ctxs[c.version] = c.scenario ? c : {}; return send(res, 200, { ok: true }); }
    if (req.url === '/__stats') return send(res, 200, { mode: MODE, calls, used, cap: CAP });
    const m = req.url.match(/^\/run\/(v11|v20|v30|v31|v40)\/v1\/(chat\/completions)$/);
    if (!m || req.method !== 'POST') return send(res, 404, { error: { message: 'unknown eval route' } });
    if (CAP > 0 && used >= CAP) return send(res, 429, { error: { code: 'eval_token_cap', message: 'Evaluation token cap reached' } });
    const started = Date.now(); let status = 0, text = '';
    try {
      const r = await fetch(upstream + m[2], { method: 'POST', headers: { 'content-type': 'application/json', authorization: req.headers.authorization || '' }, body: raw });
      status = r.status; text = await r.text();
    } catch (e) { status = 502; text = JSON.stringify({ error: { message: 'upstream failed' } }); }
    let j = {}; try { j = JSON.parse(text); } catch {}
    const u = j.usage || {}, total = u.total_tokens || 0; used += total; calls++;
    fs.appendFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), route: m[1], ...(ctxs[m[1]] || {}), status, ms: Date.now() - started, requestChars: raw.length,
      promptTokens: u.prompt_tokens || 0, cachedTokens: u.prompt_tokens_details?.cached_tokens || 0, completionTokens: u.completion_tokens || 0,
      reasoningTokens: u.completion_tokens_details?.reasoning_tokens || 0, totalTokens: total, finishReason: j.choices?.[0]?.finish_reason || null, model: j.model || null }) + '\n');
    res.writeHead(status, { 'content-type': 'application/json' }); res.end(text);
  });
}).listen(PORT, '127.0.0.1', () => console.log('proxy', MODE, 'on', PORT, 'cap', CAP));
