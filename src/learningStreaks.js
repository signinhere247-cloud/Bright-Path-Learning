/** Gentle learning-day celebrations without punishing breaks or granting extra currency. */
const DAY=/^\d{4}-\d{2}-\d{2}$/;
function validDay(day){if(typeof day!=='string'||!DAY.test(day))return false;const date=new Date(day+'T12:00:00Z');return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===day}
export function recordLearningDay(save,day){
 if(!validDay(day))throw Error('Invalid learning date.');
 const days=Array.isArray(save?.learningDays)?save.learningDays.filter(validDay):[];
 return {...save,learningDays:[...new Set([...days,day])].sort().slice(-366)};
}
export function learningStreak(save){
 const days=[...new Set(Array.isArray(save?.learningDays)?save.learningDays.filter(validDay):[])].sort();
 let current=0;
 for(let i=days.length-1;i>=0;i--){
  if(i<days.length-1){
   const later=Date.parse(days[i+1]+'T12:00:00Z'),earlier=Date.parse(days[i]+'T12:00:00Z');
   if(later-earlier!==86400000)break;
  }
  current++;
 }
 const milestones=[1,3,7,14,30].filter(n=>days.length>=n);
 return {learningDays:days.length,latestDay:days.at(-1)||null,bestRecentRun:current,milestones};
}
