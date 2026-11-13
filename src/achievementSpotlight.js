import {achievementRecommendations} from './achievementRecommendations.js';
/** Choose one achievable, unfinished milestone from the current explorer's progress. */
export function achievementSpotlight(gallery){
 const [suggestion]=achievementRecommendations(gallery,1);
 if(!suggestion)return null;
 const {badge,progress,remaining,next}=suggestion;
 return {id:badge.id,title:badge.title,emoji:badge.emoji,progress,remaining,next};
}
