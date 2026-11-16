import test from 'node:test';import assert from 'node:assert/strict';
import {auditKs1MathsActivities,ks1MathsGroups} from '../scripts/ks1-maths-expansion-qa.mjs';
test('KS1 maths expansion has unique activities in eight domains across both years',()=>{
 const result=auditKs1MathsActivities();
 assert.equal(result.domains,8);
 assert.equal(result.activities,32);
 assert.deepEqual(result.yearCounts,{1:16,2:16});
 assert.deepEqual(result.issues,[]);
 assert.equal(result.structuralPass,true);
 assert.equal(result.educatorVerified,false);
 assert.equal(result.statutoryObjectiveCoverageVerified,false);
 assert.equal(result.liveInterfaceIntegrated,false);
 assert.equal(Object.keys(ks1MathsGroups).length,8);
});
