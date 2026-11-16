// Adult-supported KS1 measurement activities. No learner measurements are stored.
export const ks1MeasurementActivities=[
 {id:'KS1-MEAS-01',year:1,title:'Longer or shorter?',focus:'length and comparison',materials:['two pencils','paper clips','ruler'],steps:['Choose two objects and predict which is longer.','Line up their ends and compare directly.','Measure each with identical paper clips without gaps.','Discuss why using the same unit matters.'],adultPrompt:'How could we check that our comparison is fair?'},
 {id:'KS1-MEAS-02',year:1,title:'Heavier and lighter',focus:'mass and comparison',materials:['two safe household objects','balance scale or two-hand comparison'],steps:['Predict which object is heavier.','Compare objects using a balance or careful handling.','Describe the result using heavier, lighter or equal.','Try another pair and explain your prediction.'],adultPrompt:'Can a bigger object sometimes be lighter than a smaller one?'},
 {id:'KS1-MEAS-03',year:2,title:'Measure and record',focus:'centimetres and metres',materials:['ruler','metre stick or tape','recording sheet'],steps:['Choose a book and a table to measure.','Select centimetres or metres for each object.','Start at zero and record each measurement with units.','Repeat to check accuracy and discuss any difference.'],adultPrompt:'Why is it important to write the unit with the number?'},
 {id:'KS1-MEAS-04',year:2,title:'Capacity and clock challenge',focus:'litres, millilitres and time',materials:['two marked containers','water tray','analogue clock model'],steps:['Compare the capacities of two safe containers.','Read or estimate capacity using marked millilitres.','Set a model clock to a whole-hour and a half-hour time.','Explain which measurement describes capacity and which describes time.'],adultPrompt:'How do we choose the correct unit for each measurement?'}
];
export function ks1MeasurementActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1MeasurementActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown measurement activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],safety:'Supervise water and tools; avoid hot liquids, sharp objects and heavy items; offer accessible alternatives.',masteryVerified:false,reviewRequired:true};
}
