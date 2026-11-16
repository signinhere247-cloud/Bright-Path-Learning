import test from 'node:test';import assert from 'node:assert/strict';
import {ks1WritingActivities,ks1WritingActivity} from '../src/ks1WritingActivities.js';
test('KS1 writing has four year-specific original composition tasks',()=>{
 assert.equal(ks1WritingActivities.length,4);
 assert.deepEqual(ks1WritingActivities.map(x=>x.year),[1,1,2,2]);
 assert.equal(new Set(ks1WritingActivities.map(x=>x.id)).size,4);
 for(const x of ks1WritingActivities){
  assert.equal(x.steps.length,4);
  assert.equal(x.checklist.length,3);
  assert.ok(x.prompt.length>20);
  const result=ks1WritingActivity(x.id,x.year);
  assert.equal(result.assessed,false);
  assert.equal(result.reviewRequired,true);
  assert.notEqual(result.steps,x.steps);
 }
 assert.throws(()=>ks1WritingActivity('KS1-WRITE-01',2),/Unknown writing activity/);
});
