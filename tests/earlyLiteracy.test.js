import test from 'node:test';
import assert from 'node:assert/strict';
import {earlyLiteracyTopics,earlyLiteracyLesson} from '../src/earlyLiteracy.js';
test('EYFS literacy provides eight lessons with ten distinct valid questions each',()=>{
 assert.equal(earlyLiteracyTopics.length,8);
 for(const age of [3,4,5])for(const [topic] of earlyLiteracyTopics){
  const {intro,questions}=earlyLiteracyLesson(topic,age);
  assert.ok(intro.length>25);
  assert.equal(questions.length,10,topic);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.prompt&&q.explanation);assert.equal(new Set(q.options).size,3);assert.ok(q.options.includes(q.answer));}
 }
});
test('EYFS lessons reject older ages and unknown topics',()=>{
 assert.throws(()=>earlyLiteracyLesson('Letters and names',6));
 assert.throws(()=>earlyLiteracyLesson('Missing',4));
});
