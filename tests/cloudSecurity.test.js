import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sql=readFileSync(new URL('../supabase/migrations/202611130005_secure_sync_rpc.sql',import.meta.url),'utf8');
const family=readFileSync(new URL('../src/cloudFamily.js',import.meta.url),'utf8');
test('revision updates cannot bypass RPC using direct browser table updates',()=>{
 assert.match(sql,/revoke update on public\.family_snapshots from authenticated/i);
 assert.match(sql,/security definer set search_path\s*=\s*''/i);
 assert.match(sql,/parent_id\s*=\s*\(select auth\.uid\(\)\)/i);
 assert.match(sql,/revision\s*=\s*p_expected_revision/i);
 assert.match(sql,/grant execute on function public\.update_family_snapshot\([\s\S]*?to authenticated/i);
});
test('cloud profile preview queries the same existing snapshot table as upload',()=>{
 assert.match(family,/previewParentCloudProfiles\([\s\S]*?from\('family_snapshots'\)/);
 assert.doesNotMatch(family,/from\('child_profiles'\)/);
});
