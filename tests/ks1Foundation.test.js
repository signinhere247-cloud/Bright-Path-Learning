import test from 'node:test';
import assert from 'node:assert/strict';
import {ks1FoundationSubjects,ks1FoundationBank,ks1FoundationLesson} from '../src/ks1Foundation.js';
test('KS1 foundation covers eight subjects and twelve lessons',()=>{
 assert.equal(ks1FoundationSubjects.length,8);
 assert.equal(Object.values(ks1FoundationBank).reduce((n,topics)=>n+topics.length,0),12);
 for(const subject of ks1FoundationSubjects)for(const [topic] of ks1FoundationBank[subject]){
  for(const age of [5,6,7]){
   const {intro,questions}=ks1FoundationLesson(subject,topic,age);
   assert.ok(intro);assert.equal(questions.length,10);
   assert.equal(new Set(questions.map(q=>q.prompt)).size,10,subject+' '+topic);
   for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,subject+' '+topic);assert.ok(q.options.includes(q.answer));}
  }
 }
});
test('KS1 foundation rejects out of range ages and unknown lessons',()=>{
 assert.throws(()=>ks1FoundationLesson('KS1 Science','Living things',8));
 assert.throws(()=>ks1FoundationLesson('KS1 Science','Missing',6));
});
