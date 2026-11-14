import test from 'node:test';
import assert from 'node:assert/strict';
import {ks3ScienceSubjects,ks3ScienceBank,ks3ScienceLesson} from '../src/ks3Science.js';
test('KS3 science has ten topics and 100 valid questions',()=>{
 assert.deepEqual(ks3ScienceSubjects,['KS3 Science']);
 assert.equal(ks3ScienceBank['KS3 Science'].length,10);
 let total=0;
 for(const [topic] of ks3ScienceBank['KS3 Science'])for(const age of [11,12,13,14]){
  const {intro,questions}=ks3ScienceLesson('KS3 Science',topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===12)total+=questions.length;
 }
 assert.equal(total,100);
});
test('KS3 science rejects invalid ages and topics',()=>{
 assert.throws(()=>ks3ScienceLesson('KS3 Science','Cells and organisation',10));
 assert.throws(()=>ks3ScienceLesson('KS3 Science','Missing',12));
});
