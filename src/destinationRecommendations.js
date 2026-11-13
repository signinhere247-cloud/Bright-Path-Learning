import {villageDirections} from './villageNavigation.js';
/** Gentle next-stop suggestions based only on the active explorer's journal and current position. */
export function destinationRecommendations(position,destinations,limit=3){
 if(!Number.isFinite(position?.x)||!Number.isFinite(position?.z))return [];
 if(!Number.isInteger(limit)||limit<1)return [];
 const candidates=(destinations?.physical||[]).filter(p=>p.discovery&&!p.discovery.visited);
 return villageDirections(position,candidates).slice(0,Math.min(limit,5)).map(place=>({
  id:place.id,name:place.name,x:place.x,z:place.z,distance:place.distance,direction:place.direction,
  reason:'A new village discovery is waiting here.'
 }));
}
