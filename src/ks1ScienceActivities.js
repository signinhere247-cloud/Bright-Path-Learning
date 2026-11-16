// Adult-supported KS1 science investigations. No observations or child data stored.
export const ks1ScienceActivities=[
 {id:'KS1-SCI-01',year:1,title:'Plant part detectives',focus:'identify basic plant parts',materials:['safe growing plant','paper','pencil'],steps:['Observe a familiar flowering plant without picking it.','Identify roots where visible, stem, leaves and flowers.','Draw and label the parts you can see.','Compare the plant with a second safe plant or picture.'],adultPrompt:'How are the plants alike and different?',safety:'Do not taste plants; wash hands after handling soil.'},
 {id:'KS1-SCI-02',year:1,title:'Material properties lab',focus:'compare everyday materials',materials:['paper','fabric','plastic spoon','wooden block'],steps:['Name the material each object is made from.','Compare texture, flexibility and transparency.','Sort the objects by one observed property.','Explain which material might suit a waterproof cover and why.'],adultPrompt:'Which properties can you test by looking or touching safely?',safety:'Use clean, unbroken objects; avoid sharp edges.'},
 {id:'KS1-SCI-03',year:2,title:'Living, dead or never alive?',focus:'living things and habitats',materials:['picture cards of plants, animals and objects','sorting sheet'],steps:['Sort picture cards into living, dead and never alive.','Explain your choices using signs of life.','Discuss why a wooden object came from something once living.','Find a local habitat in a photograph and identify what lives there.'],adultPrompt:'What evidence helps you decide whether something was once alive?',safety:'Use pictures rather than touching unknown organisms or animal remains.'},
 {id:'KS1-SCI-04',year:2,title:'Healthy animal needs',focus:'basic needs of animals including humans',materials:['animal picture cards','paper','pencil'],steps:['Choose two familiar animals including a human.','Identify food, water and air as basic survival needs.','Compare shelter and care needs for each animal.','Draw a simple care plan and explain the choices.'],adultPrompt:'Which needs do these animals share, and how do their needs differ?',safety:'Observe animals from a safe distance; never feed unfamiliar animals.'}
];
export function ks1ScienceActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1ScienceActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown science activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],masteryVerified:false,reviewRequired:true};
}
