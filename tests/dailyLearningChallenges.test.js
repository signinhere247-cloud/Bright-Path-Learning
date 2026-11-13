import test from 'node:test';
import assert from 'node:assert/strict';
import {recordDailySubject,dailyLearningChallenge} from '../src/dailyLearningChallenges.js';
test('two different subjects complete a daily challenge',()=>{
 const a=recordDailySubject({},'2026-11-13','Maths');
 const b=recordDailySubject(a,'2026-11-13','Maths');
 const c=recordDailySubject(b,'2026-11-13','English');
 assert.equal(dailyLearningChallenge(b,'2026-11-13').count,1);
 assert.equal(dailyLearningChallenge(c,'2026-11-13').complete,true);
 assert.equal(dailyLearningChallenge(c,'2026-11-14').count,0);
});
test('invalid dates and subject labels are rejected',()=>{
 assert.throws(()=>recordDailySubject({},'2026-02-30','Maths'));
 assert.throws(()=>recordDailySubject({},'2026-11-13',''));
});
