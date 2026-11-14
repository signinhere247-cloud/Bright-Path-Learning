import test from 'node:test';
import assert from 'node:assert/strict';
import {ks2ScienceSubjects,ks2ScienceBank,ks2ScienceLesson} from '../src/ks2Science.js';
test('KS2 science has eleven topics and 110 unique valid questions',()=>{
 assert.deepEqual(ks2ScienceSubjects,['KS2 Science']);
 assert.equal(ks2ScienceBank['KS2 Science'].length,11);
 let total=0;
 for(const [topic] of ks2ScienceBank['KS2 Science'])for(const age of [7,8,9,10,11]){
  const {intro,questions}=ks2ScienceLesson('KS2 Science',topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===9)total+=questions.length;
 }
 assert.equal(total,110);
});
test('KS2 science rejects unknown topics and out-of-range ages',()=>{
 assert.throws(()=>ks2ScienceLesson('KS2 Science','Plants and life cycles',6));
 assert.throws(()=>ks2ScienceLesson('KS2 Science','Missing',9));
});
