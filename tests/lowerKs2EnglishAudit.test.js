import test from 'node:test';import assert from 'node:assert/strict';
import {auditLowerKs2English} from '../scripts/lower-ks2-english-audit.mjs';
test('Lower KS2 English audit inventories five existing shared primary question topics',()=>{
 const report=auditLowerKs2English();
 assert.deepEqual(report.years,['Year 3','Year 4']);
 assert.equal(report.topics.length,5);
 assert.equal(report.domains.length,6);
 assert.ok(report.year3QuestionTotal>0);
 assert.equal(report.year3QuestionTotal,report.year4QuestionTotal);
 assert.ok(report.topics.every(t=>t.sharedPrimaryAgeBand&&t.year3Questions>0));
 assert.equal(report.dedicatedLowerKs2EnglishModuleFound,false);
 assert.equal(report.educatorVerified,false);
 assert.equal(report.statutoryObjectiveCoverageVerified,false);
});
test('Lower KS2 English audit identifies missing authentic composition and spoken language',()=>{
 const report=auditLowerKs2English();
 assert.ok(report.domains.some(d=>d.name==='composition and editing'&&d.topics.length===0));
 assert.ok(report.domains.some(d=>d.name==='spoken language'&&d.topics.length===0));
});
