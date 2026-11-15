import test from 'node:test';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';import {readFileSync} from 'node:fs';
test('staging probe fails closed without configuration and performs no network request',()=>{
 const run=spawnSync(process.execPath,['scripts/eyfs-staging-rls-probe.mjs'],{encoding:'utf8',env:{PATH:process.env.PATH}});
 assert.equal(run.status,2);assert.match(run.stderr,/SKIPPED: staging probe requires/);
});
test('staging probe is read-only and explicitly non-production',()=>{
 const code=readFileSync(new URL('../scripts/eyfs-staging-rls-probe.mjs',import.meta.url),'utf8');
 assert.match(code,/REFUSED: set a verified nonproduction/);
 assert.match(code,/RLS-PROBE-02/);
 assert.match(code,/Read-only staging probes only/);
 assert.doesNotMatch(code,/\.insert\(|\.update\(|\.delete\(|\.upsert\(/);
});
