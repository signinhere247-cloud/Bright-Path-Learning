/** Pure filters for earned and upcoming achievements. */
export const GALLERY_FILTERS=Object.freeze(['all','earned','upcoming']);
export function filterAchievementGallery(gallery,filter='all'){
 if(!GALLERY_FILTERS.includes(filter))throw Error('Unknown gallery filter.');
 const groups=(gallery?.groups||[]).map(group=>({...group,items:group.items.filter(item=>filter==='all'||(filter==='earned'?item.earned:!item.earned))}));
 return {groups,visible:groups.reduce((n,g)=>n+g.items.length,0),filter};
}
