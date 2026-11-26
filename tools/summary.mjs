// Report tables for one run: pass counts per scenario and version, per kind, and the version metrics (tokens, cost, latency, faithfulness).
// usage: node summary.mjs <runId>   -> writes summary.md and summary-tables.json in the run folder (reads scored.jsonl and metrics.json)
import fs from 'node:fs';
const runId = process.argv[2], dir = `E:/ANGI-Agent-Eval/runs/${runId}`;
const rows = fs.readFileSync(`${dir}/scored.jsonl`, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const metrics = JSON.parse(fs.readFileSync(`${dir}/metrics.json`, 'utf8').replace(/^\uFEFF/, ''));
const cfg = JSON.parse(fs.readFileSync('E:/ANGI-Agent-Eval/tools/scenarios.json', 'utf8'));
const versions = [...new Set(rows.map(r => r.version))].sort();
const name = { v11: 'V1.1', v20: 'V2.0', v30: 'V3.0', v31: 'V3.1', v40: 'V4.0' };
const kinds = ['chat', 'scope', 'suggest', 'plan', 'edit', 'save', 'area', 'conversation'];
const cell = (rs) => `${rs.filter(r => r.passed).length}/${rs.length}`;
const out = [`# Summary: ${runId}`, ''];

out.push('## By version', '', `| Metric | ${versions.map(v => name[v]).join(' | ')} |`, `| --- | ${versions.map(() => '---').join(' | ')} |`);
const m = k => versions.map(v => metrics[v][k]);
const pct = (a, b) => b ? `${(100 * a / b).toFixed(1)}%` : '—';
const lines = [
  ['Runs passed', versions.map(v => `${metrics[v].passed}/${metrics[v].scenarios} (${pct(metrics[v].passed, metrics[v].scenarios)})`)],
  ['Data checks passed (area, conversation)', versions.map(v => `${metrics[v].checksPassed}/${metrics[v].checks}`)],
  ['Turns with a valid reply', versions.map(v => `${metrics[v].formatOkTurns}/${metrics[v].turns}`)],
  ['Turns without false information', versions.map(v => `${metrics[v].faithfulTurns}/${metrics[v].turns}`)],
  ['Dish claims verified', versions.map(v => `${metrics[v].dishClaimsVerified}/${metrics[v].dishClaims}`)],
  ['False "saved" replies', m('falseSaves')],
  ['Unfilled slots', m('slotTurns')],
  ['Draft items not matching the catalog', versions.map(v => `${metrics[v].proposalItemsMismatched}/${metrics[v].proposalItems}`)],
  ['Model calls', m('calls').map(x => x.toLocaleString('en-US'))],
  ['Total tokens', m('totalTokens').map(x => x.toLocaleString('en-US'))],
  ['Tokens per run', m('tokensPerScenario').map(x => Math.round(x).toLocaleString('en-US'))],
  ['Cost per run (USD)', m('costPerScenarioUsd').map(x => x.toFixed(4))],
  ['Total cost (USD)', m('costUsd').map(x => x.toFixed(3))],
  ['Median turn (s)', m('turnMsMedian').map(x => (x / 1000).toFixed(1))],
  ['p95 turn (s)', m('turnMsP95').map(x => (x / 1000).toFixed(1))]
];
for (const [k, vals] of lines) out.push(`| ${k} | ${vals.join(' | ')} |`);

out.push('', '## By kind', '', `| Kind | Scenarios | ${versions.map(v => name[v]).join(' | ')} |`, `| --- | --- | ${versions.map(() => '---').join(' | ')} |`);
for (const k of kinds) { const ids = cfg.scenarios.filter(s => s.kind === k).length; if (!ids) continue;
  out.push(`| ${k} | ${ids} | ${versions.map(v => cell(rows.filter(r => r.kind === k && r.version === v))).join(' | ')} |`); }
out.push(`| Total | ${cfg.scenarios.length} | ${versions.map(v => cell(rows.filter(r => r.version === v))).join(' | ')} |`);

out.push('', '## By scenario (runs passed of 3)', '', `| No. | Scenario | Kind | ${versions.map(v => name[v]).join(' | ')} |`, `| --- | --- | --- | ${versions.map(() => '---').join(' | ')} |`);
const table = [];
cfg.scenarios.forEach((s, i) => {
  const cells = versions.map(v => cell(rows.filter(r => r.scenario === s.id && r.version === v)));
  table.push({ no: i + 1, id: s.id, kind: s.kind, cells: Object.fromEntries(versions.map((v, j) => [v, cells[j]])) });
  out.push(`| ${i + 1} | ${s.id} | ${s.kind} | ${cells.join(' | ')} |`);
});

out.push('', '## Failed runs', '');
for (const r of rows.filter(r => !r.passed)) out.push(`- ${name[r.version]} r${r.repeat} ${r.scenario}: ${r.problems.join('; ').slice(0, 300)}`);
fs.writeFileSync(`${dir}/summary.md`, out.join('\n') + '\n');
fs.writeFileSync(`${dir}/summary-tables.json`, JSON.stringify({ versions, lines, table }, null, 2));
console.log(out.slice(0, 40).join('\n'));
