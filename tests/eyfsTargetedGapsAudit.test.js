import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('targeted EYFS improvement candidates are complete and remain unverified',()=>{
 const r=spawnSync(process.execPath,['scripts/eyfs-targeted-gaps-audit.mjs'],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
 const a=JSON.parse(r.stdout);
 assert.equal(a.goalReferences,17);
 assert.equal(a.improvementCandidates,9);
 assert.equal(a.highPriority,5);
 assert.equal(a.reviewStatus,'editorial-candidates-unverified');
 assert.deepEqual(a.errors,[]);
});
