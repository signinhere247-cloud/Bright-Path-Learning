import test from 'node:test';
import assert from 'node:assert/strict';
import {createLessonAttempt,recordLessonAnswer,completeLessonAttempt,lessonAttemptSummary} from '../src/childLessonAttemptContract.js';
const start='2026-11-16T12:00:00.000Z',end='2026-11-16T12:05:00.000Z';
const base=()=>createLessonAttempt({childProfileId:'child-a',lessonId:'maths-y5-01',attemptId:'attempt-1',totalQuestions:2,startedAt:start});
test('separate child profiles and immutable answer updates',()=>{
 const first=base();const second=createLessonAttempt({childProfileId:'child-b',lessonId:'maths-y5-01',attemptId:'attempt-2',totalQuestions:2,startedAt:start});
 const updated=recordLessonAnswer(first,{childProfileId:'child-a',questionIndex:0,correct:true});
 assert.equal(Object.keys(first.answers).length,0);assert.equal(Object.keys(second.answers).length,0);assert.deepEqual(updated.answers,{'0':true});
 assert.throws(()=>recordLessonAnswer(first,{childProfileId:'child-b',questionIndex:0,correct:true}),/mismatch/);
 assert.throws(()=>lessonAttemptSummary(updated,{childProfileId:'child-b'}),/mismatch/);
});
test('one answer per question and completion requires all answers',()=>{
 const first=recordLessonAnswer(base(),{childProfileId:'child-a',questionIndex:0,correct:true});
 assert.throws(()=>recordLessonAnswer(first,{childProfileId:'child-a',questionIndex:0,correct:false}),/already answered/);
 assert.throws(()=>completeLessonAttempt(first,{childProfileId:'child-a',completedAt:end}),/All questions/);
 const second=recordLessonAnswer(first,{childProfileId:'child-a',questionIndex:1,correct:false});
 const done=completeLessonAttempt(second,{childProfileId:'child-a',completedAt:end});
 assert.deepEqual(lessonAttemptSummary(done,{childProfileId:'child-a'}),{childProfileId:'child-a',lessonId:'maths-y5-01',attemptId:'attempt-1',answered:2,total:2,correct:1,completed:true,percentCorrect:50});
 assert.equal(second.completedAt,null);
 assert.throws(()=>recordLessonAnswer(done,{childProfileId:'child-a',questionIndex:0,correct:true}),/Completed/);
 assert.throws(()=>completeLessonAttempt(done,{childProfileId:'child-a',completedAt:end}),/already completed/);
});
test('reject invalid timestamps, indexes, values and malformed data',()=>{
 assert.throws(()=>createLessonAttempt({childProfileId:'',lessonId:'maths',attemptId:'a',totalQuestions:2,startedAt:start}),/identifiers/);
 assert.throws(()=>createLessonAttempt({childProfileId:'child-a',lessonId:'maths',attemptId:'a',totalQuestions:51,startedAt:start}),/question count/);
 assert.throws(()=>recordLessonAnswer(base(),{childProfileId:'child-a',questionIndex:2,correct:true}),/question index/);
 assert.throws(()=>recordLessonAnswer(base(),{childProfileId:'child-a',questionIndex:0,correct:'true'}),/boolean/);
 assert.throws(()=>completeLessonAttempt(base(),{childProfileId:'child-a',completedAt:'2026-11-15T00:00:00.000Z'}),/timestamp/);
 assert.throws(()=>lessonAttemptSummary({...base(),answers:{'2':true}},{childProfileId:'child-a'}),/answers/);
});
