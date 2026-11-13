/** Friendly milestone celebration copy; derived from saved progress. */
export function milestoneCelebration(milestone){
 if(!milestone||typeof milestone.name!=='string'||!milestone.earned)return null;
 return {title:'Achievement unlocked!',message:milestone.emoji+' '+milestone.name+' — wonderful exploring!',accessibleLabel:'Achievement unlocked: '+milestone.name};
}
export function earnedMilestoneCelebrations(milestones){
 if(!Array.isArray(milestones))return [];
 return milestones.map(milestoneCelebration).filter(Boolean);
}
