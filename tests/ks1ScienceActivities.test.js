import test from 'node:test';import assert from 'node:assert/strict';
import {ks1ScienceActivities,ks1ScienceActivity} from '../src/ks1ScienceActivities.js';
test('KS1 science investigations span both years and include safety guidance',()=>{
 assert.equal(ks1ScienceActivities.length,4);
 assert.deepEqual(ks1ScienceActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1ScienceActivities.map(a=>a.id)).size,4);
 for(const a of ks1ScienceActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1ScienceActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1ScienceActivity('KS1-SCI-01',2),/Unknown science/);
});
