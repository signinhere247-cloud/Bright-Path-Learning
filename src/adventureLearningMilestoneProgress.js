import {villageLearningHighlights} from './villageLearningHighlights.js';
import {adventureLearningTargets} from './adventureLearningTargets.js';
/** Next combined milestone, based on existing child progress; no rewards or save changes. */
export function adventureLearningMilestoneProgress(save,subjects,day){
 const progress=villageLearningHighlights(save,subjects,day);
 const next=adventureLearningTargets(progress.totalDiscoveries)
  .find(target=>progress.discoveries<target.discoveries||progress.lessons<target.lessons);
 if(!next)return {complete:true,title:'All adventure learning milestones unlocked!',message:'Enjoy your discoveries and keep learning at your own pace.'};
 return {complete:false,id:next.id,title:next.title,
  discoveries:Math.min(progress.discoveries,next.discoveries),discoveriesTarget:next.discoveries,
  lessons:Math.min(progress.lessons,next.lessons),lessonsTarget:next.lessons,
  message:'Every little step counts. Explore or learn whenever you feel ready.'};
}
