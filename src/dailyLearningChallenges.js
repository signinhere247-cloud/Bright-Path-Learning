/** Optional daily subject variety challenge, independent of reward claims. */
import {validQuestDay} from './dailyQuests.js';
export function recordDailySubject(save,day,subject){
 if(!validQuestDay(day)||typeof subject!=='string'||!subject.trim()||subject.length>80)throw Error('Invalid daily subject.');
 const previous=save?.dailySubjects?.[day]||[];
 const unique=[...new Set([...previous,subject])].slice(0,20);
 const entries=Object.entries(save?.dailySubjects||{}).filter(([key])=>validQuestDay(key)).sort(([a],[b])=>a.localeCompare(b)).slice(-29);
 return {...save,dailySubjects:{...Object.fromEntries(entries),[day]:unique}};
}
export function dailyLearningChallenge(save,day){
 if(!validQuestDay(day))throw Error('Invalid challenge date.');
 const subjects=[...new Set(Array.isArray(save?.dailySubjects?.[day])?save.dailySubjects[day]:[])];
 const count=Math.min(2,subjects.length);
 return {title:'Try two different subjects 🌈',description:'Pass a lesson in two different subjects today. One is a great start!',count,goal:2,complete:count===2,subjects};
}
