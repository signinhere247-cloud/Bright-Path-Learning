/** Per-learner practice suggestions; stored only in that learner's save. */
export function practiceTopics(save,subject){
 const entries=save?.practiceNeeds&&typeof save.practiceNeeds==='object'?save.practiceNeeds:{};
 return Object.entries(entries).filter(([key,value])=>key.startsWith(subject+':')&&Number.isInteger(value)&&value>0)
 .map(([key,count])=>({topic:key.slice(subject.length+1),count}))
 .sort((a,b)=>b.count-a.count||a.topic.localeCompare(b.topic));
}
export function recordPracticeNeed(save,subject,topic,missed){
 const key=subject+':'+topic;
 const entries={...(save.practiceNeeds||{})};
 const old=Number.isInteger(entries[key])?Math.max(0,entries[key]):0;
 const next=missed?Math.min(20,old+1):Math.max(0,old-1);
 if(next)entries[key]=next;else delete entries[key];
 return {...save,practiceNeeds:entries};
}
