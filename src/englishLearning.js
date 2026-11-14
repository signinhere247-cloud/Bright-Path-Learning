/**
 * BrightPath English learning expansion — Stage 2 Step 6.
 * Original practice content, England-focused year pathways.
 * Draft learning activities: NOT a complete statutory curriculum or GCSE specification.
 * No existing lesson IDs or save data are changed.
 */
const stages={
 nursery:['sounds','rhymes','oral-language','storytelling','mark-making'],
 reception:['sounds','rhymes','phonics','blending','handwriting','storytelling','sentences'],
 'year-1':['phonics','blending','spelling','handwriting','sentences','reading','punctuation','speaking'],
 'year-2':['spelling','handwriting','sentences','reading','punctuation','grammar','vocabulary','creative-writing'],
 'year-3':['spelling','grammar','punctuation','reading','vocabulary','paragraphs','creative-writing','speaking'],
 'year-4':['spelling','grammar','punctuation','reading','vocabulary','paragraphs','creative-writing','poetry'],
 'year-5':['spelling','grammar','punctuation','reading','vocabulary','paragraphs','creative-writing','poetry','non-fiction'],
 'year-6':['spelling','grammar','punctuation','reading','vocabulary','paragraphs','creative-writing','poetry','non-fiction'],
 'year-7':['grammar','punctuation','reading','vocabulary','creative-writing','non-fiction','poetry','literature','speaking'],
 'year-8':['grammar','punctuation','reading','vocabulary','creative-writing','non-fiction','poetry','literature','speaking'],
 'year-9':['grammar','punctuation','reading','vocabulary','creative-writing','non-fiction','poetry','literature','rhetoric','speaking'],
 'year-10':['reading','creative-writing','non-fiction','poetry','literature','rhetoric','language-analysis','comparison','speaking'],
 'year-11':['reading','creative-writing','non-fiction','poetry','literature','rhetoric','language-analysis','comparison','speaking']
};
export const englishTopicNames=Object.freeze({
 sounds:'Listening to sounds',rhymes:'Rhymes and syllables','oral-language':'Speaking and listening',
 storytelling:'Stories and retelling','mark-making':'Early marks and letters',
 phonics:'Phonics and letter sounds',blending:'Blending and segmenting',
 handwriting:'Handwriting',sentences:'Sentence building',spelling:'Spelling',
 reading:'Reading comprehension',punctuation:'Punctuation',grammar:'Grammar',
 vocabulary:'Vocabulary',paragraphs:'Paragraph structure','creative-writing':'Creative writing',
 poetry:'Poetry','non-fiction':'Non-fiction writing',literature:'Literature',
 speaking:'Speaking and presenting',rhetoric:'Persuasive techniques',
 'language-analysis':'Language analysis',comparison:'Comparing texts'
});
export const englishYearTopicMap=Object.freeze(Object.fromEntries(
 Object.entries(stages).map(([year,topics])=>[year,Object.freeze([...topics])])
));
export function englishTopicsForYear(yearId){
 if(!Object.hasOwn(englishYearTopicMap,yearId))throw Error('Unknown English school year.');
 return englishYearTopicMap[yearId].map(id=>({id,title:englishTopicNames[id],yearId}));
}
const pick=(items,index)=>items[index%items.length];
const questions={
 sounds:[
 ['Which word begins with the same sound as sun?','sock',['cat','fish'],'Sun and sock both begin with /s/.'],
 ['Which word begins with the same sound as moon?','map',['dog','sun'],'Moon and map both begin with /m/.']
 ],
 rhymes:[
 ['Which word rhymes with cat?','hat',['cup','dog'],'Cat and hat end with the same sound.'],
 ['Which word rhymes with tree?','bee',['ball','fish'],'Tree and bee share the long ee sound.']
 ],
 phonics:[
 ['Which letter usually represents the first sound in fish?','f',['m','t'],'Fish begins with the /f/ sound.'],
 ['Which pair of letters makes the /sh/ sound in ship?','sh',['ch','th'],'The letters sh represent one sound in ship.']
 ],
 blending:[
 ['Blend the sounds /c/ /a/ /t/.','cat',['cot','cut'],'The sounds /c/ /a/ /t/ blend to make cat.'],
 ['Which word can you make from /s/ /u/ /n/?','sun',['sin','son'],'The sounds blend to form sun.']
 ],
 spelling:[
 ['Which spelling is correct?','because',['becaus','becose'],'Because is spelled b-e-c-a-u-s-e.'],
 ['Which spelling is correct?','separate',['seperate','separrate'],'Separate contains the letters a-r after sep.']
 ],
 sentences:[
 ['Which is a complete sentence?','The dog ran.',['Because the dog','Under the chair'],'The dog ran has a subject and a verb and expresses a complete thought.'],
 ['Which word completes “She ___ to school”?','walks',['walking','walk'],'She walks agrees with the singular subject.']
 ],
 punctuation:[
 ['Which mark ends a question?','?',['!','.'],'A direct question ends with a question mark.'],
 ['Which sentence uses a capital letter correctly?','We went home.',['we went home.','We went home'],'A sentence begins with a capital letter and ends with punctuation.']
 ],
 grammar:[
 ['Which word is an adjective?','bright',['quickly','jump'],'Bright can describe a noun.'],
 ['Which word is a conjunction?','because',['under','purple'],'Because connects ideas and can introduce a reason.']
 ],
 vocabulary:[
 ['Which word means very small?','tiny',['enormous','heavy'],'Tiny means very small.'],
 ['Which word is closest in meaning to reluctant?','unwilling',['eager','certain'],'Reluctant means hesitant or unwilling.']
 ],
 reading:[
 ['“Amir packed an umbrella because rain was forecast.” Why did he pack it?','Rain was expected',['It was sunny','He was going swimming'],'The sentence gives the reason: rain was forecast.'],
 ['“Although the bus was late, Mia arrived on time.” What does although show?','Contrast',['A list','A definition'],'Although introduces a contrast between two ideas.']
 ],
 paragraphs:[
 ['Which sentence best introduces a paragraph about recycling?','Recycling helps reduce waste.',['Blue is my favourite colour.','The bus arrived late.'],'A topic sentence introduces the main idea of a paragraph.'],
 ['What should a paragraph usually focus on?','One main idea',['Unrelated ideas','Only punctuation'],'Related sentences develop one main idea.']
 ],
 poetry:[
 ['Which technique compares using like or as?','Simile',['Metaphor','Alliteration'],'A simile uses like or as to compare things.'],
 ['Which phrase contains alliteration?','Silver stars shine',['The sun is warm','A bright afternoon'],'Silver, stars and shine repeat an initial s sound.']
 ],
 'non-fiction':[
 ['What is the main purpose of a report?','To present information',['To invent a fictional character','To write a rhyme'],'Reports organise factual information for readers.'],
 ['Which feature helps readers find information quickly?','Subheadings',['Random punctuation','Unrelated dialogue'],'Subheadings divide information into sections.']
 ],
 literature:[
 ['What is a theme in a story?','A recurring central idea',['The number of pages','The book cover colour'],'A theme is an idea explored through the text.'],
 ['What can an unreliable narrator make readers do?','Question the account',['Assume everything is true','Ignore contradictions'],'An unreliable narrator may present events inaccurately or inconsistently.']
 ],
 rhetoric:[
 ['Which technique asks a question for effect rather than an answer?','Rhetorical question',['Footnote','Stage direction'],'A rhetorical question can emphasise a point.'],
 ['Which phrase directly addresses the audience?','You can make a difference.',['The door was blue.','Rain fell overnight.'],'You addresses the reader or listener directly.']
 ],
 'language-analysis':[
 ['What does “the city swallowed the light” use?','Personification',['A literal fact','A statistic'],'The city is given the human-like action of swallowing.'],
 ['What does repetition often create in a speech?','Emphasis',['A change of author','A footnote'],'Repeating words can reinforce an idea.']
 ],
 comparison:[
 ['When comparing two texts, what is useful to discuss?','Similarities and differences',['Only the first title','Only the number of pages'],'Comparison considers how texts are alike and different.'],
 ['Which phrase signals contrast?','In contrast',['Similarly','Likewise'],'In contrast introduces a difference.']
 ],
 speaking:[
 ['What helps an audience understand a presentation?','Clear pace and volume',['Speaking too quietly','Avoiding all pauses'],'A clear pace and suitable volume support understanding.'],
 ['What shows active listening?','Responding to the speaker’s point',['Interrupting repeatedly','Ignoring questions'],'Active listening involves attending and responding thoughtfully.']
 ],
 'oral-language':[
 ['What is a good way to take turns in conversation?','Listen and wait for your turn',['Speak over everyone','Walk away immediately'],'Taking turns helps everyone contribute.']
 ],
 storytelling:[
 ['Which part usually introduces characters and setting?','Beginning',['Ending','Title only'],'The beginning often introduces who and where.']
 ],
 'mark-making':[
 ['Which activity helps practise forming letters?','Tracing lines and shapes',['Watching without trying','Skipping every mark'],'Tracing develops control needed for writing.']
 ],
 handwriting:[
 ['Which helps make handwriting easier to read?','Clear letter shapes and spaces',['Letters written on top of each other','No spaces between words'],'Letter formation and spacing improve readability.']
 ],
 'creative-writing':[
 ['Which detail helps a reader picture a setting?','The narrow path glistened after rain.',['Something happened.','It was a place.'],'Specific sensory details help readers imagine a scene.'],
 ['Which sentence shows rather than simply tells fear?','Her hands trembled as the door creaked.',['She was afraid.','Fear is an emotion.'],'Actions and sensory details can suggest emotion.']
 ]
};
function orderOptions(correct,wrong,index){
 const all=[correct,...wrong];
 if(new Set(all).size!==3)throw Error('Answer options must be unique.');
 const shift=index%3;
 return [...all.slice(shift),...all.slice(0,shift)];
}
/**
 * Each topic has a small, curated starter bank.
 * Repeating count cycles these questions; it does not create unique lessons.
 */
export function englishPractice(topicId,{yearId='year-4',count=6,seed=0}={}){
 if(!englishTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('English topic is not mapped to this year.');
 if(!Number.isInteger(count)||count<1||count>30||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid English practice settings.');
 const bank=questions[topicId];
 if(!bank?.length)throw Error('Missing English question bank.');
 return Array.from({length:count},(_,i)=>{
  const [prompt,answer,wrong,explanation]=pick(bank,i+seed);
  return {questionId:`${yearId}-${topicId}-${seed}-${i}`,yearId,topicId,prompt,answer,
   options:orderOptions(answer,wrong,i+seed),explanation,sourceStatus:'draft'};
 });
}
export function englishContentCoverage(){
 return Object.entries(stages).map(([yearId,topics])=>({
  yearId,topics:topics.length,uniqueStarterQuestions:topics.reduce((sum,id)=>sum+(questions[id]?.length||0),0)
 }));
}
