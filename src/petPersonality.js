/** Child-owned pet temperament, with deterministic behaviour and no penalties. */
export const PET_PERSONALITIES=Object.freeze({
 playful:{label:'Playful',description:'Loves to bounce and explore!',speed:1.15,sway:.32,bob:.065},
 curious:{label:'Curious',description:'Likes investigating everything!',speed:1,sway:.42,bob:.035},
 sleepy:{label:'Sleepy',description:'Enjoys slow, cosy strolls!',speed:.72,sway:.13,bob:.012}
});
export function petPersonality(save){
 if(!save||!['cat','dog'].includes(save.pet))return null;
 return PET_PERSONALITIES[save.petPersonality] ? save.petPersonality : 'curious';
}
export function choosePetPersonality(save,personality){
 if(!save||!['cat','dog'].includes(save.pet))throw Error('Adopt a pet first.');
 if(!Object.hasOwn(PET_PERSONALITIES,personality))throw Error('Choose a valid pet personality.');
 return {...structuredClone(save),petPersonality:personality};
}
export function petBehaviour(personality){
 return PET_PERSONALITIES[personality]||PET_PERSONALITIES.curious;
}
