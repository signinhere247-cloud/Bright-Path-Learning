import test from 'node:test';import assert from 'node:assert/strict';
import {lowerKs2NumberPlaceValueLessons,getLowerKs2NumberPlaceValueLesson} from '../src/lowerKs2NumberPlaceValueLessons.js';
test('Lower KS2 number and place value provides four lessons for each year',()=>{
 assert.equal(lowerKs2NumberPlaceValueLessons.length,8);
 assert.deepEqual(lowerKs2NumberPlaceValueLessons.filter(x=>x.year===3).length,4);
 assert.deepEqual(lowerKs2NumberPlaceValueLessons.filter(x=>x.year===4).length,4);
 assert.equal(new Set(lowerKs2NumberPlaceValueLessons.map(x=>x.id)).size,8);
 for(const lesson of lowerKs2NumberPlaceValueLessons){
  assert.ok(lesson.title&&lesson.focus&&lesson.explanation);
  assert.equal(lesson.workedExamples.length,2);
  assert.equal(lesson.questions.length,5);
  for(const q of lesson.questions){
   assert.ok(q.prompt.length>5);
   assert.equal(q.options.length,3);
   assert.equal(new Set(q.options).size,3);
   assert.ok(q.options.includes(q.answer));
   assert.ok(q.explanation.length>10);
  }
 }
});
test('Year 3 and Year 4 lesson retrieval is age-specific and returns safe copies',()=>{
 const y3=getLowerKs2NumberPlaceValueLesson('LKS2-NPV-Y3-01',3);
 const y4=getLowerKs2NumberPlaceValueLesson('LKS2-NPV-Y4-01',4);
 assert.match(y3.explanation,/three-digit/);
 assert.match(y4.explanation,/four-digit/);
 y3.questions[0].options.push('tamper');
 assert.equal(lowerKs2NumberPlaceValueLessons[0].questions[0].options.length,3);
 assert.throws(()=>getLowerKs2NumberPlaceValueLesson('LKS2-NPV-Y3-01',4),/not found/);
 assert.throws(()=>getLowerKs2NumberPlaceValueLesson('unknown',3),/not found/);
 assert.throws(()=>getLowerKs2NumberPlaceValueLesson('LKS2-NPV-Y3-01',2),/Year must be/);
});
