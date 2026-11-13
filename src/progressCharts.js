import {validateLearningHistory} from './learningHistory.js';

/** Read-only chart data: recent subject results and first/last performance windows. */
export function buildProgressCharts(save,subjects){
 const history=validateLearningHistory(save?.lessonHistory);
 if(!Array.isArray(subjects)||subjects.some(s=>typeof s!=='string'))throw Error('Invalid subjects.');
 return subjects.map(subject=>{
  const scores=history.filter(h=>h.subject===subject).map(h=>Math.round(h.correct/h.total*100));
  if(!scores.length)return {subject,count:0,average:null,recentAverage:null,change:null,points:[]};
  const mean=a=>Math.round(a.reduce((sum,n)=>sum+n,0)/a.length);
  const first=scores.slice(0,Math.min(5,scores.length));
  const last=scores.slice(-Math.min(5,scores.length));
  return {subject,count:scores.length,average:mean(scores),recentAverage:mean(last),change:scores.length>=6?mean(last)-mean(first):null,points:scores.slice(-10)};
 });
}
