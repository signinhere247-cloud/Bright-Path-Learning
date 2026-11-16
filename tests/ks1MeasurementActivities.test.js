import test from 'node:test';import assert from 'node:assert/strict';
import {ks1MeasurementActivities,ks1MeasurementActivity} from '../src/ks1MeasurementActivities.js';
test('KS1 measurement activities include practical Year 1/2 tasks and safety guidance',()=>{
 assert.equal(ks1MeasurementActivities.length,4);
 assert.deepEqual(ks1MeasurementActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1MeasurementActivities.map(a=>a.id)).size,4);
 for(const a of ks1MeasurementActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));
  const copy=ks1MeasurementActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.materials,a.materials);
  assert.match(copy.safety,/Supervise/);
 }
 assert.throws(()=>ks1MeasurementActivity('KS1-MEAS-01',2),/Unknown measurement/);
});
