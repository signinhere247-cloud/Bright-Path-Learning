import test from 'node:test';
import assert from 'node:assert/strict';
import {buildEyfsTraceability} from '../scripts/eyfs-traceability.mjs';
test('all 28 EYFS strands trace to one proposed practical activity',()=>{
 const report=buildEyfsTraceability();
 assert.equal(report.summary.requirements,28);
 assert.equal(report.summary.planned,28);
 assert.equal(report.summary.missingActivities,0);
 assert.equal(new Set(report.entries.map(e=>e.strandId)).size,28);
 assert.equal(new Set(report.entries.map(e=>e.activityId)).size,28);
});
test('planning cannot be mistaken for verified learning coverage',()=>{
 const report=buildEyfsTraceability();
 assert.equal(report.summary.verified,0);
 assert.ok(report.entries.every(e=>e.coverage==='not verified'&&e.educationalReview==='not reviewed'&&e.lessonEvidenceIds.length===0));
 assert.ok(report.entries.every(e=>e.accessibilityReview==='not reviewed'&&e.safeguardingReview==='not reviewed'));
});
