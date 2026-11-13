/** Small, repeatable learning discoveries. Rewards are once per explorer per UTC day. */
export const DISCOVERIES=Object.freeze([
 {id:'pond',name:'Pond Discovery',x:0,z:-8,color:0x4ecbc5,prompt:'What do tadpoles grow into?',answer:'Frogs',options:['Frogs','Butterflies','Birds'],explanation:'A tadpole changes into a frog as it grows.'},
 {id:'garden',name:'Garden Explorer',x:-16,z:0,color:0x79ce64,prompt:'Which part of a plant usually takes in water from soil?',answer:'Roots',options:['Roots','Petals','Fruit'],explanation:'Roots absorb water and minerals from the soil.'},
 {id:'observatory',name:'Star Watch',x:16,z:0,color:0xe6b6ff,prompt:'What is the name of the star at the centre of our solar system?',answer:'The Sun',options:['The Moon','The Sun','Polaris'],explanation:'Earth and the other planets orbit the Sun.'}
]);
export function discoveryStatus(save,id,day){
 if(!DISCOVERIES.some(d=>d.id===id))throw Error('Unknown discovery.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day))throw Error('Invalid day.');
 return save?.discoveries?.[id]===day;
}
export function completeDiscovery(save,id,choice,day){
 const activity=DISCOVERIES.find(d=>d.id===id);
 if(!activity)throw Error('Unknown discovery.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day))throw Error('Invalid day.');
 if(!activity.options.includes(choice))throw Error('Invalid answer.');
 if(!Number.isSafeInteger(save?.coins)||save.coins<0)throw Error('Invalid coin balance.');
 const correct=choice===activity.answer,already=discoveryStatus(save,id,day);
 const earned=correct&&!already?8:0;
 if(save.coins>Number.MAX_SAFE_INTEGER-earned)throw Error('Coin balance exceeds safe limit.');
 const next=structuredClone(save);
 if(earned){next.coins+=earned;next.discoveries={...(next.discoveries||{}),[id]:day};}
 return {save:next,correct,already,earned,explanation:activity.explanation};
}
