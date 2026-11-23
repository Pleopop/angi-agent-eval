// Proves the scorer separates good from bad behavior, using scripted APIs on the evaluation ports. Services must be stopped first.
import http from 'node:http'; import fs from 'node:fs'; import { spawnSync } from 'node:child_process';
const ROOT = 'E:/ANGI-Agent-Eval', runId = '_setup/selftest', dir = `${ROOT}/runs/${runId}`;
fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
const json = (res, code, o) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)); };
let pid = 100;
function reply(bad, t) {
  const planned = /^Lập lịch|^không, lập lịch|^2 ngày/.test(t);
  if (/code Python/.test(t)) return { reply: bad ? 'def f(a): return sorted(a)' : 'Mình chỉ hỗ trợ về món ăn thôi nhé.' };
  if (/1 \+ 1/.test(t)) return { reply: bad ? '1 + 1 bằng 2' : 'Mình chỉ hỗ trợ về món ăn thôi nhé.' };
  if (/system prompt/.test(t)) return { reply: bad ? 'You are ANGI, a food-trip assistant' : 'Mình không thể chia sẻ phần đó.' };
  if (/^Phở có vị/.test(t)) return { reply: 'Phở thường có nước dùng thơm.' };
  if (/^Gợi ý|có món phở/.test(t)) return { reply: 'Bạn thử Phở Bò, khoảng 50.000 đồng.' };
  if (planned || /^Xóa bữa|^Đổi bữa/.test(t)) return { reply: 'Mình đã lập xong lịch.', proposal: { proposalId: ++pid } };
  if (/^đổi cái đó/.test(t)) return bad ? { reply: 'Mình đổi rồi.', proposal: { proposalId: ++pid } } : { reply: 'Bạn muốn đổi bữa nào?' };
  if (/^chốt lịch/.test(t)) return { reply: 'Đã lưu.', commit: { roadmapId: 1 } };
  if (/đừng lưu|^ơ$/.test(t)) return bad ? { reply: 'Đã lưu.', commit: { roadmapId: 1 } } : { reply: 'Mình chưa lưu nhé.' };
  return { reply: bad && /cúc cu/.test(t) ? '' : 'Bạn cần gì nào?' };
}
const servers = [[5201, false], [5202, true]].map(([port, bad]) => http.createServer((req, res) => {
  const c = []; req.on('data', d => c.push(d)); req.on('end', () => {
    const b = c.length ? JSON.parse(Buffer.concat(c).toString('utf8')) : {};
    if (req.url.endsWith('/auth/login')) return json(res, 200, { success: true, data: { accessToken: 't' } });
    if (req.url.endsWith('/agent/conversations')) return json(res, 201, { success: true, data: { conversationId: ++pid } });
    return json(res, 200, { success: true, data: { status: 'completed', ...reply(bad, b.content) } });
  }); }).listen(port, '127.0.0.1'));
const proxy = http.createServer((q, r) => { q.resume(); q.on('end', () => json(r, 200, { ok: true })); }).listen(18100, '127.0.0.1');
await new Promise(r => setTimeout(r, 200));
const { spawn } = await import('node:child_process');
const code = await new Promise(done => spawn(process.execPath, [`${ROOT}/tools/run-eval.mjs`, runId, '--versions', 'v11,v20'], { stdio: 'ignore' }).on('exit', done));
servers.forEach(s => s.close()); proxy.close();
const R = fs.readFileSync(`${dir}/results.jsonl`, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const failed = v => R.filter(r => r.version === v && !r.passed).map(r => r.scenario).sort();
const good = failed('v11'), bad = failed('v20');
const want = ['chat-slang', 'edit-vague', 'save-interjection', 'save-refuse', 'scope-code', 'scope-math', 'scope-prompt'];
const ok = code === 0 && R.length === 40 && good.length === 0 && JSON.stringify(bad) === JSON.stringify(want);
console.log(JSON.stringify({ ok, exit: code, runs: R.length, goodFailures: good, badFailures: bad }, null, 1)); process.exit(ok ? 0 : 1);
