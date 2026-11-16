import test from 'node:test';
import assert from 'node:assert/strict';
import {reviewSyncRpcSecurity} from '../src/syncRpcSecurityReview.js';
const input={owner:'postgres',securityDefiner:true,searchPath:'',anonExecute:false,authenticatedExecute:true,explicitAcl:'{postgres=X/postgres,service_role=X/postgres,authenticated=X/postgres}',advisorNames:['authenticated_security_definer_function_executable','auth_leaked_password_protection']};
test('preserves advisor findings and blocks live privilege changes',()=>{
 const result=reviewSyncRpcSecurity(input);assert.ok(result.findings.includes('security-advisor-privileged-rpc-warning'));assert.ok(result.findings.includes('leaked-password-protection-disabled'));assert.equal(result.mayChangeLivePrivileges,false);
});
test('detects exposed anonymous execution and unexpected function settings',()=>{
 const result=reviewSyncRpcSecurity({...input,anonExecute:true,searchPath:'public'});assert.ok(result.findings.includes('anonymous-execution'));assert.ok(result.findings.includes('nonempty-search-path'));
});
