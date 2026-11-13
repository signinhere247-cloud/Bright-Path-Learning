/** Read-only collection overview, derived from the current explorer's gallery. */
export function achievementCollectionSummary(gallery){
 const categories=(gallery?.groups||[]).map(group=>{
  const items=Array.isArray(group.items)?group.items:[];
  const earned=items.filter(item=>item.earned).length;
  return {id:group.id,title:group.title,earned,total:items.length,remaining:items.length-earned};
 });
 const earned=categories.reduce((n,c)=>n+c.earned,0);
 const total=categories.reduce((n,c)=>n+c.total,0);
 return {earned,total,remaining:total-earned,categories};
}
