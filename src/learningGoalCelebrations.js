import {learningGoalProgress} from './learningGoals.js';
/** Preserve earned recognition without awarding or spending BrightCoins. */
export function recogniseLearningGoal(save,subjects){
 const goal=learningGoalProgress(save,subjects);
 if(!goal?.achieved)return save;
 const id=goal.subject+':'+goal.target;
 const existing=Array.isArray(save.goalKeepsakes)?save.goalKeepsakes.filter(x=>typeof x==='string'):[];
 if(existing.includes(id))return save;
 return {...save,goalKeepsakes:[...existing,id].slice(-100)};
}
export function learningGoalCelebration(save,subjects){
 const goal=learningGoalProgress(save,subjects);
 const earned=Array.isArray(save?.goalKeepsakes)?save.goalKeepsakes.filter(x=>typeof x==='string'):[];
 return {goal,earned:[...new Set(earned)],celebrate:Boolean(goal?.achieved),newlyEarned:Boolean(goal?.achieved&&!earned.includes(goal.subject+':'+goal.target))};
}
