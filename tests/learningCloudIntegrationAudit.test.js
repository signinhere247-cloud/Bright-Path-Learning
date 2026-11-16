import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {EXISTING_CLOUD_MODEL,inspectLearningSchemaCompatibility} from '../src/learningCloudIntegrationAudit.js';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
test('audit identifies existing parent-owned snapshot storage and revisioned sync',()=>{
 const family=read('src/cloudFamily.js'),rpc=read('supabase/migrations/202611130005_secure_sync_rpc.sql');
 assert.match(family,/parentAccount\(/);assert.match(family,/family_snapshots/);assert.match(family,/update_family_snapshot/);
 assert.match(rpc,/parent_id=\(select auth\.uid\(\)\)/);
 assert.equal(EXISTING_CLOUD_MODEL.familyOwnerColumn,'parent_id');
});
test('flags missing ownership and mismatched child identifiers',()=>{
 const parentId='11111111-2222-3333-4444-555555555555';
 assert.equal(inspectLearningSchemaCompatibility({childProfileId:'explorer_1',parentId}).compatible,true);
 assert.deepEqual(inspectLearningSchemaCompatibility({childProfileId:'bad id',parentId:'none'}).issues,['child-profile-key-mismatch','parent-auth-id-required']);
 assert.ok(inspectLearningSchemaCompatibility({childProfileId:'explorer_1',parentId,lessonSchemaChildIdType:'uuid'}).issues.includes('lesson-child-key-type-mismatch'));
});
