import test from 'node:test';
import assert from 'node:assert/strict';
import {waypointHint} from '../src/adventureWaypoints.js';
test('waypoint points toward destination and tracks distance',()=>{
 assert.deepEqual(waypointHint({x:0,z:0},{x:10,z:0}),{arrived:false,distance:10,direction:'East'});
 assert.equal(waypointHint({x:0,z:0},{x:0,z:-9}).direction,'North');
});
test('arrival is detected inside destination radius',()=>{
 assert.equal(waypointHint({x:1,z:1},{x:2,z:2}).arrived,true);
});
test('invalid waypoints are ignored',()=>assert.equal(waypointHint({x:0,z:0},null),null));
