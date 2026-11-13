/** Optional, non-automatic navigation hint; no teleporting or movement overrides. */
export function waypointHint(position,destination,arrivalRadius=2.7){
 if(!destination||!Number.isFinite(position?.x)||!Number.isFinite(position?.z)||!Number.isFinite(destination.x)||!Number.isFinite(destination.z))return null;
 const dx=destination.x-position.x,dz=destination.z-position.z,distance=Math.hypot(dx,dz);
 if(distance<=arrivalRadius)return {arrived:true,distance:Math.round(distance),direction:'Here'};
 const horizontal=Math.abs(dx)>Math.abs(dz);
 return {arrived:false,distance:Math.round(distance),direction:horizontal?(dx>0?'East':'West'):(dz>0?'South':'North')};
}
