/** Short, safe prompts for the nearest interactive 3D destination. */
export function adventureInteractionFeedback(destination,completedToday=false){
 if(!destination)return {hint:'Explore the village · Walk towards a glowing location to discover something new.',action:'',label:''};
 const name=String(destination.name||'Village location');
 if(destination.id)return completedToday?{hint:'🌟 '+name+' · Completed today! You can practise again.',action:'Practise again',label:'Practise '+name+' again'}:{hint:'🔎 '+name+' · Answer a question to discover something new!',action:'Explore',label:'Explore '+name};
 if(name==='My Home')return {hint:'🏡 '+name+' · Visit and decorate your cottage.',action:'Enter home',label:'Enter My Home'};
 if(name==='Shop')return {hint:'🪙 '+name+' · Browse the BrightCoins shop.',action:'Visit shop',label:'Visit Shop'};
 return {hint:'📚 '+name+' · Choose a lesson to practise.',action:'Learn',label:'Open '+name+' Academy'};
}
