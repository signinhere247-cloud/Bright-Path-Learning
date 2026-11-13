/** Daily quests are calculated from completed activities; claim only once per UTC day. */
export const DAILY_QUESTS=Object.freeze([
 {id:'first-discovery',name:'Curious Explorer',description:'Complete one village discovery',goal:1,reward:12},
 {id:'three-discoveries',name:'Village Adventurer',description:'Complete all three village discoveries',goal:3,reward:20},
 {id:'one-lesson',name:'Academy Apprentice',description:'Pass one academy lesson',goal:1,reward:15}
]);
export function validQuestDay(day){if(typeof day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(day))return false;const d=new Date(day+'T00:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===day;}
export function questProgress(save,day){
 if(!validQuestDay(day))throw Error('Invalid quest date.');
 const discoveries=Object.values(save?.discoveries||{}).filter(d=>d===day).length;
 const lessons=save?.dailyLessonPasses?.[day]||0;
 return DAILY_QUESTS.map(q=>({...q,count:Math.min(q.goal,q.id==='one-lesson'?lessons:discoveries),claimed:save?.questClaims?.[day]?.includes(q.id)===true}));
}
export function recordDailyLessonPass(save,day){
 if(!validQuestDay(day))throw Error('Invalid quest date.');
 const next=structuredClone(save);next.dailyLessonPasses={...(next.dailyLessonPasses||{})};
 const old=next.dailyLessonPasses[day]||0;
 if(!Number.isSafeInteger(old)||old<0||old>=Number.MAX_SAFE_INTEGER)throw Error('Invalid lesson count.');
 next.dailyLessonPasses[day]=old+1;return next;
}
export function claimDailyQuest(save,id,day){
 const quest=questProgress(save,day).find(q=>q.id===id);
 if(!quest)throw Error('Unknown daily quest.');
 if(quest.claimed)throw Error('Daily quest already claimed.');
 if(quest.count<quest.goal)throw Error('Daily quest not completed.');
 if(!Number.isSafeInteger(save.coins)||save.coins<0||save.coins>Number.MAX_SAFE_INTEGER-quest.reward)throw Error('Invalid coin balance.');
 const next=structuredClone(save);next.coins+=quest.reward;
 next.questClaims={...(next.questClaims||{}),[day]:[...(next.questClaims?.[day]||[]),id]};
 return {save:next,earned:quest.reward};
}
