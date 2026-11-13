/** Pure pet companion movement, shared by 3D rendering and tests. */
export function companionTarget(position, elapsed=0){
 if(!Number.isFinite(position?.x)||!Number.isFinite(position?.z))throw Error('Invalid explorer position');
 return {x:position.x+1.35+Math.sin(elapsed*.001)*.22,z:position.z+1.05+Math.cos(elapsed*.0012)*.18};
}
export function companionMotion(current,target,delta){
 if(![current?.x,current?.z,target?.x,target?.z,delta].every(Number.isFinite)||delta<0)throw Error('Invalid companion movement');
 const distance=Math.hypot(target.x-current.x,target.z-current.z);
 const fraction=distance===0?0:Math.min(1,Math.min(delta,.1)*4.5);
 return {x:current.x+(target.x-current.x)*fraction,z:current.z+(target.z-current.z)*fraction};
}
export function activityAnimation(action){
 if(action==='feed')return {duration:1800,bounce:.07,label:'Enjoying a tasty meal!'};
 if(action==='play')return {duration:2600,bounce:.23,label:'Playing together!'};
 if(action==='rest')return {duration:2200,bounce:.02,label:'Having a peaceful rest!'};
 throw Error('Unknown pet activity');
}
