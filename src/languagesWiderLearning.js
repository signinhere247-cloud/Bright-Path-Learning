/**
 * BrightPath Languages & Wider Learning — Stage 2 Step 13.
 * Draft England-oriented enrichment pathways. French and Spanish are introductory
 * original learning examples, not a complete language course or GCSE specification.
 * PSHE, relationships, citizenship and financial literacy require further expert
 * review and age-sensitive safeguarding checks. No personal disclosures requested.
 * No existing lessons, saves or live website code changed.
 */
const years=['nursery','reception',...Array.from({length:11},(_,i)=>'year-'+(i+1))];
const languageTopics={
 nursery:['listening','greetings','colours'],reception:['listening','greetings','colours','numbers'],
 'year-1':['greetings','colours','numbers','family'],
 'year-2':['greetings','colours','numbers','family','animals'],
 'year-3':['pronunciation','greetings','numbers','colours','family','classroom'],
 'year-4':['pronunciation','greetings','numbers','family','food','questions'],
 'year-5':['pronunciation','greetings','family','food','daily-life','questions','sentences'],
 'year-6':['pronunciation','greetings','food','daily-life','questions','sentences','culture'],
 'year-7':['pronunciation','sentences','questions','daily-life','school','present-tense','culture'],
 'year-8':['sentences','questions','school','present-tense','past-tense','future','culture'],
 'year-9':['sentences','questions','school','present-tense','past-tense','future','opinions','culture'],
 'year-10':['sentences','questions','present-tense','past-tense','future','opinions','reading','writing','culture'],
 'year-11':['sentences','questions','present-tense','past-tense','future','opinions','reading','writing','culture']
};
const widerTopics={
 nursery:['feelings','friendship','self-care','community'],
 reception:['feelings','friendship','self-care','community','safety'],
 'year-1':['feelings','friendship','self-care','community','safety','needs-wants'],
 'year-2':['feelings','friendship','self-care','community','safety','needs-wants','saving'],
 'year-3':['wellbeing','friendship','boundaries','community','safety','needs-wants','saving'],
 'year-4':['wellbeing','friendship','boundaries','citizenship','safety','budgeting','media-literacy'],
 'year-5':['wellbeing','boundaries','citizenship','budgeting','media-literacy','decision-making'],
 'year-6':['wellbeing','boundaries','citizenship','budgeting','media-literacy','decision-making'],
 'year-7':['wellbeing','relationships','boundaries','citizenship','budgeting','media-literacy','decision-making'],
 'year-8':['wellbeing','relationships','boundaries','citizenship','budgeting','media-literacy','decision-making'],
 'year-9':['wellbeing','relationships','boundaries','citizenship','budgeting','media-literacy','careers','decision-making'],
 'year-10':['wellbeing','relationships','boundaries','citizenship','budgeting','consumer-rights','careers','decision-making'],
 'year-11':['wellbeing','relationships','boundaries','citizenship','budgeting','consumer-rights','careers','decision-making']
};
export const languageTopicNames=Object.freeze({
 listening:'Listening to language',greetings:'Greetings and introductions',colours:'Colours',
 numbers:'Numbers',family:'Family vocabulary',animals:'Animals',
 pronunciation:'Pronunciation and sounds',classroom:'Classroom vocabulary',
 food:'Food and drink',questions:'Questions and answers', 'daily-life':'Daily life',
 sentences:'Building sentences',culture:'Language and culture',school:'School life',
 'present-tense':'Present tense','past-tense':'Past tense',future:'Talking about the future',
 opinions:'Expressing opinions',reading:'Reading short texts',writing:'Writing short texts'
});
export const widerLearningTopicNames=Object.freeze({
 feelings:'Recognising feelings',friendship:'Friendship and kindness',
 'self-care':'Healthy daily habits',community:'Community and helping others',
 safety:'Everyday safety','needs-wants':'Needs and wants',saving:'Saving money',
 wellbeing:'Wellbeing and resilience',boundaries:'Personal boundaries and consent',
 citizenship:'Citizenship and democracy',budgeting:'Budgeting and money',
 'media-literacy':'Media literacy','decision-making':'Making decisions',
 relationships:'Respectful relationships',careers:'Careers and future planning',
 'consumer-rights':'Consumer awareness'
});
const freezeMap=map=>Object.freeze(Object.fromEntries(Object.entries(map).map(([y,topics])=>[y,Object.freeze([...topics])])));
export const languageYearTopicMap=freezeMap(languageTopics);
export const widerLearningYearTopicMap=freezeMap(widerTopics);
function topicsFor(map,names,yearId){
 if(!Object.hasOwn(map,yearId))throw Error('Unknown school year.');
 return map[yearId].map(id=>({id,title:names[id],yearId}));
}
export function languageTopicsForYear(yearId){return topicsFor(languageYearTopicMap,languageTopicNames,yearId);}
export function widerLearningTopicsForYear(yearId){return topicsFor(widerLearningYearTopicMap,widerLearningTopicNames,yearId);}
export const supportedStarterLanguages=Object.freeze(['french','spanish']);
// [English prompt, target-language answer, incorrect answer A, incorrect answer B, explanation]
const languageBank={
 french:{
  listening:['Which phrase is a greeting in French?','Bonjour','Gracias','Adiós','Bonjour means hello or good morning.'],
  greetings:['How do you say hello in French?','Bonjour','Buenas noches','Danke','Bonjour is a common French greeting.'],
  colours:['What is blue in French?','bleu','rojo','verde','Bleu means blue in French.'],
  numbers:['What is three in French?','trois','dos','vier','Trois means three in French.'],
  family:['How do you say mother in French?','mère','padre','hermano','Mère means mother in French.'],
  animals:['What is cat in French?','chat','perro','pájaro','Chat means cat in French.'],
  pronunciation:['Which French letter combination commonly makes an /u/ sound as in “vous”?','ou','oi','ai','The letters ou usually represent the /u/ sound in French.'],
  classroom:['What is a book in French?','livre','mesa','ventana','Livre means book in French.'],
  food:['How do you say bread in French?','pain','leche','queso','Pain means bread in French.'],
  questions:['Which phrase means “How are you?” in French?','Comment ça va ?','¿Dónde está?','Guten Tag','Comment ça va ? asks how someone is.'],
  'daily-life':['Which phrase means “I eat” in French?','Je mange','Yo vivo','Ich gehe','Je mange is the first-person singular of manger in the present tense.'],
  sentences:['Which is French for “I like music”?','J’aime la musique.','Me gusta la música.','Ich mag Musik.','J’aime la musique means I like music.'],
  culture:['What is a good approach when learning about French-speaking communities?','Explore different regions and experiences','Assume everyone has identical traditions','Avoid listening to speakers','French is spoken in diverse communities around the world.'],
  school:['Which French word means school?','école','escuela','Schule','École means school in French.'],
  'present-tense':['Which phrase means “we speak” in French?','Nous parlons','Nous parlé','Nous parler','Nous parlons is the present-tense nous form of parler.'],
  'past-tense':['Which phrase means “I ate” in French?','J’ai mangé','Je mange','Je mangerai','J’ai mangé uses the passé composé to express a completed past action.'],
  future:['Which phrase means “I will go” in French?','J’irai','Je vais','Je suis allé','J’irai is the simple future of aller for je.'],
  opinions:['Which phrase means “I think that” in French?','Je pense que','Yo creo que','Ich denke, dass','Je pense que introduces an opinion in French.'],
  reading:['In “Marie aime lire”, what does Marie like?','Reading','Swimming','Cooking','Aime lire means likes reading.'],
  writing:['Which sentence correctly says “I have a dog” in French?','J’ai un chien.','Je suis un chien.','J’ai une chien.','J’ai un chien means I have a dog; chien is masculine.']
 },
 spanish:{
  listening:['Which word is a greeting in Spanish?','Hola','Bonjour','Hallo','Hola means hello in Spanish.'],
  greetings:['How do you say hello in Spanish?','Hola','Au revoir','Danke','Hola is a common Spanish greeting.'],
  colours:['What is blue in Spanish?','azul','bleu','grün','Azul means blue in Spanish.'],
  numbers:['What is three in Spanish?','tres','trois','drei','Tres means three in Spanish.'],
  family:['How do you say mother in Spanish?','madre','mère','Mutter','Madre means mother in Spanish.'],
  animals:['What is cat in Spanish?','gato','chat','Hund','Gato means cat in Spanish.'],
  pronunciation:['Which letter is pronounced /ɲ/ in Spanish words such as niño?','ñ','ll','rr','The letter ñ represents the palatal nasal sound in Spanish.'],
  classroom:['What is a book in Spanish?','libro','livre','Buch','Libro means book in Spanish.'],
  food:['How do you say bread in Spanish?','pan','pain','Brot','Pan means bread in Spanish.'],
  questions:['Which phrase means “How are you?” in Spanish?','¿Cómo estás?','Comment ça va ?','Wie geht es dir?','¿Cómo estás? is an informal way to ask how someone is.'],
  'daily-life':['Which phrase means “I eat” in Spanish?','Yo como','Je mange','Ich esse','Como is the first-person singular present tense of comer.'],
  sentences:['Which is Spanish for “I like music”?','Me gusta la música.','J’aime la musique.','Ich mag Musik.','Me gusta la música means I like music.'],
  culture:['What is a good approach when learning about Spanish-speaking communities?','Explore regional diversity','Assume every country has the same traditions','Ignore local languages','Spanish is spoken across many regions with varied cultures.'],
  school:['Which Spanish word means school?','escuela','école','Schule','Escuela means school in Spanish.'],
  'present-tense':['Which phrase means “we speak” in Spanish?','Hablamos','Hablar','Hablé','Hablamos is the present-tense nosotros form of hablar.'],
  'past-tense':['Which phrase means “I ate” in Spanish?','Comí','Como','Comeré','Comí is a first-person preterite form of comer.'],
  future:['Which phrase means “I will go” in Spanish?','Iré','Voy','Fui','Iré is the simple future of ir for yo.'],
  opinions:['Which phrase means “I think that” in Spanish?','Pienso que','Je pense que','Ich denke, dass','Pienso que introduces an opinion in Spanish.'],
  reading:['In “Ana lee un libro”, what is Ana doing?','Reading a book','Eating lunch','Playing football','Lee un libro means reads a book.'],
  writing:['Which sentence correctly says “I have a dog” in Spanish?','Tengo un perro.','Soy un perro.','Tengo una perro.','Tengo un perro means I have a dog; perro is masculine.']
 }
};
const widerBank={
 feelings:['Which can help you describe a feeling?','Naming the emotion','Pretending no feelings exist','Guessing another person’s thoughts','Naming feelings can make them easier to discuss.'],
 friendship:['What is a kind response when a friend feels left out?','Invite them to join if they want','Laugh at them','Tell everyone to ignore them','Inviting someone can help them feel included.'],
 'self-care':['Which habit supports everyday wellbeing?','Getting enough sleep','Skipping water all day','Never taking breaks','Sleep and rest are important for health.'],
 community:['What is one way to help your community?','Join a suitable local clean-up with adult support','Damage public spaces','Ignore community needs','Helping care for shared spaces can benefit others.'],
 safety:['If you feel unsafe, what should you do?','Move to safety and tell a trusted adult','Keep the problem secret','Share your address with strangers','A trusted adult can help you get support.'],
 'needs-wants':['Which is usually a basic need?','Safe drinking water','A new video game','Designer trainers','Clean drinking water is essential for health.'],
 saving:['What does saving money mean?','Keeping some money for future use','Spending everything immediately','Borrowing without planning','Saving sets money aside for future needs or goals.'],
 wellbeing:['What can help when a task feels overwhelming?','Break it into manageable steps','Assume you must do it perfectly','Never ask for help','Smaller steps and support can make tasks more manageable.'],
 boundaries:['What should you do if someone says no to a hug?','Respect their decision','Insist until they agree','Ignore their words','Everyone can set boundaries about physical contact.'],
 citizenship:['What is one purpose of voting in a democracy?','To help choose representatives or decide issues','To guarantee everyone agrees','To replace all laws','Voting is one way people participate in democratic decisions.'],
 budgeting:['What is a budget?','A plan for money coming in and going out','A promise to spend everything','Only a list of wishes','A budget helps compare income with planned spending.'],
 'media-literacy':['What is useful before sharing a surprising claim?','Check credible evidence','Share it immediately','Assume popularity proves truth','Checking sources can reduce the spread of misinformation.'],
 'decision-making':['What helps you make a considered choice?','Compare options and consequences','Ignore all information','Choose only because of pressure','Considering outcomes and alternatives supports informed decisions.'],
 relationships:['Which is a feature of a respectful relationship?','Mutual respect and boundaries','Controlling another person','Ignoring consent','Healthy relationships respect autonomy and boundaries.'],
 careers:['What can help explore career options?','Research roles and reflect on interests','Assume only one career exists','Ignore skills and opportunities','Exploring roles and skills can support future planning.'],
 'consumer-rights':['What is useful before buying a product?','Compare the price, terms and suitability','Ignore return information','Assume all adverts are impartial','Checking information helps make informed purchasing decisions.']
};
function validateSettings(yearId,count,seed){
 if(!years.includes(yearId))throw Error('Unknown school year.');
 if(!Number.isInteger(count)||count<1||count>20||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid practice settings.');
}
function makePractice(subject,yearId,topicId,bank,count,seed){
 const item=bank[topicId];
 if(!item)throw Error('Missing starter question.');
 const [prompt,answer,a,b,explanation]=item;
 const options=[answer,a,b];
 if(new Set(options).size!==3)throw Error('Duplicate options.');
 return Array.from({length:count},(_,i)=>{
  const shift=(seed+i)%3;
  return {questionId:`${subject}-${yearId}-${topicId}-${seed}-${i}`,
   subject,yearId,topicId,prompt,answer,options:[...options.slice(shift),...options.slice(0,shift)],
   explanation,status:'draft'};
 });
}
export function languagePractice(language,topicId,{yearId='year-4',count=4,seed=0}={}){
 validateSettings(yearId,count,seed);
 if(!supportedStarterLanguages.includes(language))throw Error('Unsupported starter language.');
 if(!languageYearTopicMap[yearId].includes(topicId))throw Error('Language topic not mapped to this year.');
 return makePractice(language,yearId,topicId,languageBank[language],count,seed);
}
export function widerLearningPractice(topicId,{yearId='year-4',count=4,seed=0}={}){
 validateSettings(yearId,count,seed);
 if(!widerLearningYearTopicMap[yearId].includes(topicId))throw Error('Wider learning topic not mapped to this year.');
 return makePractice('wider-learning',yearId,topicId,widerBank,count,seed);
}
const activities={
 listening:['Listen to a short, age-appropriate spoken phrase from a trusted source.','Notice the rhythm and sounds.','Repeat a phrase only if comfortable.'],
 greetings:['Practise greeting someone in the chosen language.','Introduce yourself using a simple model phrase.','Try a polite farewell.'],
 colours:['Find three coloured objects.','Name their colours in the chosen language.','Make a labelled drawing.'],
 numbers:['Count five objects in the chosen language.','Change their order and count again.','Say which number was hardest to remember.'],
 family:['Draw an imaginary family or group of characters.','Label two roles in the chosen language.','Practise a short description.'],
 animals:['Draw three animals.','Label them in the chosen language using a trusted word list.','Practise saying the names aloud.'],
 pronunciation:['Listen to an age-appropriate model from a reliable source.','Repeat a short word and notice one new sound.','Practise slowly without worrying about accent perfection.'],
 classroom:['Draw a classroom or study area.','Label three objects in the chosen language.','Use one word in a simple phrase.'],
 food:['Draw a pretend menu.','Label three foods in the chosen language.','Practise ordering politely in a role-play.'],
 questions:['Practise a simple question and answer.','Swap roles with a partner or imaginary character.','Try changing one word in the question.'],
 'daily-life':['Write three everyday actions.','Find the equivalent phrases in a trusted language reference.','Put them into a short routine.'],
 sentences:['Write a short model sentence.','Change one word while keeping the grammar correct.','Explain what the new sentence means.'],
 culture:['Explore one French- or Spanish-speaking region using an age-appropriate source.','Identify two facts without stereotyping.','Reflect on how language and culture vary.'],
 school:['Describe a school day using three target-language words.','Create a simple timetable.','Ask one question about a school subject.'],
 'present-tense':['Choose a common verb.','Write one present-tense model sentence using a reliable reference.','Change the subject and check the verb form.'],
 'past-tense':['Write one short sentence about yesterday.','Use a reliable reference to check the past-tense form.','Compare it with the present tense.'],
 future:['Write a sentence about a plan for tomorrow.','Check a suitable future construction.','Explain how it differs from a present-tense sentence.'],
 opinions:['Choose a book, meal or hobby.','Express a simple opinion in the chosen language.','Give one reason using a model phrase.'],
 reading:['Read a short original or appropriately licensed text.','Underline familiar words.','Explain the main idea without translating every word.'],
 writing:['Write three connected sentences about an imaginary person.','Check spelling and agreement using a trusted resource.','Revise one sentence for clarity.']
};
export function languageActivity(language,topicId,{yearId='year-4'}={}){
 if(!supportedStarterLanguages.includes(language))throw Error('Unsupported starter language.');
 if(!languageTopicsForYear(yearId).some(t=>t.id===topicId))throw Error('Topic not mapped to year.');
 return {id:`${language}-${yearId}-${topicId}-activity`,yearId,language,topicId,
  title:languageTopicNames[topicId],steps:[...activities[topicId]],
  reflection:'What new word or idea did you learn?',
  assessmentType:'practice-and-reflection',automaticGrade:false,status:'draft'};
}
export function widerLearningActivity(topicId,{yearId='year-4'}={}){
 if(!widerLearningTopicsForYear(yearId).some(t=>t.id===topicId))throw Error('Topic not mapped to year.');
 return {id:`wider-${yearId}-${topicId}-activity`,yearId,topicId,
  title:widerLearningTopicNames[topicId],
  steps:['Read or discuss an age-appropriate fictional scenario about '+widerLearningTopicNames[topicId].toLowerCase()+'.',
   'Consider two possible choices and their likely consequences.',
   'Identify a trusted person or reliable source that could help with questions.'],
  reflection:'What would help someone make a safe and respectful choice?',
  assessmentType:'discussion-and-reflection',automaticGrade:false,status:'draft',
  safety:'Do not ask children to disclose private experiences, financial details or personal safety concerns to the website.'};
}
export function languagesAndWiderCoverage(){
 return years.map(yearId=>({
  yearId,languageTopics:languageYearTopicMap[yearId].length,
  widerLearningTopics:widerLearningYearTopicMap[yearId].length,
  starterLanguages:[...supportedStarterLanguages]
 }));
}
