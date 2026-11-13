import test from 'node:test';
import assert from 'node:assert/strict';
import {commitRewardChange} from '../src/rewardCommit.js';
import {claimDailyQuest} from '../src/dailyQuests.js';
import {completeDiscovery} from '../src/villageActivities.js';
const day='2026-11-13';
test('quest coins and claim are persisted together',()=>{
 const current={coins:10,discoveries:{pond:day},questClaims:{}};
 let stored;
 const result=commitRewardChange(current,s=>claimDailyQuest(s,'first-discovery',day),s=>{stored=structuredClone(s)});
 assert.equal(stored.coins,22);assert.deepEqual(stored.questClaims[day],['first-discovery']);assert.equal(current.coins,10);assert.equal(result.earned,12);
});
test('quest save failure leaves original unchanged and claim retryable',()=>{
 const current={coins:10,discoveries:{pond:day},questClaims:{}};
 assert.throws(()=>commitRewardChange(current,s=>claimDailyQuest(s,'first-discovery',day),()=>{throw Error('Storage full')}),/Storage full/);
 assert.equal(current.coins,10);assert.equal(claimDailyQuest(current,'first-discovery',day).earned,12);
});
test('discovery reward is persisted once and never twice for same day',()=>{
 const current={coins:10,discoveries:{}};let calls=0;
 const first=commitRewardChange(current,s=>completeDiscovery(s,'pond','Frogs',day),()=>{calls++});
 const second=commitRewardChange(first.save,s=>completeDiscovery(s,'pond','Frogs',day),()=>{calls++});
 assert.equal(first.earned,8);assert.equal(second.earned,0);assert.equal(calls,1);assert.equal(second.save.coins,18);
});
test('discovery save failure does not mutate original or consume reward',()=>{
 const current={coins:10,discoveries:{}};
 assert.throws(()=>commitRewardChange(current,s=>completeDiscovery(s,'pond','Frogs',day),()=>{throw Error('Storage full')}),/Storage full/);
 assert.equal(current.coins,10);assert.deepEqual(current.discoveries,{});
});
test('invalid reward transform is rejected',()=>{
 assert.throws(()=>commitRewardChange({coins:0},()=>({earned:8}),()=>{}),/Invalid reward result/);
});
