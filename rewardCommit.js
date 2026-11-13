/** Commit a quest or discovery reward only after durable local persistence. */
export function commitRewardChange(current, transform, persist){
 if(typeof transform!=='function'||typeof persist!=='function')throw Error('Invalid reward operation.');
 const result=transform(current);
 if(!result||!result.save||result.save===current||!Number.isSafeInteger(result.earned)||result.earned<0)throw Error('Invalid reward result.');
 if(result.earned>0)persist(result.save);
 return result;
}
