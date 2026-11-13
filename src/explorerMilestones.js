import {keepsakeProgress} from './villageKeepsakes.js';
import {journalSummary} from './villageJournal.js';
/** Derived milestones; no extra currency and no shared family state. */
export function explorerMilestones(save,day){
 const journal=journalSummary(save,day),keepsakes=keepsakeProgress(save);
 const lessons=Object.values(save?.completed||{}).filter(v=>v===true).length;
 const pet=save?.pet==='cat'||save?.pet==='dog';
 const milestones=[
  {id:'first-lesson',name:'First Steps',emoji:'📚',earned:lessons>=1,progress:Math.min(lessons,1),goal:1},
  {id:'five-lessons',name:'Learning Star',emoji:'🌟',earned:lessons>=5,progress:Math.min(lessons,5),goal:5},
  {id:'first-discovery',name:'Village Explorer',emoji:'🌿',earned:journal.discovered>=1,progress:Math.min(journal.discovered,1),goal:1},
  {id:'village-master',name:'Village Adventurer',emoji:'🧭',earned:journal.discovered>=journal.total,progress:journal.discovered,goal:journal.total},
  {id:'keepsake-collector',name:'Keepsake Collector',emoji:'✨',earned:keepsakes.unlocked>=3,progress:Math.min(keepsakes.unlocked,3),goal:3},
  {id:'pet-friend',name:'Animal Friend',emoji:'🐾',earned:pet,progress:Number(pet),goal:1}
 ];
 return {milestones,earned:milestones.filter(m=>m.earned).length,total:milestones.length};
}
