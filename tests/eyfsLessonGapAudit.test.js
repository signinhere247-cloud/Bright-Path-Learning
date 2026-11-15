import test from 'node:test';
import assert from 'node:assert/strict';
import {eyfsLessonGapAudit} from '../scripts/eyfs-lesson-gap-audit.mjs';
test('EYFS lesson audit inventories all four real lesson banks and 28 programme strands',()=>{
 const report=eyfsLessonGapAudit();
 assert.equal(report.summary.modules,4);
 assert.equal(report.summary.strands,28);
 assert.ok(report.summary.topics>=20);
 assert.ok(report.summary.questions>=200);
 assert.equal(report.summary.verifiedStrands,0);
 assert.ok(report.modules.every(m=>m.lessons.every(l=>l.questions===10&&l.hasIntro&&l.validAnswers&&l.hasExplanations&&l.distinctPrompts)));
});
test('EYFS strands remain unverified until real lesson and practical evidence review',()=>{
 const report=eyfsLessonGapAudit();
 assert.ok(report.strands.every(s=>s.mappingStatus==='needs human review'&&s.verifiedLessonIds.length===0));
 assert.ok(report.strands.some(s=>s.priority==='hands-on evidence needed'));
});
