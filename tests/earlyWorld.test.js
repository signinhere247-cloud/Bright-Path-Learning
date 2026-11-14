import test from 'node:test';
import assert from 'node:assert/strict';
import {earlyWorldTopics,earlyWorldLesson} from '../src/earlyWorld.js';
test('EYFS world has eight topics and a mixed checkpoint, all with ten valid questions',()=>{
 assert.equal(earlyWorldTopics.length,9);
 for(const age of [3,4,5])for(const [topic] of earlyWorldTopics){
  const {intro,questions}=earlyWorldLesson(topic,age);
  assert.ok(intro.length>20);assert.equal(questions.length,10,topic);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3);assert.ok(q.options.includes(q.answer));}
 }
});
test('EYFS world age and topic guards',()=>{
 assert.throws(()=>earlyWorldLesson('Seasons and weather',6));
 assert.throws(()=>earlyWorldLesson('Unknown',4));
});
