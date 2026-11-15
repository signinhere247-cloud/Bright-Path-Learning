import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEyfsMaths} from '../scripts/eyfs-maths-audit.mjs';
test('EYFS maths audit inspects eight real lessons and four teaching strands',()=>{
 const r=auditEyfsMaths();
 assert.equal(r.summary.topics,8);
 assert.equal(r.summary.questions,80);
 assert.equal(r.summary.strands,4);
 assert.deepEqual(r.strands.map(x=>x.strandId),['EYFS-P5-01','EYFS-P5-02','EYFS-P5-03','EYFS-P5-04']);
 assert.ok(r.topics.every(x=>x.questions===10&&x.hasTeachingIntro&&x.validAnswers&&x.hasExplanations));
});
test('quiz answers do not certify practical maths mastery',()=>{
 const r=auditEyfsMaths();
 assert.equal(r.summary.verified,0);
 assert.ok(r.topics.every(x=>!x.practicalManipulativesObserved));
 assert.ok(r.strands.every(x=>x.coverage==='not verified'&&x.evidenceNeeded.length===5));
});
