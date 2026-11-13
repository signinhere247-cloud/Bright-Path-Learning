import {progressSummary} from './lessonProgress.js';
/** Optional per-explorer subject goal. No deadline or currency penalty. */
export function chooseLearningGoal(save,subjects,subject,target){
 if(!Array.isArray(subjects)||!subjects.includes(subject)||![1,3,5,10].includes(target))throw Error('Choose a valid subject and goal.');
 return {...save,learningGoal:{subject,target}};
}
export function clearLearningGoal(save){const next={...save};delete next.learningGoal;return next;}
export function learningGoalProgress(save,subjects){
 const goal=save?.learningGoal;
 if(!goal||!Array.isArray(subjects)||!subjects.includes(goal.subject)||![1,3,5,10].includes(goal.target))return null;
 const completed=progressSummary(save,subjects).counts[goal.subject]||0;
 return {subject:goal.subject,target:goal.target,completed,progress:Math.min(completed,goal.target),achieved:completed>=goal.target};
}
