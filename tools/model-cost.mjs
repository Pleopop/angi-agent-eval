// Model comparison: replaces the gpt-6-luna price table in metrics.json with what OpenRouter actually billed per call
// (usage.cost recorded by the proxy), and adds the model name and provider of each slot.
//   node model-cost.mjs <runId>
import fs from 'node:fs';
const dir = `E:/ANGI-Agent-Eval/runs/${process.argv[2]}`;
const info = JSON.parse(fs.readFileSync(`${dir}/run-info.json`, 'utf8').replace(/^\uFEFF/, ''));
const metrics = JSON.parse(fs.readFileSync(`${dir}/metrics.json`, 'utf8'));
const calls = fs.readFileSync(`${dir}/calls.jsonl`, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
for (const [v, m] of Object.entries(metrics)) {
  const c = calls.filter(x => x.route === v);
  m.model = info.models?.[v] || null;
  m.providers = [...new Set(c.map(x => x.provider).filter(Boolean))];
  m.costUsd = +c.reduce((s, x) => s + (x.costUsd || 0), 0).toFixed(6);
  m.costPerScenarioUsd = +(m.costUsd / (m.scenarios || 1)).toFixed(6);
  m.cacheWriteTokens = c.reduce((s, x) => s + (x.cacheWriteTokens || 0), 0);
  m.reasoningTokens = c.reduce((s, x) => s + (x.reasoningTokens || 0), 0);
  m.httpErrors = c.filter(x => x.status >= 400).length;
  m.callsTruncated = c.filter(x => x.finishReason === 'length').length;
  console.log(v, m.model, m.providers.join('/'), `passed ${m.passed}/${m.scenarios}`, `USD ${m.costUsd}`, `errors ${m.httpErrors}`);
}
fs.writeFileSync(`${dir}/metrics.json`, JSON.stringify(metrics, null, 2));
