import test from 'node:test';import assert from 'node:assert/strict';
import {lowerKs2AdditionSubtractionLessons,getLowerKs2AdditionSubtractionLesson} from '../src/lowerKs2AdditionSubtractionLessons.js';
test('Lower KS2 addition and subtraction has four differentiated lessons per year',()=>{
 assert.equal(lowerKs2AdditionSubtractionLessons.length,8);
 assert.equal(lowerKs2AdditionSubtractionLessons.filter(x=>x.year===3).length,4);
 assert.equal(lowerKs2AdditionSubtractionLessons.filter(x=>x.year===4).length,4);
 assert.equal(new Set(lowerKs2AdditionSubtractionLessons.map(x=>x.id)).size,8);
 for(const lesson of lowerKs2AdditionSubtractionLessons){
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
test('Lesson retrieval enforces year and returns independent copies',()=>{
 const y3=getLowerKs2AdditionSubtractionLesson('LKS2-AS-Y3-01',3);
 const y4=getLowerKs2AdditionSubtractionLesson('LKS2-AS-Y4-01',4);
 assert.match(y3.explanation,/hundreds, tens and ones/);
 assert.match(y4.explanation,/thousands, hundreds, tens and ones/);
 y3.questions[0].options.push('tamper');
 assert.equal(lowerKs2AdditionSubtractionLessons[0].questions[0].options.length,3);
 assert.throws(()=>getLowerKs2AdditionSubtractionLesson('LKS2-AS-Y3-01',4),/not found/);
 assert.throws(()=>getLowerKs2AdditionSubtractionLesson('unknown',3),/not found/);
 assert.throws(()=>getLowerKs2AdditionSubtractionLesson('LKS2-AS-Y3-01',2),/Year must be/);
});
