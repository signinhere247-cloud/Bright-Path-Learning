import test from 'node:test';
import assert from 'node:assert/strict';
import {lowerKs2MeasurementLessons,getLowerKs2MeasurementLesson} from '../src/lowerKs2MeasurementLessons.js';

test('Lower KS2 measurement provides four differentiated lessons per year',()=>{
 assert.equal(lowerKs2MeasurementLessons.length,8);
 assert.equal(lowerKs2MeasurementLessons.filter(x=>x.year===3).length,4);
 assert.equal(lowerKs2MeasurementLessons.filter(x=>x.year===4).length,4);
 assert.equal(new Set(lowerKs2MeasurementLessons.map(x=>x.id)).size,8);
 for(const lesson of lowerKs2MeasurementLessons){
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
 const y3=getLowerKs2MeasurementLesson('LKS2-ME-Y3-01',3);
 const y4=getLowerKs2MeasurementLesson('LKS2-ME-Y4-01',4);
 assert.match(y3.explanation,/millimetres/);
 assert.match(y4.explanation,/kilometre/);
 y3.questions[0].options.push('tamper');
 assert.equal(lowerKs2MeasurementLessons[0].questions[0].options.length,3);
 assert.throws(()=>getLowerKs2MeasurementLesson('LKS2-ME-Y3-01',4),/not found/);
 assert.throws(()=>getLowerKs2MeasurementLesson('unknown',3),/not found/);
 assert.throws(()=>getLowerKs2MeasurementLesson('LKS2-ME-Y3-01',2),/Year must be/);
});
