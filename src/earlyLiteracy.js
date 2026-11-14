// EYFS literacy: short adult-supported activities for ages 3–5.
// Each lesson includes a teaching prompt and ten distinct checks.
const letterNames = [['a','apple'],['b','ball'],['c','cat'],['d','dog'],['e','egg'],['f','fish'],['g','goat'],['h','hat'],['i','igloo'],['j','jam'],['k','kite'],['l','lion']];
const initialSounds = [['sun','s'],['moon','m'],['fish','f'],['dog','d'],['cat','c'],['hat','h'],['bus','b'],['pen','p'],['tap','t'],['leg','l'],['jam','j'],['van','v']];
const rhymes = [['cat','hat'],['dog','log'],['sun','fun'],['pen','hen'],['cake','lake'],['boat','goat'],['bee','tree'],['star','car'],['mouse','house'],['light','night'],['king','ring'],['chair','bear']];
const blends = [['c-a-t','cat'],['d-o-g','dog'],['s-u-n','sun'],['p-i-g','pig'],['h-e-n','hen'],['b-u-s','bus'],['f-o-x','fox'],['m-a-p','map'],['r-e-d','red'],['t-o-p','top'],['j-a-m','jam'],['l-e-g','leg']];
const sightWords = ['the','and','is','to','I','you','we','he','she','my','go','no'];
const sentenceWords = [['The cat sat.','cat'],['The dog ran.','dog'],['The sun is hot.','sun'],['I see a bus.','bus'],['We have a red hat.','hat'],['The fish can swim.','fish'],['The hen has eggs.','hen'],['My cup is blue.','cup'],['A frog can jump.','frog'],['The moon is bright.','moon'],['The bee can fly.','bee'],['The pig is pink.','pig']];
const sequencing = [['First','Next','Last'],['Beginning','Middle','End']];
const letters = letterNames.map(([letter])=>letter);
function make(prompt,answer,other1,other2,explanation){return {prompt,answer,options:[answer,other1,other2],explanation};}
function unique(items){return items.every(q=>q.options.length===3&&new Set(q.options).size===3);}
const lessons = {
 'Letters and names': {intro:'Letters have names. Point to a letter, say its name, then find it again.',make:()=>letterNames.slice(0,10).map(([letter],i)=>make('Which letter starts the word '+letterNames[i][1]+'?',letter,letters[(i+3)%12],letters[(i+6)%12],'The word '+letterNames[i][1]+' begins with '+letter+'.'))},
 'Beginning sounds': {intro:'Listen to the first sound in each word. Say the word slowly with a grown-up.',make:()=>initialSounds.slice(0,10).map(([word,sound],i)=>make('What sound does '+word+' begin with?',sound,initialSounds[(i+3)%12][1],initialSounds[(i+6)%12][1],word+' starts with the /'+sound+'/ sound.'))},
 'Rhyming words': {intro:'Rhyming words have the same ending sound. Say both words aloud.',make:()=>rhymes.slice(0,10).map(([word,rhyme],i)=>make('Which word rhymes with '+word+'?',rhyme,rhymes[(i+3)%12][1],rhymes[(i+6)%12][1],word+' and '+rhyme+' sound alike at the end.'))},
 'Blend the sounds': {intro:'Say each sound, then push the sounds together to read a word.',make:()=>blends.slice(0,10).map(([sounds,word],i)=>make('Blend the sounds: '+sounds+'. What word?',word,blends[(i+3)%12][1],blends[(i+6)%12][1],sounds+' blends into '+word+'.'))},
 'Common words': {intro:'Some words appear often in stories. Look carefully at the whole word.',make:()=>sightWords.slice(0,10).map((word,i)=>make('Find the word: '+word,word,sightWords[(i+3)%12],sightWords[(i+6)%12],'This is the word '+word+'.'))},
 'Read a sentence': {intro:'Read the short sentence together. Find the word that answers the question.',make:()=>sentenceWords.slice(0,10).map(([sentence,word],i)=>make(sentence+' Which word is in the sentence?',word,sentenceWords[(i+3)%12][1],sentenceWords[(i+6)%12][1],'The sentence includes the word '+word+'.'))},
 'Capital letters': {intro:'A sentence starts with a capital letter. Names also start with capitals.',make:()=>letterNames.slice(0,10).map(([letter],i)=>make('Which is the CAPITAL letter for '+letter+'?',letter.toUpperCase(),letter,letterNames[(i+3)%12][0].toUpperCase(),'The capital of '+letter+' is '+letter.toUpperCase()+'.'))},
 'Writing and punctuation': {intro:'Say a short sentence. Start with a capital letter and finish with a full stop or question mark.',make:()=>Array.from({length:10},(_,i)=>i%2===0?make('Which punctuation ends this question: '+['Can I play','May I sit here','Where is my hat','Is it sunny','Can we read'][i/2]+'','?','.','!','A question normally ends with a question mark.'):make('Which punctuation ends this statement: '+['I can hop','The dog runs','We like books','My cup is red','The sun is warm'][(i-1)/2]+'','.','?','!','A statement normally ends with a full stop.'))}
};
export const earlyLiteracyTopics=Object.entries(lessons).map(([name,{intro}])=>[name,intro]);
export function earlyLiteracyLesson(topic,age){
 if(!Number.isInteger(age)||age<3||age>5)throw Error('Early literacy is designed for ages 3–5.');
 const lesson=lessons[topic];if(!lesson)throw Error('Unknown early literacy topic.');
 const questions=lesson.make();
 if(questions.length!==10||!unique(questions)||new Set(questions.map(q=>q.prompt)).size!==10)throw Error('Early literacy content validation failed.');
 return {intro:lesson.intro,questions};
}
