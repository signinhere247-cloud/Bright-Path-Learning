import test from 'node:test';
import assert from 'node:assert/strict';
import {earlyMathsTopics,earlyMathsLesson} from '../src/earlyMaths.js';
test('eight EYFS maths lessons each provide ten distinct valid questions',()=>{
 assert.equal(earlyMathsTopics.length,8);
 for(const age of [3,4,5])for(const [topic] of earlyMathsTopics){
  const {intro,questions}=earlyMathsLesson(topic,age);
  assert.ok(intro.length>20);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3);assert.ok(q.options.includes(q.answer));}
 }
});
test('early maths rejects older ages and missing topics',()=>{
 assert.throws(()=>earlyMathsLesson('Count to ten',6));
 assert.throws(()=>earlyMathsLesson('Missing',4));
});
