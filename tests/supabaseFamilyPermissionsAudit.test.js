import test from 'node:test';
import assert from 'node:assert/strict';
import {auditFamilyPermissions} from '../src/supabaseFamilyPermissionsAudit.js';
const table={rls_enabled:true,anon_select:false,anon_insert:false,auth_update:false};
const policies=['SELECT','INSERT','UPDATE'].map(cmd=>({cmd,roles:['authenticated'],qual:'parent_id = auth.uid()',with_check:'parent_id = auth.uid()'}));
const syncFunction={anon_execute:false,auth_execute:true,securityDefiner:true,ownerCheck:true,revisionCheck:true,fixedSearchPath:true};
test('privileged RPC requires manual review even with owner and revision checks',()=>{
 const result=auditFamilyPermissions({table,policies,syncFunction});assert.equal(result.passesStaticChecks,true);assert.equal(result.requiresManualReview,true);
});
test('flags missing RLS and anonymous access',()=>{
 const result=auditFamilyPermissions({table:{...table,rls_enabled:false,anon_select:true},policies,syncFunction});
 assert.ok(result.findings.includes('family-rls-disabled'));assert.ok(result.findings.includes('anonymous-table-access'));
});
test('flags missing RPC hardening and absent ownership policies',()=>{
 const result=auditFamilyPermissions({table,policies:[],syncFunction:{...syncFunction,ownerCheck:false}});
 assert.ok(result.findings.includes('rpc-hardening-incomplete'));assert.ok(result.findings.includes('missing-owner-policy-SELECT'));
});
