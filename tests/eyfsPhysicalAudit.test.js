import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEyfsPhysical} from '../scripts/eyfs-physical-audit.mjs';
test('physical development audit examines two existing topics and four strands',()=>{
 const r=auditEyfsPhysical();
 assert.equal(r.summary.topics,2);
 assert.equal(r.summary.questions,20);
 assert.equal(r.summary.strands,4);
 assert.deepEqual(r.strands.map(x=>x.strandId),['EYFS-P3-01','EYFS-P3-02','EYFS-P3-03','EYFS-P3-04']);
 assert.ok(r.lessons.every(x=>x.exists&&x.questions===10));
});
test('physical skills cannot be certified by quiz answers',()=>{
 const r=auditEyfsPhysical();
 assert.equal(r.summary.verified,0);
 assert.ok(r.lessons.every(x=>!x.motorPerformanceMeasured&&!x.educatorReviewed));
 assert.ok(r.strands.every(x=>x.coverage==='not verified'&&x.evidenceNeeded.length===4));
});
