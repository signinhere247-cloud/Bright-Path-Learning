import {progressSummary} from './lessonProgress.js';
import {practiceTopics} from './practiceTopics.js';
/** Choose useful next steps from this explorer's own saved progress. */
export function journeySuggestions(save,subjects){
 const allowed=Array.isArray(subjects)?subjects.filter(s=>typeof s==='string'&&s.trim()):[];
 if(!allowed.length)return [];
 const counts=progressSummary(save,allowed).counts;
 const suggestions=[];
 for(const subject of allowed){
  const needs=practiceTopics(save,subject);
  if(needs.length)suggestions.push({id:'practise:'+subject,subject,topic:needs[0].topic,kind:'practice',priority:0,title:'Practise '+needs[0].topic,detail:'Build confidence with another '+subject+' lesson.'});
 }
 const sorted=[...allowed].sort((a,b)=>counts[a]-counts[b]||a.localeCompare(b));
 for(const subject of sorted){
  suggestions.push({id:'explore:'+subject,subject,topic:null,kind:'explore',priority:1,title:'Explore '+subject,detail:counts[subject]?'Try another topic in '+subject+'.':'Discover your first '+subject+' lesson.'});
 }
 return suggestions.sort((a,b)=>a.priority-b.priority).slice(0,3);
}
