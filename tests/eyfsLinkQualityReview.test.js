import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('EYFS goal quality review checks candidate guide structure but leaves educator judgement pending',()=>{
 const p=spawnSync(process.execPath,['scripts/eyfs-link-quality-review.mjs'],{encoding:'utf8'});
 assert.equal(p.status,0,p.stderr+'\n'+p.stdout);
 const r=JSON.parse(p.stdout);
 assert.equal(r.goalCount,17);
 assert.ok(r.candidateLinks>=17);
 assert.equal(r.educatorVerifiedLinks,0);
 assert.deepEqual(r.errors,[]);
 for(const goal of r.review){
  assert.equal(goal.educatorAlignmentStatus,'pending');
  assert.equal(goal.evidenceOfChildAttainment,false);
  assert.equal(goal.reviewQuestions.length,4);
  for(const c of goal.candidates){assert.equal(c.sameLearningArea,true);assert.equal(c.alignmentStrength,'not-reviewed');}
 }
});
