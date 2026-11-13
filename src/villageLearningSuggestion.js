import {discoveryLearningLink} from './discoveryLearningLinks.js';
import {progressSummary} from './lessonProgress.js';
import {practiceTopics} from './practiceTopics.js';
/** Read-only, child-specific academy suggestion following a village discovery. */
export function villageLearningSuggestion(save,discoveryId,subjects){
 const link=discoveryLearningLink(discoveryId,subjects);
 if(!link)return null;
 const subject=link.subject;
 const needs=practiceTopics(save,subject);
 if(needs.length){
  const topic=needs[0].topic;
  return {subject,kind:'practice',topic,title:'🎯 Practise '+topic,detail:'Build confidence with a '+subject+' topic you have tried before.'};
 }
 const completed=progressSummary(save,subjects).counts[subject]||0;
 return {subject,kind:'explore',topic:null,title:completed?'📚 Explore more '+subject:'📚 Try your first '+subject+' lesson',detail:completed?'You have completed '+completed+' '+subject+' topic'+(completed===1?'':'s')+'. Choose what to learn next.':'Discover a new '+subject+' topic at your own pace.'};
}
