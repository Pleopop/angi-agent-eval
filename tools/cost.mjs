// Cost of a run from the token usage OpenAI returned (calls.jsonl, summed in metrics.json), at the gpt-6-luna list price.
// costPerScenarioUsd divides by every run of the version, passed or not: it is "Cost per task" in the report tables.
//   node cost.mjs <runId> [<runId> ...]   -> adds costUsd and costPerScenarioUsd to runs/<runId>/metrics.json
// Reads no database and calls no model, so it can be applied to any earlier run. rescore.mjs uses the same function.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export const PRICE = { model: 'gpt-6-luna', unit: 'USD per million tokens', input: 0.10, cachedInput: 0.01, output: 0.50 };

export function addCost(m) {
  const uncached = m.inputTokens - m.cachedTokens;
  m.costUsd = +((uncached * PRICE.input + m.cachedTokens * PRICE.cachedInput + m.outputTokens * PRICE.output) / 1e6).toFixed(6);
  m.costPerScenarioUsd = +(m.costUsd / (m.scenarios || 1)).toFixed(6);
  return m;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const runId of process.argv.slice(2)) {
    const f = `E:/ANGI-Agent-Eval/runs/${runId}/metrics.json`;
    const metrics = JSON.parse(fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, ''));
    for (const v of Object.keys(metrics)) addCost(metrics[v]);
    fs.writeFileSync(f, JSON.stringify(metrics, null, 2));
    console.log(runId, Object.entries(metrics).map(([v, m]) => `${v} $${m.costPerScenarioUsd} per task ($${m.costUsd} total)`).join(', '));
  }
}
