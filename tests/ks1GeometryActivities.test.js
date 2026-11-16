import test from 'node:test';import assert from 'node:assert/strict';
import {ks1GeometryActivities,ks1GeometryActivity} from '../src/ks1GeometryActivities.js';
test('KS1 geometry activities span shapes and movement in Years 1 and 2',()=>{
 assert.equal(ks1GeometryActivities.length,4);
 assert.deepEqual(ks1GeometryActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1GeometryActivities.map(a=>a.id)).size,4);
 for(const a of ks1GeometryActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));
  const copy=ks1GeometryActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1GeometryActivity('KS1-GEO-01',2),/Unknown geometry/);
});
