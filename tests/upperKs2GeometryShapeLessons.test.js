import test from 'node:test';
import assert from 'node:assert/strict';
import {upperKs2GeometryShapeLessons,getUpperKs2GeometryShapeLesson} from '../src/upperKs2GeometryShapeLessons.js';

test('Upper KS2 geometry provides five lessons per year',()=>{
 assert.equal(upperKs2GeometryShapeLessons.length,10);
 assert.equal(upperKs2GeometryShapeLessons.filter(x=>x.year===5).length,5);
 assert.equal(upperKs2GeometryShapeLessons.filter(x=>x.year===6).length,5);
 assert.equal(new Set(upperKs2GeometryShapeLessons.map(x=>x.id)).size,10);
 for(const lesson of upperKs2GeometryShapeLessons){
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
 const y5=getUpperKs2GeometryShapeLesson('UKS2-GEO-Y5-01',5);
 const y6=getUpperKs2GeometryShapeLesson('UKS2-GEO-Y6-03',6);
 assert.match(y5.title,/2-D shapes/);
 assert.match(y6.title,/circles/);
 y5.questions[0].options.push('tamper');
 assert.equal(upperKs2GeometryShapeLessons[0].questions[0].options.length,3);
 assert.throws(()=>getUpperKs2GeometryShapeLesson('UKS2-GEO-Y5-01',6),/not found/);
 assert.throws(()=>getUpperKs2GeometryShapeLesson('unknown',5),/not found/);
 assert.throws(()=>getUpperKs2GeometryShapeLesson('UKS2-GEO-Y5-01',4),/Year must be/);
});
