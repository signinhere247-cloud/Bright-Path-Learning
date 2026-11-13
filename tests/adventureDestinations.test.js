import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adventureDestinations} from '../src/adventureDestinations.js';
import {worldLearningRoutes} from '../src/worldLearningRoutes.js';
import {villageDirections} from '../src/villageNavigation.js';
test('real places and virtual learning destinations remain distinct',()=>{
 const destinations=adventureDestinations({x:0,z:0},[{id:'tree',name:'Tree',x:2,z:3}],[{name:'Maths',x:4,z:5}],worldLearningRoutes());
 assert.equal(destinations.physical.length,2);
 assert.ok(destinations.physical.every(d=>d.kind==='waypoint'));
 assert.deepEqual(destinations.activities.map(d=>d.destination),['subjects','hub','quests']);
 assert.ok(destinations.activities.every(d=>d.kind==='activity'&&!('x' in d)&&!('z' in d)));
 assert.equal(villageDirections({x:0,z:0},destinations.physical).length,2);
});
test('invalid physical positions are not offered as waypoints',()=>{
 const destinations=adventureDestinations({x:0,z:0},[{name:'Missing',x:null,z:4}],[],worldLearningRoutes());
 assert.equal(destinations.physical.length,0);
});
test('village guide connects both destinations and accessible activity buttons',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.ok(main.includes('adventureDestinations(position,DISCOVERIES,buildings,worldLearningRoutes'));
 assert.ok(main.includes('id="guideLearningList"'));
 assert.ok(main.includes('id="villageGuideList"'));
 assert.ok(main.includes("activity.destination==='hub')showLearningAdventureHub()"));
 assert.ok(main.includes('activeWaypoint={name:d.name,x:d.x,z:d.z}'));
});
