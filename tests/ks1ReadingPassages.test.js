import test from 'node:test';import assert from 'node:assert/strict';
import {ks1ReadingPassages,ks1ReadingLesson} from '../src/ks1ReadingPassages.js';
test('KS1 reading includes four Year 1/2 passages with valid comprehension choices',()=>{
 assert.equal(ks1ReadingPassages.length,4);
 assert.deepEqual(ks1ReadingPassages.map(p=>p.year),[1,1,2,2]);
 assert.equal(new Set(ks1ReadingPassages.map(p=>p.id)).size,4);
 for(const p of ks1ReadingPassages){
  assert.ok(p.passage.length>100);
  assert.equal(p.questions.length,3);
  assert.ok(p.questions.every(q=>q.options.length===3&&new Set(q.options).size===3&&q.options.includes(q.answer)));
  const lesson=ks1ReadingLesson(p.id,p.year);
  assert.equal(lesson.fluencyVerified,false);
  assert.equal(lesson.reviewRequired,true);
  assert.notEqual(lesson.questions,p.questions);
 }
 assert.throws(()=>ks1ReadingLesson('KS1-READ-01',2),/Unknown reading passage/);
});
