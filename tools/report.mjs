// Joins scenario results with the proxy's token records. usage: node report.mjs <runId>
import fs from 'node:fs';
const runId = process.argv[2], dir = `E:/ANGI-Agent-Eval/runs/${runId}`;
const rd = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)) : [];
// Prefer the rescored file: it adds the catalog and stored-draft checks that the runner cannot make.
const R = rd(fs.existsSync(`${dir}/scored.jsonl`) ? `${dir}/scored.jsonl` : `${dir}/results.jsonl`), C = rd(`${dir}/calls.jsonl`);
const sum = (a, f) => a.reduce((s, x) => s + (f(x) || 0), 0);
const q = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; };
const key = c => `${c.version}|${c.repeat}|${c.scenario}`;
const byScenario = new Map(); for (const c of C) { if (!c.scenario) continue; const k = key(c); byScenario.set(k, [...(byScenario.get(k) || []), c]); }
const fmt = n => Math.round(n).toLocaleString('en-US');
const versions = [...new Set(R.map(r => r.version))].sort();
const lines = [`# Evaluation report: ${runId}`, '', `Scenario runs: ${R.length}. Model calls: ${C.length}. Calls without a scenario: ${C.filter(c => !c.scenario).length}. Calls with mismatched route: ${C.filter(c => c.version && c.version !== c.route).length}.`, ''];
lines.push('| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
const summary = [];
for (const v of versions) {
  const rs = R.filter(r => r.version === v), cs = C.filter(c => c.route === v && c.scenario), turns = rs.flatMap(r => r.turns), passed = rs.filter(r => r.passed).length;
  const total = sum(cs, c => c.totalTokens), row = { version: v, scenarios: rs.length, passed, turns: turns.length, failedTurns: turns.filter(t => !t.ok).length, calls: cs.length, input: sum(cs, c => c.promptTokens), cached: sum(cs, c => c.cachedTokens), output: sum(cs, c => c.completionTokens), total, medianMs: q(turns.map(t => t.ms), .5), p90Ms: q(turns.map(t => t.ms), .9) };
  summary.push(row);
  lines.push(`| ${v} | ${passed}/${rs.length} | ${(100 * passed / (rs.length || 1)).toFixed(1)}% | ${row.turns} | ${row.failedTurns} | ${row.calls} | ${fmt(row.input)} | ${fmt(row.cached)} | ${fmt(row.output)} | ${fmt(total)} | ${fmt(total / (rs.length || 1))} | ${passed ? fmt(total / passed) : 'n/a'} | ${(row.medianMs / 1000).toFixed(1)} | ${(row.p90Ms / 1000).toFixed(1)} |`);
}
lines.push('', '## By scenario kind', '', '| Kind | Version | Passed | Median tokens per scenario | Median model calls |', '|---|---|---|---|---|');
for (const kind of [...new Set(R.map(r => r.kind))]) for (const v of versions) {
  const rs = R.filter(r => r.kind === kind && r.version === v), per = rs.map(r => byScenario.get(key({ version: v, repeat: r.repeat, scenario: r.scenario })) || []);
  lines.push(`| ${kind} | ${v} | ${rs.filter(r => r.passed).length}/${rs.length} | ${fmt(q(per.map(p => sum(p, c => c.totalTokens)), .5))} | ${q(per.map(p => p.length), .5)} |`);
}
lines.push('', '## Failed scenarios', '', '| Version | Scenario | Problem |', '|---|---|---|');
for (const r of R.filter(r => !r.passed)) lines.push(`| ${r.version} | ${r.scenario} | ${r.problems.join('; ').replaceAll('|', '/')} |`);
fs.writeFileSync(`${dir}/report.md`, lines.join('\n') + '\n'); fs.writeFileSync(`${dir}/summary.json`, JSON.stringify(summary, null, 2));
console.log(lines.slice(0, 8 + versions.length).join('\n'));
