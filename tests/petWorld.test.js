import test from 'node:test';
import assert from 'node:assert/strict';
import {companionTarget,companionMotion,activityAnimation} from '../src/petWorld.js';
test('pet stays beside moving explorer',()=>{const p=companionTarget({x:5,z:-3},1000);assert.ok(p.x>5&&p.z>-3)});
test('companion moves smoothly without overshooting',()=>{const p=companionMotion({x:0,z:0},{x:10,z:10},.016);assert.ok(p.x>0&&p.x<10);assert.equal(p.x,p.z)});
test('large frame gaps do not teleport pet',()=>{assert.ok(companionMotion({x:0,z:0},{x:10,z:0},5).x<10)});
test('invalid companion coordinates are rejected',()=>{assert.throws(()=>companionTarget({x:NaN,z:0}));assert.throws(()=>companionMotion({x:0,z:0},{x:0,z:0},-1))});
test('care activities have distinct visual feedback',()=>{assert.ok(activityAnimation('play').bounce>activityAnimation('rest').bounce);assert.throws(()=>activityAnimation('unknown'))});
