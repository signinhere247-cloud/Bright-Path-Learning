import test from 'node:test';
import assert from 'node:assert/strict';
import {curriculumInventory,stageModules} from '../scripts/curriculum-inventory.mjs';
test('inventory identifies existing age-stage modules and does not invent curriculum verification',()=>{
 const result=curriculumInventory();
 assert.equal(Object.keys(stageModules).length,5);
 assert.equal(result.modules.length,18);
 assert.deepEqual(result.summary.missing,[]);
 assert.equal(result.summary.objectivesVerified,0);
 assert.ok(result.modules.every(x=>x.exists&&x.imported&&x.lessonConnected&&!x.objectiveMappingVerified));
});
test('baseline gap register tracks statutory mapping, GCSE and accessibility',()=>{
 const ids=curriculumInventory().gaps.map(g=>g.id);
 for(const id of ['MAP-001','MAP-002','CONTENT-001','QUALITY-001','ASSESS-001','ACCESS-001'])assert.ok(ids.includes(id));
});
