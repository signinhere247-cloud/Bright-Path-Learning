import test from 'node:test';
import assert from 'node:assert/strict';
import {DISCOVERIES,completeDiscovery,discoveryStatus} from '../src/villageActivities.js';
const day='2026-11-13';
test('each discovery has unique ID and a valid correct option',()=>{assert.equal(new Set(DISCOVERIES.map(d=>d.id)).size,DISCOVERIES.length);for(const d of DISCOVERIES)assert.ok(d.options.includes(d.answer));});
test('correct answer awards 8 coins once per day without mutating input',()=>{const original={coins:100,discoveries:{}};const a=completeDiscovery(original,'pond','Frogs',day);assert.equal(a.earned,8);assert.equal(a.save.coins,108);assert.equal(original.coins,100);const b=completeDiscovery(a.save,'pond','Frogs',day);assert.equal(b.earned,0);assert.equal(b.save.coins,108);assert.equal(discoveryStatus(a.save,'pond',day),true);});
test('incorrect answers do not award or mark discovery',()=>{const a=completeDiscovery({coins:100},'pond','Birds',day);assert.equal(a.earned,0);assert.equal(discoveryStatus(a.save,'pond',day),false);});
test('new day and separate explorer can earn rewards independently',()=>{const a=completeDiscovery({coins:0},'garden','Roots',day);assert.equal(completeDiscovery(a.save,'garden','Roots','2026-11-14').earned,8);assert.equal(completeDiscovery({coins:0},'garden','Roots',day).earned,8);});
test('invalid ID, answer, day and balance rejected',()=>{assert.throws(()=>completeDiscovery({coins:1},'missing','X',day));assert.throws(()=>completeDiscovery({coins:1},'pond','fake',day));assert.throws(()=>completeDiscovery({coins:1},'pond','Frogs','today'));assert.throws(()=>completeDiscovery({coins:-1},'pond','Frogs',day));});
