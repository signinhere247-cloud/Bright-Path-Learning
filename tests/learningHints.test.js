import test from 'node:test';
import assert from 'node:assert/strict';
import {learningHint} from '../src/learningHints.js';
test('incorrect answers get an explanation and supportive next step',()=>{
 const hint=learningHint({answer:'4',explanation:'Two plus two makes four.'},'3');
 assert.equal(hint.correct,false);
 assert.equal(hint.explanation,'Two plus two makes four.');
 assert.match(hint.suggestion,/practise/);
});
test('correct answers get positive feedback and fallback explanation',()=>{
 const hint=learningHint({answer:'blue'},'blue');
 assert.equal(hint.correct,true);
 assert.match(hint.title,/You got it/);
 assert.ok(hint.explanation);
});
