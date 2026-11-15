import test from 'node:test';
import assert from 'node:assert/strict';
import {gcseMathsSubjects,gcseMathsBank,gcseMathsLesson} from '../src/gcseMaths.js';
test('GCSE Maths includes eight topics and 80 valid questions',()=>{
 assert.deepEqual(gcseMathsSubjects,['GCSE Maths']);
 assert.equal(gcseMathsBank['GCSE Maths'].length,8);
 let total=0;
 for(const [topic] of gcseMathsBank['GCSE Maths'])for(const age of [14,15,16]){
  const {intro,questions}=gcseMathsLesson('GCSE Maths',topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===15)total+=questions.length;
 }
 assert.equal(total,80);
});
test('GCSE Maths rejects invalid ages and topics',()=>{
 assert.throws(()=>gcseMathsLesson('GCSE Maths','Number and numerical methods',13));
 assert.throws(()=>gcseMathsLesson('GCSE Maths','Missing',15));
});
