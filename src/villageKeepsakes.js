/** Collectible keepsakes unlock from successful village discoveries, without repeatable coin rewards. */
export const VILLAGE_KEEPSAKES=Object.freeze({
 pond:{emoji:'🐸',name:'Frog Friend Badge'},
 garden:{emoji:'🌼',name:'Golden Flower Badge'},
 observatory:{emoji:'⭐',name:'Stargazer Badge'},
 woodland:{emoji:'🦇',name:'Woodland Night Badge'},
 weather:{emoji:'🌈',name:'Weather Watcher Badge'},
 numbers:{emoji:'🔢',name:'Number Explorer Badge'}
});
export function villageKeepsakes(save){
 const discoveries=save?.discoveries||{};
 return Object.entries(VILLAGE_KEEPSAKES).map(([id,keepsake])=>({
  id,...keepsake,unlocked:typeof discoveries[id]==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(discoveries[id])
 }));
}
export function keepsakeProgress(save){
 const keepsakes=villageKeepsakes(save);
 return {unlocked:keepsakes.filter(k=>k.unlocked).length,total:keepsakes.length};
}
