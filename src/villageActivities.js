/** Small, repeatable learning discoveries. Rewards are once per explorer per UTC day. */
export const DISCOVERIES=Object.freeze([
 {id:'pond',name:'Pond Discovery',x:0,z:-8,color:0x4ecbc5,prompt:'What do tadpoles grow into?',answer:'Frogs',options:['Frogs','Butterflies','Birds'],explanation:'A tadpole changes into a frog as it grows.'},
 {id:'garden',name:'Garden Explorer',x:-16,z:0,color:0x79ce64,prompt:'Which part of a plant usually takes in water from soil?',answer:'Roots',options:['Roots','Petals','Fruit'],explanation:'Roots absorb water and minerals from the soil.'},
 {id:'observatory',name:'Star Watch',x:16,z:0,color:0xe6b6ff,prompt:'What is the name of the star at the centre of our solar system?',answer:'The Sun',options:['The Moon','The Sun','Polaris'],explanation:'Earth and the other planets orbit the Sun.'},
 {id:'woodland',name:'Woodland Wildlife',x:-9,z:-11,color:0x85b987,prompt:'Which animal is a nocturnal mammal?',answer:'Bat',options:['Robin','Bat','Butterfly'],explanation:'Bats are mammals and many are most active at night.'},
 {id:'weather',name:'Weather Wonders',x:9,z:-11,color:0x91c9e8,prompt:'What instrument measures rainfall?',answer:'Rain gauge',options:['Thermometer','Rain gauge','Compass'],explanation:'A rain gauge measures how much rain has fallen.'},
 {id:'numbers',name:'Number Trail',x:8,z:11,color:0xf2c66d,prompt:'What is 6 multiplied by 4?',answer:'24',options:['10','24','28'],explanation:'Six groups of four make twenty-four.'}
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
