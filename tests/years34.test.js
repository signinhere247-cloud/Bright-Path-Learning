import test from 'node:test';
import assert from 'node:assert/strict';
import {years34Subjects,years34Bank,years34Lesson} from '../src/years34.js';
test('Years 3–4 offers 15 lessons and 170 distinct valid questions',()=>{
 assert.equal(years34Subjects.length,2);
 assert.equal(Object.values(years34Bank).reduce((n,v)=>n+v.length,0),15);
 let total=0;
 for(const subject of years34Subjects)for(const [topic] of years34Bank[subject])for(const age of [7,8,9]){
  const {intro,questions}=years34Lesson(subject,topic,age);
  assert.ok(intro);assert.equal(questions.length,subject.includes('English')?10:12);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,questions.length,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===8)total+=questions.length;
 }
 assert.equal(total,170);
});
test('Years 3–4 lessons reject unknown topics and out-of-range ages',()=>{
 assert.throws(()=>years34Lesson('Years 3–4 English','Reading comprehension',6));
 assert.throws(()=>years34Lesson('Years 3–4 Maths','Unknown',8));
});
