/** Nearest accessible village destination for explorer navigation. */
export function nearestVillageDestination(position,destinations,range=3.5){
 if(!Number.isFinite(position?.x)||!Number.isFinite(position?.z)||!Array.isArray(destinations))return null;
 let best=null,distance=range;
 for(const item of destinations){
  if(!Number.isFinite(item?.x)||!Number.isFinite(item?.z))continue;
  const d=Math.hypot(position.x-item.x,position.z-item.z);
  if(d<distance){distance=d;best=item}
 }
 return best;
}
export function villageDirections(position,destinations){
 if(!Number.isFinite(position?.x)||!Number.isFinite(position?.z)||!Array.isArray(destinations))return [];
 return destinations.filter(d=>Number.isFinite(d?.x)&&Number.isFinite(d?.z)).map(d=>({
  ...d,distance:Math.round(Math.hypot(d.x-position.x,d.z-position.z)),
  direction:Math.abs(d.x-position.x)>Math.abs(d.z-position.z)
   ?(d.x>position.x?'East':'West'):(d.z>position.z?'South':'North')
 })).sort((a,b)=>a.distance-b.distance);
}
