import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
test('parent observation design remains gated and child-scoped',()=>{
 const p=spawnSync(process.execPath,['scripts/eyfs-observation-design-audit.mjs'],{encoding:'utf8'});
 assert.equal(p.status,0,p.stderr+'\n'+p.stdout);
 const r=JSON.parse(p.stdout);assert.equal(r.designOnly,true);assert.equal(r.requirements,8);assert.ok(r.launchGates>=4);assert.deepEqual(r.errors,[]);
});
