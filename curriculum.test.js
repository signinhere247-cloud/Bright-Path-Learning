import test from 'node:test';
import assert from 'node:assert/strict';
import {learningBand,mathsQuestions,factQuestions,questionSet} from '../src/curriculum.js';
test('learning bands cover 3 to 16',()=>{assert.equal(learningBand(3),'early');assert.equal(learningBand(8),'primary');assert.equal(learningBand(12),'intermediate');assert.equal(learningBand(16),'advanced')});
test('invalid learning ages rejected',()=>{for(const age of [2,17,NaN,4.5])assert.throws(()=>learningBand(age))});
test('maths questions have one correct answer and three distinct options',()=>{for(const topic of ['Counting','Addition','Subtraction','Multiplication','Division','Fractions','Percentages','Algebra'])for(const age of [4,9,13,16]){const q=mathsQuestions(topic,age);assert.equal(q.length,20);for(const item of q){assert.equal(new Set(item.options).size,3);assert.ok(item.options.includes(item.answer));assert.ok(item.prompt)}}});
test('higher age raises addition difficulty',()=>{const early=mathsQuestions('Addition',4).map(q=>Number(q.answer));const advanced=mathsQuestions('Addition',16).map(q=>Number(q.answer));assert.ok(Math.max(...advanced)>Math.max(...early))});
test('fact questions do not repeat the same three facts to claim 15 questions',()=>{const facts={Space:[['Earth orbits what?','Sun',['Sun','Moon','Mars']]]};assert.equal(factQuestions(facts,'Space').length,1);assert.equal(questionSet('Science','Space',9,facts).filter(q=>q.prompt==='Earth orbits what?').length,1)});
test('unknown topics fail explicitly',()=>assert.throws(()=>mathsQuestions('Unknown',9)));
