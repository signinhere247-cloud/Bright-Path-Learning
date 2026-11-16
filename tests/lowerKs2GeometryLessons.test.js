import test from 'node:test';
import assert from 'node:assert/strict';
import {lowerKs2GeometryLessons,getLowerKs2GeometryLesson} from '../src/lowerKs2GeometryLessons.js';

test('Lower KS2 geometry provides four lessons for each year',()=>{
 assert.equal(lowerKs2GeometryLessons.length,8);
 assert.equal(lowerKs2GeometryLessons.filter(x=>x.year===3).length,4);
 assert.equal(lowerKs2GeometryLessons.filter(x=>x.year===4).length,4);
 assert.equal(new Set(lowerKs2GeometryLessons.map(x=>x.id)).size,8);
 for(const lesson of lowerKs2GeometryLessons){
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
 const y3=getLowerKs2GeometryLesson('LKS2-GE-Y3-01',3);
 const y4=getLowerKs2GeometryLesson('LKS2-GE-Y4-01',4);
 assert.match(y3.explanation,/2-D shape/);
 assert.match(y4.explanation,/symmetry/);
 y3.questions[0].options.push('tamper');
 assert.equal(lowerKs2GeometryLessons[0].questions[0].options.length,3);
 assert.throws(()=>getLowerKs2GeometryLesson('LKS2-GE-Y3-01',4),/not found/);
 assert.throws(()=>getLowerKs2GeometryLesson('unknown',3),/not found/);
 assert.throws(()=>getLowerKs2GeometryLesson('LKS2-GE-Y3-01',2),/Year must be/);
});
