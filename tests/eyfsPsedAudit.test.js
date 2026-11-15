import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEyfsPsed} from '../scripts/eyfs-psed-audit.mjs';
test('EYFS PSED review inspects four existing lessons and four planned strands',()=>{
 const r=auditEyfsPsed();
 assert.equal(r.summary.lessons,4);
 assert.equal(r.summary.questions,40);
 assert.equal(r.summary.strands,4);
 assert.deepEqual(r.strands.map(x=>x.strandId),['EYFS-P2-01','EYFS-P2-02','EYFS-P2-03','EYFS-P2-04']);
 assert.ok(r.lessons.every(x=>x.exists&&x.questions===10));
});
test('PSED review never treats quiz answers as evidence of emotional development',()=>{
 const r=auditEyfsPsed();
 assert.equal(r.summary.verified,0);
 assert.ok(r.strands.every(x=>x.coverage==='not verified'));
 assert.ok(r.lessons.every(x=>!x.educatorReviewed&&x.realWorldEvidence==='not demonstrated'));
});
