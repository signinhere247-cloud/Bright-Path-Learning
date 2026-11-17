// Production cloud readiness: static migration contract, never creates a project or deploys.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const migrations=[3,4,5].map((n)=>read({3:'supabase/migrations/202611130003_family_snapshots.sql',4:'supabase/migrations/202611130004_revisioned_sync.sql',5:'supabase/migrations/202611130005_secure_sync_rpc.sql'}[n]));
const [table,revision,rpc]=migrations;
const checks=[
 ['Snapshot table uses parent and profile composite key',/primary key\s*\(parent_id,\s*profile_key\)/i.test(table)],
 ['Row level security enabled',/enable row level security/i.test(table)],
 ['Read policy requires parent ownership',/for select to authenticated using\s*\(parent_id\s*=\s*\(select auth\.uid\(\)\)\)/i.test(table)],
 ['Insert policy requires parent ownership',/for insert to authenticated with check\s*\(parent_id\s*=\s*\(select auth\.uid\(\)\)\)/i.test(table)],
 ['Revision must be nonnegative',/revision bigint not null default 0 check \(revision >= 0\)/i.test(revision)],
 ['Secure RPC checks authenticated identity',/if \(select auth\.uid\(\)\) is null/i.test(rpc)],
 ['Secure RPC checks ownership and exact revision',/where parent_id=\(select auth\.uid\(\)\) and profile_key=p_profile_key\s+and revision=p_expected_revision/i.test(rpc)],
 ['Secure RPC prevents direct UPDATE',/revoke update on public\.family_snapshots from authenticated/i.test(rpc)],
 ['Secure RPC removes PUBLIC and anonymous execute',/revoke all on function public\.update_family_snapshot\([^;]+from public, anon/i.test(rpc)],
 ['Only authenticated role granted RPC execution',/grant execute on function public\.update_family_snapshot\([^;]+to authenticated/i.test(rpc)],
];
let blocked=0;
for(const [name,pass] of checks){console.log(`${pass?'PASS':'BLOCKED'} ${name}`);if(!pass)blocked++;}
console.log(`Migration source checks: ${checks.length-blocked}/${checks.length}`);
console.log('NOT VERIFIED: production Supabase project (must be distinct from testing), migration application, RLS tests with independent parent accounts, production Render build variables, end-to-end browser recovery.');
if(blocked)process.exitCode=1;
