import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sql=readFileSync(new URL('../database/step103-staging-import-ledger.sql',import.meta.url),'utf8');
test('staging ledger uniquely identifies each family child and import version',()=>{
 assert.match(sql,/PRIMARY KEY\(parent_id,profile_key,import_version\)/);
 assert.match(sql,/FOREIGN KEY\(parent_id,profile_key\) REFERENCES public\.family_snapshots\(parent_id,profile_key\)/);
 assert.match(sql,/snapshot_revision bigint NOT NULL/);
 assert.match(sql,/baseline_coins bigint NOT NULL CHECK/);
});
test('no client access, RLS on, no live migration claim',()=>{
 assert.match(sql,/staging design ONLY/);assert.match(sql,/ENABLE ROW LEVEL SECURITY/);
 assert.match(sql,/REVOKE ALL ON public\.learning_legacy_imports FROM anon,authenticated/);
 assert.doesNotMatch(sql,/CREATE POLICY|GRANT EXECUTE|SECURITY DEFINER/i);
});
