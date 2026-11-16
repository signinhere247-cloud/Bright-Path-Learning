import test from 'node:test';
import assert from 'node:assert/strict';
import {previewDraftQuestion,evaluateDraftAnswer} from '../src/draftLessonExperienceAdapter.js';
const params={lessonId:'UKS2-STA-Y6-03',year:6,index:0};
test('draft lesson adapter denies pupil access by default',()=>{
 assert.throws(()=>previewDraftQuestion(params),/not available/);
 assert.throws(()=>evaluateDraftAnswer({...params,selectedAnswer:'6'}),/not available/);
});
test('reviewer sees options but no answer before submitting',()=>{
 const view=previewDraftQuestion({...params,reviewMode:true});
 assert.match(view.title,/mean average/);
 assert.equal(view.options.length,3);
 assert.equal(view.progress.current,1);
 assert.equal(view.progress.total,5);
 assert.equal(Object.hasOwn(view,'answer'),false);
 assert.equal(Object.hasOwn(view,'explanation'),false);
 view.options.push('changed');
 assert.equal(previewDraftQuestion({...params,reviewMode:true}).options.length,3);
});
test('answer submission gives feedback without side effects',()=>{
 const yes=evaluateDraftAnswer({...params,reviewMode:true,selectedAnswer:'6'});
 assert.equal(yes.correct,true);
 assert.match(yes.explanation,/18/);
 const no=evaluateDraftAnswer({...params,reviewMode:true,selectedAnswer:'5'});
 assert.equal(no.correct,false);
 assert.equal(no.correctAnswer,'6');
 assert.equal(no.isLast,false);
});
test('invalid year, index and answer are rejected',()=>{
 assert.throws(()=>previewDraftQuestion({...params,year:5,reviewMode:true}),/not found/);
 assert.throws(()=>previewDraftQuestion({...params,index:5,reviewMode:true}),/Invalid question index/);
 assert.throws(()=>evaluateDraftAnswer({...params,reviewMode:true,selectedAnswer:'not an option'}),/supplied options/);
});
