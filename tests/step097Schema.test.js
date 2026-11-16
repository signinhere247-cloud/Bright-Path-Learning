import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sql=readFileSync(new URL('../database/step097-learning-progress-rewards.sql',import.meta.url),'utf8');
test('proposed schema has child-bound keys and unique reward ledger',()=>{
 assert.match(sql,/PRIMARY KEY \(child_profile_id, attempt_id\)/);
 assert.match(sql,/PRIMARY KEY \(child_profile_id,reward_key\)/);
 assert.match(sql,/FOREIGN KEY \(child_profile_id,attempt_id\)/);
 assert.match(sql,/balance >= 0/);
 assert.match(sql,/revision >= 0/);
 assert.match(sql,/CHECK \(completed_at IS NULL OR completed_at >= started_at\)/);
});
test('all four tables have row-level security enabled and no client policies',()=>{
 for(const table of ['learning_child_progress','learning_lesson_attempts','learning_brightcoin_balances','learning_brightcoin_ledger'])assert.ok(sql.includes('ALTER TABLE '+table+' ENABLE ROW LEVEL SECURITY;'));
 assert.doesNotMatch(sql,/CREATE POLICY/i);
 assert.match(sql,/NOT executed or deployed/);
});
