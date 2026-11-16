// Adult-supported KS1 geometry activities; no child observations or results stored.
export const ks1GeometryActivities=[
 {id:'KS1-GEO-01',year:1,title:'Shape detectives',focus:'identify and describe 2D shapes',materials:['paper shapes','everyday objects'],steps:['Find circles, triangles, rectangles and squares.','Name each shape and count its straight sides.','Sort shapes by a chosen property.','Explain why a rotated square is still a square.'],adultPrompt:'What makes a shape a square even when it is turned?'},
 {id:'KS1-GEO-02',year:1,title:'Move and turn',focus:'position and direction',materials:['toy figure','simple floor grid'],steps:['Place the figure on a grid square.','Give directions using left, right, forward and backward.','Try a whole turn and a half turn.','Describe where the figure finishes.'],adultPrompt:'How can you describe the move so someone else can repeat it?'},
 {id:'KS1-GEO-03',year:2,title:'Solid shape workshop',focus:'3D shapes and properties',materials:['cube','cuboid','sphere','cylinder'],steps:['Handle or inspect four solid shapes.','Name each shape and describe flat or curved surfaces.','Sort the shapes by whether they roll or stack.','Explain how a cube differs from a cuboid.'],adultPrompt:'Which properties help you recognise a shape?'},
 {id:'KS1-GEO-04',year:2,title:'Routes and quarter turns',focus:'movement, orientation and turns',materials:['floor grid','direction cards'],steps:['Draw a route from start to finish.','Describe each move using forward, backward, left and right.','Include quarter, half and three-quarter turns.','Swap instructions with a partner and correct any ambiguity.'],adultPrompt:'Why do we need to know which way someone is facing?'}
];
export function ks1GeometryActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1GeometryActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown geometry activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],adultSupport:'Use tactile models, large-print grids or verbal directions as needed.',masteryVerified:false,reviewRequired:true};
}
