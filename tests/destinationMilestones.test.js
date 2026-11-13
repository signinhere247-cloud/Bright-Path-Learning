import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {destinationMilestones} from '../src/destinationMilestones.js';
import {destinationDiscoveryProgress} from '../src/destinationDiscoveryProgress.js';
import {adventureDestinations} from '../src/adventureDestinations.js';
import {DISCOVERIES} from '../src/villageActivities.js';
const day='2026-11-13';
const destinations=adventureDestinations({x:0,z:0},DISCOVERIES,[],[]);
test('village milestones unlock only at achieved discovery thresholds',()=>{
 const empty=destinationDiscoveryProgress({discoveries:{}},day,destinations);
 assert.deepEqual(destinationMilestones(empty),[]);
 const three=Object.fromEntries(DISCOVERIES.slice(0,3).map(d=>[d.id,day]));
 assert.deepEqual(destinationMilestones(destinationDiscoveryProgress({discoveries:three},day,destinations)).map(m=>m.id),['village:1','village:3']);
 const all=Object.fromEntries(DISCOVERIES.map(d=>[d.id,day]));
 assert.deepEqual(destinationMilestones(destinationDiscoveryProgress({discoveries:all},day,destinations)).map(m=>m.id),['village:1','village:3','village:5','village:6']);
});
test('milestones are child-specific, stable and never change currency',()=>{
 const first={coins:40,discoveries:{pond:day}};
 const second={coins:72,discoveries:{}};
 const before=JSON.stringify(first);
 const a=destinationMilestones(destinationDiscoveryProgress(first,day,destinations));
 const b=destinationMilestones(destinationDiscoveryProgress(second,day,destinations));
 assert.equal(a.length,1);
 assert.equal(b.length,0);
 assert.deepEqual(a,destinationMilestones(destinationDiscoveryProgress(first,day,destinations)));
 assert.equal(JSON.stringify(first),before);
});
test('guide has accessible replay controls and no reward actions',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const guide=main.slice(main.indexOf('villageGuide.onclick=()=>'),main.indexOf('const movementKeys='));
 assert.ok(guide.includes('id="guideMilestones"'));
 assert.ok(guide.includes('id="guideMilestoneMessage" role="status"'));
 assert.ok(guide.includes("button.setAttribute('aria-label','Celebrate '"));
 assert.ok(guide.includes('destinationMilestones(destinations)'));
 assert.ok(!guide.includes('completeDiscovery('));
});
