import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseLearningGoal,clearLearningGoal,learningGoalProgress} from '../src/learningGoals.js';
test('learning goals track actual completed topics',()=>{
 const save=chooseLearningGoal({completed:{'Maths:Addition':true}},['Maths','English'],'Maths',3);
 const goal=learningGoalProgress(save,['Maths','English']);
 assert.equal(goal.progress,1);
 assert.equal(goal.achieved,false);
 assert.equal(clearLearningGoal(save).learningGoal,undefined);
});
test('goals cannot target an unknown subject or unsupported number',()=>{
 assert.throws(()=>chooseLearningGoal({},['Maths'],'Science',3));
 assert.throws(()=>chooseLearningGoal({},['Maths'],'Maths',999));
});
test('completed goals celebrate without awarding coins',()=>{
 const save=chooseLearningGoal({completed:{'Maths:Addition':true},coins:15},['Maths'],'Maths',1);
 assert.equal(learningGoalProgress(save,['Maths']).achieved,true);
 assert.equal(save.coins,15);
});
