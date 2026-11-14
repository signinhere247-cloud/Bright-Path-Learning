/**
 * BrightPath Art & Design — Stage 2 Step 10.
 * England-oriented draft pathways and original practical activities.
 * EYFS: expressive arts activities; KS4: optional GCSE preparation,
 * not an exam-board specification. Projects require real-world materials
 * and adult supervision where indicated; no automated artistic grading.
 * Standalone: does not change existing lessons, saves, or live website.
 */
const pathways={
 nursery:['mark-making','colour','texture','imagination'],
 reception:['mark-making','colour','shape','texture','collage','imagination'],
 'year-1':['drawing','colour','painting','collage','sculpture','artists'],
 'year-2':['drawing','painting','printmaking','sculpture','texture','artists'],
 'year-3':['drawing','painting','printmaking','sculpture','pattern','artists','sketchbooks'],
 'year-4':['drawing','painting','sculpture','pattern','perspective','artists','sketchbooks'],
 'year-5':['drawing','painting','sculpture','perspective','composition','artists','sketchbooks'],
 'year-6':['drawing','painting','sculpture','composition','mixed-media','artists','sketchbooks'],
 'year-7':['drawing','painting','sculpture','composition','mixed-media','art-history','visual-analysis','sketchbooks'],
 'year-8':['drawing','painting','printmaking','composition','perspective','art-history','visual-analysis','sketchbooks'],
 'year-9':['drawing','painting','mixed-media','photography','art-history','visual-analysis','design-process','portfolio'],
 'year-10':['drawing','painting','mixed-media','photography','art-history','visual-analysis','design-process','portfolio','evaluation'],
 'year-11':['drawing','painting','mixed-media','photography','art-history','visual-analysis','design-process','portfolio','evaluation']
};
export const artTopicNames=Object.freeze({
 'mark-making':'Mark-making',colour:'Colour',texture:'Texture',imagination:'Imaginative art',
 shape:'Shapes in art',collage:'Collage',drawing:'Drawing',painting:'Painting',
 sculpture:'Sculpture',artists:'Artists and creative traditions',printmaking:'Printmaking',
 pattern:'Pattern',sketchbooks:'Sketchbook exploration',perspective:'Perspective',
 composition:'Composition','mixed-media':'Mixed media','art-history':'Art history',
 'visual-analysis':'Analysing artwork',photography:'Photography',
 'design-process':'Developing an artistic idea',portfolio:'Portfolio development',
 evaluation:'Reflecting and evaluating'
});
export const artYearTopicMap=Object.freeze(Object.fromEntries(
 Object.entries(pathways).map(([year,topics])=>[year,Object.freeze([...topics])])
));
export function artTopicsForYear(yearId){
 if(!Object.hasOwn(artYearTopicMap,yearId))throw Error('Unknown Art and Design year.');
 return artYearTopicMap[yearId].map(id=>({id,title:artTopicNames[id],yearId}));
}
// Each project has a tangible activity, not an automatically graded quiz.
const projects={
 'mark-making':{
  title:'Lines and marks',materials:['Paper','Crayons or pencils'],steps:[
   'Draw a straight line, a wavy line and a zigzag line.',
   'Make a picture using at least two different kinds of marks.',
   'Point to the marks you like most.'
  ],reflection:'Which mark was most fun to make?',supervision:'general'
 },
 colour:{
  title:'Explore colour families',materials:['Paper','Colouring pencils or washable paints'],steps:[
   'Choose two colours and make a mark with each.',
   'Make a picture that uses both colours.',
   'Describe how the colours make the picture feel.'
  ],reflection:'Why did you choose these colours?',supervision:'general'
 },
 texture:{
  title:'Texture treasure hunt',materials:['Paper','Crayons','Safe textured surfaces'],steps:[
   'Find three safe surfaces with different textures.',
   'Place paper over each surface and gently rub with a crayon.',
   'Compare the patterns you created.'
  ],reflection:'Which texture made the most interesting pattern?',supervision:'general'
 },
 imagination:{
  title:'Invent a new creature',materials:['Paper','Pencils or crayons'],steps:[
   'Imagine a creature that lives in a new world.',
   'Draw its body and add three unusual details.',
   'Explain where it lives and how it moves.'
  ],reflection:'What makes your creature special?',supervision:'general'
 },
 shape:{
  title:'Picture from shapes',materials:['Paper','Pencils','Colouring pencils'],steps:[
   'Draw circles, squares and triangles.',
   'Combine the shapes to make a picture.',
   'Add colour and describe the shapes you used.'
  ],reflection:'Which shapes helped you build your picture?',supervision:'general'
 },
 collage:{
  title:'Paper collage landscape',materials:['Scrap paper','Paper','Child-safe glue'],steps:[
   'Choose a place to show in your collage.',
   'Tear coloured paper into shapes.',
   'Arrange and glue the shapes to create foreground and background.'
  ],reflection:'How did overlapping shapes change the picture?',supervision:'adult-help'
 },
 drawing:{
  title:'Draw from observation',materials:['Paper','Pencil','A simple household object'],steps:[
   'Look closely at the outline of your object.',
   'Draw the largest shapes before the small details.',
   'Add shading where you see darker areas.'
  ],reflection:'What did you notice after looking carefully?',supervision:'general'
 },
 painting:{
  title:'Paint a mood',materials:['Paper','Washable paint','Brushes','Water'],steps:[
   'Choose a mood, such as calm or energetic.',
   'Select colours and brush marks to express it.',
   'Create a painting and explain your choices.'
  ],reflection:'How do your colours and brush strokes express the mood?',supervision:'adult-help'
 },
 sculpture:{
  title:'Build a small sculpture',materials:['Modelling clay or play dough','Safe modelling tools'],steps:[
   'Sketch a simple three-dimensional form.',
   'Shape the material into your design.',
   'Check whether it stands or balances and refine it.'
  ],reflection:'How does your sculpture look from different sides?',supervision:'adult-help'
 },
 artists:{
  title:'Explore an artist’s choices',materials:['An age-appropriate artwork image','Paper','Pencil'],steps:[
   'Look carefully at an artwork from a chosen artist or tradition.',
   'Notice the colours, shapes and materials.',
   'Create your own response without copying the artwork exactly.'
  ],reflection:'What did you learn from the artist’s choices?',supervision:'general'
 },
 printmaking:{
  title:'Repeating prints',materials:['Paper','Washable paint','A clean sponge or safe stamp'],steps:[
   'Make a simple stamp shape.',
   'Test how much paint makes a clear print.',
   'Repeat the print to create a pattern.'
  ],reflection:'How did spacing affect the final pattern?',supervision:'adult-help'
 },
 pattern:{
  title:'Design a repeating motif',materials:['Paper','Pencils','Ruler'],steps:[
   'Invent a motif with two or three shapes.',
   'Repeat it in a row using a clear rule.',
   'Change one element and compare the results.'
  ],reflection:'What makes your pattern repeat?',supervision:'general'
 },
 sketchbooks:{
  title:'Visual idea journal',materials:['Sketchbook or paper','Pencils','Optional coloured media'],steps:[
   'Collect three visual ideas from your surroundings.',
   'Make quick drawings and label what interests you.',
   'Develop one idea into a more detailed sketch.'
  ],reflection:'Which idea would you develop next, and why?',supervision:'general'
 },
 perspective:{
  title:'One-point perspective street',materials:['Paper','Pencil','Ruler'],steps:[
   'Draw a horizon line and one vanishing point.',
   'Sketch a road with edges meeting at the vanishing point.',
   'Add buildings with receding lines towards that point.'
  ],reflection:'How did the vanishing point create an illusion of depth?',supervision:'general'
 },
 composition:{
  title:'Three ways to arrange a scene',materials:['Paper','Pencil'],steps:[
   'Sketch three small frames with the same subject in different positions.',
   'Change the balance of empty and filled space.',
   'Choose one arrangement and explain its effect.'
  ],reflection:'Which arrangement draws attention to the subject?',supervision:'general'
 },
 'mixed-media':{
  title:'Combine two media',materials:['Paper','Pencil','Coloured paper','Child-safe glue'],steps:[
   'Draw a scene or abstract design.',
   'Add torn paper to emphasise part of the image.',
   'Compare the textures and effects of the two media.'
  ],reflection:'What did each medium contribute?',supervision:'adult-help'
 },
 'art-history':{
  title:'Art across time',materials:['Two appropriately sourced artwork images from different periods','Paper'],steps:[
   'Identify the approximate periods and contexts of two artworks.',
   'Compare their subjects, materials and techniques.',
   'Write or discuss how their contexts might shape the work.'
  ],reflection:'Which differences can you support with visible evidence?',supervision:'general'
 },
 'visual-analysis':{
  title:'Describe, analyse, interpret',materials:['An appropriately sourced artwork image','Paper','Pencil'],steps:[
   'Describe only what you can see without guessing.',
   'Analyse colour, composition, line and materials.',
   'Offer an interpretation supported by two visible details.'
  ],reflection:'How is an observation different from an interpretation?',supervision:'general'
 },
 photography:{
  title:'Tell a story with three photographs',materials:['Camera or supervised device'],steps:[
   'Plan a beginning, middle and end using everyday objects.',
   'Take three photographs with different framing.',
   'Review the images without including identifiable strangers or private details.'
  ],reflection:'How did framing change the story?',supervision:'adult-help'
 },
 'design-process':{
  title:'Develop and refine an idea',materials:['Sketchbook','Pencil','Chosen safe art materials'],steps:[
   'Write a brief describing the intended audience and purpose.',
   'Sketch two possible approaches and annotate them.',
   'Select one, test a technique and revise the design.'
  ],reflection:'What evidence informed your revision?',supervision:'general'
 },
 portfolio:{
  title:'Curate a mini portfolio',materials:['Three pieces of your own artwork','Paper or digital document'],steps:[
   'Choose three pieces showing different techniques or decisions.',
   'Arrange them in a meaningful order.',
   'Write a short note explaining development between the pieces.'
  ],reflection:'What does your selection show about your progress?',supervision:'general'
 },
 evaluation:{
  title:'Evaluate a finished piece',materials:['A completed artwork','Paper or digital notes'],steps:[
   'Compare your outcome with the original intention.',
   'Identify two effective choices with examples.',
   'Suggest one specific change for a future version.'
  ],reflection:'Which evidence supports your evaluation?',supervision:'general'
 }
};
export function artProject(topicId,{yearId='year-4'}={}){
 if(!artTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Art topic not mapped to selected year.');
 const project=projects[topicId];
 if(!project)throw Error('No project for topic.');
 return {id:`art-${yearId}-${topicId}-starter`,yearId,topicId,
  title:project.title,materials:[...project.materials],steps:[...project.steps],
  reflection:project.reflection,supervision:project.supervision,status:'draft',
  assessmentType:'portfolio-and-reflection',automaticGrade:false};
}
const quiz={
 colour:['Which two colours are commonly mixed to make green paint?','Blue and yellow','Red and blue','Red and yellow','Blue and yellow paint commonly produce green.'],
 drawing:['What does shading help show in a drawing?','Light and form','Only the artist’s name','The size of the paper','Changes in tone can suggest three-dimensional form.'],
 sculpture:['What makes sculpture different from a flat drawing?','It has three-dimensional form','It must be made of metal','It cannot be viewed from different sides','Sculpture occupies three-dimensional space.'],
 perspective:['What is a vanishing point in one-point perspective?','Where receding parallel lines appear to meet','The centre of every circle','The brightest part of a picture','Parallel lines receding into depth appear to converge at a vanishing point.'],
 composition:['What does composition mean in visual art?','Arrangement of visual elements','Only the price of materials','A list of art supplies','Composition describes how visual elements are arranged.'],
 'visual-analysis':['Which statement is an observation rather than an interpretation?','The image uses mostly dark blue','The artist felt lonely','The scene means hope','An observation describes visible evidence without asserting an intention.'],
 'art-history':['Why might art change across historical periods?','Materials, ideas and social contexts change','Every artist uses identical methods','Art never responds to society','Art is shaped by available techniques and historical contexts.'],
 'design-process':['What is a useful reason to test a design idea?','To identify improvements','To avoid feedback','To guarantee perfection','Testing can reveal limitations and opportunities to refine a design.'],
 evaluation:['Which is the most useful evaluation?','The contrast guides attention to the subject','It is good because I said so','Nothing could ever improve','Specific visual evidence makes evaluation more informative.']
};
export function artKnowledgePractice(topicId,{yearId='year-4'}={}){
 if(!artTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Art topic not mapped to selected year.');
 const item=quiz[topicId];
 if(!item)return [];
 const [prompt,answer,a,b,explanation]=item;
 return [{questionId:`art-${yearId}-${topicId}-knowledge-1`,yearId,topicId,
  prompt,answer,options:[answer,a,b],explanation,status:'draft'}];
}
export function artContentCoverage(){
 return Object.entries(pathways).map(([yearId,topics])=>({
  yearId,topicCount:topics.length,projectCount:topics.filter(id=>Boolean(projects[id])).length,
  knowledgeQuestionCount:topics.filter(id=>Boolean(quiz[id])).length
 }));
}
