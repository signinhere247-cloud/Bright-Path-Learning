import test from 'node:test';
import assert from 'node:assert/strict';
import {upperKs2ReasoningLessons,getUpperKs2ReasoningLesson} from '../src/upperKs2ReasoningLessons.js';
test('ten reasoning lessons with five valid questions each',()=>{
 assert.equal(upperKs2ReasoningLessons.length,10);
 assert.equal(new Set(upperKs2ReasoningLessons.map(x=>x.id)).size,10);
 for(const year of [5,6])assert.equal(upperKs2ReasoningLessons.filter(x=>x.year===year).length,5);
 for(const l of upperKs2ReasoningLessons){assert.ok(l.title&&l.focus&&l.explanation);assert.equal(l.workedExamples.length,2);assert.equal(l.questions.length,5);for(const q of l.questions){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(q.options.includes(q.answer));assert.ok(q.explanation.length>8);}}
});
test('year-bound retrieval and defensive copying',()=>{
 const x=getUpperKs2ReasoningLesson('UKS2-REA-Y5-01',5);x.questions[0].options.push('changed');assert.equal(upperKs2ReasoningLessons[0].questions[0].options.length,3);
 assert.throws(()=>getUpperKs2ReasoningLesson('UKS2-REA-Y5-01',6),/not found/);
 assert.throws(()=>getUpperKs2ReasoningLesson('UKS2-REA-Y5-01',4),/Year must/);
});
