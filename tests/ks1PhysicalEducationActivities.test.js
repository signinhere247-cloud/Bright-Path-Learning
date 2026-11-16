import test from 'node:test';import assert from 'node:assert/strict';
import {ks1PhysicalEducationActivities,ks1PhysicalEducationActivity} from '../src/ks1PhysicalEducationActivities.js';
test('KS1 PE guides cover balance, coordination, movement and teamwork safely',()=>{
 assert.equal(ks1PhysicalEducationActivities.length,4);
 assert.deepEqual(ks1PhysicalEducationActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1PhysicalEducationActivities.map(a=>a.id)).size,4);
 for(const a of ks1PhysicalEducationActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1PhysicalEducationActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1PhysicalEducationActivity('KS1-PE-01',2),/Unknown physical education/);
});
