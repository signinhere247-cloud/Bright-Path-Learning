import test from 'node:test';
import assert from 'node:assert/strict';
import {years56Subjects,years56Bank,years56Lesson} from '../src/years56.js';
test('Years 5–6 offers 17 lessons and 194 valid questions',()=>{
 assert.equal(years56Subjects.length,2);
 assert.equal(Object.values(years56Bank).reduce((n,v)=>n+v.length,0),17);
 let total=0;
 for(const subject of years56Subjects)for(const [topic] of years56Bank[subject])for(const age of [9,10,11]){
  const {intro,questions}=years56Lesson(subject,topic,age);
  assert.ok(intro);assert.equal(questions.length,subject.includes('English')?10:12);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,questions.length,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===10)total+=questions.length;
 }
 assert.equal(total,194);
});
test('Years 5–6 rejects out-of-range ages and unknown lessons',()=>{
 assert.throws(()=>years56Lesson('Years 5–6 English','Reading and inference',8));
 assert.throws(()=>years56Lesson('Years 5–6 Maths','Unknown',10));
});
