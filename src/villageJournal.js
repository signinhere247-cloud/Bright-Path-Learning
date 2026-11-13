import {DISCOVERIES} from './villageActivities.js';
/** A child-specific field journal derived from existing rewarded discoveries. */
export function villageJournal(save,day){
 if(typeof day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(day))throw Error('Invalid journal date.');
 return DISCOVERIES.map(d=>{
  const last=save?.discoveries?.[d.id];
  const visited=typeof last==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(last);
  return {id:d.id,name:d.name,visited,completedToday:last===day,lastVisit:visited?last:null,explanation:visited?d.explanation:null};
 });
}
export function journalSummary(save,day){
 const entries=villageJournal(save,day);
 return {discovered:entries.filter(e=>e.visited).length,total:entries.length,today:entries.filter(e=>e.completedToday).length};
}
