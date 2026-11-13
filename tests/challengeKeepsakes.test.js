import test from 'node:test';
import assert from 'node:assert/strict';
import {challengeKeepsakes} from '../src/challengeKeepsakes.js';
test('badges unlock at one, three and seven unique completed days',()=>{
 const days=Object.fromEntries(Array.from({length:7},(_,i)=>['2026-11-'+String(i+1).padStart(2,'0'),['Maths','English']]));
 const earned=challengeKeepsakes({dailySubjects:days});
 assert.equal(earned.total,7);
 assert.deepEqual(earned.badges.map(b=>b.earned),[true,true,true]);
});
test('repeated subjects on the same day do not count',()=>{
 const progress=challengeKeepsakes({dailySubjects:{'2026-11-01':['Maths','Maths']}});
 assert.equal(progress.total,0);
 assert.equal(progress.badges[0].earned,false);
});
