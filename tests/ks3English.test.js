import test from 'node:test';
import assert from 'node:assert/strict';
import {ks3EnglishSubjects,ks3EnglishBank,ks3EnglishLesson} from '../src/ks3English.js';
test('KS3 English includes eight topics and 80 valid questions',()=>{
 assert.deepEqual(ks3EnglishSubjects,['KS3 English']);
 assert.equal(ks3EnglishBank['KS3 English'].length,8);
 let total=0;
 for(const [topic] of ks3EnglishBank['KS3 English'])for(const age of [11,12,13,14]){
  const {intro,questions}=ks3EnglishLesson('KS3 English',topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===12)total+=questions.length;
 }
 assert.equal(total,80);
});
test('KS3 English rejects invalid ages and topics',()=>{
 assert.throws(()=>ks3EnglishLesson('KS3 English','Literary analysis',10));
 assert.throws(()=>ks3EnglishLesson('KS3 English','Missing',12));
});
