// Second scoring pass over results.jsonl: checks every reply against the catalog and the stored proposals.
// usage: node rescore.mjs <runId>   -> writes scored.jsonl, facts.json and metrics.json in the run folder
import fs from 'node:fs'; import { execFileSync } from 'node:child_process'; import { addCost, PRICE } from './cost.mjs';
const runId = process.argv[2], dir = `E:/ANGI-Agent-Eval/runs/${runId}`;
const rd = f => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const R = rd(`${dir}/results.jsonl`), C = fs.existsSync(`${dir}/calls.jsonl`) ? rd(`${dir}/calls.jsonl`) : [];
const sql = (db, q) => execFileSync('docker', ['exec', 'angi-eval-pg', 'psql', '-U', 'postgres', '-d', db, '-At', '-c', q], { encoding: 'utf8', maxBuffer: 64 << 20 }).trim();
const norm = s => (s || '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();

// Catalog is identical in the three databases (same dump, checked by md5); read it once.
const catalog = JSON.parse(sql('angi_eval_v20', "select coalesce(json_agg(json_build_object('id',d.id,'name',d.name,'price',d.price,'restaurant',r.name)),'[]') from core.dishes d join core.restaurants r on r.id=d.restaurant_id"));
const byName = new Map(); for (const d of catalog) { const k = norm(d.name); byName.set(k, [...(byName.get(k) || []), d]); }
const byId = new Map(catalog.map(d => [d.id, d]));

// 1. Proposal items stored by each version: dish exists, same name, price and restaurant as the catalog.
const proposals = {}, draftsByConversation = {};
const scenarioCfg = new Map(JSON.parse(fs.readFileSync('E:/ANGI-Agent-Eval/tools/scenarios.json', 'utf8')).scenarios.map(s => [s.id, s]));
for (const v of [...new Set(R.map(r => r.version))].sort()) {
  const rows = JSON.parse(sql(`angi_eval_${v}`, "select coalesce(json_agg(json_build_object('c',conversation_id,'id',id,'items',payload->'items')),'[]') from core.agent_proposals"));
  let items = 0, bad = []; for (const p of rows) for (const it of p.items || []) {
    items++; const d = byId.get(it.dishId);
    if (!d || norm(d.name) !== norm(it.dishName) || Number(d.price) !== Number(it.price) || norm(d.restaurant) !== norm(it.restaurantName)) bad.push({ conversation: p.c, dishId: it.dishId, dishName: it.dishName });
  }
  proposals[v] = { proposals: rows.length, items, mismatched: bad.length, examples: bad.slice(0, 5) };
  draftsByConversation[v] = new Map(); for (const p of [...rows].sort((a, b) => a.id - b.id)) draftsByConversation[v].set(p.c, [...(draftsByConversation[v].get(p.c) || []), p]);
}

// 1b. "Adds" turns (scenarios.json expect.draft = "adds"): the newest draft must keep every item of the draft before it and hold one more.
// The reply alone cannot show this: in Round 3 replies said "thêm" while the dish was replaced.
function addProblem(r) {
  const turn = (scenarioCfg.get(r.scenario)?.turns || []).findIndex(t => t.expect?.draft === 'adds');
  if (turn < 0) return null;
  const drafts = draftsByConversation[r.version]?.get(r.conversationId) || [];
  if (drafts.length < 2) return null; // no new draft: the run itself already reports it
  const key = i => `${i.dishId}|${i.dayNumber}|${i.mealSlot}`, before = drafts.at(-2).items || [], after = drafts.at(-1).items || [];
  const kept = before.every(i => after.some(j => key(j) === key(i)));
  return kept && after.length === before.length + 1 ? null : `draft check: ${kept ? `${after.length - before.length} items added instead of 1` : 'the added dish replaced an existing one'}`;
}

// 2. Claims inside replies: "<dish> ở|tại <restaurant> ..., khoảng <price> đồng" must match one catalog dish.
const claimRe = /([A-ZÀ-Ỹ][^;:.\n{}]*?) (?:ở|tại) ([^,(;\n]+?)(?: \([^)]*\))?, khoảng ([\d.]+) đồng/gu;
function claims(text) {
  const out = []; for (const m of (text || '').normalize('NFC').replace(/ hoặc /giu, '; ').matchAll(claimRe)) {
    const name = norm(m[1].replace(/^(bạn (có thể )?thử|mình gợi ý|- )\s*/i, '').replace(/^.*(?:thử|nhé:|nè:|nè|:)\s*/i, ''));
    const price = Number(m[3].replace(/\./g, '')), rest = norm(m[2]);
    const hits = byName.get(name) || [];
    const ok = hits.some(d => Number(d.price) === price && (norm(d.restaurant) === rest || norm(d.restaurant).startsWith(rest) || rest.startsWith(norm(d.restaurant))));
    out.push({ name, restaurant: rest, price, ok, known: hits.length > 0 });
  }
  return out;
}
const SLOT = /\{\s*[a-z]+\d*\s*\}/i;
const FALSE_SAVE = /^(ừ|ok|được|vâng)?[,!. ]*mình (đã )?lưu (lịch|lại)/iu;

const scored = R.map(r => {
  const problems = [...r.problems], turnFacts = [];
  for (const t of r.turns) {
    const f = { turn: t.turn, slot: SLOT.test(t.reply), falseSave: FALSE_SAVE.test(t.reply.trim()) && !t.committed, claims: claims(t.reply) };
    f.formatOk = t.ok && t.status === 'completed' && !!t.reply.trim() && !f.slot;
    f.faithful = !f.falseSave && f.claims.every(c => c.ok);
    if (f.slot) problems.push(`turn ${t.turn}: unfilled template slot`);
    if (f.falseSave) problems.push(`turn ${t.turn}: says it saved, nothing saved`);
    for (const c of f.claims.filter(c => !c.ok)) problems.push(`turn ${t.turn}: unverified dish claim "${c.name}" ${c.price}`);
    turnFacts.push(f);
  }
  const added = addProblem(r); if (added) problems.push(added);
  const setupFailed = r.turns.some(t => t.setup) && !r.turns.some(t => t.setup && t.proposalId);
  return { ...r, problems, passed: problems.length === 0, setupFailed, turnFacts };
});
fs.writeFileSync(`${dir}/scored.jsonl`, scored.map(x => JSON.stringify(x)).join('\n') + '\n');

const q = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.ceil(s.length * p) - 1)]; };
const metrics = {};
for (const v of [...new Set(R.map(r => r.version))].sort()) {
  const rs = scored.filter(r => r.version === v), turns = rs.flatMap(r => r.turns), facts = rs.flatMap(r => r.turnFacts);
  const cs = C.filter(c => c.route === v && c.scenario), claimsAll = facts.flatMap(f => f.claims);
  const perScenario = rs.map(r => cs.filter(c => c.scenario === r.scenario && c.repeat === r.repeat));
  metrics[v] = {
    scenarios: rs.length, passed: rs.filter(r => r.passed).length, setupFailed: rs.filter(r => r.setupFailed).length,
    turns: turns.length, formatOkTurns: facts.filter(f => f.formatOk).length, faithfulTurns: facts.filter(f => f.faithful).length,
    dishClaims: claimsAll.length, dishClaimsVerified: claimsAll.filter(c => c.ok).length, falseSaves: facts.filter(f => f.falseSave).length, slotTurns: facts.filter(f => f.slot).length,
    proposalItems: proposals[v].items, proposalItemsMismatched: proposals[v].mismatched,
    calls: cs.length, inputTokens: cs.reduce((s, c) => s + c.promptTokens, 0), cachedTokens: cs.reduce((s, c) => s + c.cachedTokens, 0),
    outputTokens: cs.reduce((s, c) => s + c.completionTokens, 0), totalTokens: cs.reduce((s, c) => s + c.totalTokens, 0),
    outputTokensPerScenario: perScenario.reduce((s, p) => s + p.reduce((a, c) => a + c.completionTokens, 0), 0) / (rs.length || 1),
    tokensPerScenario: perScenario.reduce((s, p) => s + p.reduce((a, c) => a + c.totalTokens, 0), 0) / (rs.length || 1),
    turnMsMedian: q(turns.map(t => t.ms), .5), turnMsP95: q(turns.map(t => t.ms), .95)
  };
  addCost(metrics[v]); // costUsd and costPerScenarioUsd ("Cost per task"), see cost.mjs
}
fs.writeFileSync(`${dir}/facts.json`, JSON.stringify({ catalogDishes: catalog.length, proposals, priceUsdPerMillionTokens: PRICE }, null, 2));
fs.writeFileSync(`${dir}/metrics.json`, JSON.stringify(metrics, null, 2));
console.log(JSON.stringify(metrics, null, 1));
for (const r of scored.filter(r => !r.passed)) console.log(`${r.version} ${r.scenario}${r.setupFailed ? ' [setup failed]' : ''}: ${r.problems.join('; ')}`);
