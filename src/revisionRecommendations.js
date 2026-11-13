import {validateLearningHistory} from './learningHistory.js';

/** Recommendations use recent recorded attempts only; no inferred scores for old lessons. */
export function revisionRecommendations(save,subjects,limit=5){
 if(!Array.isArray(subjects)||subjects.some(s=>typeof s!=='string'||!s.trim())||!Number.isInteger(limit)||limit<1||limit>20)throw Error('Invalid revision request.');
 const history=validateLearningHistory(save?.lessonHistory);
 const groups=new Map();
 for(const entry of history){
  if(!subjects.includes(entry.subject))continue;
  const key=JSON.stringify([entry.subject,entry.topic]);
  if(!groups.has(key))groups.set(key,[]);
  groups.get(key).push(entry);
 }
 const items=[];
 for(const [key,attempts] of groups){
  const recent=attempts.slice(-3),scores=recent.map(a=>a.correct/a.total*100);
  const average=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);
  const latest=Math.round(scores.at(-1));
  if(average>=80&&latest>=70)continue;
  const [subject,topic]=JSON.parse(key);
  items.push({subject,topic,average,latest,attempts:attempts.length,priority:latest<70?'Practise next':'Keep practising',lastAt:attempts.at(-1).at});
 }
 return items.sort((a,b)=>(a.latest<70?0:1)-(b.latest<70?0:1)||a.average-b.average||b.lastAt.localeCompare(a.lastAt)||a.subject.localeCompare(b.subject)).slice(0,limit);
}
