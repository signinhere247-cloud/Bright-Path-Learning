import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {completeDiscovery,DISCOVERIES} from '../src/villageActivities.js';
import {destinationDiscoveryProgress} from '../src/destinationDiscoveryProgress.js';
import {adventureDestinations} from '../src/adventureDestinations.js';
import {adventureInteractionFeedback} from '../src/adventureInteractionFeedback.js';
const day='2026-11-13';
test('wrong discovery answer earns nothing and correct retry earns once',()=>{
 const activity=DISCOVERIES[0],wrong=activity.options.find(choice=>choice!==activity.answer);
 const original={coins:10,discoveries:{}};
 const miss=completeDiscovery(original,activity.id,wrong,day);
 assert.equal(miss.correct,false);
 assert.equal(miss.earned,0);
 assert.equal(original.coins,10);
 const success=completeDiscovery(miss.save,activity.id,activity.answer,day);
 assert.equal(success.correct,true);
 assert.equal(success.earned,8);
 const again=completeDiscovery(success.save,activity.id,activity.answer,day);
 assert.equal(again.earned,0);
});
test('child-specific discovery status reaches journal and interaction prompts',()=>{
 const activity=DISCOVERIES[0],base=adventureDestinations({x:0,z:0},DISCOVERIES,[],[]);
 const a=destinationDiscoveryProgress({discoveries:{[activity.id]:day}},day,base);
 const b=destinationDiscoveryProgress({discoveries:{}},day,base);
 assert.equal(a.physical.find(p=>p.id===activity.id).discovery.completedToday,true);
 assert.equal(b.physical.find(p=>p.id===activity.id).discovery.completedToday,false);
 assert.equal(adventureInteractionFeedback(activity,true).action,'Practise again');
 assert.equal(adventureInteractionFeedback(activity,false).action,'Explore');
});
test('incorrect answer leaves question active and successful answer settles it',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const code=main.slice(main.indexOf('function showDiscovery(activity)'),main.indexOf('function interact(b)'));
 assert.ok(code.includes('Not quite — have another try!'));
 assert.ok(code.includes('if(result.correct){'));
 assert.ok(code.includes("dataset.answered='yes'"));
 assert.ok(!code.includes('Try again tomorrow for a new reward'));
});
