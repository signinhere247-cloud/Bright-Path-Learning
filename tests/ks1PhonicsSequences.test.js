import test from 'node:test';import assert from 'node:assert/strict';
import {ks1PhonicsSequences,ks1PhonicsSequence} from '../src/ks1PhonicsSequences.js';
test('KS1 phonics has four safe, year-specific adult-supported practice sequences',()=>{
 assert.equal(ks1PhonicsSequences.length,4);
 assert.deepEqual(ks1PhonicsSequences.map(x=>x.year),[1,1,2,2]);
 assert.equal(new Set(ks1PhonicsSequences.map(x=>x.id)).size,4);
 for(const x of ks1PhonicsSequences){
  assert.equal(x.words.length,4);assert.equal(x.steps.length,4);
  assert.ok(x.adultPrompt.length>15);
  const copy=ks1PhonicsSequence(x.id,x.year);
  assert.equal(copy.masteryVerified,false);assert.equal(copy.reviewRequired,true);
  assert.notEqual(copy.words,x.words);
 }
 assert.throws(()=>ks1PhonicsSequence('KS1-PHON-01',2),/Unknown phonics/);
});
