// Summary numbers for some scenarios of a run, with the same formulas as rescore.mjs, from scored.jsonl and calls.jsonl only.
// Used where a report column covers part of a run, e.g. the V3.1 column of the Round 3 table (the two adding scenarios of round-3/v31).
//   node metrics-subset.mjs <runId> <scenario,scenario,...> <name>   -> runs/<runId>/metrics-<name>.json
// No database read: draft items are not recounted here (the whole run's count is in facts.json and metrics.json).
import fs from 'node:fs';
import { addCost } from './cost.mjs';

const [runId, list, name] = process.argv.slice(2);
if (!runId || !list || !name) { console.error('usage: node metrics-subset.mjs <runId> <scenario,...> <name>'); process.exit(1); }
const dir = `E:/ANGI-Agent-Eval/runs/${runId}`, only = new Set(list.split(','));
const rd = f => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const S = rd(`${dir}/scored.jsonl`).filter(r => only.has(r.scenario)), C = rd(`${dir}/calls.jsonl`);
const q = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.ceil(s.length * p) - 1)]; };
const out = { runId, scenarios: [...only] };
for (const v of [...new Set(S.map(r => r.version))].sort()) {
  const rs = S.filter(r => r.version === v), turns = rs.flatMap(r => r.turns), facts = rs.flatMap(r => r.turnFacts), claims = facts.flatMap(f => f.claims);
  const cs = C.filter(c => c.route === v && rs.some(r => r.scenario === c.scenario && r.repeat === c.repeat));
  const sum = k => cs.reduce((s, c) => s + c[k], 0);
  out[v] = addCost({
    scenarios: rs.length, passed: rs.filter(r => r.passed).length, setupFailed: rs.filter(r => r.setupFailed).length,
    turns: turns.length, formatOkTurns: facts.filter(f => f.formatOk).length, faithfulTurns: facts.filter(f => f.faithful).length,
    dishClaims: claims.length, dishClaimsVerified: claims.filter(c => c.ok).length, falseSaves: facts.filter(f => f.falseSave).length,
    calls: cs.length, inputTokens: sum('promptTokens'), cachedTokens: sum('cachedTokens'), outputTokens: sum('completionTokens'), totalTokens: sum('totalTokens'),
    outputTokensPerScenario: sum('completionTokens') / (rs.length || 1), tokensPerScenario: sum('totalTokens') / (rs.length || 1),
    turnMsMedian: q(turns.map(t => t.ms), .5), turnMsP95: q(turns.map(t => t.ms), .95)
  });
}
fs.writeFileSync(`${dir}/metrics-${name}.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
