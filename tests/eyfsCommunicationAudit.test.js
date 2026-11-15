import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEyfsCommunication} from '../scripts/eyfs-communication-audit.mjs';
test('communication review inspects real lessons and all four planned strands',()=>{
 const r=auditEyfsCommunication();
 assert.equal(r.summary.requirements,4);
 assert.equal(r.summary.topicsReviewed,3);
 assert.ok(r.examinedTopics.every(x=>x.found&&x.questionCount===10));
 assert.deepEqual(r.requirements.map(x=>x.strandId),['EYFS-P1-01','EYFS-P1-02','EYFS-P1-03','EYFS-P1-04']);
});
test('quiz topic matches do not imply authentic communication coverage',()=>{
 const r=auditEyfsCommunication();
 assert.equal(r.summary.verified,0);
 assert.ok(r.requirements.every(x=>x.coverage==='not verified'&&x.review==='pending educator review'));
 assert.ok(r.examinedTopics.every(x=>x.adultInteractionEvidence.includes('not demonstrated')));
});
