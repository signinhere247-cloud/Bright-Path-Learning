import test from 'node:test';
import assert from 'node:assert/strict';
import {learningHubHighlights} from '../src/learningHubHighlights.js';
test('new explorer receives an empty highlights list',()=>{
 assert.deepEqual(learningHubHighlights({completed:{}},['Maths'],'2026-11-13'),[]);
});
test('highlights reflect only the active child and do not change coins',()=>{
 const first={completed:{},coins:40,learningDays:['2026-11-12'],dailySubjects:{'2026-11-12':['Maths','English']},goalKeepsakes:['Maths:1']};
 const second={completed:{},coins:9};
 const highlights=learningHubHighlights(first,['Maths','English'],'2026-11-13');
 assert.ok(highlights.some(h=>h.id==='learning-days'));
 assert.ok(highlights.some(h=>h.id==='challenges'));
 assert.ok(highlights.some(h=>h.id==='goal-stars'));
 assert.ok(highlights.length<=4);
 assert.deepEqual(learningHubHighlights(second,['Maths','English'],'2026-11-13'),[]);
 assert.equal(first.coins,40);
});
