import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEyfsArts} from '../scripts/eyfs-arts-audit.mjs';
test('arts review inspects four existing creative topics and four teaching strands',()=>{
 const r=auditEyfsArts();
 assert.equal(r.summary.topics,4);
 assert.equal(r.summary.questions,40);
 assert.equal(r.summary.strands,4);
 assert.deepEqual(r.strands.map(x=>x.strandId),['EYFS-P7-01','EYFS-P7-02','EYFS-P7-03','EYFS-P7-04']);
 assert.ok(r.lessons.every(x=>x.exists&&x.questions===10));
});
test('creative quiz answers do not certify actual creative expression',()=>{
 const r=auditEyfsArts();
 assert.equal(r.summary.verified,0);
 assert.ok(r.lessons.every(x=>!x.childCreatedWorkVerified&&!x.educatorReviewed));
 assert.ok(r.strands.every(x=>x.coverage==='not verified'&&x.evidenceNeeded.length===5));
});
