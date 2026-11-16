import test from 'node:test';
import assert from 'node:assert/strict';
import {upperKs2FractionsDecimalsPercentagesLessons,getUpperKs2FractionsDecimalsPercentagesLesson} from '../src/upperKs2FractionsDecimalsPercentagesLessons.js';

test('Upper KS2 fractions, decimals and percentages provides five lessons per year',()=>{
 assert.equal(upperKs2FractionsDecimalsPercentagesLessons.length,10);
 assert.equal(upperKs2FractionsDecimalsPercentagesLessons.filter(x=>x.year===5).length,5);
 assert.equal(upperKs2FractionsDecimalsPercentagesLessons.filter(x=>x.year===6).length,5);
 assert.equal(new Set(upperKs2FractionsDecimalsPercentagesLessons.map(x=>x.id)).size,10);
 for(const lesson of upperKs2FractionsDecimalsPercentagesLessons){
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
 const y5=getUpperKs2FractionsDecimalsPercentagesLesson('UKS2-FDP-Y5-01',5);
 const y6=getUpperKs2FractionsDecimalsPercentagesLesson('UKS2-FDP-Y6-04',6);
 assert.match(y5.title,/equivalent fractions/);
 assert.match(y6.title,/percentages/);
 y5.questions[0].options.push('tamper');
 assert.equal(upperKs2FractionsDecimalsPercentagesLessons[0].questions[0].options.length,3);
 assert.throws(()=>getUpperKs2FractionsDecimalsPercentagesLesson('UKS2-FDP-Y5-01',6),/not found/);
 assert.throws(()=>getUpperKs2FractionsDecimalsPercentagesLesson('unknown',5),/not found/);
 assert.throws(()=>getUpperKs2FractionsDecimalsPercentagesLesson('UKS2-FDP-Y5-01',4),/Year must be/);
});
