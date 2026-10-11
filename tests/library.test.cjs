'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { matchesEntry, selectionBundle } = require('../tools/library.cjs');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../library.json'), 'utf8'));
const script = fs.readFileSync(path.join(__dirname, '../tools/library.cjs'), 'utf8');

test('No filters retain all 53 real source entries', () => {
  assert.equal(data.entries.filter(e => matchesEntry(e, {})).length, 53);
});
test('AND search handles case, whitespace and file paths', () => {
  const results = data.entries.filter(e => matchesEntry(e, {query:'  AGENTS.md   instructions  '}));
  assert.ok(results.some(e => e.title === 'Custom instructions with AGENTS.md'));
  for (const e of results) assert.ok(matchesEntry(e,{query:'agents.md'}));
  assert.equal(data.entries.filter(e=>matchesEntry(e,{query:'definitely-no-such-entry-80791'})).length,0);
});
test('Combined role, priority and execution surface filters constrain real data', () => {
  const filters={role:'researcher',priority:'P0',surface:'local'};
  const results=data.entries.filter(e=>matchesEntry(e,filters));
  assert.ok(results.length > 0 && results.length < 53);
  for (const e of results) { assert.ok(e.agent_types.includes('researcher')); assert.equal(e.priority,'P0'); assert.ok(e.surfaces.includes('local')); }
});
test('Shortlist filter returns only saved IDs that meet other filters', () => {
  const chosen=data.entries.filter(e=>e.priority==='P0').slice(0,2);
  const results=data.entries.filter(e=>matchesEntry(e,{shortlist:true,selected:chosen.map(e=>e.id),priority:'P0'}));
  assert.deepEqual(results,chosen);
  assert.equal(data.entries.filter(e=>matchesEntry(e,{shortlist:true,selected:[]})).length,0);
});
test('Export retains the complete selected records and excludes missing IDs', () => {
  const chosen=data.entries.slice(0,2);
  const output=selectionBundle(data.entries,[chosen[1].id,'missing-id',chosen[0].id]);
  assert.deepEqual(output.entries,chosen);
  assert.equal(output.schema_version,1);
  assert.ok(Number.isFinite(Date.parse(output.exported_at)));
});

function harness({blockedStorage=false,stored='[]'}={}) {
  const listeners={},controls={},downloads=[],details=[{open:false,dataset:{}},{open:true,dataset:{}}];
  function element(id, extra={}) { return {id,value:'',type:'',checked:false,disabled:false,textContent:'',dataset:{},...extra,
    addEventListener(event,fn){listeners[`${id}:${event}`]=fn;}}; }
  for (const id of ['query','surface','role','priority','category','shortlist','result-count','empty-results','selection-count','export-selection','reset-filters','print-library']) controls[id]=element(id);
  controls.shortlist.type='checkbox';
  const cards=data.entries.map(e=>({dataset:{entryId:e.id},hidden:false}));
  const boxes=data.entries.map(e=>element('save-'+e.id,{type:'checkbox',dataset:{selectId:e.id}}));
  const roleButton=element('role-button',{dataset:{roleFilter:'researcher'}});
  const document={getElementById:id=>id==='library-data'?{textContent:JSON.stringify(data)}:controls[id],
    querySelectorAll:query=>({'[data-entry-id]':cards,'[data-select-id]':boxes,'[data-role-filter]':[roleButton],details}[query] || []),
    createElement:()=>({click(){downloads.push(this);}})};
  const window={addEventListener:(event,fn)=>listeners['window:'+event]=fn,print:()=>{window.printed=true;}};
  const localStorage={getItem(){if(blockedStorage)throw Error('blocked');return stored;},setItem(k,v){if(blockedStorage)throw Error('blocked');stored=v;}};
  const urls=[];const URL={createObjectURL(blob){urls.push(blob);return 'blob:test';},revokeObjectURL(){}};
  const context={document,window,localStorage,URL,Blob,location:{hash:''},setTimeout:fn=>fn()};
  vm.runInNewContext(script,context);
  return {controls,cards,boxes,roleButton,listeners,downloads,urls,details,window,context};
}
test('DOM harness: search, empty state and reset actually change visible entries', () => {
  const h=harness();assert.equal(h.cards.filter(c=>!c.hidden).length,53);
  h.controls.query.value='no-matching-entry-3128';h.listeners['query:input']();
  assert.equal(h.cards.filter(c=>!c.hidden).length,0);assert.equal(h.controls['empty-results'].hidden,false);
  h.listeners['reset-filters:click']();assert.equal(h.cards.filter(c=>!c.hidden).length,53);
});
test('DOM harness: role button clears old filters and narrows to the requested role', () => {
  const h=harness();h.controls.query.value='no-such-source';h.controls.priority.value='P2';
  h.listeners['role-button:click']();
  assert.equal(h.controls.query.value,'');assert.equal(h.controls.priority.value,'');assert.equal(h.context.location.hash,'sources');
  assert.equal(h.cards.filter(c=>!c.hidden).length,data.entries.filter(e=>e.agent_types.includes('researcher')).length);
});
test('DOM harness: saving, selected-only view, export and deselection are connected', async () => {
  const h=harness();h.boxes[0].checked=true;h.listeners['save-'+data.entries[0].id+':change']();
  assert.equal(h.controls['selection-count'].textContent,'1 saved');assert.equal(h.controls['export-selection'].disabled,false);
  h.controls.shortlist.checked=true;h.listeners['shortlist:input']();assert.equal(h.cards.filter(c=>!c.hidden).length,1);
  h.listeners['export-selection:click']();assert.equal(h.downloads[0].download,'agent-research-shortlist.json');
  assert.equal(JSON.parse(await h.urls[0].text()).entries[0].id,data.entries[0].id);
  h.boxes[0].checked=false;h.listeners['save-'+data.entries[0].id+':change']();
  assert.equal(h.controls['export-selection'].disabled,true);assert.equal(h.cards.filter(c=>!c.hidden).length,0);
});
test('DOM harness: unavailable storage still permits filtering and saving in-session', () => {
  const h=harness({blockedStorage:true});h.boxes[0].checked=true;h.listeners['save-'+data.entries[0].id+':change']();
  assert.equal(h.controls['selection-count'].textContent,'1 saved');
});
test('DOM harness: malformed stored selections do not prevent initialization', () => {
  for(const stored of ['invalid-json','{"bad":"shape"}','["missing-id"]']) {
    const h=harness({stored});assert.equal(h.cards.filter(c=>!c.hidden).length,53);assert.equal(h.controls['selection-count'].textContent,'0 saved');
  }
});
test('DOM harness: print expands notes and restores their original state', () => {
  const h=harness();h.listeners['print-library:click']();assert.equal(h.window.printed,true);
  h.listeners['window:beforeprint']();assert.ok(h.details.every(d=>d.open));
  h.listeners['window:afterprint']();assert.deepEqual(h.details.map(d=>d.open),[false,true]);
});
