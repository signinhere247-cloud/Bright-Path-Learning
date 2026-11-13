/** Distinguish real 3D waypoints from menu-only adventure activities. */
export function adventureDestinations(position,discoveries,buildings,learningRoutes){
 const places=[...(Array.isArray(discoveries)?discoveries:[]),...(Array.isArray(buildings)?buildings.map(b=>({...b,x:b.x,z:b.z+4})):[])];
 const physical=places.filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.z)).map(p=>({...p,kind:'waypoint'}));
 const activities=(Array.isArray(learningRoutes)?learningRoutes:[]).filter(r=>['subjects','hub','quests'].includes(r.destination)).map(r=>({id:r.id,name:r.label,kind:'activity',destination:r.destination}));
 return {physical,activities};
}
