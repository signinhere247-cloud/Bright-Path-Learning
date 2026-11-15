import test from 'node:test';
import assert from 'node:assert/strict';
import {ks3HumanitiesSubjects,ks3HumanitiesBank,ks3HumanitiesLesson} from '../src/ks3Humanities.js';
test('KS3 history geography and computing include 12 topics and 120 valid questions',()=>{
 assert.deepEqual(ks3HumanitiesSubjects,['KS3 History','KS3 Geography','KS3 Computing']);
 assert.equal(Object.values(ks3HumanitiesBank).reduce((n,v)=>n+v.length,0),12);
 let total=0;
 for(const subject of ks3HumanitiesSubjects)for(const [topic] of ks3HumanitiesBank[subject])for(const age of [11,12,13,14]){
  const {intro,questions}=ks3HumanitiesLesson(subject,topic,age);
  assert.ok(intro);assert.equal(questions.length,10);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,10,topic);
  for(const q of questions){assert.ok(q.explanation);assert.equal(new Set(q.options).size,3,topic);assert.ok(q.options.includes(q.answer));}
  if(age===12)total+=questions.length;
 }
 assert.equal(total,120);
});
test('KS3 foundation rejects invalid ages and topics',()=>{
 assert.throws(()=>ks3HumanitiesLesson('KS3 History','Medieval Britain',10));
 assert.throws(()=>ks3HumanitiesLesson('KS3 History','Missing',12));
});
