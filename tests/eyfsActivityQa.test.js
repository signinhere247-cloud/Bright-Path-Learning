import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

test('all planned EYFS guides pass static quality and traceability checks',()=>{
 const run=spawnSync(process.execPath,['scripts/eyfs-activity-qa.mjs','--json'],{encoding:'utf8'});
 assert.equal(run.status,0,run.stderr+'\n'+run.stdout);
 const report=JSON.parse(run.stdout);
 assert.equal(report.planned,29);
 assert.equal(report.implemented,29);
 assert.equal(report.areas,7);
 assert.equal(report.codeChecksPassed,true);
 assert.deepEqual(report.findings,[]);
 assert.ok(report.reviewStillRequired.includes('statutory ELG evidence'));
});
