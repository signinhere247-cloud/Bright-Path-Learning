import test from 'node:test';
import assert from 'node:assert/strict';
import {ks2FoundationSubjects,ks2FoundationBank,ks2FoundationLesson} from '../src/ks2Foundation.js';
test('KS2 foundation has seven subjects, ten topics and 100 valid questions',()=>{
 assert.equal(ks2FoundationSubjects.length,7);
 assert.equal(Object.values(ks2FoundationBank).reduce((n,v)=>n+v.length,0),10);
 let total=0;
 for(const subject of ks2FoundationSubjects)for(const [topic] of ks2FoundationBank[subject])for(const age of [7,8,9,10,11]){
  const {intro,questions}=ks2FoundationLesson(subject,topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===9)total+=questions.length;
 }
 assert.equal(total,100);
});
test('KS2 foundation rejects invalid ages and topics',()=>{
 assert.throws(()=>ks2FoundationLesson('KS2 History','Ancient civilisations',6));
 assert.throws(()=>ks2FoundationLesson('KS2 History','Missing',9));
});
