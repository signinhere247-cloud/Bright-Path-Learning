import test from 'node:test';
import assert from 'node:assert/strict';
import {revisionPlan,revisionQuestionOrder,assessmentSummary} from '../src/adaptiveRevision.js';
const at='2026-11-15T10:00:00.000Z';
const attempt=(topic,correct)=>({subject:'Maths',topic,correct,total:10,passed:correct>=7,at});
test('revision plan prioritises low scores and repeated missed answers',()=>{
 const save={completed:{'Maths:Fractions':true},practiceNeeds:{'Maths:Fractions':2},lessonHistory:[attempt('Fractions',5),attempt('Fractions',6),attempt('Algebra',9),attempt('Algebra',10)]};
 const plan=revisionPlan(save,'Maths',['Algebra','Fractions','Geometry']);
 assert.deepEqual(plan.map(x=>x.topic),['Fractions','Geometry','Algebra']);
 assert.equal(plan[0].priority,'Focus practice');assert.equal(plan[0].latest,60);
 assert.equal(plan[1].priority,'New topic');assert.equal(plan[2].mastered,true);
 const summary=assessmentSummary(save,'Maths',['Algebra','Fractions','Geometry']);
 assert.deepEqual({attempted:summary.attempted,mastered:summary.mastered,needsSupport:summary.needsSupport},{attempted:2,mastered:1,needsSupport:1});
});
test('revision data stays independent between explorers',()=>{
 const a={lessonHistory:[attempt('Fractions',3)]},b={lessonHistory:[attempt('Fractions',10)]};
 assert.equal(revisionPlan(a,'Maths',['Fractions'])[0].priority,'Focus practice');
 assert.notEqual(revisionPlan(b,'Maths',['Fractions'])[0].priority,'Focus practice');
});
test('legacy saves work and revision order is deterministic without mutation',()=>{
 const plan=revisionPlan({completed:{}},'Maths',['Fractions']);
 assert.equal(plan[0].priority,'New topic');
 const questions=[{prompt:'a',options:['1','2','3']},{prompt:'b',options:['4','5','6']},{prompt:'c',options:['7','8','9']}];
 const shifted=revisionQuestionOrder(questions,1);
 assert.deepEqual(shifted.map(q=>q.prompt),['b','c','a']);
 shifted[0].options.push('10');assert.equal(questions[1].options.length,3);
 assert.throws(()=>revisionQuestionOrder(questions,-1));
});
