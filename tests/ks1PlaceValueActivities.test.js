import test from 'node:test';import assert from 'node:assert/strict';
import {ks1PlaceValueActivities,ks1PlaceValueActivity} from '../src/ks1PlaceValueActivities.js';
test('KS1 place value offers four Year 1/2 practical number activities',()=>{
 assert.equal(ks1PlaceValueActivities.length,4);
 assert.deepEqual(ks1PlaceValueActivities.map(x=>x.year),[1,1,2,2]);
 assert.equal(new Set(ks1PlaceValueActivities.map(x=>x.id)).size,4);
 for(const x of ks1PlaceValueActivities){
  assert.equal(x.steps.length,4);assert.ok(x.materials.length>=2);
  assert.ok(x.adultPrompt.length>20);
  const copy=ks1PlaceValueActivity(x.id,x.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.materials,x.materials);
 }
 assert.throws(()=>ks1PlaceValueActivity('KS1-NUM-01',2),/Unknown place value/);
});
