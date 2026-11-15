import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEyfsWorld} from '../scripts/eyfs-world-audit.mjs';
test('EYFS world review inventories five real topics and four teaching strands',()=>{
 const r=auditEyfsWorld();
 assert.equal(r.summary.topics,5);
 assert.equal(r.summary.questions,50);
 assert.equal(r.summary.strands,4);
 assert.deepEqual(r.strands.map(x=>x.strandId),['EYFS-P6-01','EYFS-P6-02','EYFS-P6-03','EYFS-P6-04']);
 assert.ok(r.lessons.every(x=>x.exists&&x.questions===10));
});
test('world knowledge quiz does not prove practical observation or cultural understanding',()=>{
 const r=auditEyfsWorld();
 assert.equal(r.summary.verified,0);
 assert.ok(r.lessons.every(x=>!x.realWorldObservationVerified&&!x.educatorReviewed));
 assert.ok(r.strands.every(x=>x.coverage==='not verified'));
});
