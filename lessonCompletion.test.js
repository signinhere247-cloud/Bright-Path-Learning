import test from 'node:test';
import assert from 'node:assert/strict';
import {completeLessonAttempt} from '../src/lessonCompletion.js';
const fresh=()=>({coins:100,completed:{},profile:'Explorer'});
test('first pass awards coins, history and one daily pass together without changing input',()=>{
 const original=fresh();const r=completeLessonAttempt(original,'Maths','Counting',7,10,'2026-11-13T23:59:59Z');
 assert.equal(r.earned,25);assert.equal(r.save.coins,125);assert.equal(r.save.completed['Maths:Counting'],true);
 assert.equal(r.save.lessonHistory.length,1);assert.equal(r.save.dailyLessonPasses['2026-11-13'],1);assert.deepEqual(original,fresh());
});
test('failed lesson logs score but awards no coins or daily pass',()=>{
 const r=completeLessonAttempt(fresh(),'Maths','Counting',6,10,'2026-11-13T10:00:00Z');
 assert.equal(r.save.coins,100);assert.deepEqual(r.save.completed,{});assert.equal(r.save.lessonHistory[0].passed,false);assert.equal(r.save.dailyLessonPasses,undefined);
});
test('repeat passing lesson awards only repeat coins and increments daily passes',()=>{
 const first=completeLessonAttempt(fresh(),'Maths','Counting',10,10,'2026-11-13T10:00:00Z');
 const second=completeLessonAttempt(first.save,'Maths','Counting',8,10,'2026-11-13T11:00:00Z');
 assert.equal(second.earned,5);assert.equal(second.save.coins,130);assert.equal(second.save.dailyLessonPasses['2026-11-13'],2);assert.equal(second.save.lessonHistory.length,2);
});
test('invalid date and invalid result cannot partially mutate progress',()=>{
 const save=fresh();assert.throws(()=>completeLessonAttempt(save,'Maths','Counting',11,10));assert.throws(()=>completeLessonAttempt(save,'Maths','Counting',7,10,'bad-date'));assert.deepEqual(save,fresh());
});
