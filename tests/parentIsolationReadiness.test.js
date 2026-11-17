import test from 'node:test';
import assert from 'node:assert/strict';
import {assessParentIsolationReadiness} from '../src/parentIsolationReadiness.js';
const evidence={testingProjectRef:'kvsmoxyemuimmlivcevn',rlsEnabled:true,anonSelect:false,anonInsert:false,parentSelectPredicate:'parent_id = auth.uid()',parentInsertPredicate:'parent_id = auth.uid()',parentUpdateUsing:'parent_id = auth.uid()',parentUpdateCheck:'parent_id = auth.uid()'};
test('current policy evidence still blocks fixture creation without main backend proof',()=>{
 const result=assessParentIsolationReadiness(evidence);
 assert.ok(result.blockers.includes('main-backend-separation-unverified'));
 assert.equal(result.mayCreateTestAccounts,false);assert.equal(result.mayWriteFixtures,false);
});
test('even all declared preconditions never automatically authorise fixture writes',()=>{
 const result=assessParentIsolationReadiness({...evidence,mainBackendRef:'aaaaaaaaaaaaaaaaaaaa',twoDistinctTestParents:true});
 assert.equal(result.mayWriteFixtures,false);
});
test('missing update ownership check fails closed',()=>{
 const result=assessParentIsolationReadiness({...evidence,parentUpdateCheck:'true'});
 assert.ok(result.blockers.includes('parentUpdateCheck-not-parent-scoped'));
});
