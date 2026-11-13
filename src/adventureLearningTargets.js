/** Shared milestone thresholds used by both celebrations and progress tracking. */
export function adventureLearningTargets(totalDiscoveries){
 const total=Number.isInteger(totalDiscoveries)&&totalDiscoveries>0?totalDiscoveries:0;
 return [
  {id:'adventure-learning:first',title:'Curious Explorer',emoji:'🌱',discoveries:1,lessons:1,message:'You explored the village and completed an Academy lesson!'},
  {id:'adventure-learning:growing',title:'Growing Adventurer',emoji:'✨',discoveries:3,lessons:5,message:'Three village discoveries and five Academy lessons — keep exploring!'},
  {id:'adventure-learning:champion',title:'Village Learning Champion',emoji:'🏆',discoveries:total,lessons:10,message:'Every village discovery explored, and ten Academy lessons completed!'}
 ].filter(target=>total>=target.discoveries&&target.discoveries>0);
}
