import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {auditKs1FoundationActivities} from '../scripts/ks1-foundation-expansion-qa.mjs';
const handoff=JSON.parse(readFileSync(new URL('../curriculum/ks1-step070-handoff.json',import.meta.url),'utf8'));
test('KS1 handoff totals and next phase are explicit',()=>{
 assert.equal(handoff.step,70);assert.deepEqual(handoff.years,[1,2]);
 const groups=Object.values(handoff.supplementary);
 assert.equal(groups.reduce((sum,g)=>sum+g.expectedActivities,0),84);
 assert.equal(handoff.totalExpectedSupplementaryActivities,84);
 assert.deepEqual(handoff.nextPhase.years,[3,4]);
 assert.equal(handoff.nextPhase.startStep,71);
 assert.equal(auditKs1FoundationActivities().activityCount,handoff.supplementary.foundation.expectedActivities);
});
test('KS1 handoff never claims unverified curriculum mastery or live integration',()=>{
 assert.equal(handoff.verification.educatorVerified,false);
 assert.equal(handoff.verification.statutoryObjectiveCoverageVerified,false);
 assert.equal(handoff.verification.liveInterfaceIntegrated,false);
 assert.equal(handoff.verification.practicalAttainmentVerified,false);
 assert.ok(handoff.outstanding.length>=5);
});
