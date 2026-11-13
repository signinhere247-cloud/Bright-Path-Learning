import test from 'node:test';
import assert from 'node:assert/strict';
import {learningDashboard} from '../src/learningDashboard.js';
test('dashboard shows real counts and no fabricated averages',()=>{
 const result=learningDashboard({completed:{'Maths:Addition':true},practiceNeeds:{'Maths:Fractions':2}},['Maths','English']);
 assert.equal(result.completed,1);
 assert.equal(result.attempts,0);
 assert.equal(result.rows[0].recentAverage,null);
 assert.deepEqual(result.rows[0].practice,['Fractions']);
 assert.equal(result.rows[1].completed,0);
});
test('dashboard handles an empty explorer profile',()=>{
 const result=learningDashboard({},['English']);
 assert.equal(result.completed,0);
 assert.equal(result.challenges,0);
});
