import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adventureDestinations} from '../src/adventureDestinations.js';
import {destinationDiscoveryProgress} from '../src/destinationDiscoveryProgress.js';
import {DISCOVERIES} from '../src/villageActivities.js';
import {worldLearningRoutes} from '../src/worldLearningRoutes.js';
const day='2026-11-13';
const destinations=adventureDestinations({x:0,z:0},DISCOVERIES,[{name:'My Home',x:1,z:1}],worldLearningRoutes());
test('explored and unexplored destinations reflect only current child save',()=>{
 const first=destinationDiscoveryProgress({discoveries:{pond:day}},day,destinations);
 const second=destinationDiscoveryProgress({discoveries:{}},day,destinations);
 assert.equal(first.summary.discovered,1);
 assert.equal(first.summary.today,1);
 assert.equal(second.summary.discovered,0);
 assert.equal(first.physical.find(p=>p.id==='pond').discovery.visited,true);
 assert.equal(second.physical.find(p=>p.id==='pond').discovery.visited,false);
 assert.equal(first.physical.find(p=>p.name==='My Home').discovery,null);
});
test('previously explored destinations remain explored on later days',()=>{
 const result=destinationDiscoveryProgress({discoveries:{pond:'2026-11-12'}},day,destinations);
 const pond=result.physical.find(p=>p.id==='pond');
 assert.equal(pond.discovery.visited,true);
 assert.equal(pond.discovery.completedToday,false);
 assert.equal(result.summary.today,0);
});
test('destination progress does not mutate saved data or award coins',()=>{
 const save={coins:48,discoveries:{pond:day}};
 const before=JSON.stringify(save);
 destinationDiscoveryProgress(save,day,destinations);
 assert.equal(JSON.stringify(save),before);
});
test('village guide presents discovery progress with labelled destinations',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.ok(main.includes('destinationDiscoveryProgress(state,'));
 assert.ok(main.includes('id="guideDiscoveryProgress"'));
 assert.ok(main.includes("d.discovery.visited?'✨ Explored"));
});
