import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const map=JSON.parse(readFileSync(new URL('../curriculum/lower-ks2-subject-year-map.json',import.meta.url),'utf8'));
test('Lower KS2 map covers Years 3 and 4 with 12 subjects and explicit source gaps',()=>{
 assert.deepEqual(map.years,['Year 3','Year 4']);
 assert.equal(map.subjects.length,12);
 assert.equal(new Set(map.subjects.map(s=>s.id)).size,12);
 assert.ok(map.subjects.some(s=>s.name==='Foreign languages'));
 assert.ok(map.subjects.some(s=>s.name.startsWith('Religious education')));
 assert.ok(map.sourceModules.includes('src/ks2Science.js'));
 assert.ok(map.sourceModules.includes('src/ks2Foundation.js'));
 assert.ok(map.sourceGaps.length>0);
 for(const s of map.subjects){
  assert.equal(s.year3Status,'unverified');
  assert.equal(s.year4Status,'unverified');
  assert.equal(s.objectiveAuditRequired,true);
 }
});
