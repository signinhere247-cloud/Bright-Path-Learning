// Step 106: offline checker for a manually captured Supabase security inventory.
export function auditFamilyPermissions({table,policies=[],syncFunction}={}){
 if(!table||!syncFunction||!Array.isArray(policies))throw new Error('Missing security inventory.');
 const findings=[];
 if(table.rls_enabled!==true)findings.push('family-rls-disabled');
 if(table.anon_select||table.anon_insert)findings.push('anonymous-table-access');
 if(table.auth_update)findings.push('direct-authenticated-update');
 for(const cmd of ['SELECT','INSERT','UPDATE']){
  if(!policies.some(p=>p.cmd===cmd&&p.roles?.includes('authenticated')&&(cmd==='INSERT'?p.with_check?.includes('auth.uid()'):p.qual?.includes('auth.uid()'))))findings.push('missing-owner-policy-'+cmd);
 }
 if(syncFunction.anon_execute)findings.push('anonymous-rpc-execution');
 if(!syncFunction.auth_execute)findings.push('authenticated-rpc-unavailable');
 if(syncFunction.securityDefiner)findings.push('privileged-rpc-requires-review');
 if(!syncFunction.ownerCheck||!syncFunction.revisionCheck||!syncFunction.fixedSearchPath)findings.push('rpc-hardening-incomplete');
 return {passesStaticChecks:findings.filter(f=>f!=='privileged-rpc-requires-review').length===0,requiresManualReview:findings.includes('privileged-rpc-requires-review'),findings};
}
