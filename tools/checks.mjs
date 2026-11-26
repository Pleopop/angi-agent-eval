// Data checks for the area and conversation scenarios (kind "area" and "conversation" in scenarios.json).
// They read the snapshot run-eval.mjs stores after every turn (latest draft, offered dishes, trip length) and the catalog,
// never the wording alone. Ported from the Round 4 scripts (runs/round-4/tools/analyze.mjs and score-convs.mjs).
// A version that keeps no offered list in its state (V1.1) is judged on the catalog dishes its reply names.

const norm = s => (s || '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
const plain = s => (s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();
const km = (a, b, lat, lng) => { const r = x => x * Math.PI / 180, dl = r(lat - a), dg = r(lng - b);
  return 2 * 6371 * Math.asin(Math.sqrt(Math.sin(dl / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(lat)) * Math.sin(dg / 2) ** 2)); };
const HO_GUOM = [21.0285, 105.8542], XA_DAN = [21.0125, 105.8355];
const INNER_KM = 9; // every inner ward of the catalog lies within 9 km of Hồ Gươm; outer ones (Hoài Đức, Sơn Tây…) are 12 km or more

export function makeChecks(catalog) {
  // catalog: [{ id, name, price, restaurant, lat, lng, ward, tags: [codes] }]
  const byId = new Map(catalog.map(d => [d.id, d]));
  const named = catalog.filter(d => norm(d.name).length >= 6).sort((a, b) => b.name.length - a.name.length);
  const mains = new Set(catalog.filter(d => d.tags.includes('local_sf_main')).map(d => d.id));
  const from = (p, id) => { const d = byId.get(id); return d?.lat != null ? km(p[0], p[1], d.lat, d.lng) : null; };

  // The dishes one turn offered: a new list in the state, else a changed offered list, else the catalog dishes the reply names in order.
  function offeredIn(turn) {
    const lists = turn.after?.lists, before = turn.before?.lists;
    if (Array.isArray(lists) && lists.length > (Array.isArray(before) ? before.length : 0)) return (lists.at(-1)?.dishes || []).map(x => x.dishId);
    const o = turn.after?.offered, ob = turn.before?.offered;
    if (Array.isArray(o) && JSON.stringify(o) !== JSON.stringify(ob)) return o.map(x => x.dishId);
    if (turn.after && 'offered' in turn.after && Array.isArray(o)) return []; // the version keeps lists and showed none this turn
    const text = norm(turn.reply); const hits = [];
    for (const d of named) { const i = text.indexOf(norm(d.name)); if (i >= 0 && !hits.some(h => h.id === d.id)) hits.push({ id: d.id, i }); }
    return hits.sort((a, b) => a.i - b.i).map(h => h.id);
  }
  const items = s => s?.draft?.items ?? [];
  const key = i => `${i.dayNumber}/${i.mealSlot}/${i.dishId}`;

  function area(row) {
    const t = row.turns, last = t.at(-1), reply = last?.reply || '', draft = items(last?.after);
    switch (row.scenario) {
      case 'noido-suggest': case 'noithanh-suggest': {
        const ids = offeredIn(last), far = ids.filter(id => from(HO_GUOM, id) > INNER_KM);
        return [{ tag: 'insideZone', pass: ids.length > 0 && far.length === 0, note: `dishes=${ids.length} outer=${far.length}` }]; }
      case 'noido-plan': {
        const ids = draft.map(x => x.dishId), far = ids.filter(id => from(HO_GUOM, id) > INNER_KM);
        return [{ tag: 'insideZone', pass: ids.length > 0 && far.length === 0, note: `draftItems=${ids.length} outer=${far.length}` }]; }
      case 'area-nodata': {
        // Sóc Sơn has no restaurant on ANGI: any dish offered for it comes from somewhere else.
        const second = t.length >= 2 ? offeredIn(t[1]) : [];
        return [{ tag: 'noDataNoDishes', pass: t.length >= 2 && second.length === 0, note: `secondDishes=${second.length}` }]; }
      case 'comrang-plan': {
        const wanted = offeredIn(t[0])[1], dinner = draft.filter(x => x.dayNumber === 1 && x.mealSlot === 'dinner').map(x => x.dishId);
        return [{ tag: 'pickedFromList', pass: !!wanted && dinner.includes(wanted), note: `wanted=${wanted ?? 'none'} dinnerDay1=${dinner.join('+') || 'none'}` }]; }
      case 'quan-nuoc': {
        const ids = offeredIn(last), drinks = ids.filter(id => byId.get(id)?.tags.includes('local_sf_drink'));
        return [{ tag: 'drinksOnly', pass: ids.length > 0 && drinks.length === ids.length, note: `dishes=${ids.length} drinks=${drinks.length}` }]; }
      case 'xadan-buffet': {
        const notLocated = /chưa (định vị|xác định|tìm (thấy|được)) (được )?(khu|địa điểm|vị trí|“?xã đàn)|không (xác định|định vị|tìm thấy) (được )?(khu|địa điểm|vị trí|“?xã đàn)/iu.test(reply);
        const ids = offeredIn(last);
        return [{ tag: 'located', pass: !notLocated && ids.length > 0, note: `located=${!notLocated} dishes=${ids.length} km=${ids.map(id => from(XA_DAN, id)?.toFixed(1)).join(',')}` }]; }
    }
    return [];
  }

  function conversation(row) {
    const t = row.turns, out = [], chains = [];
    for (const [i, turn] of t.entries()) {
      if (!turn.tag) continue;
      const lastChain = chains.at(-1);
      if (lastChain && lastChain.tag === turn.tag && t[i - 1] === lastChain.turns.at(-1)) lastChain.turns.push(turn); else chains.push({ tag: turn.tag, turns: [turn] });
    }
    for (const c of chains) {
      const first = c.turns[0], end = c.turns.at(-1), reply = end.reply || '';
      let pass = false, note = '';
      if (/^(replace|replaceName|remove):/.test(c.tag)) {
        const [kind, where, want] = c.tag.split(':'), [day, meal] = where.split('/');
        const at = i => String(i.dayNumber) === day && (!meal || i.mealSlot === meal);
        const before = items(first.before), after = items(end.after);
        const othersKept = JSON.stringify(before.filter(i => !at(i)).map(key).sort()) === JSON.stringify(after.filter(i => !at(i)).map(key).sort());
        const was = before.filter(at), now = after.filter(at);
        if (kind === 'remove') pass = othersKept && was.length > 0 && now.length === 0;
        else pass = othersKept && was.length > 0 && now.length === was.length && now.some(i => !was.some(w => w.dishId === i.dishId)) &&
          (kind === 'replace' || now.some(i => plain(i.dishName).includes(want)));
        out.push({ tag: c.tag, pass, note: `othersKept=${othersKept} was=${was.map(i => i.dishName).join('|')} now=${now.map(i => i.dishName).join('|')}` });
        continue;
      }
      switch (c.tag) {
        case 'fullPlan': { const n = items(end.after).length, days = end.after?.numDays ?? 0; pass = days >= 3 && n >= days * 3; note = `items=${n} days=${days}`; break; }
        case 'list': { const n = (reply.match(/^- /gm) || []).length; pass = n >= 2; note = `lines=${n}`; break; }
        case 'adds': case 'addsB': case 'addsTwo': {
          const base = items(first.before).map(key), result = items(end.after).map(key);
          const kept = base.every(k => { const i = result.indexOf(k); if (i < 0) return false; result.splice(i, 1); return true; });
          const want = c.tag === 'addsTwo' ? 2 : 1;
          const placed = c.tag !== 'addsTwo' || result.every(k => k.startsWith('3/lunch/'));
          pass = kept && placed && items(end.after).length === items(first.before).length + want;
          note = `before=${items(first.before).length} after=${items(end.after).length} keptAll=${kept} new=${result.join(',')}`; break; }
        case 'askMeal': pass = !c.turns.some(x => x.newDraft) && /bữa/iu.test(reply) && /\?/.test(reply); note = reply.slice(0, 110); break;
        case 'mainKept': {
          const d = items(end.after), meals = [...new Set(d.map(i => i.dayNumber + '/' + i.mealSlot))];
          const noMain = meals.filter(m => !d.some(i => i.dayNumber + '/' + i.mealSlot === m && mains.has(i.dishId)));
          const total = d.reduce((a, i) => a + (Number(i.price) || 0), 0), made = c.turns.some(x => x.newDraft);
          pass = made && noMain.length === 0 && total <= 1000000 && meals.length >= 9; note = `newDraft=${made} meals=${meals.length} noMain=${noMain.length} total=${total}`; break; }
      }
      out.push({ tag: c.tag, pass, note });
    }
    return out;
  }

  return row => row.kind === 'area' ? area(row) : row.kind === 'conversation' ? conversation(row) : [];
}
