import {journeySuggestions} from './journeySuggestions.js';
import {learningGoalProgress} from './learningGoals.js';
import {dailyLearningChallenge} from './dailyLearningChallenges.js';
/** Gentle, evidence-based suggestions for this explorer, with no forced tasks. */
export function learningHubSuggestions(save,subjects,day){
 const suggestions=journeySuggestions(save,subjects).map(s=>({
  id:s.id,title:s.title,detail:s.detail,destination:'learn',priority:s.priority
 }));
 const goal=learningGoalProgress(save,subjects);
 if(goal&&!goal.achieved)suggestions.unshift({
  id:'active-goal',title:'Keep going with '+goal.subject,
  detail:goal.progress+' of '+goal.target+' topics towards your goal.',destination:'learn',priority:0
 });
 const challenge=dailyLearningChallenge(save,day);
 if(!challenge.complete)suggestions.push({
  id:'daily-challenge',title:'Try today’s learning challenge',
  detail:challenge.count+' of '+challenge.goal+' different subjects explored.',destination:'challenges',priority:2
 });
 if(!goal)suggestions.push({id:'choose-goal',title:'Choose your own learning goal',detail:'Pick something fun to work towards at your own pace.',destination:'goals',priority:3});
 // Keep suggestions varied: avoid repeating the active goal's subject as a generic exploration card.
 const unique=suggestions.filter((item,index,all)=>!item.id.startsWith('explore:')||!all.some(other=>other.id==='active-goal'&&other.title.endsWith(item.subject||'')));
 return unique.sort((a,b)=>a.priority-b.priority).slice(0,3);
}
