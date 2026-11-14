/**
 * BrightPath expanded practice bank — Stage 2 Step 14.
 * Standalone curated supplementary content; NOT yet connected to live UI.
 * Unlike earlier starter generators, this module never pads a requested set
 * by repeating the same authored question. Gaps are explicitly reported.
 * No personal data, external dependencies, or production changes.
 */
const entries=[
 // subject, topicId, minYear, maxYear, format, prompt, answer, options, explanation
 ['English','reading',2,5,'multiple-choice','Original passage: “The path was wet, but Leo left his umbrella at home.” What suggests it had rained?','The wet path',['The wet path','The umbrella was red','Leo was at school'],'The description of the wet path is a clue that rain may have fallen.'],
 ['English','reading',4,8,'multiple-choice','Original passage: “Nina checked the clock twice before the interview.” What might this imply?','She is concerned about the time',['She is concerned about the time','She has lost the clock','The interview is over'],'Repeatedly checking the clock may suggest anticipation or concern about timing.'],
 ['English','reading',7,11,'multiple-choice','Original passage: “The once-busy station stood silent, its timetable fading beneath dust.” What atmosphere is suggested?','Abandonment',['Abandonment','Celebration','Urgency'],'Silence, dust and fading signs suggest the station has been neglected.'],
 ['English','grammar',2,6,'multiple-choice','Which sentence uses the past tense?','They walked to the park.',['They walked to the park.','They walk to the park.','They will walk to the park.'],'Walked expresses an action in the past.'],
 ['English','grammar',5,9,'multiple-choice','Which sentence contains a relative clause?','The book, which I borrowed, was fascinating.',['The book, which I borrowed, was fascinating.','The book was fascinating.','Borrow the book.'],'Which I borrowed adds information about the noun book.'],
 ['English','punctuation',3,7,'multiple-choice','Which sentence correctly punctuates direct speech?','“Come here,” said Tom.',['“Come here,” said Tom.','“Come here” said Tom.','Come here, said Tom.'],'The spoken words are enclosed in quotation marks and the reporting clause follows the comma.'],
 ['English','vocabulary',3,7,'multiple-choice','Which word is the best synonym for enormous?','Huge',['Huge','Tiny','Narrow'],'Enormous means extremely large.'],
 ['English','creative-writing',5,11,'short-answer','Write two sentences that establish a mysterious setting.','A supported creative response',[],'Review for precise sensory details and a consistent atmosphere; multiple answers are valid.'],
 ['Maths','fractions',3,6,'multiple-choice','What is one half of 18?','9',['9','6','12'],'18 divided into two equal groups gives 9 in each.'],
 ['Maths','fractions',5,8,'multiple-choice','What is 3/4 + 1/8?','7/8',['7/8','4/12','1/2'],'Convert 3/4 to 6/8, then add 1/8 to get 7/8.'],
 ['Maths','percentages',6,10,'multiple-choice','What is 15% of 200?','30',['30','15','45'],'10% of 200 is 20 and 5% is 10, so 15% is 30.'],
 ['Maths','algebra',7,11,'multiple-choice','Solve 3x + 4 = 19.','5',['5','7','15'],'Subtract 4 to get 3x = 15, then divide by 3.'],
 ['Maths','geometry',5,9,'multiple-choice','What is the sum of the interior angles of a triangle?','180°',['180°','90°','360°'],'The interior angles of any Euclidean triangle add to 180°.'],
 ['Maths','probability',7,11,'multiple-choice','A fair six-sided die is rolled. What is P(even)?','1/2',['1/2','1/6','2/3'],'Three of the six equally likely outcomes are even.'],
 ['Science','plants',1,4,'multiple-choice','What do leaves generally absorb for photosynthesis?','Light',['Light','Soil','Wind'],'Leaves capture light energy using pigments including chlorophyll.'],
 ['Science','habitats',2,5,'multiple-choice','Why might a pond be a suitable habitat for a frog?','It provides water and suitable conditions',['It has no living things','It is always warm','It contains no food'],'Frogs depend on suitable habitats that provide water, shelter and food.'],
 ['Science','forces',3,8,'multiple-choice','A ball slows down as it rolls across grass. Which force contributes to this?','Friction',['Friction','Buoyancy only','Magnetism only'],'Resistive forces, including friction, oppose the ball’s motion.'],
 ['Science','electricity',4,10,'multiple-choice','Which material is generally a good electrical conductor?','Copper',['Copper','Rubber','Dry wood'],'Copper has mobile charge carriers and is commonly used in wiring.'],
 ['Science','cells',7,11,'multiple-choice','What is the function of a cell membrane?','Control movement of substances into and out of the cell',['Control movement of substances into and out of the cell','Produce all cell DNA','Make the cell rigid in every organism'],'Cell membranes regulate the movement of substances across the cell boundary.'],
 ['Science','reactions',7,11,'multiple-choice','What is a reactant?','A substance present at the start of a chemical reaction',['A substance present at the start of a chemical reaction','Only the heat produced','A product after the reaction'],'Reactants undergo changes during a chemical reaction.'],
 ['Science','scientific-enquiry',3,11,'multiple-choice','Why repeat measurements in an investigation?','To assess consistency and identify anomalies',['To guarantee a preferred result','To remove the need for recording','To avoid using equipment'],'Repeated measurements help assess reliability and variation.'],
 ['History','chronology',1,6,'multiple-choice','Which is earliest?','The Roman period in Britain',['The Roman period in Britain','The Victorian era','The present day'],'The Roman period in Britain preceded the Victorian era and today.'],
 ['History','historical-sources',3,9,'multiple-choice','Why should a historian consider who created a source?','Its purpose and viewpoint may affect the account',['Its creator guarantees truth','All sources have identical purposes','It makes dates irrelevant'],'Authorship and purpose can shape what a source records or omits.'],
 ['History','roman-britain',4,7,'multiple-choice','Which Roman building was used for public bathing?','Bathhouse',['Bathhouse','Windmill','Railway station'],'Roman bathhouses were used for bathing and social activities.'],
 ['History','world-war-two',9,11,'multiple-choice','Which event marked the start of the Second World War in Europe in 1939?','Germany’s invasion of Poland',['Germany’s invasion of Poland','The Battle of Hastings','The fall of the Berlin Wall'],'Germany invaded Poland on 1 September 1939.'],
 ['Geography','map-skills',3,8,'multiple-choice','On most conventional maps, which direction is at the top?','North',['North','South','West'],'Many maps are oriented with north at the top, though not all are.'],
 ['Geography','rivers',3,9,'multiple-choice','What is a river tributary?','A smaller river flowing into a larger one',['A smaller river flowing into a larger one','The highest mountain','A coastal sand dune'],'A tributary feeds another river or watercourse.'],
 ['Geography','climate',3,9,'multiple-choice','Which describes a long-term climate pattern?','Average rainfall over decades',['Average rainfall over decades','A single storm','Today’s temperature'],'Climate describes long-term patterns and variability.'],
 ['Geography','sustainability',6,11,'multiple-choice','Why might repairing an item be more sustainable than replacing it?','It may reduce resource use and waste',['It always requires more raw materials','It eliminates all emissions','It makes materials infinite'],'Repair can extend useful life and avoid some manufacturing and disposal impacts.'],
 ['Computing','algorithms',1,7,'multiple-choice','Which sequence correctly describes making a sandwich?','Prepare ingredients, assemble, serve',['Prepare ingredients, assemble, serve','Serve, prepare ingredients, assemble','Assemble, serve, prepare ingredients'],'Algorithms depend on steps being in a workable order.'],
 ['Computing','debugging',2,8,'multiple-choice','A loop runs one extra time. What should you inspect first?','The loop condition or bounds',['The loop condition or bounds','The screen colour','The file icon'],'An off-by-one error often comes from the loop’s limits.'],
 ['Computing','privacy',5,11,'multiple-choice','What is a sensible response when an app requests unnecessary location access?','Decline the permission and ask a trusted adult if unsure',['Decline the permission and ask a trusted adult if unsure','Grant every permission','Post your location publicly'],'Permissions should be limited to what is needed.'],
 ['Computing','binary',7,11,'multiple-choice','What is decimal 6 in binary?','110',['110','101','111'],'6 = 4 + 2, so its binary representation is 110.'],
 ['Art','composition',5,11,'multiple-choice','What is a focal point in a composition?','An area that draws the viewer’s attention',['An area that draws the viewer’s attention','The artwork’s price','The name of the gallery'],'Contrast, placement and other choices can create emphasis.'],
 ['Art','drawing',1,8,'multiple-choice','What is a contour line?','A line describing an edge or outline',['A line describing an edge or outline','A paint colour','A type of camera'],'Contour drawing follows visible edges and shapes.'],
 ['Art','evaluation',10,11,'short-answer','Describe one design decision in your artwork and explain its effect.','A supported reflection',[],'Look for a specific decision, visual evidence and a reasoned explanation; no single correct response.'],
 ['Music','rhythm',1,7,'multiple-choice','What does a rest mean in a rhythm?','A period of silence',['A period of silence','Play faster','Play twice as loudly'],'A rest indicates silence for a specified duration.'],
 ['Music','dynamics',4,11,'multiple-choice','Which marking generally means loud?','f',['f','p','pp'],'The symbol f stands for forte, meaning loud.'],
 ['Music','composition',2,11,'short-answer','Create an original four-beat pattern using C for clap and R for rest.','A valid four-beat pattern',[],'Check that the pattern contains four beats and can be performed consistently; many answers are valid.'],
 ['Design and Technology','structures',1,8,'multiple-choice','Which change may help a paper bridge support more weight?','Adding folded supports',['Adding folded supports','Removing all supports','Making the span longer without reinforcement'],'Folds and bracing can increase structural stiffness.'],
 ['Design and Technology','evaluation',1,11,'multiple-choice','What is a fair way to compare two prototypes?','Test both against the same criteria',['Test both against the same criteria','Change every condition','Judge only by colour'],'Consistent criteria help make comparisons meaningful.'],
 ['Design and Technology','sustainability',9,11,'multiple-choice','Which design choice can help a product last longer?','Making worn parts replaceable',['Making worn parts replaceable','Using permanent single-use parts only','Preventing repairs'],'Repairability can extend product life.'],
 ['French','greetings',1,11,'multiple-choice','What does “Au revoir” mean?','Goodbye',['Goodbye','Good morning','Thank you'],'Au revoir is a common French farewell.'],
 ['French','numbers',1,8,'multiple-choice','What is “cinq” in English?','Five',['Five','Six','Four'],'Cinq is French for five.'],
 ['Spanish','greetings',1,11,'multiple-choice','What does “Buenos días” mean?','Good morning',['Good morning','Good night','See you later'],'Buenos días is a Spanish morning greeting.'],
 ['Spanish','numbers',1,8,'multiple-choice','What is “ocho” in English?','Eight',['Eight','Seven','Nine'],'Ocho is Spanish for eight.'],
 ['Wider Learning','budgeting',4,11,'multiple-choice','You have £10 and spend £6. How much remains?','£4',['£4','£6','£16'],'Subtract £6 from £10 to get £4.'],
 ['Wider Learning','friendship',1,7,'multiple-choice','A classmate wants to join a game. What is a kind response?','Invite them to play if possible',['Invite them to play if possible','Mock them','Ignore them deliberately'],'Including others when possible is a kind and respectful choice.'],
 ['Wider Learning','media-literacy',4,11,'multiple-choice','What should you check before sharing a dramatic online claim?','Its evidence and reliable sources',['Its evidence and reliable sources','Only the number of likes','Whether it uses capital letters'],'Popularity and dramatic wording do not prove accuracy.']
];
const SUBJECTS=Object.freeze(['English','Maths','Science','History','Geography','Computing','Art','Music','Design and Technology','French','Spanish','Wider Learning']);
function validateEntry(row,index){
 if(!Array.isArray(row)||row.length!==9)throw Error('Invalid question row '+index);
 const [subject,topicId,minYear,maxYear,format,prompt,answer,options,explanation]=row;
 if(!SUBJECTS.includes(subject)||typeof topicId!=='string'||!topicId||
 !Number.isInteger(minYear)||!Number.isInteger(maxYear)||minYear<1||maxYear>11||minYear>maxYear||
 !['multiple-choice','short-answer'].includes(format)||
 ![prompt,answer,explanation].every(s=>typeof s==='string'&&s.trim().length>=4)||
 !Array.isArray(options))throw Error('Invalid question fields '+index);
 if(format==='multiple-choice'&&(options.length!==3||!options.includes(answer)||new Set(options).size!==3))throw Error('Invalid choices '+index);
 if(format==='short-answer'&&options.length!==0)throw Error('Unexpected short-answer choices '+index);
}
entries.forEach(validateEntry);
export const expandedQuestionBank=Object.freeze(entries.map((row,index)=>{
 const [subject,topicId,minYear,maxYear,format,prompt,answer,options,explanation]=row;
 return Object.freeze({id:`expanded-${String(index+1).padStart(3,'0')}`,subject,topicId,minYear,maxYear,
  format,prompt,answer,options:Object.freeze([...options]),explanation,status:'draft',
  marking:format==='short-answer'?'human-review':'exact-match'});
}));
const yearNumber=yearId=>yearId==='nursery'||yearId==='reception'?0:
 /^year-(?:[1-9]|10|11)$/.test(yearId)?Number(yearId.slice(5)):NaN;
export function expandedQuestionsFor({subject,topicId,yearId,count=6,seed=0}={}){
 const year=yearNumber(yearId);
 if(!SUBJECTS.includes(subject)||!Number.isInteger(year)||year<1||
 typeof topicId!=='string'||!topicId||!Number.isInteger(count)||count<1||count>30||
 !Number.isSafeInteger(seed)||seed<0)throw Error('Invalid expanded practice request.');
 const matching=expandedQuestionBank.filter(q=>q.subject===subject&&q.topicId===topicId&&q.minYear<=year&&q.maxYear>=year);
 // Deterministic rotation, without repeating authored questions.
 const ordered=matching.length?matching.slice(seed%matching.length).concat(matching.slice(0,seed%matching.length)):[];
 const chosen=ordered.slice(0,count).map((q,i)=>{
  if(q.format!=='multiple-choice')return {...q,options:[]};
  const offset=(seed+i)%q.options.length;
  return {...q,options:[...q.options.slice(offset),...q.options.slice(0,offset)]};
 });
 return {questions:chosen,requested:count,available:matching.length,
  shortage:Math.max(0,count-chosen.length),complete:chosen.length===count};
}
export function expandedQuestionCoverage(){
 const subjects=SUBJECTS.map(subject=>{
  const questions=expandedQuestionBank.filter(q=>q.subject===subject);
  return {subject,authoredQuestions:questions.length,topics:[...new Set(questions.map(q=>q.topicId))].length,
   multipleChoice:questions.filter(q=>q.format==='multiple-choice').length,
   humanReview:questions.filter(q=>q.format==='short-answer').length};
 });
 return {totalUniqueQuestions:expandedQuestionBank.length,subjects};
}
