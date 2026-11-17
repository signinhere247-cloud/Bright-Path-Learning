// Step 120: no fixture creation until two independent checks are satisfied.
// Policy evidence is not equivalent to a successful two-account integration test.
export function assessParentIsolationReadiness({testingProjectRef,mainBackendRef,rlsEnabled,anonSelect,anonInsert,parentSelectPredicate,parentInsertPredicate,parentUpdateUsing,parentUpdateCheck,twoDistinctTestParents=false}={}){
 const blockers=[];
 if(testingProjectRef!=='kvsmoxyemuimmlivcevn')blockers.push('testing-project-unverified');
 if(!mainBackendRef||mainBackendRef===testingProjectRef)blockers.push('main-backend-separation-unverified');
 if(rlsEnabled!==true)blockers.push('rls-not-verified');
 if(anonSelect!==false||anonInsert!==false)blockers.push('anonymous-permissions-not-denied');
 for(const [name,value] of Object.entries({parentSelectPredicate,parentInsertPredicate,parentUpdateUsing,parentUpdateCheck})){
  if(typeof value!=='string'||!value.includes('auth.uid()')||!value.includes('parent_id'))blockers.push(name+'-not-parent-scoped');
 }
 if(!twoDistinctTestParents)blockers.push('two-fixture-parents-not-available');
 return Object.freeze({readOnlyPolicyPreflightPassed:!blockers.some(x=>x.includes('rls')||x.includes('anonymous')||x.includes('Predicate')||x.includes('Update')),mayCreateTestAccounts:blockers.length===0,mayWriteFixtures:false,blockers});
}
