/** Accessible, non-purchasable interactions for furniture already placed in a child's home. */
export const HOME_ACTIONS=Object.freeze({
 sofa:{label:'Sit on sofa',message:'A cosy moment on the sofa!'},
 chair:{label:'Sit on chair',message:'Taking a comfy seat!'},
 bed:{label:'Rest in bed',message:'Time for a peaceful rest!'},
 desk:{label:'Study at desk',message:'Ready for a little learning!'},
 lamp:{label:'Switch on lamp',message:'The lamp adds a warm glow!'},
 plant:{label:'Care for plant',message:'The plant looks lovely!'},
 rug:{label:'Relax on rug',message:'A soft spot to relax!'}
});
export function availableHomeActions(save){
 if(!save||!Array.isArray(save.placed))return [];
 const seen=new Set();
 return save.placed.flatMap(({item})=>{
  if(typeof item!=='string'||seen.has(item)||!HOME_ACTIONS[item])return [];
  seen.add(item);
  return [{id:item,...HOME_ACTIONS[item]}];
 });
}
export function homeActionMessage(save,item){
 const action=availableHomeActions(save).find(a=>a.id===item);
 if(!action)throw Error('Place this furniture in your home first.');
 return action.message;
}
