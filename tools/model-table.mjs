// Model comparison tables from a model-compare run: repeat 1 for every model (same conditions), and every run of each
// model excluding runs that met an OpenRouter rate/credit-check refusal (HTTP 429 from OpenRouter, not the model).
//   node model-table.mjs <runId>   -> prints JSON, writes model-table.json
import fs from 'node:fs';
const dir = `E:/ANGI-Agent-Eval/runs/${process.argv[2]}`;
const rows = fs.readFileSync(`${dir}/scored.jsonl`, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const calls = fs.readFileSync(`${dir}/calls.jsonl`, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const info = JSON.parse(fs.readFileSync(`${dir}/run-info.json`, 'utf8').replace(/^\uFEFF/, ''));
const key = x => `${x.version ?? x.route}|${x.scenario}|${x.repeat}`;
const infra = new Set(calls.filter(c => c.status === 429).map(key));
const pct = (a, b) => b ? +(100 * a / b).toFixed(1) : null;
const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : null; };
function stats(rs) {
  const ks = new Set(rs.map(key)), cs = calls.filter(c => ks.has(key(c)));
  const turns = rs.flatMap(r => r.turns.filter(t => !t.setup || true));
  const ms = turns.filter(t => t.ok).map(t => t.ms);
  const kinds = {}; for (const r of rs) { const k = (kinds[r.kind] ||= { runs: 0, passed: 0 }); k.runs++; if (r.passed) k.passed++; }
  const fail = turns.filter(t => !t.ok || t.status !== 'completed');
  const cost = cs.reduce((s, c) => s + (c.costUsd || 0), 0);
  return { runs: rs.length, passed: rs.filter(r => r.passed).length, passRate: pct(rs.filter(r => r.passed).length, rs.length),
    turns: turns.length, failedTurns: fail.length, failedTurnRate: pct(fail.length, turns.length),
    failedByCode: fail.reduce((o, t) => (o[t.errorCode || `HTTP ${t.http}`] = (o[t.errorCode || `HTTP ${t.http}`] || 0) + 1, o), {}),
    calls: cs.length, inputTokens: cs.reduce((s, c) => s + c.promptTokens, 0), cachedTokens: cs.reduce((s, c) => s + c.cachedTokens, 0),
    outputTokens: cs.reduce((s, c) => s + c.completionTokens, 0), costUsd: +cost.toFixed(4), costPerRunUsd: +(cost / (rs.length || 1)).toFixed(5),
    costPerPassedRunUsd: rs.some(r => r.passed) ? +(cost / rs.filter(r => r.passed).length).toFixed(5) : null,
    tokensPerRun: Math.round(cs.reduce((s, c) => s + c.totalTokens, 0) / (rs.length || 1)),
    turnMsMedian: q(ms, 0.5), turnMsP95: q(ms, 0.95), byKind: kinds };
}
const out = { runId: process.argv[2], models: info.models, sameConditionsRepeat1: {}, allRunsWithoutOpenRouterRefusals: {}, openRouterRefusedRuns: {} };
for (const v of Object.keys(info.models)) {
  const mine = rows.filter(r => r.version === v);
  out.sameConditionsRepeat1[v] = stats(mine.filter(r => r.repeat === 1));
  out.allRunsWithoutOpenRouterRefusals[v] = stats(mine.filter(r => !infra.has(key(r))));
  out.openRouterRefusedRuns[v] = mine.filter(r => infra.has(key(r))).map(key);
}
fs.writeFileSync(`${dir}/model-table.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
