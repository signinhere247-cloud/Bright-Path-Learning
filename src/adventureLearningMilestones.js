import {villageLearningHighlights} from './villageLearningHighlights.js';
import {adventureLearningTargets} from './adventureLearningTargets.js';
/** Replayable cross-activity celebrations, based on saved progress only. */
export function adventureLearningMilestones(save,subjects,day){
 const highlights=villageLearningHighlights(save,subjects,day);
 return adventureLearningTargets(highlights.totalDiscoveries)
  .filter(target=>highlights.discoveries>=target.discoveries&&highlights.lessons>=target.lessons)
  .map(({id,emoji,title,message})=>({id,emoji,title,message}));
}
