import {progressSummary} from './lessonProgress.js';
import {journalSummary} from './villageJournal.js';
import {keepsakeProgress} from './villageKeepsakes.js';
import {explorerMilestones} from './explorerMilestones.js';
/** Read-only overview derived from one explorer's saved data. */
export function adventureOverview(save,subjects,day){
 const learning=progressSummary(save,subjects);
 const village=journalSummary(save,day);
 const keepsakes=keepsakeProgress(save);
 const milestones=explorerMilestones(save,day);
 return {lessons:learning.total,subjects:learning.counts,discovered:village.discovered,discoveriesTotal:village.total,
 keepsakes:keepsakes.unlocked,keepsakesTotal:keepsakes.total,milestones:milestones.earned,milestonesTotal:milestones.total,
 pet:save?.pet==='cat'||save?.pet==='dog'?save.pet:null,coins:Number.isSafeInteger(save?.coins)?save.coins:0};
}
