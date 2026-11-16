import test from 'node:test';import assert from 'node:assert/strict';
import {auditLowerKs2Maths} from '../scripts/lower-ks2-maths-audit.mjs';
test('Lower KS2 maths audit inventories existing shared generator topics',()=>{
 const report=auditLowerKs2Maths();
 assert.deepEqual(report.years,['Year 3','Year 4']);
 assert.equal(report.topics.length,8);
 assert.equal(report.existingKs1Topics,11);
 assert.equal(report.year3QuestionTotal,160);
 assert.equal(report.year4QuestionTotal,160);
 assert.ok(report.topics.every(t=>t.year3Questions===20&&t.year4Questions===20));
 assert.ok(report.topics.every(t=>t.year3OptionsValid&&t.year4OptionsValid));
 assert.equal(report.dedicatedLowerKs2MathsModuleFound,false);
 assert.equal(report.educatorVerified,false);
 assert.equal(report.statutoryObjectiveCoverageVerified,false);
});
test('Lower KS2 maths audit identifies domains without dedicated topic generators',()=>{
 const report=auditLowerKs2Maths();
 for(const name of ['measurement','geometry','statistics','mathematical reasoning']){
  assert.ok(report.domains.some(d=>d.name===name&&d.topics.length===0));
 }
 assert.ok(report.findings.some(f=>f.includes('same primary band')));
});
