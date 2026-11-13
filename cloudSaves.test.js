import test from 'node:test';
import assert from 'node:assert/strict';
import {cloudSnapshot,readCloudSnapshot,prepareCloudRestore} from '../src/cloudSaves.js';
const save=(name,coins)=>({coins,profile:name,completed:{Maths:true},avatar:'#f7ad65',outfit:'#7b5ee8',pet:null,inventory:['bed'],placed:[]});
const profile={id:'explorer_1',age:9,save:save('Alex',30)};
test('cloud snapshot preserves child data',()=>{const row=cloudSnapshot(profile);assert.equal(readCloudSnapshot(row).save.coins,30);});
test('rejects malformed cloud data',()=>{assert.throws(()=>readCloudSnapshot({profile_key:'explorer_1',learning_age:9,save_data:{coins:-1}}));});
test('restore changes only selected explorer without mutating family',()=>{const family={version:1,activeId:'explorer_1',profiles:[profile,{id:'explorer_2',age:12,save:save('Sam',55)}]};const row={profile_key:'explorer_1',learning_age:10,save_data:save('Alex',200)};const next=prepareCloudRestore(family,row,'explorer_1');assert.equal(next.profiles[0].save.coins,200);assert.equal(next.profiles[1].save.coins,55);assert.equal(family.profiles[0].save.coins,30);});
test('restore rejects unknown local target',()=>{assert.throws(()=>prepareCloudRestore({profiles:[profile]},{profile_key:'explorer_1',learning_age:9,save_data:save('Alex',1)},'missing_123'));});
