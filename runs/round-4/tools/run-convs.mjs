// Replays the user's conversations 10–15 (2026-11-26) turn by turn on the before/after backends and records, after every turn, the reply,
// whether it committed, and the latest draft and offered dishes from the database, so the scorer judges data rather than wording.
// usage: node run-convs.mjs <outDir> [--versions before,after] [--rep 1] [--only id,id]
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';

const PORTS = { before: 5231, after: 5232 }, PROXY = 'http://127.0.0.1:18130';
const args = process.argv.slice(2), outDir = args[0];
const opt = (n, d) => { const i = args.indexOf('--' + n); return i > 0 ? args[i + 1] : d; };
const versions = opt('versions', 'before,after').split(','), rep = +opt('rep', '1'), only = opt('only', '');
const secret = Object.fromEntries(fs.readFileSync('E:/ANGI-Agent-Eval/.secrets.env', 'utf8').split(/\r?\n/).map(l => l.match(/^([A-Z_]+)=(.*)$/)).filter(Boolean).map(m => [m[1], m[2].replace(/^["']|["']$/g, '')]));
const user = { email: 'agent.personalized@local.angi.test', password: secret.EVAL_USER_PASSWORD };
const sql = q => execFileSync('docker', ['exec', 'angi-eval-pg', 'psql', '-U', 'postgres', '-d', 'angi_eval_zone', '-At', '-c', q], { encoding: 'utf8', maxBuffer: 64e6 }).trim();

// when: noProposal = only while no draft exists; noNewDraft = only when the previous turn made no new draft.
const scenarios = [
  { id: 'c10', turns: [
    { text: 'tôi muốn tìm hàng bánh mì loanh quanh phúc tân' },
    { text: 'Vậy về Hà Nam có quán phở nào không ?', tag: 'nodata' },
    { text: 'Hưng Yên', tag: 'nodata' },
    { text: 'tôi đang đói kiếm giúp tôi vài quán cơm hộp', tag: 'noCarry' },
    { text: 'nội thành Hà Nội' },
    { text: 'được' },
    { text: 'tìm giúp tôi quanh nội thành Hà Nội', tag: 'noCarry' },
    { text: 'vậy thêm cơm tấm bì vào roadmap đi' },
    { text: 'Lập lịch luôn giúp tôi', tag: 'noSave' },
    { text: 'ý tôi là lập lịch lộ trình 3 ngày giúp tôi', when: 'noFullDraft', tag: 'fullPlan' },
    { text: 'ngân sách 1 triệu cả chuyến, lập lịch luôn nhé', when: 'noFullDraft', tag: 'fullPlan' }] },
  { id: 'c11', turns: [
    { text: 'tôi muốn ăn mì, có quán mì nào không ? tôi ở Đại cồ Việt' },
    { text: 'Vậy ở Nam Định có quán nào không ?', tag: 'namDinh' },
    { text: 'tôi đang muốn tìm vài quán nước chill chill' },
    { text: 'tôi đói tìm giúp tôi vài món cơm rang với vị trí hiện tại', tag: 'askLocation' },
    { text: 'tôi đang ở Hoàn Kiếm' },
    { text: 'Lập lịch 3 ngày ở Hà Nội, ngân sách 1 triệu cả chuyến, giúp tôi có 2 món đầu trong danh sách trên', tag: 'pickedTwo' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'pickedTwo' }] },
  { id: 'c12', turns: [
    { text: 'tôi muốn tìm quán ăn loanh quanh bạch mai', tag: 'list' },
    { text: 'Vậy ở Hà Nam có gì ăn không ?', tag: 'nodata' },
    { text: 'tìm cho tôi cơm hộp theo vị trí hiện tại' },
    { text: 'được' },
    { text: 'lập lịch 3 ngày ở Hà Nội, ngân sách 1 triệu cả chuyến, trong lịch có cơm rang thập cẩm với cơm bò bát đá giúp tôi', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'thế xếp vào bữa khác', when: 'noFullDraft', tag: 'fullPlan' },
    { text: 'vậy đề xuất món khác đi', when: 'noFullDraft', tag: 'fullPlan' }] },
  { id: 'c13', turns: [
    { text: 'ở Xã Đàn có gì ngon', tag: 'list' },
    { text: 'Vậy lập lịch giúp tôi chuyến đi ăn 3 ngày ở nội đô Hà Nội, ngân sách 1 triệu cả chuyến', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'thêm giúp tôi món cơm thố sườn nướng vào ngày 3', tag: 'adds' },
    { text: 'Vậy ở bạch mai có buffet không ?' },
    { text: 'thêm Buffet Hải Sản Tối & Cuối tuần vào ngày 2 giúp tôi', tag: 'adds' }] },
  { id: 'c14', turns: [
    { text: 'tôi muốn ăn buffet nhưng phải ngon thì ăn ở đâu, tôi ở xã đàn', tag: 'list' },
    { text: 'Vậy lập lịch đi ăn 3 ngày ở Hà Nội giúp tôi, ngân sách 1 triệu cả chuyến', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'thêm cho tôi món gà vào bữa trưa ngày 3', tag: 'adds' },
    { text: 'món đầu tiên đi', when: 'noNewDraft', tag: 'adds' },
    { text: 'thêm giúp tôi', when: 'noNewDraft', tag: 'adds' }] },
  { id: 'c15', turns: [
    { text: 'tôi đang đói kiếm giúp tôi quán cơm hộp' },
    { text: 'được', tag: 'list' },
    { text: 'Hãy lập lịch chuyến đi 3 ngày ở Hà Nội trong đó có bữa trưa ngày 1 là có món trong danh sách gợi ý trên, còn lại thì dựa theo đề xuất của bạn, ngân sách 1 triệu cả chuyến', tag: 'lunchFromList' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'lunchFromList' },
    { text: 'tôi muốn thêm món bò vào ngày 2', tag: 'adds' },
    { text: 'cập nhật giúp tôi', when: 'noNewDraft', tag: 'adds' }] },
  { id: 'c16', turns: [
    { text: 'Tôi muốn kiếm chỗ ăn ngon ở Hà Nội' },
    { text: 'Lập lịch đi ăn 3 ngày ở Hà Nội giúp tôi, ngân sách 1 triệu cả chuyến', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'Thêm món gà vào ngày 3', tag: 'adds' },
    { text: 'bữa trưa', when: 'noNewDraft', tag: 'adds' },
    { text: 'tôi hơi khát liệu có quán nước nào quanh xã đàn không ?', tag: 'list' },
    { text: 'thêm món nước đầu tiên trong danh sách vào bữa sáng ngày 1 giúp tôi', tag: 'adds' },
    { text: 'cập nhật đi', when: 'noNewDraft', tag: 'adds' }] },
  { id: 'c17', turns: [
    { text: 'ở Láng Hạ có gì ngon', tag: 'list' },
    { text: 'Lập lịch 3 ngày đi ăn ở Hà Nội', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'tôi hơi khát cho tôi chút đồ uống vào ngày 1', tag: 'askMeal' },
    { text: 'bữa trưa', tag: 'adds' },
    { text: 'thêm giúp tôi', when: 'noNewDraft', tag: 'adds' },
    { text: 'thêm đồ uống vào bữa tối ngày 1', tag: 'addsB' },
    { text: 'thêm giúp tôi', when: 'noNewDraft', tag: 'addsB' },
    { text: 'nhưng mà ngân sách của tôi chỉ 1 củ thôi, hãy tối ưu hóa lại lộ trình', tag: 'mainKept' },
    { text: 'được', when: 'noNewDraft', tag: 'mainKept' }] },
  { id: 'c19', turns: [
    { text: 'Lập lịch ăn uống 5 ngày ở Hà Nội, ngân sách để mở', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'tôi đang đói tìm cho tôi cơm', tag: 'list' },
    { text: 'thêm món đầu tiên trong danh sách vào bữa trưa ngày 3, kèm cả đồ uống nữa', tag: 'addsTwo' },
    { text: 'cả 2 theo bạn đề xuất', when: 'noNewDraft', tag: 'addsTwo' }] },
  { id: 'c20', turns: [
    { text: 'Lập lịch ăn uống 5 ngày ở Hà Nội, ngân sách để mở', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'Tôi đói muốn tìm món cơm', tag: 'list' },
    { text: 'thêm món cơm vào ngày 3 đi', tag: 'adds' },
    { text: 'thêm giúp tôi', when: 'noNewDraft', tag: 'adds' },
    { text: 'Tôi hơi khát tôi muốn kèm đồ uống ngày 1', tag: 'askMeal' },
    { text: 'kèm nước bữa trưa', tag: 'addsB' }] },
  { id: 'c21', turns: [
    { text: 'Lập lịch ăn uống 3 ngày ở Hà Nội, ngân sách để mở', tag: 'fullPlan' },
    { text: 'lập lịch luôn nhé', when: 'noProposal', tag: 'fullPlan' },
    { text: 'đổi bữa tối ngày 1 sang món khác', tag: 'replace:1/dinner' },
    { text: 'thay bữa trưa ngày 2 bằng phở', tag: 'replaceName:2/lunch:pho' },
    { text: 'xóa bữa sáng ngày 3', tag: 'remove:3/breakfast' },
    { text: 'bỏ ngày 2', tag: 'remove:2' }] }
].filter(s => !only || only.split(',').includes(s.id));

fs.mkdirSync(outDir, { recursive: true });
const out = `${outDir}/results.jsonl`;
let clientId = Date.now();
async function api(base, path, token, body) {
  const started = Date.now();
  try {
    const r = await fetch(base + path, { method: body ? 'POST' : 'GET', signal: AbortSignal.timeout(240000),
      headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const text = await r.text(); let j = {}; try { j = JSON.parse(text); } catch {}
    return { http: r.status, ms: Date.now() - started, ok: r.ok && j.success !== false, data: j.data, errorCode: j.errorCode || null };
  } catch (e) { return { http: 0, ms: Date.now() - started, ok: false, data: null, errorCode: e.name }; }
}
const ctx = c => fetch(`${PROXY}/__ctx`, { method: 'POST', body: JSON.stringify(c) }).catch(() => {});
// The latest draft of the conversation (id and items) and the dishes the latest suggestion showed.
const snapshot = id => JSON.parse(sql(`select json_build_object('offered', state->'offeredDishes', 'numDays', state->'numDays',
  'draft', (select json_build_object('id', p.id, 'items', p.payload->'items') from core.agent_proposals p where p.conversation_id=c.id order by p.id desc limit 1),
  'committed', (select count(*) from core.agent_proposals p where p.conversation_id=c.id and p.status='committed')) from core.agent_conversations c where id=${id}`));

for (const [si, s] of scenarios.entries()) {
  const stats = await fetch(`${PROXY}/__stats`).then(r => r.json()).catch(() => ({}));
  if (stats.cap > 0 && stats.used >= stats.cap * 0.95) { console.log(`STOP: token cap nearly reached (${stats.used}/${stats.cap})`); break; }
  const order = (si + rep) % 2 ? versions : [...versions].reverse();
  for (const v of order) {
    const base = `http://127.0.0.1:${PORTS[v]}`;
    const login = await api(base, '/api/v1/auth/login', null, user);
    if (!login.ok) throw new Error(`${v} login failed ${login.http}`);
    const token = login.data.accessToken;
    const conv = await api(base, '/api/v1/agent/conversations', token, { roadmapId: null });
    const row = { repeat: rep, version: v, scenario: s.id, conversationId: conv.data?.conversationId ?? null, turns: [] };
    let previous = { draft: null };
    for (const t of s.turns) {
      const items = previous.draft?.items?.length ?? 0, days = previous.numDays ?? 0;
      if (t.when === 'noProposal' && previous.draft) continue;
      if (t.when === 'noNewDraft' && row.turns.length && row.turns.at(-1).newDraft) continue;
      if (t.when === 'noFullDraft' && previous.draft && items >= days * 3 && days > 1) continue;
      await ctx({ version: v, repeat: rep, scenario: s.id, turn: row.turns.length + 1 });
      const r = await api(base, `/api/v1/agent/conversations/${row.conversationId}/messages`, token, { clientMessageId: ++clientId, content: t.text, command: 'chat' });
      const after = snapshot(row.conversationId);
      row.turns.push({ text: t.text, tag: t.tag ?? null, http: r.http, ok: r.ok, errorCode: r.errorCode, ms: r.ms, reply: r.data?.reply ?? '', committed: !!r.data?.commit,
        newDraft: (after.draft?.id ?? null) !== (previous.draft?.id ?? null), before: previous, after });
      previous = after;
    }
    await ctx({});
    fs.appendFileSync(out, JSON.stringify(row) + '\n');
    console.log(`r${rep} ${v.padEnd(6)} ${s.id} conv=${row.conversationId} turns=${row.turns.length} http=${row.turns.map(t => t.http).join(',')}`);
  }
}
const stats = await fetch(`${PROXY}/__stats`).then(r => r.json()).catch(() => ({}));
console.log(`done calls=${stats.calls} tokens=${stats.used}`);
