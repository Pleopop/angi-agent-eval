// Writes the Version Rating workbook (.xlsx) without Excel: 20 scenarios in order, the three versions side by side, yellow cells to rate.
import fs from 'node:fs'; import zlib from 'node:zlib';
const dir = 'E:/ANGI-Agent-Eval/runs/round-1', rows = JSON.parse(fs.readFileSync(`${dir}/version-rating.json`, 'utf8'));
const out = `${dir}/version-rating.xlsx`;
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
const col = n => { let s = ''; for (n++; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + (n - 1) % 26) + s; return s; };
// styles: 0 normal, 1 title, 2 note wrap, 3 header, 4 body wrap, 5 body center, 6 input yellow, 7 pass green, 8 fail red, 9 summary bold, 10 summary 0.00, 11 summary %
const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="0.00"/></numFmts>
<fonts count="5"><font><sz val="10"/><name val="Arial"/></font><font><b/><sz val="14"/><name val="Arial"/></font><font><b/><sz val="10"/><name val="Arial"/></font><font><b/><sz val="10"/><color rgb="FF008000"/><name val="Arial"/></font><font><b/><sz val="10"/><color rgb="FFC00000"/><name val="Arial"/></font></fonts>
<fills count="5"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFFF99"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF2F2F2"/></patternFill></fill></fills>
<borders count="2"><border/><border><left style="thin"/><right style="thin"/><top style="thin"/><bottom style="thin"/></border></borders>
<cellStyleXfs count="1"><xf/></cellStyleXfs>
<cellXfs count="12">
<xf fontId="0"/>
<xf fontId="1" applyFont="1"/>
<xf fontId="0" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
<xf fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" horizontal="center" vertical="center"/></xf>
<xf fontId="0" borderId="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
<xf fontId="0" borderId="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
<xf fontId="0" fillId="3" borderId="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
<xf fontId="3" borderId="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
<xf fontId="4" borderId="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
<xf fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top" wrapText="1"/></xf>
<xf fontId="2" fillId="4" borderId="1" numFmtId="164" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center"/></xf>
<xf fontId="2" fillId="4" borderId="1" numFmtId="9" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center"/></xf>
</cellXfs></styleSheet>`;
const cell = (r, c, v, s = 0) => v === null || v === undefined || v === '' ? `<c r="${col(c)}${r}" s="${s}"/>`
  : typeof v === 'number' ? `<c r="${col(c)}${r}" s="${s}"><v>${v}</v></c>`
  : typeof v === 'object' ? `<c r="${col(c)}${r}" s="${s}"${v.str ? ' t="str"' : ''}><f>${esc(v.f)}</f></c>`
  : `<c r="${col(c)}${r}" s="${s}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`;
function sheet({ cols, data, merges = [], freeze, validations = '', heights = {} }) {
  const rowsXml = data.map(([r, cells]) => `<row r="${r}"${heights[r] ? ` ht="${heights[r]}" customHeight="1"` : ''}>${cells.join('')}</row>`).join('');
  const pane = freeze ? `<sheetViews><sheetView workbookViewId="0"><pane xSplit="${freeze[1]}" ySplit="${freeze[0]}" topLeftCell="${col(freeze[1])}${freeze[0] + 1}" activePane="bottomRight" state="frozen"/></sheetView></sheetViews>` : '<sheetViews><sheetView workbookViewId="0"/></sheetViews>';
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${pane}<cols>${cols.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>${rowsXml}</sheetData>${merges.length ? `<mergeCells count="${merges.length}">${merges.map(m => `<mergeCell ref="${m}"/>`).join('')}</mergeCells>` : ''}${validations}<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/><pageSetup orientation="landscape" fitToHeight="0"/></worksheet>`;
}
// Sheet 1
const head = ['No', 'Scenario', 'Category', 'User message', 'V1.1 reply', 'V2.0 reply', 'V3.0 reply', 'Auto check V1.1', 'Auto check V2.0', 'Auto check V3.0', 'Naturalness V1.1 (1-5)', 'Naturalness V2.0 (1-5)', 'Naturalness V3.0 (1-5)', 'Correct V1.1 (0/1)', 'Correct V2.0 (0/1)', 'Correct V3.0 (0/1)', 'Auto check notes', 'Rater notes'];
const L = head.length - 1, first = 6, last = first + rows.length - 1;
const data = [
  [1, [cell(1, 0, 'AI Assistant Version Rating - Evaluation Round 1 (23/11/2026, production data)', 1)]],
  [2, [cell(2, 0, 'Same 20 scenarios, same production database snapshot (23/11/2026) and same model (gpt-6-luna) for V1.1 (commit 9106735), V2.0 (0706765) and V3.0 (3214648). Each reply is the last reply the user received in that scenario.', 2)]],
  [3, [cell(3, 0, 'How to rate: fill only the yellow cells. Naturalness: 1 = mechanical, form-like ... 5 = sounds like a helpful person (see sheet Rubric). Correct: 1 = does what the user asked, 0 = does not or states something untrue. Auto check = result of the automatic scoring.', 2)]],
  [5, head.map((h, c) => cell(5, c, h, 3))]
];
rows.forEach((o, i) => {
  const r = first + i, auto = v => o[`${v}_auto`];
  const notes = ['v11', 'v20', 'v30'].map((v, k) => o[`${v}_note`] ? `${['V1.1', 'V2.0', 'V3.0'][k]}: ${o[`${v}_note`]}` : '').filter(Boolean).join('\n');
  data.push([r, [cell(r, 0, o.no, 5), cell(r, 1, o.id, 4), cell(r, 2, o.category, 4), cell(r, 3, o.message, 4), cell(r, 4, o.v11, 4), cell(r, 5, o.v20, 4), cell(r, 6, o.v30, 4),
    ...['v11', 'v20', 'v30'].map((v, k) => cell(r, 7 + k, auto(v), auto(v) === 'Pass' ? 7 : 8)),
    ...[10, 11, 12, 13, 14, 15].map(c => cell(r, c, '', 6)), cell(r, 16, notes, 4), cell(r, 17, '', 4)]]);
});
const t = last + 1, rng = c => `${col(c)}${first}:${col(c)}${last}`;
data.push([t, [cell(t, 0, '', 9), cell(t, 1, '', 9), cell(t, 2, '', 9), cell(t, 3, 'Summary', 9), cell(t, 4, '', 9), cell(t, 5, '', 9), cell(t, 6, '', 9),
  ...[7, 8, 9].map(c => cell(t, c, { f: `COUNTIF(${rng(c)},"Pass")&"/"&COUNTA(${rng(c)})`, str: true }, 9)),
  ...[10, 11, 12].map(c => cell(t, c, { f: `IF(COUNT(${rng(c)})=0,"-",AVERAGE(${rng(c)}))` }, 10)),
  ...[13, 14, 15].map(c => cell(t, c, { f: `IF(COUNT(${rng(c)})=0,"-",AVERAGE(${rng(c)}))` }, 11)), cell(t, 16, '', 9), cell(t, 17, '', 9)]]);
data.push([t + 1, [cell(t + 1, 3, 'Summary row: Auto check = scenarios passed; Naturalness = average score; Correct = share of replies rated 1. Cells show - until ratings are entered.', 2)]]);
const dv = `<dataValidations count="2"><dataValidation type="whole" allowBlank="1" showErrorMessage="1" error="Enter a whole number from 1 to 5." sqref="K${first}:M${last}"><formula1>1</formula1><formula2>5</formula2></dataValidation><dataValidation type="whole" allowBlank="1" showErrorMessage="1" error="Enter 1 (correct) or 0 (not correct)." sqref="N${first}:P${last}"><formula1>0</formula1><formula2>1</formula2></dataValidation></dataValidations>`;
const s1 = sheet({ cols: [5, 17, 14, 42, 48, 48, 48, 11, 11, 11, 12, 12, 12, 11, 11, 11, 34, 28], data, merges: [`A1:${col(L)}1`, `A2:${col(L)}2`, `A3:${col(L)}3`, `D${t + 1}:${col(L)}${t + 1}`], freeze: [5, 3], validations: dv, heights: { 2: 28, 3: 28, 5: 42 } });
// Sheet 2: rubric
const rub = [['Score', 'Naturalness', 'Illustrative example from Round 1'],
  ['1', 'Mechanical, form-like or template wording; ignores what the user just said.', '“Bạn cho mình biết số ngày, ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?” as the reply to a dish request'],
  ['2', 'Understandable but stiff; repeats fixed phrases.', '“Việc này nằm ngoài khả năng của mình rồi. Mình chỉ giúp được về món ăn, quán và lịch ăn uống thôi.”'],
  ['3', 'Polite and clear, but generic.', '“Mình chỉ hỗ trợ món ăn, địa điểm ăn uống và lịch trình ẩm thực thôi.”'],
  ['4', 'Natural and tied to the message, with a small awkward part.', '“Mình hiểu “cay vừa” là mức cay trung bình nhé. Bạn thử …”'],
  ['5', 'Sounds like a helpful person: answers this message, warm and concise.', '“Cúc cu, mình nghe nè, bạn muốn ăn gì hôm nay?”'],
  ['Correct', '1 = the reply does what the user asked (suggests, plans, edits, saves or refuses correctly). 0 = it does not, or states something untrue.', ''],
  ['Example', 'Naturalness V3.0 = 4, Correct V3.0 = 1, Rater notes = asks the start date before planning', '']];
const d2 = [[1, [cell(1, 0, 'Rating rubric', 1)]], ...rub.map((r, i) => [i + 3, r.map((v, c) => cell(i + 3, c, v, i === 0 ? 3 : 4))])];
const s2 = sheet({ cols: [12, 70, 70], data: d2 });
const files = {
  '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
  '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Version Rating" sheetId="1" r:id="rId1"/><sheet name="Rubric" sheetId="2" r:id="rId2"/></sheets><definedNames><definedName name="_xlnm.Print_Titles" localSheetId="0">'Version Rating'!$5:$5</definedName></definedNames><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>`,
  'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
  'xl/styles.xml': styles, 'xl/worksheets/sheet1.xml': s1, 'xl/worksheets/sheet2.xml': s2
};
// minimal zip writer (deflate)
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = b => { let c = 0xFFFFFFFF; for (const x of b) c = crcTable[(c ^ x) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
const parts = [], central = []; let offset = 0;
for (const [name, text] of Object.entries(files)) {
  const raw = Buffer.from(text, 'utf8'), comp = zlib.deflateRawSync(raw), nm = Buffer.from(name, 'utf8'), crc = crc32(raw);
  const h = Buffer.alloc(30); h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt16LE(0x0800, 6); h.writeUInt16LE(8, 8); h.writeUInt32LE(crc, 14); h.writeUInt32LE(comp.length, 18); h.writeUInt32LE(raw.length, 22); h.writeUInt16LE(nm.length, 26);
  parts.push(h, nm, comp);
  const c = Buffer.alloc(46); c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(8, 10); c.writeUInt32LE(crc, 16); c.writeUInt32LE(comp.length, 20); c.writeUInt32LE(raw.length, 24); c.writeUInt16LE(nm.length, 28); c.writeUInt32LE(offset, 42);
  central.push(c, nm); offset += 30 + nm.length + comp.length;
}
const cd = Buffer.concat(central), end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(Object.keys(files).length, 8); end.writeUInt16LE(Object.keys(files).length, 10); end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
fs.writeFileSync(out, Buffer.concat([...parts, cd, end]));
console.log('saved', out, 'rows', rows.length);
