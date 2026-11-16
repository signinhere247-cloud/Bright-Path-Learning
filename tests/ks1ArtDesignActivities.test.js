import test from 'node:test';import assert from 'node:assert/strict';
import {ks1ArtDesignActivities,ks1ArtDesignActivity} from '../src/ks1ArtDesignActivities.js';
test('KS1 art guides span both years with practical techniques and safety notes',()=>{
 assert.equal(ks1ArtDesignActivities.length,4);
 assert.deepEqual(ks1ArtDesignActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1ArtDesignActivities.map(a=>a.id)).size,4);
 for(const a of ks1ArtDesignActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1ArtDesignActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1ArtDesignActivity('KS1-ART-01',2),/Unknown art and design/);
});
