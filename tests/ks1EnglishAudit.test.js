import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('KS1 English audit inventories live lesson bank without claiming verified coverage',()=>{
 const r=spawnSync(process.execPath,['scripts/ks1-english-audit.mjs'],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 const a=JSON.parse(r.stdout);
 assert.equal(a.topics.length,10);assert.equal(a.questionTotal,100);
 assert.ok(a.topics.every(x=>x.questions===10));
 assert.ok(a.domains.some(x=>x.name==='spoken language'&&x.topics.length===0));
 assert.equal(a.status,'inventory-only-unverified');
 assert.ok(a.findings.some(x=>x.includes('Year 1 and Year 2')));
});
