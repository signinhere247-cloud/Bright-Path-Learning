import test from 'node:test';
import assert from 'node:assert/strict';
import {gcseScienceSubjects,gcseScienceBank,gcseScienceLesson} from '../src/gcseScience.js';
test('GCSE science includes three subjects, twelve topics and 120 valid questions',()=>{
 assert.deepEqual(gcseScienceSubjects,['GCSE Biology','GCSE Chemistry','GCSE Physics']);
 assert.equal(Object.values(gcseScienceBank).reduce((n,topics)=>n+topics.length,0),12);
 let total=0;
 for(const subject of gcseScienceSubjects)for(const [topic] of gcseScienceBank[subject])for(const age of [14,15,16]){
  const {intro,questions}=gcseScienceLesson(subject,topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===15)total+=questions.length;
 }
 assert.equal(total,120);
});
test('GCSE science rejects invalid ages and topics',()=>{
 assert.throws(()=>gcseScienceLesson('GCSE Biology','Cells and transport',13));
 assert.throws(()=>gcseScienceLesson('GCSE Biology','Missing',15));
});
