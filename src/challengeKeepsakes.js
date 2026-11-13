/** Recognition-only challenge keepsakes. No currency or purchases involved. */
import {validQuestDay} from './dailyQuests.js';
export function challengeKeepsakes(save){
 const entries=save?.dailySubjects&&typeof save.dailySubjects==='object'?save.dailySubjects:{};
 const completed=Object.entries(entries).filter(([day,subjects])=>validQuestDay(day)&&Array.isArray(subjects)&&new Set(subjects.filter(s=>typeof s==='string'&&s.trim())).size>=2).map(([day])=>day).sort();
 const total=completed.length;
 return {total,days:completed,badges:[
  {id:'first-challenge',name:'Curious Learner',emoji:'🌟',goal:1,earned:total>=1},
  {id:'three-challenges',name:'Brave Explorer',emoji:'🧭',goal:3,earned:total>=3},
  {id:'seven-challenges',name:'Rainbow Scholar',emoji:'🌈',goal:7,earned:total>=7}
 ]};
}
