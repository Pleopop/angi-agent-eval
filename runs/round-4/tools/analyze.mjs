// Scores each conversation from what the database holds (the dishes each suggestion showed, the drafts), not from reply wording.
// usage: node analyze.mjs <outDir>
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';
const dir = process.argv[2];
const rows = fs.readFileSync(`${dir}/results.jsonl`, 'utf8').trim().split('\n').map(JSON.parse);
const sql = q => execFileSync('docker', ['exec', 'angi-eval-pg', 'psql', '-U', 'postgres', '-d', 'angi_eval_zone', '-At', '-c', q], { encoding: 'utf8', maxBuffer: 64e6 }).trim();
const restaurants = new Map(JSON.parse(sql(`select json_agg(json_build_object('id',id,'name',name,'lat',latitude,'lng',longitude,'ward',ward)) from core.restaurants`)).map(r => [r.id, r]));
const dishes = new Map(JSON.parse(sql(`select json_agg(json_build_object('id',d.id,'name',d.name,'price',d.price,'restaurantId',d.restaurant_id,
  'tags',(select coalesce(json_agg(t.code),'[]') from core.dish_tags x join core.tags t on t.id=x.tag_id where x.dish_id=d.id))) from core.dishes d`)).map(d => [d.id, d]));
const km = (a, b, lat, lng) => { const r = x => x * Math.PI / 180, dl = r(lat - a), dg = r(lng - b);
  return 2 * 6371 * Math.asin(Math.sqrt(Math.sin(dl / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(lat)) * Math.sin(dg / 2) ** 2)); };
const HO_GUOM = [21.0285, 105.8542], CAU_GIAY = [21.0362, 105.7906], XA_DAN = [21.0125, 105.8355];
const INNER_KM = 9; // every inner ward of the catalog is within 9 km of Hồ Gươm; the outer ones (Hoài Đức, Thượng Cát, Sơn Tây…) are 12 km or more
const where = id => { const d = dishes.get(id); const r = restaurants.get(Number(d?.restaurantId)); return { d, r }; };
const from = (p, id) => { const { r } = where(id); return r ? km(p[0], p[1], r.lat, r.lng) : null; };

const out = [];
for (const row of rows) {
  const c = JSON.parse(sql(`select json_build_object('lists', state->'offeredLists', 'props', (select coalesce(json_agg(json_build_object('id',p.id,'items',p.payload->'items') order by p.id),'[]') from core.agent_proposals p where p.conversation_id=c.id)) from core.agent_conversations c where id=${row.conversationId}`));
  const lists = c.lists || [], props = c.props || [], last = props.at(-1)?.items || [];
  const listIds = l => (l?.dishes || []).map(x => x.dishId);
  const reply = row.turns.at(-1)?.reply || '';
  let pass = false, note = '';
  switch (row.scenario) {
    case 'noido-suggest': case 'noithanh-suggest': {
      const ids = listIds(lists.at(-1)); const far = ids.filter(id => from(HO_GUOM, id) > INNER_KM);
      pass = ids.length > 0 && far.length === 0;
      note = `dishes=${ids.length} outer=${far.length}${far.length ? ' (' + far.map(id => where(id).r?.ward).join(', ') + ')' : ''}`; break; }
    case 'noido-plan': {
      const ids = last.map(x => x.dishId); const far = ids.filter(id => from(HO_GUOM, id) > INNER_KM);
      pass = ids.length > 0 && far.length === 0;
      note = `draftItems=${ids.length} outer=${far.length}${far.length ? ' (' + [...new Set(far.map(id => where(id).r?.ward))].join(', ') + ')' : ''}`; break; }
    case 'area-nodata': {
      // Sóc Sơn has no restaurant on ANGI: a second list can only hold dishes from somewhere else.
      const second = lists.length >= 2 ? listIds(lists.at(-1)) : [];
      const nearCauGiay = second.filter(id => from(CAU_GIAY, id) <= 5).length;
      pass = second.length === 0;
      note = `lists=${lists.length} secondDishes=${second.length} nearCauGiay=${nearCauGiay}`; break; }
    case 'comrang-plan': {
      const wanted = lists[0]?.dishes?.[1];
      const dinner = last.filter(x => x.dayNumber === 1 && x.mealSlot === 'dinner').map(x => x.dishId);
      pass = !!wanted && dinner.includes(wanted.dishId);
      const got = dinner.map(id => `${where(id).d?.name} @ ${where(id).r?.name}`).join(' + ');
      note = `wanted=${wanted ? wanted.name + ' @ ' + wanted.restaurant : 'none'} | dinnerDay1=${got || 'none'}`; break; }
    case 'quan-nuoc': {
      const ids = listIds(lists.at(-1)); const drinks = ids.filter(id => where(id).d?.tags.includes('local_sf_drink'));
      pass = ids.length > 0 && drinks.length === ids.length;
      note = `dishes=${ids.length} drinks=${drinks.length}`; break; }
    case 'xadan-buffet': {
      const ids = listIds(lists.at(-1)); const kms = ids.map(id => from(XA_DAN, id));
      const notLocated = /chưa (định vị|xác định|tìm (thấy|được)) (được )?(khu|địa điểm|vị trí|“?xã đàn)|không (xác định|định vị|tìm thấy) (được )?(khu|địa điểm|vị trí|“?xã đàn)/iu.test(reply);
      pass = !notLocated;
      note = `located=${!notLocated} dishes=${ids.length} kmFromXaDan=${kms.map(k => k?.toFixed(1)).join(',')} names=${ids.map(id => where(id).d?.name + ' ' + where(id).d?.price).join('; ')}`; break; }
  }
  out.push({ ...row, pass, note });
}
const by = {};
for (const r of out) { const k = `${r.scenario}|${r.version}`; (by[k] ??= []).push(r); }
const lines = ['scenario | before | after', '--- | --- | ---'];
for (const s of [...new Set(out.map(r => r.scenario))]) {
  const cell = v => { const rs = by[`${s}|${v}`] || []; return `${rs.filter(r => r.pass).length}/${rs.length}`; };
  lines.push(`${s} | ${cell('before')} | ${cell('after')}`);
}
const detail = out.map(r => `[${r.version} r${r.repeat} ${r.scenario} conv ${r.conversationId}] ${r.pass ? 'PASS' : 'FAIL'} ${r.note}\n  > ${(r.turns.at(-1)?.reply || '').replace(/\s+/g, ' ').slice(0, 400)}`);
fs.writeFileSync(`${dir}/score.md`, lines.join('\n') + '\n\n' + detail.join('\n\n') + '\n');
fs.writeFileSync(`${dir}/scored.jsonl`, out.map(r => JSON.stringify(r)).join('\n') + '\n');
console.log(lines.join('\n'));
