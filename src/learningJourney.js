import {progressSummary} from './lessonProgress.js';
import {learningStreak} from './learningStreaks.js';
import {challengeKeepsakes} from './challengeKeepsakes.js';
/** Pure, accessible journey stops based on the current child's saved achievements. */
export function learningJourney(save,subjects){
 const lessons=progressSummary(save,subjects).total;
 const days=learningStreak(save).learningDays;
 const challenges=challengeKeepsakes(save).total;
 const stops=[
  {id:'first-lesson',emoji:'🌱',title:'First learning step',current:lessons,goal:1,destination:'learn'},
  {id:'five-lessons',emoji:'⭐',title:'Learning explorer',current:lessons,goal:5,destination:'learn'},
  {id:'three-days',emoji:'🔥',title:'Three learning days',current:days,goal:3,destination:'learn'},
  {id:'first-challenge',emoji:'🌈',title:'Rainbow challenge',current:challenges,goal:1,destination:'challenges'},
  {id:'fifteen-lessons',emoji:'🏆',title:'Knowledge champion',current:lessons,goal:15,destination:'learn'}
 ];
 return stops.map(stop=>({...stop,complete:stop.current>=stop.goal,progress:Math.min(stop.current,stop.goal)}));
}
