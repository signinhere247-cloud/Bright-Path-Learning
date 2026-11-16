import test from 'node:test';import assert from 'node:assert/strict';
import {ks1MathsReasoningActivities,ks1MathsReasoningActivity} from '../src/ks1MathsReasoningActivities.js';
test('KS1 reasoning activities cover strategy, error checking and two-step problems',()=>{
 assert.equal(ks1MathsReasoningActivities.length,4);
 assert.deepEqual(ks1MathsReasoningActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1MathsReasoningActivities.map(a=>a.id)).size,4);
 for(const a of ks1MathsReasoningActivities){
  assert.equal(a.steps.length,4);assert.ok(a.problem.length>20);
  assert.ok(a.expected.length>0);assert.ok(a.adultPrompt.endsWith('?'));
  const copy=ks1MathsReasoningActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1MathsReasoningActivity('KS1-REASON-01',2),/Unknown maths reasoning/);
});
