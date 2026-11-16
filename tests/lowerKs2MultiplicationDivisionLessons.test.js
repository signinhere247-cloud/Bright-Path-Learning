import test from 'node:test';import assert from 'node:assert/strict';
import {lowerKs2MultiplicationDivisionLessons,getLowerKs2MultiplicationDivisionLesson} from '../src/lowerKs2MultiplicationDivisionLessons.js';
test('Lower KS2 multiplication and division has four lessons for each year',()=>{
 assert.equal(lowerKs2MultiplicationDivisionLessons.length,8);
 assert.equal(lowerKs2MultiplicationDivisionLessons.filter(x=>x.year===3).length,4);
 assert.equal(lowerKs2MultiplicationDivisionLessons.filter(x=>x.year===4).length,4);
 assert.equal(new Set(lowerKs2MultiplicationDivisionLessons.map(x=>x.id)).size,8);
 for(const lesson of lowerKs2MultiplicationDivisionLessons){
  assert.ok(lesson.title&&lesson.focus&&lesson.explanation);
  assert.equal(lesson.workedExamples.length,2);
  assert.equal(lesson.questions.length,5);
  for(const q of lesson.questions){
   assert.ok(q.prompt.length>8);
   assert.equal(q.options.length,3);
   assert.equal(new Set(q.options).size,3);
   assert.ok(q.options.includes(q.answer));
   assert.ok(q.explanation.length>10);
  }
 }
});
test('Year-specific retrieval returns independent copies and rejects mismatches',()=>{
 const y3=getLowerKs2MultiplicationDivisionLesson('LKS2-MD-Y3-01',3);
 const y4=getLowerKs2MultiplicationDivisionLesson('LKS2-MD-Y4-01',4);
 assert.match(y3.explanation,/3, 4 and 8/);
 assert.match(y4.explanation,/12 × 12/);
 y3.questions[0].options.push('tamper');
 assert.equal(lowerKs2MultiplicationDivisionLessons[0].questions[0].options.length,3);
 assert.throws(()=>getLowerKs2MultiplicationDivisionLesson('LKS2-MD-Y3-01',4),/not found/);
 assert.throws(()=>getLowerKs2MultiplicationDivisionLesson('unknown',3),/not found/);
 assert.throws(()=>getLowerKs2MultiplicationDivisionLesson('LKS2-MD-Y3-01',2),/Year must be/);
});
