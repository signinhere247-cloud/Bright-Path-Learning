import {villageLearningHighlights} from './villageLearningHighlights.js';
/** Replayable cross-activity celebrations, based on saved progress only. */
export function adventureLearningMilestones(save,subjects,day){
 const highlights=villageLearningHighlights(save,subjects,day);
 const milestones=[];
 if(highlights.discoveries>=1&&highlights.lessons>=1)milestones.push({id:'adventure-learning:first',emoji:'🌱',title:'Curious Explorer',message:'You explored the village and completed an Academy lesson!'});
 if(highlights.discoveries>=3&&highlights.lessons>=5)milestones.push({id:'adventure-learning:growing',emoji:'✨',title:'Growing Adventurer',message:'Three village discoveries and five Academy lessons — keep exploring!'});
 if(highlights.discoveries>=highlights.totalDiscoveries&&highlights.totalDiscoveries>0&&highlights.lessons>=10)milestones.push({id:'adventure-learning:champion',emoji:'🏆',title:'Village Learning Champion',message:'Every village discovery explored, and ten Academy lessons completed!'});
 return milestones;
}
