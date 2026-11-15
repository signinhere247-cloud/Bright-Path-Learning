import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('EYFS observation schema design is separate from deployable migrations and links parent-owned profiles',()=>{
 const sql=readFileSync(new URL('../docs/sql/eyfs-observations-schema-DESIGN-ONLY.sql',import.meta.url),'utf8');
 assert.match(sql,/DO NOT APPLY TO PRODUCTION/);
 assert.match(sql,/foreign key\(parent_id,profile_key\)/);
 assert.match(sql,/references public\.family_snapshots\(parent_id,profile_key\)/);
 assert.match(sql,/enable row level security/);
 assert.match(sql,/auth\.uid\(\)/);
 assert.match(sql,/on delete cascade/);
 assert.match(sql,/review_required = true/);
 assert.match(sql,/char_length\(btrim\(note\)\) between 3 and 500/);
});
