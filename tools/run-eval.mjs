// Sends the same scenarios to every version through its public API and scores what the user receives.
// usage: node run-eval.mjs <runId> [--versions v11,v20,v30] [--repeats 1] [--only id,id]
import fs from 'node:fs';

const ROOT = 'E:/ANGI-Agent-Eval', PROXY = 'http://127.0.0.1:18100';
const PORTS = { v11: 5201, v20: 5202, v30: 5203, v31: 5204 };
const args = process.argv.slice(2), runId = args[0];
const opt = (n, d) => { const i = args.indexOf('--' + n); return i > 0 ? args[i + 1] : d; };
if (!runId) throw new Error('runId is required');
const versions = opt('versions', 'v11,v20,v30').split(','), repeats = +opt('repeats', '1'), only = opt('only', '');
const cfg = JSON.parse(fs.readFileSync(`${ROOT}/tools/scenarios.json`, 'utf8'));
// The test account password lives in the untracked .secrets.env (EVAL_USER_PASSWORD), never in scenarios.json.
const secret = Object.fromEntries(fs.readFileSync(`${ROOT}/.secrets.env`, 'utf8').split(/\r?\n/).map(l => l.match(/^([A-Z_]+)=(.*)$/)).filter(Boolean).map(m => [m[1], m[2].replace(/^["']|["']$/g, '')]));
if (!secret.EVAL_USER_PASSWORD) throw new Error('EVAL_USER_PASSWORD is missing from .secrets.env');
cfg.user = { ...cfg.user, password: secret.EVAL_USER_PASSWORD };
const scenarios = cfg.scenarios.filter(s => !only || only.split(',').includes(s.id));
const dir = `${ROOT}/runs/${runId}`; fs.mkdirSync(dir, { recursive: true });
const out = `${dir}/results.jsonl`;
let nextClientId = Date.now();

async function api(base, path, token, body) {
  const started = Date.now();
  try {
    const r = await fetch(base + path, { method: body ? 'POST' : 'GET', signal: AbortSignal.timeout(180000),
      headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const text = await r.text(); let j = {}; try { j = JSON.parse(text); } catch {}
    return { http: r.status, ms: Date.now() - started, ok: r.ok && j.success !== false, data: j.data, errorCode: j.errorCode || null, message: j.message || null };
  } catch (e) { return { http: 0, ms: Date.now() - started, ok: false, data: null, errorCode: e.name, message: String(e.message).slice(0, 200) }; }
}
const ctx = c => fetch(`${PROXY}/__ctx`, { method: 'POST', body: JSON.stringify(c) });
const any = (text, list) => list.some(p => new RegExp(p, 'iu').test(text));
const expand = s => s.turns.flatMap(t => t.use ? cfg.setup[t.use].map(x => ({ ...x, setup: true })) : [t]);
const allowed = (w, st) => !w || (w === 'noProposal' && !st.proposal) || (w === 'hasProposal' && st.proposal) || (w === 'notCommitted' && st.proposal && !st.committed);

function checkTurn(e, r, problems, label) {
  if (!e) return;
  if (e.newProposal !== undefined && !!r.proposalId !== e.newProposal) problems.push(`${label}: newProposal should be ${e.newProposal}`);
  if (e.replyAny && !any(r.reply, e.replyAny)) problems.push(`${label}: reply misses expected wording`);
}
function checkScenario(e, st, last, problems) {
  if (e.proposal !== undefined && st.proposal !== e.proposal) problems.push(`proposal should be ${e.proposal}`);
  if (e.committed !== undefined && st.committed !== e.committed) problems.push(`committed should be ${e.committed}`);
  const reply = last?.reply || '';
  if (e.replyAny && !any(reply, e.replyAny)) problems.push('reply misses expected wording');
  if (e.replyNone && any(reply, e.replyNone)) problems.push('reply contains forbidden content');
  if (!reply.trim()) problems.push('reply is empty');
}

// Scenario-major order: each scenario runs on every version before the next one, rotating which version goes first,
// so a token cap reached mid-run leaves the same scenarios missing for all versions.
const tokens = {};
async function freshToken(v) {
  const login = await api(`http://127.0.0.1:${PORTS[v]}`, '/api/v1/auth/login', null, cfg.user);
  if (!login.ok) throw new Error(`${v} login failed: ${login.http} ${login.errorCode}`);
  return (tokens[v] = login.data.accessToken);
}
let stopped = false;
for (let rep = 1; rep <= repeats && !stopped; rep++) {
  for (const [si, s] of scenarios.entries()) {
    const st0 = await fetch(`${PROXY}/__stats`).then(r => r.json()).catch(() => ({}));
    if (st0.cap > 0 && st0.used >= st0.cap * 0.95) { console.log(`STOP: token cap nearly reached (${st0.used}/${st0.cap}) before ${s.id}`); stopped = true; break; }
    const order = versions.map((_, i) => versions[(i + si + rep - 1) % versions.length]);
    for (const v of order) {
    const base = `http://127.0.0.1:${PORTS[v]}`;
    const token = await freshToken(v);
    {
      const conv = await api(base, '/api/v1/agent/conversations', token, { roadmapId: null });
      const row = { runId, repeat: rep, version: v, scenario: s.id, kind: s.kind, conversationId: conv.data?.conversationId ?? null, turns: [], problems: [] };
      const st = { proposal: false, committed: false }; let last = null, n = 0;
      if (!conv.ok) row.problems.push(`conversation failed: ${conv.http} ${conv.errorCode}`);
      else for (const t of expand(s)) {
        if (!allowed(t.when, st)) continue;
        n++; await ctx({ version: v, repeat: rep, scenario: s.id, kind: s.kind, turn: n, setup: !!t.setup });
        const r = await api(base, `/api/v1/agent/conversations/${row.conversationId}/messages`, token, { clientMessageId: ++nextClientId, content: t.text, command: 'chat' });
        const d = r.data || {};
        const res = { turn: n, text: t.text, setup: !!t.setup, http: r.http, ms: r.ms, ok: r.ok, status: d.status ?? null, errorCode: r.errorCode, reply: d.reply ?? '', proposalId: d.proposal?.proposalId ?? null, committed: !!d.commit };
        row.turns.push(res); last = res;
        if (!r.ok) row.problems.push(`turn ${n}: HTTP ${r.http} ${r.errorCode || ''}`.trim());
        if (res.proposalId) st.proposal = true; if (res.committed) st.committed = true;
        checkTurn(t.expect, res, row.problems, `turn ${n}`);
      }
      await ctx({});
      checkScenario(s.expect, st, last, row.problems);
      row.passed = row.problems.length === 0; row.state = st;
      fs.appendFileSync(out, JSON.stringify(row) + '\n');
      console.log(`r${rep} ${v} ${s.id.padEnd(18)} ${row.passed ? 'PASS' : 'FAIL'} turns=${row.turns.length} ${row.problems.slice(0, 2).join('; ')}`);
    }
  }
}
}
