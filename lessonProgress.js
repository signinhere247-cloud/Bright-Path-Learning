/** Pure lesson settlement: immutable, repeatable reward rules and per-explorer milestones. */
export function settleLesson(save,subject,topic,correct,total){
 if(!save||!Number.isSafeInteger(save.coins)||save.coins<0||!save.completed||typeof save.completed!=='object'||Array.isArray(save.completed))throw Error('Invalid explorer progress.');
 if(typeof subject!=='string'||!subject.trim()||typeof topic!=='string'||!topic.trim()||!Number.isInteger(total)||total<1||!Number.isInteger(correct)||correct<0||correct>total)throw Error('Invalid lesson result.');
 const key=`${subject}:${topic}`,passed=correct/total>=0.7,first=passed&&!save.completed[key],earned=passed?(first?25:5):0;
 if(save.coins+earned>Number.MAX_SAFE_INTEGER)throw Error('Coin balance exceeds safe limit.');
 const next=structuredClone(save);
 if(passed){next.coins+=earned;next.completed[key]=true;}
 return {save:next,passed,first,earned,correct,total,key};
}
export function progressSummary(save,subjects){
 const completed=save?.completed&&typeof save.completed==='object'?save.completed:{};
 const counts=Object.fromEntries(subjects.map(s=>[s,0]));
 for(const [key,done] of Object.entries(completed))if(done===true){const split=key.indexOf(':');if(split>0){const subject=key.slice(0,split);if(Object.hasOwn(counts,subject))counts[subject]++;}}
 const total=Object.values(counts).reduce((a,b)=>a+b,0);
 return {counts,total,badges:[
  ...(total>=1?['First Steps 🌱']:[]),
  ...(total>=5?['Learning Explorer ⭐']:[]),
  ...(total>=15?['Knowledge Champion 🏆']:[]),
  ...Object.entries(counts).filter(([,n])=>n>=3).map(([s])=>`${s} Star ✨`)
 ]};
}
