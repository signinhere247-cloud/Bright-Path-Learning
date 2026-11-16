import test from 'node:test';
import assert from 'node:assert/strict';
import {upperKs2NumberPlaceValueLessons,getUpperKs2NumberPlaceValueLesson} from '../src/upperKs2NumberPlaceValueLessons.js';

test('Upper KS2 number and place value provides five lessons for each year',()=>{
 assert.equal(upperKs2NumberPlaceValueLessons.length,10);
 assert.equal(upperKs2NumberPlaceValueLessons.filter(x=>x.year===5).length,5);
 assert.equal(upperKs2NumberPlaceValueLessons.filter(x=>x.year===6).length,5);
 assert.equal(new Set(upperKs2NumberPlaceValueLessons.map(x=>x.id)).size,10);
 for(const lesson of upperKs2NumberPlaceValueLessons){
  assert.ok(lesson.title&&lesson.focus&&lesson.explanation);
  assert.equal(lesson.workedExamples.length,2);
  assert.equal(lesson.questions.length,5);
  for(const question of lesson.questions){
   assert.ok(question.prompt.length>8);
   assert.equal(question.options.length,3);
   assert.equal(new Set(question.options).size,3);
   assert.ok(question.options.includes(question.answer));
   assert.ok(question.explanation.length>10);
  }
 }
});

test('Year-specific retrieval returns independent copies and rejects mismatches',()=>{
 const y5=getUpperKs2NumberPlaceValueLesson('UKS2-NPV-Y5-01',5);
 const y6=getUpperKs2NumberPlaceValueLesson('UKS2-NPV-Y6-01',6);
 assert.match(y5.title,/one million/);
 assert.match(y6.title,/ten million/);
 y5.questions[0].options.push('tamper');
 assert.equal(upperKs2NumberPlaceValueLessons[0].questions[0].options.length,3);
 assert.throws(()=>getUpperKs2NumberPlaceValueLesson('UKS2-NPV-Y5-01',6),/not found/);
 assert.throws(()=>getUpperKs2NumberPlaceValueLesson('unknown',5),/not found/);
 assert.throws(()=>getUpperKs2NumberPlaceValueLesson('UKS2-NPV-Y5-01',4),/Year must be/);
});
