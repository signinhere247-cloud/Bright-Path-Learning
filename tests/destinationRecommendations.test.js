import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adventureDestinations} from '../src/adventureDestinations.js';
import {destinationDiscoveryProgress} from '../src/destinationDiscoveryProgress.js';
import {destinationRecommendations} from '../src/destinationRecommendations.js';
import {DISCOVERIES} from '../src/villageActivities.js';
const day='2026-11-13',position={x:0,z:0};
const base=adventureDestinations(position,DISCOVERIES,[{name:'My Home',x:1,z:1}],[]);
test('recommendations only include unexplored discoveries and nearest first',()=>{
 const data=destinationDiscoveryProgress({discoveries:{pond:day}},day,base);
 const suggestions=destinationRecommendations(position,data);
 assert.ok(suggestions.length>0&&suggestions.length<=3);
 assert.ok(!suggestions.some(p=>p.id==='pond'));
 assert.ok(!suggestions.some(p=>p.name==='My Home'));
 assert.deepEqual(suggestions.map(p=>p.distance),[...suggestions.map(p=>p.distance)].sort((a,b)=>a-b));
});
test('suggestions change with child profile and do not mutate progress',()=>{
 const first={coins:25,discoveries:{pond:day}};
 const second={coins:99,discoveries:{garden:day}};
 const before=JSON.stringify(first);
 const a=destinationRecommendations(position,destinationDiscoveryProgress(first,day,base),6);
 const b=destinationRecommendations(position,destinationDiscoveryProgress(second,day,base),6);
 assert.ok(!a.some(p=>p.id==='pond'));
 assert.ok(!b.some(p=>p.id==='garden'));
 assert.ok(a.some(p=>p.id==='garden'));
 assert.ok(b.some(p=>p.id==='pond'));
 assert.equal(JSON.stringify(first),before);
 assert.equal(first.coins,25);
});
test('no suggestions after all discoveries, or for invalid position',()=>{
 const all=Object.fromEntries(DISCOVERIES.map(d=>[d.id,day]));
 const data=destinationDiscoveryProgress({discoveries:all},day,base);
 assert.deepEqual(destinationRecommendations(position,data),[]);
 assert.deepEqual(destinationRecommendations({x:NaN,z:0},data),[]);
});
test('guide has optional recommendation section and real waypoint navigation',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.ok(main.includes('id="guideRecommendations"'));
 assert.ok(main.includes('destinationRecommendations(position,destinations)'));
 assert.ok(main.includes('activeWaypoint={name:place.name,x:place.x,z:place.z}'));
});
