import test from 'node:test';import assert from 'node:assert/strict';
import {ks1FractionsActivities,ks1FractionsActivity} from '../src/ks1FractionsActivities.js';
test('KS1 fractions activities cover equal parts and quantities across two years',()=>{
 assert.equal(ks1FractionsActivities.length,4);
 assert.deepEqual(ks1FractionsActivities.map(x=>x.year),[1,1,2,2]);
 assert.equal(new Set(ks1FractionsActivities.map(x=>x.id)).size,4);
 for(const x of ks1FractionsActivities){
  assert.equal(x.steps.length,4);assert.ok(x.example.length>10);
  assert.ok(x.adultPrompt.endsWith('?'));
  const copy=ks1FractionsActivity(x.id,x.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,x.steps);
 }
 assert.throws(()=>ks1FractionsActivity('KS1-FRAC-01',2),/Unknown fractions/);
});
