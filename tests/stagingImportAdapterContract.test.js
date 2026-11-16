import test from 'node:test';
import assert from 'node:assert/strict';
import {IMPORT_TEST_CASES,validateStagingImportAdapter,runStagingImportPreflight} from '../src/stagingImportAdapterContract.js';
const adapter={withTransaction:async()=>{},loadOwnedSnapshotForUpdate:async()=>{},insertImportOnce:async()=>{},readImportMarker:async()=>{},describe:async()=>({environment:'staging',readOnly:true})};
test('read-only staging preflight returns required tests without calling writes',async()=>{
 let wrote=false;const guarded={...adapter,insertImportOnce:async()=>{wrote=true;}};
 const result=await runStagingImportPreflight(guarded,{staging:true});
 assert.equal(result.canWrite,false);assert.equal(wrote,false);assert.equal(result.requiredTests.length,8);
});
test('rejects production or writable adapters and incomplete contracts',async()=>{
 await assert.rejects(runStagingImportPreflight(adapter,{staging:false}),/Read-only staging/);
 await assert.rejects(runStagingImportPreflight(adapter,{staging:true,allowWrites:true}),/Read-only staging/);
 await assert.rejects(runStagingImportPreflight({...adapter,describe:async()=>({environment:'production',readOnly:true})},{staging:true}),/read-only staging/);
 assert.throws(()=>validateStagingImportAdapter({}),/Missing staging adapter/);
});
test('covers concurrency, ownership, rollback and revision cases',()=>{
 for(const key of ['same-child-concurrent-imports','cross-parent-denial','transaction-rollback','stale-snapshot-revision'])assert.ok(IMPORT_TEST_CASES.includes(key));
});
