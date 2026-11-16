import test from 'node:test';import assert from 'node:assert/strict';
import {auditKs1FoundationActivities,ks1FoundationModules} from '../scripts/ks1-foundation-expansion-qa.mjs';
test('all nine KS1 foundation subject modules meet structural quality gates',()=>{
 const report=auditKs1FoundationActivities();
 assert.equal(report.moduleCount,9);
 assert.equal(report.activityCount,36);
 assert.deepEqual(report.byYear,{1:18,2:18});
 assert.deepEqual(report.issues,[]);
 assert.equal(report.passed,true);
 assert.equal(report.educatorVerified,false);
 assert.equal(report.statutoryObjectiveCoverageVerified,false);
 assert.equal(report.liveInterfaceIntegrated,false);
});
test('audit detects duplicate IDs, missing year and unsafe or incomplete guides',()=>{
 const original=ks1FoundationModules.science[0];
 const broken={...original,steps:[''],safety:'',adultPrompt:'',id:ks1FoundationModules.science[1].id};
 const report=auditKs1FoundationActivities({science:[broken,ks1FoundationModules.science[1]]});
 assert.equal(report.passed,false);
 assert.ok(report.issues.some(i=>i.includes('duplicate')));
 assert.ok(report.issues.some(i=>i.includes('missing year coverage')));
 assert.ok(report.issues.some(i=>i.includes('insufficient steps')));
 assert.ok(report.issues.some(i=>i.includes('safety')));
});
