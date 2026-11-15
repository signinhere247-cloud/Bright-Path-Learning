import test from 'node:test';
import assert from 'node:assert/strict';
import {buildEyfsImplementationHandoff} from '../scripts/eyfs-implementation-handoff.mjs';
test('handoff covers seven areas, 28 planned activities and all prior review inventories',()=>{
 const r=buildEyfsImplementationHandoff();
 assert.equal(r.summary.areas,7);
 assert.equal(r.summary.strands,28);
 assert.equal(r.summary.plannedActivities,28);
 assert.equal(r.summary.quizTopicsReviewed,34);
 assert.equal(r.summary.quizQuestionsReviewed,340);
 assert.equal(new Set(r.tasks.map(t=>t.strandId)).size,28);
});
test('handoff distinguishes planning from verified implemented curriculum',()=>{
 const r=buildEyfsImplementationHandoff();
 assert.equal(r.summary.verifiedStrands,0);
 assert.ok(r.tasks.every(t=>t.implementationStatus==='not verified as implemented'));
 assert.ok(r.areas.every(a=>a.verified===0));
});
