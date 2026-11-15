import goals from '../curriculum/eyfs-2026-goal-map.json' with {type:'json'};
import links from '../curriculum/eyfs-activity-goal-evidence.json' with {type:'json'};
import {eyfsPlayActivities} from '../src/eyfsPlayActivities.js';
const allGoals=goals.areas.flatMap(a=>a.goals);
const knownGoals=new Set(allGoals.map(g=>g.id));
const knownActivities=new Set(eyfsPlayActivities.map(a=>a.id));
const issues=[];
if(allGoals.length!==17)issues.push('Expected 17 statutory goal references');
if(links.goalLinks.length!==allGoals.length)issues.push('Goal link count mismatch');
if(new Set(links.goalLinks.map(x=>x.goalId)).size!==links.goalLinks.length)issues.push('Duplicate goal links');
for(const link of links.goalLinks){
 if(!knownGoals.has(link.goalId))issues.push('Unknown goal: '+link.goalId);
 if(!link.educatorReviewRequired)issues.push('Missing educator review flag: '+link.goalId);
 if(link.verifiedEvidenceIds.length)issues.push('Unreviewed mapping cannot claim verified evidence: '+link.goalId);
 if(link.alignmentStatus!==(link.candidateActivityIds.length?'candidate-unreviewed':'gap-no-candidate'))issues.push('Incorrect candidate status: '+link.goalId);
 for(const id of link.candidateActivityIds)if(!knownActivities.has(id))issues.push('Unknown activity: '+id);
}
for(const g of allGoals)if(!links.goalLinks.some(x=>x.goalId===g.id))issues.push('Unmapped goal: '+g.id);
const summary={statutoryGoalReferences:allGoals.length,goalsWithCandidateLinks:links.goalLinks.filter(x=>x.candidateActivityIds.length).length,goalsWithoutCandidateLinks:links.goalLinks.filter(x=>!x.candidateActivityIds.length).map(x=>x.goalId),verifiedGoals:0,educatorReviewOutstanding:true,issues};
console.log(JSON.stringify(summary,null,2));if(issues.length)process.exitCode=1;
