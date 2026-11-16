import test from 'node:test';import assert from 'node:assert/strict';
import {ks1SpellingHandwritingActivities,ks1SpellingHandwritingActivity} from '../src/ks1SpellingHandwriting.js';
test('KS1 spelling and handwriting supports Year 1/2 with practical steps',()=>{
 assert.equal(ks1SpellingHandwritingActivities.length,4);
 assert.deepEqual(ks1SpellingHandwritingActivities.map(a=>a.year),[1,1,2,2]);
 assert.equal(new Set(ks1SpellingHandwritingActivities.map(a=>a.id)).size,4);
 for(const a of ks1SpellingHandwritingActivities){
  assert.equal(a.words.length,4);assert.equal(a.steps.length,4);
  assert.ok(a.physicalCheck.length>20);
  const copy=ks1SpellingHandwritingActivity(a.id,a.year);
  assert.equal(copy.physicalSkillVerified,false);
  assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.words,a.words);
 }
 assert.throws(()=>ks1SpellingHandwritingActivity('KS1-SPELL-01',2),/Unknown spelling/);
});
