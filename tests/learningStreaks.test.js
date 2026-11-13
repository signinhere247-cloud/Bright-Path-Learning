import test from 'node:test';
import assert from 'node:assert/strict';
import {recordLearningDay,learningStreak} from '../src/learningStreaks.js';
test('same-day learning only counts once and preserves original',()=>{
 const save={coins:10};
 const one=recordLearningDay(save,'2026-11-10');
 const two=recordLearningDay(one,'2026-11-10');
 assert.equal(learningStreak(two).learningDays,1);
 assert.equal(save.learningDays,undefined);
});
test('consecutive days build a recent run, breaks never erase milestones',()=>{
 let save={};
 for(const day of ['2026-11-01','2026-11-02','2026-11-03','2026-11-07'])save=recordLearningDay(save,day);
 assert.equal(learningStreak(save).bestRecentRun,1);
 assert.deepEqual(learningStreak(save).milestones,[1,3]);
});
test('invalid calendar dates are rejected',()=>{
 assert.throws(()=>recordLearningDay({},'2026-02-30'),/Invalid/);
});
