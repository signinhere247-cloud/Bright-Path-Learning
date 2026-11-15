import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('EYFS statutory goal links are traceable without false mastery claims',()=>{
 const r=spawnSync(process.execPath,['scripts/eyfs-goal-evidence-audit.mjs'],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
 const a=JSON.parse(r.stdout);
 assert.equal(a.statutoryGoalReferences,17);
 assert.equal(a.goalsWithCandidateLinks,17);
 assert.deepEqual(a.goalsWithoutCandidateLinks,[]);
 assert.equal(a.verifiedGoals,0);
 assert.equal(a.educatorReviewOutstanding,true);
 assert.deepEqual(a.issues,[]);
});
