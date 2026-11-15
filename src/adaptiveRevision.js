import {validateLearningHistory} from './learningHistory.js';
/** Per-explorer adaptive revision recommendations. All data stays in the explorer save. */
export function revisionPlan(save,subject,topics,limit=5){
 if(typeof subject!=='string'||!subject||!Array.isArray(topics)||!Number.isInteger(limit)||limit<1||limit>20)throw Error('Invalid revision plan.');
 const names=[...new Set(topics.map(t=>Array.isArray(t)?t[0]:t))].filter(t=>typeof t==='string'&&t.trim());
 const history=validateLearningHistory(save?.lessonHistory);
 const needs=save?.practiceNeeds&&typeof save.practiceNeeds==='object'&&!Array.isArray(save.practiceNeeds)?save.practiceNeeds:{};
 const completed=save?.completed&&typeof save.completed==='object'?save.completed:{};
 const items=names.map(topic=>{
  const attempts=history.filter(h=>h.subject===subject&&h.topic===topic).slice(-3);
  const latest=attempts.length?Math.round(100*attempts.at(-1).correct/attempts.at(-1).total):null;
  const average=attempts.length?Math.round(attempts.reduce((sum,a)=>sum+100*a.correct/a.total,0)/attempts.length):null;
  const key=subject+':'+topic,misses=Number.isInteger(needs[key])?Math.max(0,needs[key]):0;
  const mastered=attempts.length>=2&&average>=85&&latest>=85&&misses===0;
  const priority=attempts.length===0?'New topic':latest<70||misses>=2?'Focus practice':latest<85||misses>0?'Build confidence':mastered?'Strong progress':'Keep practising';
  const rank=priority==='Focus practice'?0:priority==='Build confidence'?1:priority==='Keep practising'?2:priority==='New topic'?3:4;
  return {topic,latest,average,attempts:attempts.length,misses,completed:completed[key]===true,mastered,priority,rank};
 });
 return items.sort((a,b)=>a.rank-b.rank||b.misses-a.misses||(a.average??101)-(b.average??101)||a.topic.localeCompare(b.topic)).slice(0,limit);
}
/** Rotate a retry's question order deterministically, keeping all original questions. */
export function revisionQuestionOrder(questions,attempts=0){
 if(!Array.isArray(questions)||!Number.isInteger(attempts)||attempts<0)throw Error('Invalid revision questions.');
 const result=questions.map(q=>({...q,options:[...q.options]}));
 if(result.length<2)return result;
 const offset=attempts%result.length;
 return result.slice(offset).concat(result.slice(0,offset));
}
export function assessmentSummary(save,subject,topics){
 const plan=revisionPlan(save,subject,topics,20);
 return {total:plan.length,attempted:plan.filter(x=>x.attempts>0).length,mastered:plan.filter(x=>x.mastered).length,needsSupport:plan.filter(x=>x.priority==='Focus practice').length,plan};
}
