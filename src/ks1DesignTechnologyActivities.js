// Adult-supported KS1 design and technology tasks. No learner data stored.
export const ks1DesignTechnologyActivities=[
 {id:'KS1-DT-01',year:1,title:'Design a useful container',focus:'designing for a purpose',materials:['paper','pencils','safe small objects'],steps:['Choose an object that needs a container.','List what the container must do.','Draw and label two design ideas.','Explain which design best meets the need.'],adultPrompt:'Who will use your container, and what must it hold?',safety:'Use safe objects and avoid sharp tools.'},
 {id:'KS1-DT-02',year:1,title:'Build and test a bridge',focus:'structures and evaluation',materials:['paper','cardboard','masking tape','toy figure'],steps:['Plan a bridge for a small toy to cross.','Build the bridge with paper or card.','Test whether the toy can cross safely.','Improve the design and explain what changed.'],adultPrompt:'Which part of your bridge made it stronger?',safety:'Use light toys, blunt tools and adult supervision.'},
 {id:'KS1-DT-03',year:2,title:'Make a moving picture',focus:'simple sliders and levers',materials:['card','paper fasteners','pencils','adult-approved scissors'],steps:['Sketch a picture with one moving part.','Choose a slider or lever mechanism.','Build the moving part with adult help.','Test its movement and adjust the design.'],adultPrompt:'How does your mechanism make the picture move?',safety:'Adults supervise scissors and small paper fasteners.'},
 {id:'KS1-DT-04',year:2,title:'Plan a healthy snack',focus:'food preparation and evaluation',materials:['picture cards of foods','paper plate diagram','pencil'],steps:['Discuss varied foods and basic hygiene.','Design a simple balanced snack using food pictures.','Explain choices and consider allergies or dietary needs.','Evaluate the design against a simple user brief.'],adultPrompt:'How does your snack design meet the needs of the person eating it?',safety:'Use picture-based planning; any real food preparation requires adult supervision, allergy checks and handwashing.'}
];
export function ks1DesignTechnologyActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1DesignTechnologyActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown design and technology activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],masteryVerified:false,reviewRequired:true};
}
