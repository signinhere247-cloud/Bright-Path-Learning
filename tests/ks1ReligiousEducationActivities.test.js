import test from 'node:test';import assert from 'node:assert/strict';
import {ks1ReligiousEducationActivities,ks1ReligiousEducationActivity} from '../src/ks1ReligiousEducationActivities.js';
test('KS1 RE activities explore varied beliefs and worldviews without personal disclosure',()=>{
 assert.equal(ks1ReligiousEducationActivities.length,4);
 assert.deepEqual(ks1ReligiousEducationActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1ReligiousEducationActivities.map(a=>a.id)).size,4);
 for(const a of ks1ReligiousEducationActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1ReligiousEducationActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1ReligiousEducationActivity('KS1-RE-01',2),/Unknown religious education/);
});
