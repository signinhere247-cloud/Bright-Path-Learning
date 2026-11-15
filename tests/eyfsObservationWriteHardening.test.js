import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('design restricts edits to note, status and update timestamp',()=>{
 const sql=readFileSync(new URL('../docs/sql/eyfs-observations-write-hardening-DESIGN-ONLY.sql',import.meta.url),'utf8');
 assert.match(sql,/Not an executable production migration/);
 assert.match(sql,/revoke update on public\.eyfs_observations from authenticated/);
 assert.match(sql,/grant update\(status,note,updated_at\) on public\.eyfs_observations to authenticated/);
 for(const column of ['id','parent_id','profile_key','activity_id','created_at','review_required'])
  assert.match(sql,new RegExp('new\\.'+column+' is distinct from old\\.'+column));
 assert.match(sql,/before update on public\.eyfs_observations/);
 assert.match(sql,/new\.updated_at = now\(\)/);
});
