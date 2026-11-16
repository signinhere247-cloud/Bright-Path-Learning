import test from 'node:test';import assert from 'node:assert/strict';
import {ks1DesignTechnologyActivities,ks1DesignTechnologyActivity} from '../src/ks1DesignTechnologyActivities.js';
test('KS1 design technology activities cover designing, building, mechanisms and food',()=>{
 assert.equal(ks1DesignTechnologyActivities.length,4);
 assert.deepEqual(ks1DesignTechnologyActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1DesignTechnologyActivities.map(a=>a.id)).size,4);
 for(const a of ks1DesignTechnologyActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1DesignTechnologyActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1DesignTechnologyActivity('KS1-DT-01',2),/Unknown design and technology/);
});
