import test from 'node:test';
import assert from 'node:assert/strict';
import {nearestVillageDestination,villageDirections} from '../src/villageNavigation.js';
const locations=[{name:'Pond',x:0,z:-8},{name:'Garden',x:-16,z:0}];
test('nearest destination respects interaction radius',()=>{
 assert.equal(nearestVillageDestination({x:0,z:-7},locations,3)?.name,'Pond');
 assert.equal(nearestVillageDestination({x:0,z:0},locations,3),null);
});
test('guide sorts destinations and provides direction',()=>{
 const result=villageDirections({x:0,z:0},locations);
 assert.equal(result[0].name,'Pond');
 assert.equal(result[0].direction,'North');
 assert.equal(result[1].direction,'West');
});
test('invalid positions do not select destinations',()=>{
 assert.equal(nearestVillageDestination({x:NaN,z:0},locations),null);
});
