import test from 'node:test';
import assert from 'node:assert/strict';
import {lowerKs2StatisticsLessons,getLowerKs2StatisticsLesson} from '../src/lowerKs2StatisticsLessons.js';

test('Lower KS2 statistics provides four lessons for each year',()=>{
 assert.equal(lowerKs2StatisticsLessons.length,8);
 assert.equal(lowerKs2StatisticsLessons.filter(x=>x.year===3).length,4);
 assert.equal(lowerKs2StatisticsLessons.filter(x=>x.year===4).length,4);
 assert.equal(new Set(lowerKs2StatisticsLessons.map(x=>x.id)).size,8);
 for(const lesson of lowerKs2StatisticsLessons){
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
 const y3=getLowerKs2StatisticsLesson('LKS2-ST-Y3-01',3);
 const y4=getLowerKs2StatisticsLesson('LKS2-ST-Y4-03',4);
 assert.match(y3.title,/Collect/);
 assert.match(y4.title,/time graphs/);
 y3.questions[0].options.push('tamper');
 assert.equal(lowerKs2StatisticsLessons[0].questions[0].options.length,3);
 assert.throws(()=>getLowerKs2StatisticsLesson('LKS2-ST-Y3-01',4),/not found/);
 assert.throws(()=>getLowerKs2StatisticsLesson('unknown',3),/not found/);
 assert.throws(()=>getLowerKs2StatisticsLesson('LKS2-ST-Y3-01',2),/Year must be/);
});
