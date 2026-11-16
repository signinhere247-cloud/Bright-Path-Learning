import test from 'node:test';
import assert from 'node:assert/strict';
import {planAuthIsolationTest,AUTH_ISOLATION_CASES} from '../src/authIsolationTestPlan.js';
const args={testingProjectId:'kvsmoxyemuimmlivcevn',liveProjectId:'verified-different-project',testingService:'brightpath-cloud-auth-testing',liveService:'Bright-Path-Learning',fixtureParentIds:['parent-a','parent-b']};
test('requires separate verified projects and two parent identities',()=>{
 const result=planAuthIsolationTest(args);assert.equal(result.approvedForProductionWrites,false);assert.equal(result.cases.length,8);
});
test('refuses unverified production mapping or same-project use',()=>{
 assert.throws(()=>planAuthIsolationTest({...args,liveProjectId:undefined}),/isolation unverified/);
 assert.throws(()=>planAuthIsolationTest({...args,liveProjectId:args.testingProjectId}),/isolation unverified/);
 assert.throws(()=>planAuthIsolationTest({...args,fixtureParentIds:['parent-a','parent-a']}),/Two separate/);
});
test('requires explicit test Render service',()=>assert.throws(()=>planAuthIsolationTest({...args,testingService:'Bright-Path-Learning'}),/service mapping/));
