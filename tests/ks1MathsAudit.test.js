import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('KS1 maths audit inventories actual question bank and records year-specific gaps',()=>{
 const r=spawnSync(process.execPath,['scripts/ks1-maths-audit.mjs'],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 const a=JSON.parse(r.stdout);
 assert.equal(a.topics.length,11);assert.equal(a.questionTotal,110);
 assert.ok(a.topics.every(x=>x.questions===10));
 assert.equal(a.domains.length,6);
 assert.ok(a.domains.some(x=>x.name==='geometry and statistics'&&x.gaps.some(g=>g.includes('pictograms'))));
 assert.equal(a.status,'inventory-only-unverified');
});
