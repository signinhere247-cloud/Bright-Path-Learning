import test from 'node:test';import assert from 'node:assert/strict';
import {ks1ComputingActivities,ks1ComputingActivity} from '../src/ks1ComputingActivities.js';
test('KS1 computing covers algorithms, debugging, creation and online safety',()=>{
 assert.equal(ks1ComputingActivities.length,4);
 assert.deepEqual(ks1ComputingActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1ComputingActivities.map(a=>a.id)).size,4);
 for(const a of ks1ComputingActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1ComputingActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1ComputingActivity('KS1-COMP-01',2),/Unknown computing/);
});
