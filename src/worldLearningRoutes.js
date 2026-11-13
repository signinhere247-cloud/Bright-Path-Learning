/** Safe, explicit routes from the fantasy world into learning activities. */
export const WORLD_LEARNING_ROUTES=Object.freeze([
 {id:'academy',label:'📚 Visit Learning Academy',destination:'subjects'},
 {id:'hub',label:'🏡 My Learning Adventure',destination:'hub'},
 {id:'daily',label:'✨ Daily Adventures',destination:'quests'},
 {id:'discoveries',label:'🌿 Village discoveries',destination:'discoveries'}
]);
export function worldLearningRoutes(context='world'){
 if(context==='home')return WORLD_LEARNING_ROUTES.filter(route=>route.id!=='discoveries');
 if(context==='village')return WORLD_LEARNING_ROUTES.filter(route=>route.id!=='discoveries');
 return [...WORLD_LEARNING_ROUTES];
}
