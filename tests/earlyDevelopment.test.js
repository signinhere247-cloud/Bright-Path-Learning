import test from 'node:test';
import assert from 'node:assert/strict';
import {earlyDevelopmentTopics,earlyDevelopmentLesson} from '../src/earlyDevelopment.js';
test('eight development lessons have ten valid, distinct questions',()=>{
 assert.equal(earlyDevelopmentTopics.length,8);
 for(const age of [3,4,5])for(const [topic] of earlyDevelopmentTopics){
  const {intro,questions}=earlyDevelopmentLesson(topic,age);
  assert.ok(intro.length>20);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3);assert.ok(q.options.includes(q.answer));}
 }
});
test('age limits and unknown topics rejected',()=>{
 assert.throws(()=>earlyDevelopmentLesson('Naming feelings',6));
 assert.throws(()=>earlyDevelopmentLesson('Unknown',4));
});
