/**
 * BrightPath teaching support — Stage 2 Step 15.
 * Draft worked examples and scaffolded feedback. No automated assessment of
 * creative/free-text work. This module does not modify the live lesson engine.
 * Only authored, topic-specific teaching is returned: unknown topics explicitly
 * report missing content instead of generating misleading generic solutions.
 */
import {expandedQuestionBank} from './expandedQuestionBank.js';

const lessons=[
 ['Maths','fractions','Adding fractions with different denominators',
  'To add fractions, first express them using the same denominator.',
  ['Find a common denominator for 3/4 and 1/8.','Convert 3/4 to 6/8.','Add 6/8 + 1/8 = 7/8.'],
  '3/4 + 1/8 = 7/8.',
  ['What denominator could both fractions use?','How many eighths are in three quarters?'],
  'Adding the denominators is not the rule: convert to equivalent fractions first.'],
 ['Maths','percentages','Finding a percentage of an amount',
  'A percentage is a number of parts per hundred.',
  ['Find 10% of 200 by dividing 200 by 10: 20.','Find 5% by halving 10%: 10.','Add 20 and 10 to get 15% of 200 = 30.'],
  '15% of 200 = 30.',
  ['Can you work out 10% first?','How could you use 10% to find 5%?'],
  '15% is not simply 15; it depends on the amount.'],
 ['Maths','algebra','Solving a linear equation',
  'Keep both sides of an equation balanced by applying the same operation.',
  ['Start with 3x + 4 = 19.','Subtract 4 from both sides: 3x = 15.','Divide both sides by 3: x = 5.','Check: 3 × 5 + 4 = 19.'],
  'x = 5.',
  ['What operation reverses adding four?','Once you have 3x = 15, how do you isolate x?'],
  'Subtract four before dividing; otherwise the balance is lost.'],
 ['Maths','probability','Finding probability from equally likely outcomes',
  'Probability = favourable outcomes ÷ total equally likely outcomes.',
  ['A fair die has six equally likely faces.','The even outcomes are 2, 4 and 6: three outcomes.','Divide 3 by 6 to obtain 1/2.'],
  'P(even) = 1/2.',
  ['How many possible faces are there?','How many of those faces are even?'],
  'Count outcomes, not just the number of labels in the question.'],
 ['English','reading','Using evidence to make an inference',
  'An inference is an interpretation supported by clues in a text.',
  ['Read: “Nina checked the clock twice before the interview.”','Identify the clue: Nina checks the clock repeatedly.','Infer that she may be concerned about time or anticipating the interview.','Explain your inference using the clue.'],
  'Nina may be worried about timing because she checks the clock twice.',
  ['Which action is repeated?','What could that action suggest, without claiming certainty?'],
  'Avoid treating an inference as a proven fact about the character.'],
 ['English','grammar','Recognising a relative clause',
  'A relative clause adds information about a noun or noun phrase.',
  ['Read: “The book, which I borrowed, was fascinating.”','Find the noun: “book”.','Find the extra information: “which I borrowed”.','Notice that the clause relates back to “book”.'],
  '“which I borrowed” is a relative clause.',
  ['Which noun is being described?','Which words give extra information about that noun?'],
  'A relative clause adds information; it is not just any long sentence.'],
 ['English','creative-writing','Creating an atmospheric setting',
  'Choose concrete sensory details that support the mood you want.',
  ['Choose a mood, such as mysterious.','Pick two sensory details: a faint tapping and an empty corridor.','Write a sentence placing the reader in the scene.','Revise a word to strengthen the atmosphere.'],
  'Example: “A faint tapping echoed along the empty corridor.”',
  ['What might someone hear or see?','Which precise verb would strengthen the mood?'],
  'There is no single correct creative sentence; explain and refine your choices.'],
 ['Science','scientific-enquiry','Why scientists repeat measurements',
  'Repeated measurements help reveal variability and unexpected readings.',
  ['Measure a safe quantity three times under the same conditions.','Record every result, even if it is unexpected.','Compare the readings and look for anomalies.','Explain whether the results appear consistent.'],
  'Repeated readings can help assess consistency; they do not guarantee accuracy.',
  ['Why record every result?','What could a very different reading suggest?'],
  'Repeating a measurement does not automatically remove systematic error.'],
 ['Science','forces','Understanding friction',
  'Friction is a force that can oppose relative motion between surfaces.',
  ['Imagine a ball rolling over grass.','Identify the motion: the ball is moving forward.','Consider resistive forces including friction that oppose the motion.','Predict that the ball may slow down.'],
  'Friction contributes to slowing a rolling ball.',
  ['Which direction is the ball moving?','Which force opposes its motion?'],
  'Real motion may involve more than one force, including air resistance.'],
 ['History','historical-sources','Evaluating a historical source',
  'Sources are evidence to examine, not automatically complete accounts.',
  ['Identify who created the source and when.','Consider the intended audience and purpose.','Describe what the source directly shows or states.','Compare it with another source before drawing a conclusion.'],
  'A source can be useful while still reflecting a limited viewpoint.',
  ['Who created the source?','What might the creator want the audience to believe?'],
  'Bias does not automatically make a source useless; analyse its limitations.'],
 ['Geography','map-skills','Using map direction',
  'Compass directions describe position relative to an orientation.',
  ['Find the north arrow or compass rose.','Check whether north is at the top of this particular map.','Identify east, south and west relative to north.','Describe a route using the map’s actual orientation.'],
  'Many conventional maps place north at the top, but not all do.',
  ['Can you find the north arrow?','Does this map actually place north at the top?'],
  'Never assume every map is north-up.'],
 ['Computing','binary','Converting decimal numbers to binary',
  'Binary represents numbers using place values that are powers of two.',
  ['Write the place values 4, 2 and 1.','To make 6, use 4 + 2 + 0.','Write 1 in the 4 and 2 columns, and 0 in the 1 column.','Read the digits as 110.'],
  'Decimal 6 is binary 110.',
  ['Which powers of two add to six?','What digit goes in the ones column?'],
  'Binary digits represent powers of two, not decimal place values.'],
 ['Computing','privacy','Reviewing app permissions',
  'Only give apps access to information and device features they need.',
  ['Notice that a drawing app requests precise location.','Ask whether location is needed for drawing.','Decline unnecessary permission and ask a trusted adult if unsure.','Use the app only if its behaviour is safe and appropriate.'],
  'Unnecessary location access can be declined.',
  ['What is the app supposed to do?','Does that task require your location?'],
  'A permission request is not proof that an app needs the information.'],
 ['Art','composition','Finding the focal point',
  'Artists use contrast, placement and scale to direct attention.',
  ['Look at a picture and identify where your eye goes first.','Notice whether that area has strong contrast or unusual placement.','Compare it with less prominent areas.','Explain which visual feature creates emphasis.'],
  'The focal point is an area that attracts attention.',
  ['Where do you look first?','Which colour, shape or contrast draws you there?'],
  'Different viewers may notice different areas; use visual evidence.'],
 ['Music','rhythm','Using rests in a rhythm',
  'A rest indicates a measured period of silence.',
  ['Count four steady beats.','Clap on beats one and three.','Stay silent on beats two and four.','Repeat the pattern while keeping the pulse steady.'],
  'A four-beat pattern can be clap, rest, clap, rest.',
  ['Which beats will be silent?','Can you keep counting while not clapping?'],
  'A rest is counted silence, not a loss of pulse.'],
 ['Design and Technology','evaluation','Testing against design criteria',
  'A useful evaluation compares a design with requirements set in advance.',
  ['Choose two clear success criteria, such as stability and capacity.','Test the prototype against each criterion.','Record what happened rather than just saying “good”.','Suggest one change based on the evidence.'],
  'A fair comparison uses the same criteria for each prototype.',
  ['What was the design supposed to achieve?','What evidence would show whether it achieved that?'],
  'Appearance alone may not show whether a product works.'],
 ['French','greetings','Greeting and saying goodbye in French',
  'Use simple expressions appropriately in a short conversation.',
  ['Say “Bonjour” to greet someone.','Practise a short polite exchange.','Use “Au revoir” when leaving.'],
  '“Bonjour” means hello; “Au revoir” means goodbye.',
  ['Which word begins the exchange?','Which phrase would you use when leaving?'],
  'A greeting and a farewell have different purposes.'],
 ['Spanish','numbers','Recognising Spanish numbers',
  'Build vocabulary by connecting spoken or written words to quantities.',
  ['Count eight objects in English.','Read the Spanish word “ocho”.','Match “ocho” with the quantity eight.','Try identifying it in a different set of objects.'],
  '“Ocho” means eight.',
  ['How many objects are shown?','Which Spanish word names that number?'],
  'Practise the meaning, not just the spelling.'],
 ['Wider Learning','budgeting','Calculating money left after spending',
  'A budget compares available money with planned spending.',
  ['Start with £10.','Subtract the £6 spent: 10 − 6 = 4.','Check: £6 + £4 = £10.','Consider whether £4 is enough for the next planned expense.'],
  '£4 remains.',
  ['What is the starting amount?','Which operation tells you what remains?'],
  'Do not add spending to the starting balance when finding money left.']
];
// Entry structure: subject, topicId, title, concept, steps, example, hints, misconception
const knownSubjects=new Set(['Maths','English','Science','History','Geography','Computing','Art','Music','Design and Technology','French','Spanish','Wider Learning']);
function validateLesson(row,i){
 if(row.length!==8||!knownSubjects.has(row[0])||typeof row[1]!=='string'||
 !row.slice(2,4).every(s=>typeof s==='string'&&s.trim())||
 !Array.isArray(row[4])||row[4].length<2||!row[4].every(s=>typeof s==='string'&&s.trim())||
 !row.slice(5,8).every((s,j)=>j===1?Array.isArray(s)&&s.length>0&&s.every(x=>typeof x==='string'&&x.trim()):typeof s==='string'&&s.trim()))
 throw Error('Invalid worked example '+i);
}
lessons.forEach(validateLesson);
export const workedExamples=Object.freeze(lessons.map(([subject,topicId,title,concept,steps,example,hints,misconception],i)=>Object.freeze({
 id:`worked-${String(i+1).padStart(3,'0')}`,subject,topicId,title,concept,
 steps:Object.freeze([...steps]),example,hints:Object.freeze([...hints]),
 misconception,status:'draft',reviewStatus:'pending'
})));
export function workedExampleFor(subject,topicId){
 if(!knownSubjects.has(subject)||typeof topicId!=='string'||!topicId)throw Error('Invalid teaching lookup.');
 return workedExamples.find(x=>x.subject===subject&&x.topicId===topicId)||null;
}
export function teachingSupportForQuestion(questionId){
 if(typeof questionId!=='string'||!questionId)throw Error('Question ID required.');
 const question=expandedQuestionBank.find(q=>q.id===questionId);
 if(!question)return {found:false,reason:'unknown-question',questionId};
 const example=workedExampleFor(question.subject,question.topicId);
 return {found:true,questionId,subject:question.subject,topicId:question.topicId,
  explanation:question.explanation,workedExample:example,
  missingWorkedExample:!example,requiresHumanReview:question.marking==='human-review'};
}
export function teachingFeedback(questionId,{selectedAnswer=null,hintLevel=0,revealAnswer=false}={}){
 const support=teachingSupportForQuestion(questionId);
 if(!support.found)return support;
 if(!Number.isInteger(hintLevel)||hintLevel<0||hintLevel>3)throw Error('Invalid hint level.');
 const q=expandedQuestionBank.find(item=>item.id===questionId);
 const example=support.workedExample;
 const hint=hintLevel>0&&example?example.hints[Math.min(hintLevel-1,example.hints.length-1)]:null;
 if(q.marking==='human-review')return {
  ...support,feedbackStatus:'needs-human-review',hint,
  message:'This response has more than one possible answer. Use the guidance and ask a parent or educator to review it.',
  answer:revealAnswer?q.answer:null,explanation:revealAnswer?q.explanation:null
 };
 const attempted=selectedAnswer!==null;
 const correct=attempted&&selectedAnswer===q.answer;
 return {...support,feedbackStatus:!attempted?'not-attempted':correct?'correct':'try-again',
  hint,message:!attempted?'Try the question before checking the answer.':
  correct?'That is correct.': 'Not quite. Review the hint and try again.',
  answer:revealAnswer?q.answer:null,
  explanation:correct||revealAnswer?q.explanation:null,
  misconception:!correct&&attempted&&example?example.misconception:null};
}
export function teachingSupportCoverage(){
 const bySubject=[...knownSubjects].map(subject=>{
  const questions=expandedQuestionBank.filter(q=>q.subject===subject);
  const supported=questions.filter(q=>Boolean(workedExampleFor(q.subject,q.topicId)));
  return {subject,questions:questions.length,withWorkedExample:supported.length,
   missingWorkedExample:questions.length-supported.length};
 });
 return {workedExamples:workedExamples.length,questions:expandedQuestionBank.length,
  questionsWithWorkedExample:bySubject.reduce((sum,s)=>sum+s.withWorkedExample,0),
  bySubject};
}
