// Scores the replayed conversations: each tagged turn (or chain of turns with the same tag) is checked against the drafts and offered dishes in the database.
// usage: node score-convs.mjs <outDir>
import fs from 'node:fs';
const dir = process.argv[2];
const rows = fs.readFileSync(`${dir}/results.jsonl`, 'utf8').trim().split('\n').map(JSON.parse);
const items = s => s?.draft?.items ?? [];
const key = i => `${i.dayNumber}/${i.mealSlot}/${i.dishId}`;
const ids = list => (list ?? []).map(d => d.dishId);
import { execFileSync } from 'node:child_process';
const mains = new Set(execFileSync('docker', ['exec', 'angi-eval-pg', 'psql', '-U', 'postgres', '-d', 'angi_eval_zone', '-At', '-c',
  "select distinct dt.dish_id from core.dish_tags dt join core.tags t on t.id=dt.tag_id where t.code='local_sf_main'"], { encoding: 'utf8' }).trim().split('\n').map(Number));

function checks(row) {
  const out = [];
  const t = row.turns;
  // Chains: consecutive turns with the same tag are one request answered over several turns.
  const chains = [];
  for (const turn of t) {
    if (!turn.tag) continue;
    const last = chains.at(-1);
    if (last && last.tag === turn.tag && t[t.indexOf(turn) - 1] === last.turns.at(-1)) last.turns.push(turn); else chains.push({ tag: turn.tag, turns: [turn] });
  }
  for (const c of chains) {
    const first = c.turns[0], end = c.turns.at(-1), reply = end.reply || '';
    let pass, note;
    // replace:<day>/<meal>[:<name>] and remove:<day>[/<meal>] (conversation 21 script): only the named meal or day changes, every other dish stays.
    if (/^(replace|replaceName|remove):/.test(c.tag)) {
      const [kind, where, want] = c.tag.split(':'), [day, meal] = where.split('/');
      const at = i => String(i.dayNumber) === day && (!meal || i.mealSlot === meal);
      const plain = s => (s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();
      const before = items(first.before), after = items(end.after);
      const othersKept = JSON.stringify(before.filter(i => !at(i)).map(key).sort()) === JSON.stringify(after.filter(i => !at(i)).map(key).sort());
      const was = before.filter(at), now = after.filter(at);
      if (kind === 'remove') pass = othersKept && was.length > 0 && now.length === 0;
      else pass = othersKept && was.length > 0 && now.length === was.length && now.some(i => !was.some(w => w.dishId === i.dishId)) &&
        (kind === 'replace' || now.some(i => plain(i.dishName).includes(want)));
      note = `othersKept=${othersKept} was=${was.map(i => i.dishName).join('|')} now=${now.map(i => i.dishName).join('|')}`;
      out.push({ tag: c.tag, pass, note, turns: c.turns.length });
      continue;
    }
    switch (c.tag) {
      case 'nodata': pass = /dữ liệu|chưa có (quán|món|nhà hàng)|không có (quán|món|nhà hàng)/iu.test(reply) && !/(chưa|không) (xác định|định vị)/iu.test(reply); note = reply.slice(0, 110); break;
      case 'noCarry': pass = !/Hưng Yên/iu.test(reply); note = reply.slice(0, 110); break;
      case 'noSave': pass = !end.committed && (end.after?.committed ?? 0) == 0; note = `committed=${end.committed}`; break;
      case 'fullPlan': { const n = items(end.after).length, days = end.after?.numDays ?? 0; pass = days >= 3 && n >= days * 3; note = `items=${n} days=${days}`; break; }
      case 'namDinh': pass = /Nam Định/iu.test(reply) && !/Đại Cồ Việt/iu.test(reply); note = reply.slice(0, 110); break;
      case 'askLocation': pass = /vị trí/iu.test(reply) && JSON.stringify(ids(first.before.offered)) === JSON.stringify(ids(end.after.offered)); note = reply.slice(0, 110); break;
      case 'pickedTwo': { const want = ids(first.before.offered).slice(0, 2), got = items(end.after).map(i => i.dishId); pass = want.length === 2 && want.every(id => got.includes(id)); note = `want=${want} inDraft=${want.filter(id => got.includes(id))} items=${got.length}`; break; }
      case 'list': pass = (reply.match(/^- /gm) || []).length >= 2; note = `lines=${(reply.match(/^- /gm) || []).length}`; break;
      case 'adds': case 'addsB': case 'addsTwo': {
        const base = items(first.before).map(key), result = items(end.after).map(key);
        const kept = base.every(k => { const i = result.indexOf(k); if (i < 0) return false; result.splice(i, 1); return true; });
        const want = c.tag === 'addsTwo' ? 2 : 1;
        // addsTwo ("món đầu tiên … bữa trưa ngày 3, kèm cả đồ uống", conversation 19): both new dishes sit at day 3 lunch.
        const placed = c.tag !== 'addsTwo' || result.every(k => k.startsWith('3/lunch/'));
        pass = kept && placed && items(end.after).length === items(first.before).length + want;
        note = `before=${items(first.before).length} after=${items(end.after).length} keptAll=${kept} new=${result.join(',')}`; break; }
      // "đồ uống vào ngày 1" names no meal: the turn asks which meal and changes nothing (conversation 17 put the drink on breakfast).
      case 'askMeal': pass = !c.turns.some(x => x.newDraft) && /bữa/iu.test(reply) && /\?/.test(reply); note = reply.slice(0, 110); break;
      // A budget replan after drinks were added keeps a main dish at every meal and fits the budget (conversation 17: lunch and dinner became drinks only).
      case 'mainKept': {
        const d = items(end.after), meals = [...new Set(d.map(i => i.dayNumber + '/' + i.mealSlot))];
        const noMain = meals.filter(m => !d.some(i => i.dayNumber + '/' + i.mealSlot === m && mains.has(i.dishId))), total = d.reduce((a, i) => a + (i.price ?? 0), 0);
        const made = c.turns.some(x => x.newDraft);
        pass = made && noMain.length === 0 && total <= 1000000 && meals.length >= 9; note = `newDraft=${made} meals=${meals.length} noMain=${noMain} total=${total}`; break; }
      case 'lunchFromList': {
        const offered = ids(first.before.offered), draft = items(end.after);
        const lunch = draft.filter(i => i.dayNumber === 1 && i.mealSlot === 'lunch').map(i => i.dishId);
        const others = draft.filter(i => !(i.dayNumber === 1 && i.mealSlot === 'lunch') && offered.includes(i.dishId)).length;
        pass = lunch.some(id => offered.includes(id)) && others <= 2; note = `lunchFromList=${lunch.some(id => offered.includes(id))} othersFromList=${others}/${draft.length - lunch.length}`; break; }
    }
    out.push({ tag: c.tag, pass, note, turns: c.turns.length });
  }
  const errors = t.filter(x => x.http !== 200).length;
  return { out, errors };
}

const lines = [];
const summary = {};
for (const row of rows) {
  const { out, errors } = checks(row);
  const k = `${row.scenario}|${row.version}`;
  (summary[k] ??= { pass: 0, total: 0, scen: 0, scenTotal: 0 });
  summary[k].pass += out.filter(x => x.pass).length; summary[k].total += out.length;
  summary[k].scen += out.every(x => x.pass) && !errors ? 1 : 0; summary[k].scenTotal += 1;
  lines.push(`[${row.version} r${row.repeat} ${row.scenario} conv ${row.conversationId}] ${out.every(x => x.pass) && !errors ? 'PASS' : 'FAIL'} errors=${errors}`);
  for (const x of out) lines.push(`   ${x.pass ? 'ok ' : 'NO '} ${x.tag.padEnd(13)} ${x.note}`);
}
const table = ['scenario | before (checks / whole) | after (checks / whole)', '--- | --- | ---'];
for (const s of [...new Set(rows.map(r => r.scenario))]) {
  const cell = v => { const x = summary[`${s}|${v}`]; return x ? `${x.pass}/${x.total} · ${x.scen}/${x.scenTotal}` : '-'; };
  table.push(`${s} | ${cell('before')} | ${cell('after')}`);
}
fs.writeFileSync(`${dir}/score.md`, table.join('\n') + '\n\n' + lines.join('\n') + '\n');
console.log(table.join('\n'));
