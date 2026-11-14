/**
 * BrightPath Design and Technology — Stage 2 Step 12.
 * England-oriented draft learning pathways, original practical projects and
 * explained knowledge questions. EYFS activities are exploratory; KS4 topics
 * are enrichment/GCSE preparation, not an exam-board-verified specification.
 * Practical work requires appropriate adult supervision and safe materials.
 * Standalone: does not change existing lessons, saves or live website.
 */
const pathways={
 nursery:['explore-materials','construction','pretend-design'],
 reception:['explore-materials','construction','joining','pretend-design','food-awareness'],
 'year-1':['design-brief','materials','joining','structures','food-preparation','evaluation'],
 'year-2':['design-brief','materials','joining','structures','mechanisms','food-preparation','evaluation'],
 'year-3':['research','design-brief','structures','mechanisms','textiles','nutrition','evaluation'],
 'year-4':['research','design-brief','structures','mechanisms','electrical-systems','textiles','nutrition','evaluation'],
 'year-5':['research','design-brief','structures','mechanisms','electrical-systems','food-preparation','evaluation'],
 'year-6':['research','design-brief','structures','mechanisms','electrical-systems','textiles','nutrition','evaluation'],
 'year-7':['user-needs','research','design-brief','sketching','materials','structures','mechanisms','food-safety','prototyping','evaluation'],
 'year-8':['user-needs','research','sketching','materials','manufacturing','mechanisms','electronics','nutrition','prototyping','evaluation'],
 'year-9':['user-needs','research','sketching','materials','manufacturing','electronics','sustainability','food-safety','prototyping','evaluation'],
 'year-10':['user-needs','research','design-brief','sketching','materials','manufacturing','mechanisms','electronics','sustainability','ergonomics','prototyping','evaluation'],
 'year-11':['user-needs','research','design-brief','sketching','materials','manufacturing','mechanisms','electronics','sustainability','ergonomics','prototyping','evaluation']
};
export const designTechnologyTopicNames=Object.freeze({
 'explore-materials':'Exploring materials',construction:'Building and construction',
 'pretend-design':'Imaginative designing',joining:'Joining materials',
 'food-awareness':'Food and healthy habits','design-brief':'Design briefs',
 materials:'Material properties',structures:'Structures', 'food-preparation':'Food preparation',
 evaluation:'Testing and evaluation',mechanisms:'Mechanisms and movement',
 research:'Research and investigation',textiles:'Textiles',nutrition:'Nutrition',
 'electrical-systems':'Simple electrical systems','user-needs':'User needs',
 sketching:'Design communication and sketching','food-safety':'Food hygiene and safety',
 prototyping:'Prototyping',manufacturing:'Manufacturing processes',
 electronics:'Electronics',sustainability:'Sustainable design',ergonomics:'Ergonomics'
});
export const designTechnologyYearTopicMap=Object.freeze(Object.fromEntries(
 Object.entries(pathways).map(([year,topics])=>[year,Object.freeze([...topics])])
));
export function designTechnologyTopicsForYear(yearId){
 if(!Object.hasOwn(designTechnologyYearTopicMap,yearId))throw Error('Unknown Design and Technology year.');
 return designTechnologyYearTopicMap[yearId].map(id=>({id,title:designTechnologyTopicNames[id],yearId}));
}
const projects={
 'explore-materials':['Texture and strength','Paper, cardboard, fabric scraps','Touch and describe three safe materials.','Try gently bending each material.','Choose one for a pretend shelter and explain why.'],
 construction:['Build a paper tower','Paper, cardboard, reusable tape','Sketch a tower shape.','Build a freestanding tower using safe materials.','Test whether it stands for ten seconds and improve its base.'],
 'pretend-design':['Design a dream vehicle','Paper and crayons','Imagine who will use the vehicle.','Draw it and add two helpful features.','Explain how it would move.'],
 joining:['Test simple joins','Paper, cardboard and reusable tape','Make two small cardboard shapes.','Join them using tape and test the connection.','Change the join to make it stronger.'],
 'food-awareness':['Make a balanced plate collage','Paper, crayons and optional food packaging images','Draw a plate divided into sections.','Add pictures of a variety of foods.','Discuss why eating different types of food matters.'],
 'design-brief':['Write a design brief','Paper and pencil','Choose a user and a simple problem they face.','Write two requirements for a solution.','Sketch a possible design that meets those requirements.'],
 materials:['Choose a material','Cardboard, paper and fabric samples','Compare flexibility and strength of three materials.','Pick a material for a pencil holder.','Explain the trade-offs in your choice.'],
 structures:['Strengthen a bridge','Paper, cardboard and tape','Build a bridge spanning two stable supports.','Test it with a small lightweight object.','Add folds or supports and test again safely.'],
 'food-preparation':['Plan a safe no-cook snack','Paper, pencil and optional ingredients with adult approval','Wash hands and clean the preparation area.','Plan a snack using suitable ingredients, checking allergies.','With adult help, prepare it without sharp tools and discuss hygiene.'],
 evaluation:['Test against criteria','A previous safe project and paper','Write two measurable success criteria.','Test your project against each criterion.','Record one improvement and explain why it helps.'],
 mechanisms:['Make a paper slider','Card, paper, tape and child-safe scissors with adult help','Draw a picture with a moving part.','Create a slot and a paper strip that slides through it.','Test the movement and reduce friction where needed.'],
 research:['Investigate existing products','Two safe household products and paper','Identify who might use each product.','Compare their materials, shape and purpose.','Record one feature you could improve.'],
 textiles:['Design a fabric pouch','Fabric scraps, paper and pencil','Sketch a small pouch and label its intended use.','Compare two safe ways of joining fabric, such as folding or fabric tape.','Create a paper prototype and evaluate its size.'],
 nutrition:['Design a varied meal','Paper, pencil and food reference information','Choose a meal suitable for an imaginary user.','Include a variety of food groups and consider dietary needs.','Explain how your choices support a balanced diet.'],
 'electrical-systems':['Plan a low-voltage light circuit','Paper, pencil and optional supervised educational circuit kit','Draw a battery, switch and lamp in a simple circuit.','Predict what happens when the switch opens.','If supervised with an approved low-voltage kit, test your prediction; never use mains electricity.'],
 'user-needs':['Interview a pretend user','Paper and pencil','Invent a user who needs a desk organiser.','Write three questions about their needs.','Use the answers to define two design requirements.'],
 sketching:['Communicate a design','Paper, pencil and ruler','Draw a front and side view of a simple object.','Add dimensions and material labels.','Ask whether someone else can understand how it would work.'],
 'food-safety':['Food safety checklist','Paper and pencil','List steps for handwashing and clean surfaces.','Identify why raw and ready-to-eat foods should be kept separate.','Plan when to ask an adult to check storage and cooking temperatures.'],
 prototyping:['Prototype and iterate','Cardboard, paper, tape and pencil','Build a simple model from a labelled sketch.','Test it against two criteria.','Change one feature and record the effect.'],
 manufacturing:['Plan a production sequence','Paper, pencil and a familiar safe product','Break making the product into ordered steps.','Identify materials and quality checks for each stage.','Explain how to reduce wasted material.'],
 electronics:['Model an input-output system','Paper and pencil','Choose a simple device such as an automatic night light.','Label its input sensor, controller and output.','Draw a flowchart showing when the output should activate.'],
 sustainability:['Redesign for less waste','Paper and pencil','Choose a common item with disposable packaging.','Sketch an alternative that uses fewer materials or lasts longer.','Consider one possible disadvantage of your redesign.'],
 ergonomics:['Design for comfortable use','Paper, pencil and ruler','Choose a handheld object and identify its users.','Sketch a handle suited to their grip and task.','Explain how shape, size and accessibility affect comfort.']
};
const reflections={
 'explore-materials':'Which material felt most suitable, and why?',
 construction:'What made your tower more stable?',
 'pretend-design':'Who would benefit from your invention?',
 joining:'How did you know the join was stronger?',
 'food-awareness':'How can different foods contribute to a varied diet?',
 'design-brief':'Which requirement matters most to the user?',
 materials:'What trade-off did you make when choosing a material?',
 structures:'Which change helped your bridge carry the test object?',
 'food-preparation':'What did you do to keep preparation safe and hygienic?',
 evaluation:'What evidence shows your design meets its criteria?',
 mechanisms:'How did your moving part work?',
 research:'What useful idea did you learn from an existing product?',
 textiles:'How would your chosen join affect the pouch?',
 nutrition:'How did you account for different dietary needs?',
 'electrical-systems':'Why does opening the switch stop current in a simple circuit?',
 'user-needs':'How did user needs change your design?',
 sketching:'Which drawing detail best communicates your idea?',
 'food-safety':'Which hygiene step is most important for your plan?',
 prototyping:'What changed between your first and revised prototype?',
 manufacturing:'Which step would you check for quality?',
 electronics:'How does the device respond to its input?',
 sustainability:'What environmental trade-offs might your design have?',
 ergonomics:'How could you make the object comfortable for more users?'
};
const adultHelp=new Set(['joining','food-preparation','mechanisms','textiles','electrical-systems','food-safety']);
export function designTechnologyProject(topicId,{yearId='year-4'}={}){
 if(!designTechnologyTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Topic is not mapped to this year.');
 const data=projects[topicId];
 if(!data)throw Error('Missing starter project.');
 const [title,materialString,...steps]=data;
 return {id:`dt-${yearId}-${topicId}-starter`,yearId,topicId,title,
  materials:materialString.split(', ').map(s=>s.trim()),steps:[...steps],
  reflection:reflections[topicId],supervision:adultHelp.has(topicId)?'adult-help':'general',
  safety:'Use age-appropriate materials; adults must supervise tools, food handling and electrical kits. Never connect projects to mains power.',
  assessmentType:'design-make-evaluate',automaticGrade:false,status:'draft'};
}
// Starter factual questions: one unique question per topic, not a full bank.
const knowledge={
 'explore-materials':['Which material usually bends more easily?','Fabric','Brick','Glass','Fabric is generally flexible compared with brick or glass.'],
 construction:['What can make a tower more stable?','A wider base','A narrower unsupported base','Removing all supports','A wider base can improve stability.'],
 'pretend-design':['What should a designer consider first?','Who will use the product','Only its colour','Only its name','A design should respond to a user and purpose.'],
 joining:['What is a join?','A connection between parts','A colour palette','A measuring unit','Joining methods connect components.'],
 'food-awareness':['Why is variety useful in a diet?','Different foods provide different nutrients','One food always supplies everything','Food groups never matter','A varied diet helps provide a range of nutrients.'],
 'design-brief':['What is a design brief?','A statement of a design problem and requirements','A finished product','A list of random colours','A brief explains what a design should achieve.'],
 materials:['Why might cardboard suit a prototype?','It is easy to cut and fold safely with suitable tools','It is always waterproof','It is stronger than steel','Cardboard is inexpensive and readily shaped for models.'],
 structures:['What does a triangular brace often improve?','Rigidity','Transparency','Electrical conductivity','Triangular bracing can reduce unwanted movement in a frame.'],
 'food-preparation':['Why wash hands before preparing food?','To reduce transfer of harmful microorganisms','To make food sweeter','To change the food colour','Handwashing reduces the risk of contamination.'],
 evaluation:['What should a product be tested against?','Its success criteria','Only its price tag','An unrelated product','Criteria provide a basis for evaluating a design.'],
 mechanisms:['What does a lever do?','Transfer force around a pivot','Store computer files','Generate sunlight','A lever turns around a pivot to transfer force or motion.'],
 research:['Why examine existing products?','To identify useful features and problems','To avoid learning from others','To guarantee an identical copy','Product research informs design decisions.'],
 textiles:['What is a seam?','A line where pieces of fabric are joined','A type of battery','A wood finish','A seam joins pieces of fabric.'],
 nutrition:['Which nutrient is an important source of energy?','Carbohydrate','Glass','Iron filings','Carbohydrates are one source of dietary energy.'],
 'electrical-systems':['What happens when a simple series circuit switch opens?','Current stops','The lamp becomes brighter','The battery doubles its voltage','An open switch breaks the circuit.'],
 'user-needs':['Why ask users questions before designing?','To understand their requirements','To avoid feedback','To make every product identical','User research helps establish what a product must do.'],
 sketching:['Why label a design drawing?','To communicate features and materials','To hide its dimensions','To replace testing','Labels clarify how the design should work.'],
 'food-safety':['Why separate raw meat from ready-to-eat food?','To reduce cross-contamination','To make food colder','To change flavour','Separating them helps prevent harmful microorganisms spreading.'],
 prototyping:['What is a prototype?','An early model used for testing','Always the final mass-produced product','Only an advertisement','A prototype helps test and refine an idea.'],
 manufacturing:['What is quality control?','Checking that products meet requirements','Ignoring defects','Choosing random dimensions','Quality control checks products against standards.'],
 electronics:['What is a sensor?','A device that detects a physical condition','Only a loudspeaker','A piece of packaging','Sensors provide input about conditions such as light or temperature.'],
 sustainability:['What is one goal of sustainable design?','Reduce unnecessary environmental impact','Maximise waste','Avoid considering product lifespan','Sustainable design considers resources, waste and lifecycle effects.'],
 ergonomics:['What does ergonomics study?','How products fit people and tasks','Only colour mixing','Only musical rhythm','Ergonomics considers comfort, safety and effective human use.']
};
export function designTechnologyKnowledgePractice(topicId,{yearId='year-4'}={}){
 if(!designTechnologyTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Topic is not mapped to this year.');
 const [prompt,answer,a,b,explanation]=knowledge[topicId];
 return [{questionId:`dt-${yearId}-${topicId}-knowledge-1`,yearId,topicId,
  prompt,answer,options:[answer,a,b],explanation,status:'draft'}];
}
export function designTechnologyContentCoverage(){
 return Object.entries(pathways).map(([yearId,topics])=>({
  yearId,topicCount:topics.length,starterProjects:topics.filter(id=>Boolean(projects[id])).length,
  uniqueStarterQuestions:topics.filter(id=>Boolean(knowledge[id])).length
 }));
}
