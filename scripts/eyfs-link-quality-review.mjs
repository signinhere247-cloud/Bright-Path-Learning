import links from '../curriculum/eyfs-activity-goal-evidence.json' with {type:'json'};
import goals from '../curriculum/eyfs-2026-goal-map.json' with {type:'json'};
import {eyfsPlayActivities} from '../src/eyfsPlayActivities.js';

const goalInfo=new Map(goals.areas.flatMap(a=>a.goals.map(g=>[g.id,{name:g.name,area:a.name}])));
const activities=new Map(eyfsPlayActivities.map(a=>[a.id,a]));
const review=links.goalLinks.map(link=>{
 const g=goalInfo.get(link.goalId);
 const candidates=link.candidateActivityIds.map(id=>{
  const a=activities.get(id);
  const sameArea=!!a&&a.area===g?.area;
  return {activityId:id,activityTitle:a?.title??null,sameLearningArea:sameArea,hasPracticalSteps:!!a&&a.steps.length>=3,hasAccessibilityAndSafety:!!a&&!!a.alternatives&&!!a.safety,alignmentStrength:'not-reviewed',educatorDecisionRequired:true};
 });
 return {goalId:link.goalId,goalName:g?.name??null,learningArea:g?.area??null,candidates,educatorAlignmentStatus:'pending',evidenceOfChildAttainment:false,reviewQuestions:['Does the activity meaningfully practise the specific goal, not just the general area?','Are there suitable observation opportunities without compulsory assessment?','Are adaptations age-appropriate and inclusive?','Does the activity avoid implying mastery from participation alone?']};
});
const errors=[];
for(const r of review){
 if(!r.goalName)errors.push('Unknown goal '+r.goalId);
 if(!r.candidates.length)errors.push('No candidate for '+r.goalId);
 for(const c of r.candidates){
  if(!c.sameLearningArea)errors.push('Area mismatch '+r.goalId+' / '+c.activityId);
  if(!c.hasPracticalSteps||!c.hasAccessibilityAndSafety)errors.push('Incomplete guide '+c.activityId);
 }
}
const report={goalCount:review.length,candidateLinks:review.reduce((n,r)=>n+r.candidates.length,0),educatorVerifiedLinks:0,errors,review};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
