import test from 'node:test';import assert from 'node:assert/strict';
import {ks1MultiplicationDivisionActivities,ks1MultiplicationDivisionActivity} from '../src/ks1MultiplicationDivisionActivities.js';
test('KS1 multiplication/division activities progress from groups to arrays',()=>{
 assert.equal(ks1MultiplicationDivisionActivities.length,4);
 assert.deepEqual(ks1MultiplicationDivisionActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1MultiplicationDivisionActivities.map(a=>a.id)).size,4);
 for(const a of ks1MultiplicationDivisionActivities){
  assert.equal(a.steps.length,4);assert.ok(a.example.length>5);
  assert.ok(a.adultPrompt.includes('?'));
  const copy=ks1MultiplicationDivisionActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1MultiplicationDivisionActivity('KS1-MULT-01',2),/Unknown multiplication/);
});
