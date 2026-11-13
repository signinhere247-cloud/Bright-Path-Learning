/** Deterministic, per-explorer pet care; no real-money purchases or penalties. */
export const PET_ACTIONS=Object.freeze({feed:{label:'Feed',gain:18},play:{label:'Play',gain:14},rest:{label:'Let rest',gain:10}});
export function careForPet(save,action,now=Date.now()){
 if(!save||!['cat','dog'].includes(save.pet))throw Error('Adopt a cat or dog first.');
 const activity=PET_ACTIONS[action];if(!activity)throw Error('Unknown pet activity.');
 if(!Number.isFinite(now)||now<0)throw Error('Invalid time.');
 const previous=Number.isFinite(save.petLastCare)?save.petLastCare:0;
 if(now<previous)throw Error('Device time is earlier than the last pet activity.');
 if(previous&&now-previous<30_000)throw Error('Your pet is enjoying its last activity. Try again shortly.');
 const next=structuredClone(save);
 const mood=Number.isFinite(next.petMood)?Math.max(0,Math.min(100,next.petMood)):75;
 next.petMood=Math.min(100,mood+activity.gain);
 next.petLastCare=now;
 next.petCareCount=(Number.isSafeInteger(next.petCareCount)&&next.petCareCount>=0?next.petCareCount:0)+1;
 return next;
}
export function petStatus(save){
 if(!save||!['cat','dog'].includes(save.pet))return {adopted:false,label:'No pet adopted yet',mood:null};
 const mood=Number.isFinite(save.petMood)?Math.max(0,Math.min(100,Math.round(save.petMood))):75;
 return {adopted:true,label:mood>=85?'Very happy':mood>=55?'Happy':'Needs some care',mood};
}
