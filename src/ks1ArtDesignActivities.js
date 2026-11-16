// Adult-supported KS1 art and design activities. No child artwork or photos stored.
export const ks1ArtDesignActivities=[
 {id:'KS1-ART-01',year:1,title:'Lines and textures',focus:'drawing techniques and observation',materials:['paper','pencils','textured safe objects'],steps:['Observe lines and patterns on two safe objects.','Try straight, curved, zigzag and dotted marks.','Make a drawing using at least three line types.','Discuss how marks can show different textures.'],adultPrompt:'Which marks best show the texture you noticed?',safety:'Use blunt, age-appropriate materials; avoid sharp or fragile objects.'},
 {id:'KS1-ART-02',year:1,title:'Colour mixing studio',focus:'primary and secondary colours',materials:['washable red, blue and yellow paints','brushes','paper'],steps:['Identify the three primary paint colours.','Mix two colours and predict the result.','Create a simple painting using mixed colours.','Describe how the colours changed.'],adultPrompt:'What happens when you add more of one colour?',safety:'Use non-toxic washable paints and protect clothing and surfaces.'},
 {id:'KS1-ART-03',year:2,title:'Build a small sculpture',focus:'3D form and joining techniques',materials:['soft modelling dough','cardboard shapes','safe joining materials'],steps:['Sketch a simple sculpture idea.','Explore rolling, pressing and joining shapes.','Build a stable three-dimensional form.','Evaluate which joining method worked best.'],adultPrompt:'What could you change to make your sculpture stronger?',safety:'Use child-safe materials; avoid sharp tools and choking-size pieces.'},
 {id:'KS1-ART-04',year:2,title:'Look, compare, create',focus:'artists, craft makers and evaluation',materials:['two licensed, age-appropriate artwork reproductions','drawing materials'],steps:['Look closely at two artworks or craft objects.','Describe their colours, shapes and techniques.','Create an original piece using one explored technique.','Explain a similarity and a difference between your work and the examples.'],adultPrompt:'Which technique did you choose and why?',safety:'Use properly licensed reproductions; invite respectful interpretation.'}
];
export function ks1ArtDesignActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1ArtDesignActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown art and design activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],masteryVerified:false,reviewRequired:true};
}
