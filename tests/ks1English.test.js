import test from 'node:test';
import assert from 'node:assert/strict';
import {ks1EnglishTopics,ks1EnglishLesson} from '../src/ks1English.js';
test('ten KS1 English lessons each have ten distinct valid questions',()=>{
 assert.equal(ks1EnglishTopics.length,10);
 for(const age of [5,6,7])for(const [topic] of ks1EnglishTopics){
  const {intro,questions}=ks1EnglishLesson(topic,age);
  assert.ok(intro.length>20);assert.equal(questions.length,10,topic);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3);assert.ok(q.options.includes(q.answer));}
 }
});
test('KS1 English rejects out-of-range ages and unknown topics',()=>{
 assert.throws(()=>ks1EnglishLesson('Phonics digraphs',8));
 assert.throws(()=>ks1EnglishLesson('Unknown',6));
});
