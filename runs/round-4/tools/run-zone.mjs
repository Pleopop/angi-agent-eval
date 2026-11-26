// Runs the end-user feedback scenarios on the before and after backends (same database, model, reco and Mapbox) and records what the user received.
// usage: node run-zone.mjs <outDir> [--repeats 3] [--only id,id]
import fs from 'node:fs';

const PORTS = { before: 5231, after: 5232 }, PROXY = 'http://127.0.0.1:18130';
const args = process.argv.slice(2), outDir = args[0];
const opt = (n, d) => { const i = args.indexOf('--' + n); return i > 0 ? args[i + 1] : d; };
const repeats = +opt('repeats', '3'), only = opt('only', ''), pick = opt('versions', 'before,after').split(',');
const secret = Object.fromEntries(fs.readFileSync('E:/ANGI-Agent-Eval/.secrets.env', 'utf8').split(/\r?\n/).map(l => l.match(/^([A-Z_]+)=(.*)$/)).filter(Boolean).map(m => [m[1], m[2].replace(/^["']|["']$/g, '')]));
const user = { email: 'agent.personalized@local.angi.test', password: secret.EVAL_USER_PASSWORD };

// Feedback 2026-11-25. "noithanh" checks the model generalizes beyond the exact word of the feedback.
const scenarios = [
  { id: 'noido-suggest', turns: [{ text: 'Gợi ý cho mình vài quán ăn trưa ở nội đô Hà Nội' }] },
  { id: 'noithanh-suggest', turns: [{ text: 'Tìm giúp mình quán ăn tối trong nội thành Hà Nội' }] },
  { id: 'noido-plan', turns: [{ text: 'Lập lịch ăn uống 2 ngày ở nội đô Hà Nội, ngân sách 1 triệu cả chuyến' }, { text: 'không, lập lịch luôn nhé', when: 'noProposal' }] },
  { id: 'area-nodata', turns: [{ text: 'Gợi ý vài quán ăn tối ở Cầu Giấy' }, { text: 'Mình muốn đổi sang ăn ở Sóc Sơn' }] },
  { id: 'comrang-plan', turns: [{ text: 'Tìm giúp mình vài quán cơm rang ở Hà Nội' }, { text: 'Lập lịch ăn uống 1 ngày ở Hà Nội, ngân sách 500 nghìn' },
    { text: 'không, lập lịch luôn nhé', when: 'noProposal' }, { text: 'Thêm món cơm rang thứ hai trong danh sách lúc nãy vào bữa tối ngày 1' }] },
  { id: 'quan-nuoc', turns: [{ text: 'Gợi ý vài quán nước ở Hoàn Kiếm' }] },
  { id: 'xadan-buffet', turns: [{ text: 'Mình muốn ăn buffet, giá rẻ, ở Xã Đàn' }] }
].filter(s => !only || only.split(',').includes(s.id));

fs.mkdirSync(outDir, { recursive: true });
const out = `${outDir}/results.jsonl`;
let clientId = Date.now();
async function api(base, path, token, body) {
  const started = Date.now();
  try {
    const r = await fetch(base + path, { method: body ? 'POST' : 'GET', signal: AbortSignal.timeout(180000),
      headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const text = await r.text(); let j = {}; try { j = JSON.parse(text); } catch {}
    return { http: r.status, ms: Date.now() - started, ok: r.ok && j.success !== false, data: j.data, errorCode: j.errorCode || null };
  } catch (e) { return { http: 0, ms: Date.now() - started, ok: false, data: null, errorCode: e.name }; }
}
const ctx = c => fetch(`${PROXY}/__ctx`, { method: 'POST', body: JSON.stringify(c) }).catch(() => {});

for (let rep = 1; rep <= repeats; rep++) {
  for (const [si, s] of scenarios.entries()) {
    const stats = await fetch(`${PROXY}/__stats`).then(r => r.json()).catch(() => ({}));
    if (stats.cap > 0 && stats.used >= stats.cap * 0.95) { console.log(`STOP: token cap nearly reached (${stats.used}/${stats.cap})`); process.exit(0); }
    const order = ((si + rep) % 2 ? ['before', 'after'] : ['after', 'before']).filter(v => pick.includes(v));
    for (const v of order) {
      const base = `http://127.0.0.1:${PORTS[v]}`;
      const login = await api(base, '/api/v1/auth/login', null, user);
      if (!login.ok) throw new Error(`${v} login failed ${login.http}`);
      const token = login.data.accessToken;
      const conv = await api(base, '/api/v1/agent/conversations', token, { roadmapId: null });
      const row = { repeat: rep, version: v, scenario: s.id, conversationId: conv.data?.conversationId ?? null, turns: [] };
      let proposal = false, n = 0;
      for (const t of s.turns) {
        if (t.when === 'noProposal' && proposal) continue;
        n++; await ctx({ version: v, repeat: rep, scenario: s.id, turn: n });
        const r = await api(base, `/api/v1/agent/conversations/${row.conversationId}/messages`, token, { clientMessageId: ++clientId, content: t.text, command: 'chat' });
        const d = r.data || {};
        row.turns.push({ turn: n, text: t.text, http: r.http, ms: r.ms, ok: r.ok, errorCode: r.errorCode, reply: d.reply ?? '', proposalId: d.proposal?.proposalId ?? null });
        if (d.proposal?.proposalId) proposal = true;
      }
      await ctx({});
      fs.appendFileSync(out, JSON.stringify(row) + '\n');
      console.log(`r${rep} ${v.padEnd(6)} ${s.id.padEnd(17)} conv=${row.conversationId} turns=${row.turns.length} http=${row.turns.map(t => t.http).join(',')}`);
    }
  }
}
const stats = await fetch(`${PROXY}/__stats`).then(r => r.json()).catch(() => ({}));
console.log(`done calls=${stats.calls} tokens=${stats.used}`);
