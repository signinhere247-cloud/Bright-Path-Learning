// Step 107: pure static gate for privileged Supabase RPC review.
export function reviewSyncRpcSecurity({owner,securityDefiner,searchPath,anonExecute,authenticatedExecute,explicitAcl,advisorNames=[]}={}){
 const findings=[];
 if(owner!=='postgres')findings.push('unexpected-function-owner');
 if(securityDefiner!==true)findings.push('privilege-model-changed');
 if(searchPath!=='')findings.push('nonempty-search-path');
 if(anonExecute!==false)findings.push('anonymous-execution');
 if(authenticatedExecute!==true)findings.push('authenticated-sync-unavailable');
 if(typeof explicitAcl!=='string'||!explicitAcl.includes('authenticated=X/'))findings.push('unexpected-rpc-acl');
 if(advisorNames.includes('authenticated_security_definer_function_executable'))findings.push('security-advisor-privileged-rpc-warning');
 if(advisorNames.includes('auth_leaked_password_protection'))findings.push('leaked-password-protection-disabled');
 return {findings,requiresStagingIsolationTests:true,mayChangeLivePrivileges:false,manualReviewRequired:true};
}
