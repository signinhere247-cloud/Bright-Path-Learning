import goals from '../curriculum/eyfs-2026-goal-map.json' with {type:'json'};
import backlog from '../curriculum/eyfs-targeted-improvement-backlog.json' with {type:'json'};
const known=new Set(goals.areas.flatMap(a=>a.goals.map(g=>g.id)));
const errors=[];
const seen=new Set();
for(const item of backlog.items){
 if(!known.has(item.goalId))errors.push('Unknown goal '+item.goalId);
 if(seen.has(item.goalId))errors.push('Duplicate goal '+item.goalId);
 seen.add(item.goalId);
 if(!['high','medium','low'].includes(item.priority))errors.push('Invalid priority '+item.goalId);
 if(item.focus.length<25||item.proposal.length<25)errors.push('Incomplete improvement candidate '+item.goalId);
}
const result={goalReferences:known.size,improvementCandidates:backlog.items.length,highPriority:backlog.items.filter(x=>x.priority==='high').length,reviewStatus:'editorial-candidates-unverified',errors};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
