// Adult-supported KS1 geography activities; no location or child data is collected.
export const ks1GeographyActivities=[
 {id:'KS1-GEOG-01',year:1,title:'Make a simple map',focus:'simple maps and symbols',materials:['toy buildings or blocks','paper','pencil'],steps:['Arrange a pretend park with paths and landmarks.','Draw a bird’s-eye map of the model.','Invent clear symbols for a tree, pond and bench.','Use the map to explain where the landmarks are.'],adultPrompt:'How could a visitor understand your map without seeing the model?',safety:'Use a fictional place; do not record home addresses or routes to school.'},
 {id:'KS1-GEOG-02',year:1,title:'Nature or made by people?',focus:'human and physical features',materials:['pictures of rivers, hills, roads and bridges','sorting cards'],steps:['Observe four feature pictures.','Sort them into physical and human features.','Explain one reason for each choice.','Describe which features might appear near a town.'],adultPrompt:'How can you tell whether a feature is natural or built by people?',safety:'Use illustrations rather than unsupervised field trips.'},
 {id:'KS1-GEOG-03',year:2,title:'Compass route challenge',focus:'direction and map keys',materials:['fictional town map','compass rose card'],steps:['Find north, south, east and west on a map.','Follow a short route using compass directions.','Use the map key to identify three landmarks.','Write directions for a partner to check.'],adultPrompt:'Why do we need a map key and a compass rose?',safety:'Keep routes fictional; do not collect precise real-world child locations.'},
 {id:'KS1-GEOG-04',year:2,title:'Compare two places',focus:'similarities and differences between places',materials:['reviewed photographs of a UK town','reviewed photographs of a contrasting non-European locality'],steps:['Look carefully at photographs of two contrasting places.','Identify human and physical features in each.','Record two similarities and two differences.','Explain what the photographs cannot tell us about daily life.'],adultPrompt:'What evidence supports your comparison, and what would you still need to learn?',safety:'Use respectful, current, contextualised sources; avoid stereotypes.'}
];
export function ks1GeographyActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1GeographyActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown geography activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],masteryVerified:false,reviewRequired:true};
}
