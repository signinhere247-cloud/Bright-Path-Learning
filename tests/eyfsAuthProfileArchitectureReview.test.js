import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import review from '../curriculum/eyfs-auth-profile-architecture-review.json' with {type:'json'};
test('architecture review maps existing sign-in, profiles and snapshot security',()=>{
 assert.equal(review.status,'source-inspection-only');
 assert.equal(review.findings.length,5);
 for(const finding of review.findings){
  assert.ok(readFileSync(new URL('../'+finding.component,import.meta.url),'utf8').length>0);
  assert.ok(finding.finding.length>25&&finding.implication.length>25);
 }
 assert.ok(review.decisions.includes('No separate parent login'));
 assert.ok(review.openQuestions.length>=4);
});
