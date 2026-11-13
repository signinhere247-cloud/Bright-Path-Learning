import test from 'node:test';
import assert from 'node:assert/strict';
import {villageKeepsakes,keepsakeProgress} from '../src/villageKeepsakes.js';
test('keepsakes unlock only from completed village discoveries',()=>{
 const keepsakes=villageKeepsakes({discoveries:{pond:'2026-11-13',weather:'2026-11-12'}});
 assert.equal(keepsakes.length,6);
 assert.equal(keepsakes.find(k=>k.id==='pond').unlocked,true);
 assert.equal(keepsakes.find(k=>k.id==='garden').unlocked,false);
 assert.deepEqual(keepsakeProgress({discoveries:{pond:'2026-11-13',weather:'2026-11-12'}}),{unlocked:2,total:6});
});
test('empty explorer has no keepsakes',()=>assert.equal(keepsakeProgress({}).unlocked,0));
test('invalid discovery values do not unlock keepsakes',()=>assert.equal(villageKeepsakes({discoveries:{pond:true}})[0].unlocked,false));
