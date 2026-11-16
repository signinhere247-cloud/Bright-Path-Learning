import test from 'node:test';import assert from 'node:assert/strict';
import {ks1MusicActivities,ks1MusicActivity} from '../src/ks1MusicActivities.js';
test('KS1 music guides cover rhythm, pitch, composition and listening accessibly',()=>{
 assert.equal(ks1MusicActivities.length,4);
 assert.deepEqual(ks1MusicActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1MusicActivities.map(a=>a.id)).size,4);
 for(const a of ks1MusicActivities){
  assert.equal(a.steps.length,4);assert.ok(a.materials.length>=2);
  assert.ok(a.adultPrompt.endsWith('?'));assert.ok(a.safety.length>20);
  const copy=ks1MusicActivity(a.id,a.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.steps,a.steps);
 }
 assert.throws(()=>ks1MusicActivity('KS1-MUS-01',2),/Unknown music/);
});
