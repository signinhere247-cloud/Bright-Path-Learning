import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import map from '../curriculum/ks1-subject-year-map.json' with {type:'json'};
test('KS1 subject map covers both years and does not claim verified objectives',()=>{
 assert.deepEqual(map.years,['Year 1','Year 2']);
 assert.equal(map.subjects.length,11);
 assert.equal(new Set(map.subjects.map(x=>x.id)).size,11);
 assert.ok(map.subjects.every(x=>x.year1Status==='unverified'&&x.year2Status==='unverified'&&x.objectiveAuditRequired));
 for(const path of map.sourceModules)assert.ok(readFileSync(new URL('../'+path,import.meta.url),'utf8').length>100);
});
