import test from 'node:test';
import assert from 'node:assert/strict';
import {ks1MathsTopics,ks1MathsLesson} from '../src/ks1Maths.js';
test('KS1 maths supplies 11 topics with ten valid questions each',()=>{
 assert.equal(ks1MathsTopics.length,11);
 for(const age of [5,6,7])for(const [topic] of ks1MathsTopics){
  const {intro,questions}=ks1MathsLesson(topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
 }
});
test('KS1 maths guards ages and topics',()=>{
 assert.throws(()=>ks1MathsLesson('Addition',8));
 assert.throws(()=>ks1MathsLesson('Unknown',6));
});
