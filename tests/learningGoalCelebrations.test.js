import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseLearningGoal,clearLearningGoal} from '../src/learningGoals.js';
import {recogniseLearningGoal,learningGoalCelebration} from '../src/learningGoalCelebrations.js';
test('completed goal receives a star once and never changes coins',()=>{
 const save=chooseLearningGoal({coins:20,completed:{'Maths:Addition':true}},['Maths'],'Maths',1);
 const awarded=recogniseLearningGoal(save,['Maths']);
 assert.deepEqual(awarded.goalKeepsakes,['Maths:1']);
 assert.deepEqual(recogniseLearningGoal(awarded,['Maths']).goalKeepsakes,['Maths:1']);
 assert.equal(awarded.coins,20);
 assert.deepEqual(clearLearningGoal(awarded).goalKeepsakes,['Maths:1']);
});
test('unfinished goals do not receive keepsakes',()=>{
 const save=chooseLearningGoal({completed:{}},['Maths'],'Maths',3);
 assert.equal(recogniseLearningGoal(save,['Maths']),save);
 assert.equal(learningGoalCelebration(save,['Maths']).celebrate,false);
});
