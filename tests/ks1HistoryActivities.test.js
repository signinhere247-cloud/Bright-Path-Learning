import test from 'node:test';import assert from 'node:assert/strict';
import {ks1HistoryActivities,ks1HistoryActivity} from '../src/ks1HistoryActivities.js';
test('KS1 history guides include chronology, significant people and evidence with privacy safeguards',()=>{
 assert.equal(ks1HistoryActivities.length,4);
 assert.deepEqual(ks1HistoryActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1HistoryActivities.map(a=>a.id)).size,4);
 for(const a of ks1HistoryActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1HistoryActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1HistoryActivity('KS1-HIST-01',2),/Unknown history/);
});
