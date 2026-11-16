import test from 'node:test';import assert from 'node:assert/strict';
import {ks1StatisticsActivities,ks1StatisticsActivity} from '../src/ks1StatisticsActivities.js';
test('KS1 statistics covers sorting and Year 2 data representations',()=>{
 assert.equal(ks1StatisticsActivities.length,4);
 assert.deepEqual(ks1StatisticsActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1StatisticsActivities.map(a=>a.id)).size,4);
 for(const a of ks1StatisticsActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));
  const copy=ks1StatisticsActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);assert.match(copy.privacy,/anonymous/);
 }
 assert.throws(()=>ks1StatisticsActivity('KS1-DATA-01',2),/Unknown statistics/);
});
