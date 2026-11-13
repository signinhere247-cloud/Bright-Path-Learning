import test from 'node:test';
import assert from 'node:assert/strict';
import {lessonStepProgress,lessonAnswerFeedback} from '../src/lessonExperience.js';
test('lesson step labels and values reflect progress',()=>{
 assert.deepEqual(lessonStepProgress(1,5),{current:2,total:5,percent:20,label:'Question 2 of 5'});
 assert.throws(()=>lessonStepProgress(5,5),/Invalid lesson step/);
});
test('feedback is encouraging and identifies final action',()=>{
 assert.match(lessonAnswerFeedback(false,false).heading,/Good try/);
 assert.equal(lessonAnswerFeedback(true,true).nextLabel,'See my results');
});
