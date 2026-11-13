import {progressSummary} from './lessonProgress.js';
import {historySummary} from './learningHistory.js';

/** Read-only, device-local family report. No child data is sent anywhere. */
export function buildParentReport(family,subjects){
 if(!family||!Array.isArray(family.profiles)||!Array.isArray(subjects)||!subjects.length)throw Error('Invalid family report input.');
 return family.profiles.map(p=>{
  if(!p||!p.save||typeof p.save.profile!=='string'||!Number.isInteger(p.age)||p.age<3||p.age>16)throw Error('Invalid explorer report data.');
  const progress=progressSummary(p.save,subjects);
  return {id:p.id,name:p.save.profile,age:p.age,coins:p.save.coins,pet:p.save.pet||null,
   completedLessons:progress.total,subjects:{...progress.counts},badges:[...progress.badges],
   history:historySummary(p.save,subjects),current:p.id===family.activeId};
 });
}
