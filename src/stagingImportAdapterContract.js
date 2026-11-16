// Step 104: staging adapter contract; never connects to a database by itself.
// A real implementation must use an authenticated, server-side transaction.
export const IMPORT_TEST_CASES=Object.freeze([
 'same-child-concurrent-imports',
 'repeat-import-idempotency',
 'cross-parent-denial',
 'transaction-rollback',
 'stale-snapshot-revision',
 'same-profile-key-different-parents',
 'invalid-baseline-rejected',
 'legacy-save-preserved'
]);
export function validateStagingImportAdapter(adapter){
 if(!adapter||typeof adapter!=='object')throw new Error('Staging adapter required.');
 for(const method of ['withTransaction','loadOwnedSnapshotForUpdate','insertImportOnce','readImportMarker']){
  if(typeof adapter[method]!=='function')throw new Error('Missing staging adapter method: '+method);
 }
 return true;
}
export async function runStagingImportPreflight(adapter,{staging=false,allowWrites=false}={}){
 validateStagingImportAdapter(adapter);
 if(staging!==true||allowWrites===true)throw new Error('Read-only staging preflight required.');
 const meta=typeof adapter.describe==='function'?await adapter.describe():null;
 if(!meta||meta.environment!=='staging'||meta.readOnly!==true)throw new Error('Adapter must confirm read-only staging environment.');
 return {readyForReadOnlyInspection:true,canWrite:false,environment:'staging',requiredTests:[...IMPORT_TEST_CASES]};
}
