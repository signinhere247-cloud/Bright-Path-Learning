import {villageJournal,journalSummary} from './villageJournal.js';
/** Read-only destination badges from the active child's saved discovery journal. */
export function destinationDiscoveryProgress(save,day,destinations){
 const journal=villageJournal(save,day);
 const byId=new Map(journal.map(entry=>[entry.id,entry]));
 const physical=(destinations?.physical||[]).map(place=>{
  const entry=byId.get(place.id);
  return {...place,discovery:entry?{visited:entry.visited,completedToday:entry.completedToday,lastVisit:entry.lastVisit}:null};
 });
 return {physical,activities:destinations?.activities||[],summary:journalSummary(save,day)};
}
