import test from 'node:test';
import assert from 'node:assert/strict';
import {learningJourney} from '../src/learningJourney.js';
test('journey starts with accessible goals for new learners',()=>{
 const stops=learningJourney({completed:{}},['Maths','English']);
 assert.equal(stops.length,5);
 assert.equal(stops[0].complete,false);
 assert.equal(stops[0].progress,0);
});
test('journey unlocks steps using completed lessons and saved days',()=>{
 const save={completed:{'Maths:Addition':true},learningDays:['2026-11-01','2026-11-03','2026-11-05']};
 const stops=learningJourney(save,['Maths']);
 assert.equal(stops[0].complete,true);
 assert.equal(stops[2].complete,true);
 assert.equal(stops[1].complete,false);
});
