import test from 'node:test';
import assert from 'node:assert/strict';
import {buildEyfsReviewQueue} from '../scripts/eyfs-review-queue.mjs';
test('EYFS review queue covers every strand and sorts by stated priorities',()=>{
 const r=buildEyfsReviewQueue();
 assert.equal(r.counts.total,28);
 assert.equal(r.counts.P0,12);
 assert.equal(r.counts.P1,8);
 assert.equal(r.counts.P2,8);
 assert.equal(new Set(r.tasks.map(t=>t.strandId)).size,28);
 assert.deepEqual(r.tasks.map(t=>t.areaOrder),[...r.tasks.map(t=>t.areaOrder)].sort((a,b)=>a-b));
});
test('no prioritised task is falsely presented as reviewed or verified',()=>{
 const r=buildEyfsReviewQueue();
 assert.ok(r.tasks.every(t=>t.status==='awaiting review'&&!t.verifiedCoverage));
 assert.ok(r.tasks.every(t=>t.workNeeded.includes('record educator review')));
 assert.match(r.policy,/none is optional/);
});
