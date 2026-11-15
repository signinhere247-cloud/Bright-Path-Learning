import test from 'node:test';
import assert from 'node:assert/strict';
import {auditCurriculum,stages} from '../scripts/curriculum-audit.mjs';
test('all five learning stages have curriculum modules wired into the academy',()=>{
 const report=auditCurriculum();
 assert.equal(stages.length,5);
 assert.equal(report.coverage.reduce((n,s)=>n+s.modules.length,0),18);
 assert.equal(report.passed,true,JSON.stringify(report.findings.filter(f=>f.severity==='error')));
 for(const stage of report.coverage)for(const module of stage.modules){
  assert.equal(module.present,true,module.name);
  assert.equal(module.imported,true,module.name);
  assert.equal(module.integrated,true,module.name);
 }
});
test('curriculum audit explicitly records specification and human-review gaps',()=>{
 const report=auditCurriculum();
 assert.ok(report.findings.some(f=>/exam-board|specification/.test(f.issue)));
 assert.ok(report.findings.some(f=>/accessibility/.test(f.issue)));
 assert.ok(report.findings.some(f=>/not proof/.test(f.issue)));
});
