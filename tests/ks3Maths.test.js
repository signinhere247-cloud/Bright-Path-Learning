import test from 'node:test';
import assert from 'node:assert/strict';
import {ks3MathsSubjects,ks3MathsBank,ks3MathsLesson} from '../src/ks3Maths.js';
test('KS3 maths includes eight topics and 80 valid questions',()=>{
 assert.deepEqual(ks3MathsSubjects,['KS3 Maths']);
 assert.equal(ks3MathsBank['KS3 Maths'].length,8);
 let total=0;
 for(const [topic] of ks3MathsBank['KS3 Maths'])for(const age of [11,12,13,14]){
  const {intro,questions}=ks3MathsLesson('KS3 Maths',topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===12)total+=questions.length;
 }
 assert.equal(total,80);
});
test('KS3 maths rejects invalid ages and topics',()=>{
 assert.throws(()=>ks3MathsLesson('KS3 Maths','Number and place value',10));
 assert.throws(()=>ks3MathsLesson('KS3 Maths','Missing',12));
});
