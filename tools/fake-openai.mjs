// Local stand-in for chat/completions. Builds a schema-valid "chat" reply. Never calls the network.
import http from 'node:http';
const PORT = +(process.env.FAKE_PORT || 18199);
const REPLY = 'Mình đang chạy ở chế độ mô phỏng nhé.';
function make(s, key = '') {
  if (!s || typeof s !== 'object') return null;
  if (s.anyOf || s.oneOf) { const a = s.anyOf || s.oneOf; return make(a.find(x => x.type === 'null') || a[0], key); }
  if (s.enum) { if (s.enum.includes('chat')) return 'chat'; return s.enum.includes(null) ? null : s.enum[0]; }
  if (s.const !== undefined) return s.const;
  const ts = Array.isArray(s.type) ? s.type : [s.type];
  if (key !== 'reply' && key !== 'action' && ts.includes('null')) return null;
  const t = ts.find(x => x !== 'null');
  if (t === 'object') { const o = {}; for (const [k, v] of Object.entries(s.properties || {})) o[k] = make(v, k); return o; }
  if (t === 'array') return [];
  if (t === 'string') return key === 'reply' ? REPLY : 'x';
  if (t === 'integer' || t === 'number') return s.minimum ?? 0;
  if (t === 'boolean') return false;
  return null;
}
http.createServer((req, res) => {
  const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', () => {
    const raw = Buffer.concat(chunks).toString('utf8'); let body = {};
    try { body = JSON.parse(raw); } catch {}
    const schema = body.response_format?.json_schema?.schema;
    const content = JSON.stringify(make(schema) ?? { action: 'chat', reply: REPLY });
    const prompt = Math.ceil(raw.length / 4), completion = Math.ceil(content.length / 4);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ id: 'fake', object: 'chat.completion', model: body.model || 'fake',
      choices: [{ index: 0, finish_reason: 'stop', message: { role: 'assistant', content } }],
      usage: { prompt_tokens: prompt, completion_tokens: completion, total_tokens: prompt + completion, prompt_tokens_details: { cached_tokens: 0 } } }));
  });
}).listen(PORT, '127.0.0.1', () => console.log('fake-openai on', PORT));
