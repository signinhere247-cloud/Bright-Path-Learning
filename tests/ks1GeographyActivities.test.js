import test from 'node:test';import assert from 'node:assert/strict';
import {ks1GeographyActivities,ks1GeographyActivity} from '../src/ks1GeographyActivities.js';
test('KS1 geography includes maps, features, compass directions and comparison',()=>{
 assert.equal(ks1GeographyActivities.length,4);
 assert.deepEqual(ks1GeographyActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1GeographyActivities.map(a=>a.id)).size,4);
 for(const a of ks1GeographyActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1GeographyActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1GeographyActivity('KS1-GEOG-01',2),/Unknown geography/);
});
