import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEyfsLiteracy} from '../scripts/eyfs-literacy-audit.mjs';
test('EYFS literacy audit inventories eight real lessons and four teaching strands',()=>{
 const r=auditEyfsLiteracy();
 assert.equal(r.summary.topics,8);
 assert.equal(r.summary.questions,80);
 assert.equal(r.summary.strands,4);
 assert.deepEqual(r.strands.map(x=>x.strandId),['EYFS-P4-01','EYFS-P4-02','EYFS-P4-03','EYFS-P4-04']);
 assert.ok(r.topics.every(x=>x.questions===10&&x.hasTeachingIntro&&x.answersValid&&x.hasExplanations));
});
test('EYFS literacy quiz does not imply verified reading or writing competence',()=>{
 const r=auditEyfsLiteracy();
 assert.equal(r.summary.verified,0);
 assert.ok(r.topics.every(x=>!x.actualReadingOrWritingObserved));
 assert.ok(r.strands.every(x=>x.coverage==='not verified'));
});
