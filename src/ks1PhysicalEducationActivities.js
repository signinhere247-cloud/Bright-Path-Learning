// Adult-supported KS1 PE guides; no physical-performance data stored.
export const ks1PhysicalEducationActivities=[
 {id:'KS1-PE-01',year:1,title:'Balance pathway',focus:'balance and body control',materials:['floor markers','clear indoor space'],steps:['Warm up gently with walking and stretching.','Follow a short marked pathway at a comfortable pace.','Pause in a stable balance pose with support if needed.','Describe how you kept your body steady.'],adultPrompt:'What helps you feel balanced and safe?',safety:'Use a flat non-slip surface, remove obstacles and offer seated adaptations.'},
 {id:'KS1-PE-02',year:1,title:'Move and stop',focus:'agility and coordination',materials:['soft floor markers','open supervised space'],steps:['Practise walking between markers.','Change direction on a clear adult signal.','Add a gentle stop-and-start challenge.','Reflect on how you avoided collisions.'],adultPrompt:'How do you change direction while staying in control?',safety:'Avoid speed races, ensure personal space and adapt movements to ability.'},
 {id:'KS1-PE-03',year:2,title:'Create a movement sequence',focus:'dance and expressive movement',materials:['movement picture cards','clear space'],steps:['Choose three safe movements from picture cards.','Put the movements into a beginning, middle and end.','Practise the sequence at a comfortable pace.','Improve one transition and explain your choice.'],adultPrompt:'How does your sequence show a clear order?',safety:'Offer seated or low-impact movements; avoid forced stretching and loud music.'},
 {id:'KS1-PE-04',year:2,title:'Team target challenge',focus:'cooperation and simple tactics',materials:['soft beanbags','large floor target','clear space'],steps:['Agree fair rules and take turns.','Practise gently sending a beanbag toward a target.','Discuss one way to help teammates succeed.','Try a new tactic and celebrate shared effort.'],adultPrompt:'What did your team change to work together better?',safety:'Use soft equipment, no throwing at people, and provide accessible target distances.'}
];
export function ks1PhysicalEducationActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1PhysicalEducationActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown physical education activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],masteryVerified:false,reviewRequired:true};
}
