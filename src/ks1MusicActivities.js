// Original adult-supported KS1 music activities; no recordings or child data stored.
export const ks1MusicActivities=[
 {id:'KS1-MUS-01',year:1,title:'Clap the pattern',focus:'steady pulse and rhythm',materials:['hands or soft percussion','four-beat pattern cards'],steps:['Listen to an adult tap a steady four-beat pulse.','Copy a short clap and rest pattern.','Invent a new four-beat pattern using claps and rests.','Perform the pattern twice at the same speed.'],adultPrompt:'How can we tell the difference between the steady beat and the rhythm?',safety:'Keep volume comfortable and offer silent tapping as an alternative.'},
 {id:'KS1-MUS-02',year:1,title:'High and low sounds',focus:'pitch and careful listening',materials:['adult voice','picture cards for high and low'],steps:['Listen to two gentle vocal sounds at different pitches.','Point to a card to show which sound is higher.','Use your voice or gesture to copy a high and low pattern.','Describe how pitch changes without saying louder or quieter.'],adultPrompt:'Can a quiet sound be high-pitched?',safety:'Avoid shouting or straining voices; allow non-vocal participation.'},
 {id:'KS1-MUS-03',year:2,title:'Compose an eight-beat idea',focus:'musical composition and notation',materials:['paper beat grid','pencil','soft percussion or claps'],steps:['Draw an eight-box beat grid.','Choose a sound or rest for each box.','Practise the eight-beat composition.','Revise one part and explain the change.'],adultPrompt:'What changed when you added a rest or repeated a sound?',safety:'Use comfortable sound levels and optional visual rhythm cues.'},
 {id:'KS1-MUS-04',year:2,title:'Listen, compare and respond',focus:'active listening and musical vocabulary',materials:['two short licensed or original music excerpts','drawing paper'],steps:['Listen to two short contrasting excerpts.','Describe their speed, dynamics and instruments if audible.','Draw a line or shape to show how each feels or moves.','Compare the excerpts using two musical words.'],adultPrompt:'Which sounds support your description of each excerpt?',safety:'Use appropriately licensed recordings and respect sensory sensitivities.'}
];
export function ks1MusicActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1MusicActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown music activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],masteryVerified:false,reviewRequired:true};
}
