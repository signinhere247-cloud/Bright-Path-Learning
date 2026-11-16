import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('KS1 literacy QA inventories 16 activities and records outstanding education gates',()=>{
 const r=spawnSync(process.execPath,['scripts/ks1-literacy-qa.mjs'],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 const a=JSON.parse(r.stdout);
 assert.equal(a.totalActivities,16);
 assert.equal(a.groups.length,4);
 assert.ok(a.groups.every(g=>g.count===4&&g.year1===2&&g.year2===2));
 assert.equal(a.findings.length,0);
 assert.ok(a.unresolved.some(x=>x.includes('live UI')));
 assert.match(a.status,/educational-review-pending/);
});
