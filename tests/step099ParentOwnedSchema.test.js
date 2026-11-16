import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sql=readFileSync(new URL('../database/step099-parent-owned-learning-schema.sql',import.meta.url),'utf8');
test('every table uses parent and profile identity with composite keys',()=>{
 for(const name of ['learning_progress_revisions','learning_attempt_records','learning_coin_balances','learning_coin_ledger']){
  const block=sql.match(new RegExp('CREATE TABLE IF NOT EXISTS public\\.'+name+' \\(([\\s\\S]*?)\\n\\);'))?.[1];
  assert.ok(block,'missing '+name);assert.match(block,/parent_id uuid NOT NULL/);assert.match(block,/profile_key text NOT NULL/);
  assert.match(block,/PRIMARY KEY \(parent_id, profile_key(?:, [a-z_]+)?\)/);
  assert.match(sql,new RegExp('ALTER TABLE public\\.'+name+' ENABLE ROW LEVEL SECURITY;'));
 }
 assert.match(sql,/REFERENCES public\.family_snapshots\(parent_id, profile_key\)/);
 assert.match(sql,/REFERENCES public\.learning_attempt_records\(parent_id, profile_key, attempt_id\)/);
});
test('design has no client-facing policies or privileges and is not a migration',()=>{
 assert.match(sql,/DO NOT APPLY TO PRODUCTION/);
 assert.doesNotMatch(sql,/CREATE POLICY/i);
 assert.match(sql,/REVOKE ALL ON public\.learning_progress_revisions/);
 assert.doesNotMatch(sql,/GRANT (SELECT|INSERT|UPDATE|DELETE)/i);
});
