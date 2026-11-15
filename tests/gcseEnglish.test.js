import test from 'node:test';
import assert from 'node:assert/strict';
import {gcseEnglishSubjects,gcseEnglishBank,gcseEnglishLesson} from '../src/gcseEnglish.js';
test('GCSE English includes eight topics and 80 valid questions',()=>{
 assert.deepEqual(gcseEnglishSubjects,['GCSE English']);
 assert.equal(gcseEnglishBank['GCSE English'].length,8);
 let total=0;
 for(const [topic] of gcseEnglishBank['GCSE English'])for(const age of [14,15,16]){
  const {intro,questions}=gcseEnglishLesson('GCSE English',topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===15)total+=questions.length;
 }
 assert.equal(total,80);
});
test('GCSE English rejects invalid ages and topics',()=>{
 assert.throws(()=>gcseEnglishLesson('GCSE English','Shakespeare and drama',13));
 assert.throws(()=>gcseEnglishLesson('GCSE English','Missing',15));
});
