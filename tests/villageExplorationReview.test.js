import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {villageDirections} from '../src/villageNavigation.js';
import {destinationDiscoveryProgress} from '../src/destinationDiscoveryProgress.js';
import {destinationRecommendations} from '../src/destinationRecommendations.js';
import {destinationMilestones} from '../src/destinationMilestones.js';
import {adventureDestinations} from '../src/adventureDestinations.js';
import {DISCOVERIES} from '../src/villageActivities.js';

const day='2026-11-13',position={x:0,z:0};
const base=adventureDestinations(position,DISCOVERIES,[{name:'My Home',x:0,z:10}],[]);
test('village directions never return NaN when explorer position is missing or invalid',()=>{
 for(const invalid of [null,{}, {x:NaN,z:0},{x:0,z:Infinity}]){
  assert.deepEqual(villageDirections(invalid,base.physical),[]);
 }
 assert.ok(villageDirections(position,base.physical).every(d=>Number.isFinite(d.distance)));
});
test('guide uses one child journal consistently for milestones and recommendations',()=>{
 const first={coins:18,discoveries:{pond:day,garden:'2026-11-12'}};
 const second={coins:55,discoveries:{}};
 const a=destinationDiscoveryProgress(first,day,base),b=destinationDiscoveryProgress(second,day,base);
 assert.equal(a.summary.discovered,2);
 assert.equal(a.summary.today,1);
 assert.equal(a.physical.find(p=>p.id==='pond').discovery.completedToday,true);
 assert.equal(a.physical.find(p=>p.id==='garden').discovery.completedToday,false);
 assert.ok(!destinationRecommendations(position,a,6).some(d=>['pond','garden'].includes(d.id)));
 assert.equal(destinationMilestones(a).length,1);
 assert.equal(destinationMilestones(b).length,0);
 assert.equal(first.coins,18);
 assert.equal(second.coins,55);
});
test('village guide provides journal access and distinguishes completed-today status',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const guide=main.slice(main.indexOf('villageGuide.onclick=()=>'),main.indexOf('const movementKeys='));
 assert.ok(guide.includes('id="guideJournal"'));
 assert.ok(guide.includes("$('#guideJournal').onclick=showVillageJournal"));
 assert.ok(guide.includes("d.discovery.completedToday?'🌟 Completed today"));
 assert.ok(guide.includes("d.discovery.visited?'✨ Explored before"));
 assert.ok(guide.includes('destinationRecommendations(position,destinations)'));
 assert.ok(guide.includes('destinationMilestones(destinations)'));
});
