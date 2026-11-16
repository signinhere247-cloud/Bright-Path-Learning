// Step 108: fail-closed planning of isolated auth tests. Does not connect to Supabase.
export const AUTH_ISOLATION_CASES=Object.freeze([
 'parent-a-reads-only-own-profile',
 'parent-b-cannot-read-parent-a-profile',
 'parent-b-cannot-sync-parent-a-profile',
 'anonymous-cannot-read-or-sync',
 'stale-revision-rejected',
 'valid-parent-sync-increments-revision',
 'unrelated-profile-unchanged',
 'local-save-unchanged-on-denial'
]);
export function planAuthIsolationTest({testingProjectId,liveProjectId,testingService,liveService,fixtureParentIds=[]}={}){
 if(testingProjectId!=='kvsmoxyemuimmlivcevn')throw new Error('Unexpected testing project.');
 if(!liveProjectId||liveProjectId===testingProjectId)throw new Error('Production Supabase isolation unverified.');
 if(testingService!=='brightpath-cloud-auth-testing'||liveService!=='Bright-Path-Learning')throw new Error('Unexpected Render service mapping.');
 if(!Array.isArray(fixtureParentIds)||fixtureParentIds.length!==2||fixtureParentIds[0]===fixtureParentIds[1]||fixtureParentIds.some(x=>typeof x!=='string'||!x))throw new Error('Two separate test parents required.');
 return {approvedForStagingFixturePreparation:true,approvedForProductionWrites:false,cases:[...AUTH_ISOLATION_CASES]};
}
