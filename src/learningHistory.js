/** Bounded, per-explorer lesson attempts. Older saves without history remain valid. */
export const HISTORY_LIMIT=200;
export function validateLearningHistory(history){
 if(history===undefined)return [];
 if(!Array.isArray(history)||history.length>HISTORY_LIMIT)throw Error('Invalid lesson history.');
 for(const h of history){
  if(!h||typeof h!=='object'||Array.isArray(h)||typeof h.subject!=='string'||!h.subject.trim()||h.subject.length>40||typeof h.topic!=='string'||!h.topic.trim()||h.topic.length>100||!Number.isInteger(h.correct)||!Number.isInteger(h.total)||h.total<1||h.total>100||h.correct<0||h.correct>h.total||typeof h.at!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(h.at)||!Number.isFinite(Date.parse(h.at))||typeof h.passed!=='boolean'||h.passed!==(h.correct/h.total>=.7))throw Error('Invalid lesson history entry.');
 }
 return history;
}
export function recordLessonAttempt(save,subject,topic,correct,total,at=new Date().toISOString()){
 if(!save||!Number.isInteger(correct)||!Number.isInteger(total)||total<1||total>100||correct<0||correct>total||typeof subject!=='string'||!subject.trim()||subject.length>40||typeof topic!=='string'||!topic.trim()||topic.length>100||!Number.isFinite(Date.parse(at)))throw Error('Invalid lesson attempt.');
 const history=validateLearningHistory(save.lessonHistory);
 return {...save,lessonHistory:[...history,{subject,topic,correct,total,passed:correct/total>=.7,at:new Date(at).toISOString()}].slice(-HISTORY_LIMIT)};
}
export function historySummary(save,subjects){
 const history=validateLearningHistory(save?.lessonHistory);
 const bySubject=Object.fromEntries(subjects.map(s=>[s,{attempts:0,passed:0,average:null,recentAverage:null}]));
 for(const subject of subjects){const attempts=history.filter(h=>h.subject===subject);if(!attempts.length)continue;const scores=attempts.map(h=>h.correct/h.total*100);const last=scores.slice(-5);bySubject[subject]={attempts:attempts.length,passed:attempts.filter(h=>h.passed).length,average:Math.round(scores.reduce((a,b)=>a+b,0)/scores.length),recentAverage:Math.round(last.reduce((a,b)=>a+b,0)/last.length)};}
 return {totalAttempts:history.length,bySubject,recent:history.slice(-10).reverse().map(h=>({...h,percent:Math.round(h.correct/h.total*100)}))};
}
