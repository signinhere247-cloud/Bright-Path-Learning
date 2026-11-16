import test from 'node:test';import assert from 'node:assert/strict';
import {ks1AdditionSubtractionActivities,ks1AdditionSubtractionActivity} from '../src/ks1AdditionSubtractionActivities.js';
test('KS1 calculation activities cover both years with models and reasoning',()=>{
 assert.equal(ks1AdditionSubtractionActivities.length,4);
 assert.deepEqual(ks1AdditionSubtractionActivities.map(x=>x.year),[1,1,2,2]);
 assert.equal(new Set(ks1AdditionSubtractionActivities.map(x=>x.id)).size,4);
 for(const x of ks1AdditionSubtractionActivities){
  assert.equal(x.steps.length,4);assert.ok(x.example.length>5);
  assert.ok(x.adultPrompt.includes('?'));
  const copy=ks1AdditionSubtractionActivity(x.id,x.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,x.steps);
 }
 assert.throws(()=>ks1AdditionSubtractionActivity('KS1-CALC-01',2),/Unknown addition/);
});
