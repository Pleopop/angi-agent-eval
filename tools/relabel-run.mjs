// Renames a model-compare run's slot labels (v30, v31, v40) to model labels (luna, haiku, gemini) in its results,
// so nobody reads the slot names as Agent versions: every slot ran build\v40. Infrastructure names inside the backend
// logs (database angi_eval_v30, proxy route /run/v30/) stay as they were; run-info.json gets the mapping in "slots".
//   node relabel-run.mjs <runId>            (default mapping v30=luna,v31=haiku,v40=gemini)
//   node relabel-run.mjs <runId> v30=luna,v31=haiku,v40=gemini
import fs from 'node:fs';
const [runId, spec = 'v30=luna,v31=haiku,v40=gemini'] = process.argv.slice(2);
const dir = `E:/ANGI-Agent-Eval/runs/${runId}`;
const map = Object.fromEntries(spec.split(',').map(p => p.split('=')));
const ports = { v11: 5201, v20: 5202, v30: 5203, v31: 5204, v40: 5205 };
const info0 = JSON.parse(fs.readFileSync(`${dir}/run-info.json`, 'utf8').replace(/^\uFEFF/, ''));
if (info0.slots) { console.log(`${runId}: already relabelled`); process.exit(0); }

// JSON: object keys and string values equal to a slot, and "slot|..." keys (model-table), are renamed.
const swap = s => map[s] ?? (s.includes('|') && map[s.split('|')[0]] ? map[s.split('|')[0]] + s.slice(s.indexOf('|')) : s);
const deep = o => Array.isArray(o) ? o.map(deep) : o && typeof o === 'object'
  ? Object.fromEntries(Object.entries(o).map(([k, v]) => [swap(k), deep(v)])) : typeof o === 'string' ? swap(o) : o;
const read = f => fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '');
for (const f of fs.readdirSync(dir)) {
  const p = `${dir}/${f}`;
  if (f.endsWith('.jsonl')) fs.writeFileSync(p, read(p).split('\n').filter(Boolean).map(l => JSON.stringify(deep(JSON.parse(l)))).join('\n') + '\n');
  else if (f.endsWith('.json')) fs.writeFileSync(p, JSON.stringify(deep(JSON.parse(read(p))), null, 2) + '\n');
}
// Runner and rescore logs: the slot is a word at the start of each result line.
const word = new RegExp(`\\b(${Object.keys(map).join('|')})\\b`, 'g');
for (const f of fs.readdirSync(dir).filter(f => /^(run-.*\.log|rescore\.log)$/.test(f))) fs.writeFileSync(`${dir}/${f}`, read(`${dir}/${f}`).replace(word, m => map[m]));
// File names: run-v30.log -> run-luna.log, backend-v30.out -> backend-luna.out.
for (const f of fs.readdirSync(dir)) { const m = f.match(/^(run|backend)-(v\d\d)\.(log|err|out)$/); if (m && map[m[2]]) fs.renameSync(`${dir}/${f}`, `${dir}/${m[1]}-${map[m[2]]}.${m[3]}`); }
// Mapping, for anyone tracing a label back to its database, reco container and port.
const info = JSON.parse(read(`${dir}/run-info.json`));
info.slots = Object.fromEntries(Object.entries(map).map(([slot, label]) => [label, { slot, build: 'build\\v40 (V4.0, 16efd35)', database: `angi_eval_${slot}`, recoContainer: `angi-eval-reco-${slot}`, backendPort: ports[slot], proxyRoute: `/run/${slot}/v1/` }]));
info.slotsNote = 'Labels luna/haiku/gemini name the model of each slot. All slots ran the same V4.0 build; v30/v31/v40 are only the database, reco container and port that slot used.';
fs.writeFileSync(`${dir}/run-info.json`, JSON.stringify(info, null, 2) + '\n');
console.log(`${runId}: relabelled ${Object.entries(map).map(([a, b]) => `${a}->${b}`).join(', ')}`);
