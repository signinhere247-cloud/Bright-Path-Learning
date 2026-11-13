import test from 'node:test';
import assert from 'node:assert/strict';
import {milestoneCelebration,earnedMilestoneCelebrations} from '../src/milestoneCelebrations.js';
test('earned milestones produce friendly accessible celebration',()=>{
 const result=milestoneCelebration({name:'Animal Friend',emoji:'🐾',earned:true});
 assert.equal(result.title,'Achievement unlocked!');
 assert.match(result.accessibleLabel,/Animal Friend/);
});
test('locked milestones never produce celebrations',()=>{
 assert.equal(milestoneCelebration({name:'Locked',earned:false}),null);
 assert.equal(earnedMilestoneCelebrations([{name:'Locked',earned:false}]).length,0);
});
