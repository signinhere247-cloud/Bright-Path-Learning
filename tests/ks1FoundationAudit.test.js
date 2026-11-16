import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('KS1 foundation audit checks actual lesson counts and practical learning gaps',()=>{
 const r=spawnSync(process.execPath,['scripts/ks1-foundation-audit.mjs'],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 const a=JSON.parse(r.stdout);
 assert.ok(a.subjects.length>=5);
 assert.equal(a.topicTotal,a.subjects.reduce((n,s)=>n+s.topics.length,0));
 assert.equal(a.questionTotal,a.topicTotal*10);
 assert.ok(a.reviewGaps.some(x=>x.subject==='KS1 Science'));
 assert.ok(a.reviewGaps.every(x=>x.gaps.length>0));
 assert.equal(a.status,'inventory-only-unverified');
});
