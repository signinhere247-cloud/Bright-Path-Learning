import {villageLearningHighlights} from './villageLearningHighlights.js';
/** Next combined milestone, based on existing child progress; no rewards or save changes. */
export function adventureLearningMilestoneProgress(save,subjects,day){
 const progress=villageLearningHighlights(save,subjects,day);
 const targets=[
  {id:'adventure-learning:first',title:'Curious Explorer',discoveries:1,lessons:1},
  {id:'adventure-learning:growing',title:'Growing Adventurer',discoveries:3,lessons:5},
  {id:'adventure-learning:champion',title:'Village Learning Champion',discoveries:progress.totalDiscoveries,lessons:10}
 ];
 const next=targets.find(target=>progress.discoveries<target.discoveries||progress.lessons<target.lessons);
 if(!next)return {complete:true,title:'All adventure learning milestones unlocked!',message:'Enjoy your discoveries and keep learning at your own pace.'};
 const discovered=Math.min(progress.discoveries,next.discoveries);
 const learned=Math.min(progress.lessons,next.lessons);
 return {complete:false,id:next.id,title:next.title,discoveries:discovered,discoveriesTarget:next.discoveries,lessons:learned,lessonsTarget:next.lessons,message:'Every little step counts. Explore or learn whenever you feel ready.'};
}
