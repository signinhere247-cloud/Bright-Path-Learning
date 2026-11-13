import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adventureInteractionFeedback} from '../src/adventureInteractionFeedback.js';
import {destinationDiscoveryProgress} from '../src/destinationDiscoveryProgress.js';
import {destinationRecommendations} from '../src/destinationRecommendations.js';
import {destinationMilestones} from '../src/destinationMilestones.js';
import {adventureDestinations} from '../src/adventureDestinations.js';
import {villageDirections} from '../src/villageNavigation.js';
import {createDirectionalInput} from '../src/directionalInput.js';
import {DISCOVERIES} from '../src/villageActivities.js';
const day='2026-11-13',position={x:0,z:0};
test('completed discovery feedback offers practice without promising a new reward',()=>{
 const discovery=DISCOVERIES[0];
 const fresh=adventureInteractionFeedback(discovery,false);
 const done=adventureInteractionFeedback(discovery,true);
 assert.equal(fresh.action,'Explore');
 assert.equal(done.action,'Practise again');
 assert.match(done.hint,/Completed today/);
 assert.doesNotMatch(done.hint,/earn|BrightCoins/i);
});
test('village guide, recommendations and milestones reflect the same child save',()=>{
 const first={coins:32,discoveries:{pond:day,garden:day,weather:day}};
 const second={coins:0,discoveries:{}};
 const base=adventureDestinations(position,DISCOVERIES,[],[]);
 const a=destinationDiscoveryProgress(first,day,base);
 const b=destinationDiscoveryProgress(second,day,base);
 assert.equal(a.summary.discovered,3);
 assert.equal(b.summary.discovered,0);
 assert.ok(!destinationRecommendations(position,a).some(d=>['pond','garden','weather'].includes(d.id)));
 assert.equal(destinationMilestones(a).length,2);
 assert.equal(destinationMilestones(b).length,0);
 assert.equal(first.coins,32);
 assert.equal(second.coins,0);
});
test('mobile pointer cancellation does not interfere with other fingers',()=>{
 const input=createDirectionalInput();
 input.press(1,'arrowup');input.press(2,'arrowright');
 input.release(1);
 assert.deepEqual([...input.keys],['arrowright']);
 input.clear();assert.equal(input.keys.size,0);
});
test('invalid world position cannot create walking directions',()=>{
 assert.deepEqual(villageDirections({x:NaN,z:0},DISCOVERIES),[]);
});
test('world UI connects interaction state, mobile input and discovery journal',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.ok(main.includes("state?.discoveries?.[near.id]===new Date().toISOString().slice(0,10)"));
 assert.ok(main.includes("$('#guideJournal').onclick=showVillageJournal"));
 assert.ok(main.includes('touchMovement.press(e.pointerId,key)'));
 assert.ok(main.includes('destinationMilestones(destinations)'));
 assert.ok(main.includes('destinationRecommendations(position,destinations)'));
});
