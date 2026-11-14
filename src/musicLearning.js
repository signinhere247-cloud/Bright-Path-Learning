/**
 * BrightPath Music — Stage 2 Step 11.
 * Original draft Music pathways, knowledge questions and practical activities.
 * EYFS activities are expressive-arts experiences, not separate statutory Music.
 * KS4 is optional GCSE preparation, not an exam-board-aligned specification.
 * No existing lessons, saves or production code changed.
 */
const pathways={
 nursery:['listening','songs','pulse','sound-exploration'],
 reception:['listening','songs','pulse','rhythm','sound-exploration','performance'],
 'year-1':['listening','songs','pulse','rhythm','instruments','performance'],
 'year-2':['listening','songs','pulse','rhythm','pitch','instruments','composition'],
 'year-3':['listening','rhythm','pitch','notation','instruments','composition','performance'],
 'year-4':['listening','rhythm','pitch','notation','dynamics','composition','performance'],
 'year-5':['listening','notation','melody','harmony','dynamics','composition','performance'],
 'year-6':['listening','notation','melody','harmony','structure','composition','performance'],
 'year-7':['listening','notation','rhythm','melody','harmony','structure','music-history','composition','performance'],
 'year-8':['listening','notation','melody','harmony','structure','texture','music-history','composition','performance'],
 'year-9':['listening','notation','melody','harmony','structure','texture','technology','music-history','composition','performance'],
 'year-10':['listening','notation','melody','harmony','structure','texture','technology','music-history','analysis','composition','performance'],
 'year-11':['listening','notation','melody','harmony','structure','texture','technology','music-history','analysis','composition','performance']
};
export const musicTopicNames=Object.freeze({
 listening:'Listening and responding',songs:'Singing and songs',pulse:'Keeping a steady pulse',
 rhythm:'Rhythm', 'sound-exploration':'Exploring sounds',performance:'Performance',
 instruments:'Instruments and timbre',pitch:'Pitch',composition:'Composition',
 notation:'Musical notation',dynamics:'Dynamics',melody:'Melody',harmony:'Harmony',
 structure:'Musical structure','music-history':'Music across cultures and time',
 texture:'Musical texture',technology:'Music technology',analysis:'Musical analysis'
});
export const musicYearTopicMap=Object.freeze(Object.fromEntries(
 Object.entries(pathways).map(([year,topics])=>[year,Object.freeze([...topics])])
));
export function musicTopicsForYear(yearId){
 if(!Object.hasOwn(musicYearTopicMap,yearId))throw Error('Unknown Music year.');
 return musicYearTopicMap[yearId].map(id=>({id,title:musicTopicNames[id],yearId}));
}
// Original, public-domain-neutral activities: no copyrighted audio or sheet music.
const activities={
 listening:['Listen to three sounds in your environment.','Describe whether each sound is long or short, loud or quiet.','Explain which sound you noticed first.'],
 songs:['Choose a familiar song you are permitted to sing, or invent a short song.','Sing it at a comfortable volume.','Try singing the same phrase more softly.'],
 pulse:['Tap a steady beat eight times.','Repeat while walking or moving safely.','Describe what helped you keep the beat steady.'],
 rhythm:['Clap a four-beat pattern: clap, rest, clap, clap.','Repeat it twice at a steady pace.','Invent your own four-beat pattern and perform it.'],
 'sound-exploration':['Find two safe objects that make different sounds when tapped gently.','Compare the sounds without striking fragile objects.','Describe which sound is brighter or duller.'],
 performance:['Choose a short rhythm or original melody.','Practise it three times, aiming for a steady pace.','Perform it for yourself or someone you trust and reflect on one improvement.'],
 instruments:['Listen to or explore two safe instruments or instrument recordings.','Describe their sounds using words such as bright, soft or resonant.','Explain how their sounds differ.'],
 pitch:['Make or listen to a high sound and a low sound at a comfortable volume.','Arrange three sounds from lowest to highest.','Describe how pitch differs from loudness.'],
 composition:['Invent a four-beat rhythm using claps, taps and rests.','Write your pattern using C for clap, T for tap and – for rest.','Perform your original rhythm twice.'],
 notation:['Write four quarter-note beats using the symbol ♩ or four beat boxes.','Mark where a rest should occur in a second pattern.','Clap both patterns while counting steadily.'],
 dynamics:['Perform a simple original rhythm quietly.','Repeat the same rhythm more loudly without discomfort.','Describe how the dynamic change affects its character.'],
 melody:['Create a short three-note melody using any available pitched instrument or voice.','Repeat the melody and change the final note.','Describe which version feels more complete to you.'],
 harmony:['Create a melody with a few notes.','If available, add a second sustained note underneath it.','Listen for how the combined notes sound together.'],
 structure:['Create an A rhythm pattern and a contrasting B pattern.','Perform them in A–B–A order.','Explain how the return of A helps organise the piece.'],
 'music-history':['Choose a musical tradition or historical period to investigate using a suitable source.','Note the context, instruments and purpose of the music.','Compare it respectfully with another musical tradition.'],
 texture:['Perform a rhythm alone.','Add a second independent rhythm if another person or recording tool is available.','Describe the difference between one layer and multiple layers.'],
 technology:['Use an age-appropriate, permitted recording tool to capture your own short rhythm.','Listen back and note one detail to improve.','Record a revised version without sharing personal information.'],
 analysis:['Listen to an appropriately licensed recording or your own composition.','Identify pulse, instrumentation, dynamics and structure using evidence.','Explain how two musical elements contribute to the overall effect.']
};
const reflections={
 listening:'Which sound caught your attention and why?',
 songs:'How did changing volume affect your singing?',
 pulse:'What helped you maintain a steady beat?',
 rhythm:'Where were the rests in your pattern?',
 'sound-exploration':'How did the two sound sources differ?',
 performance:'What improved after practice?',
 instruments:'What clues helped you distinguish the instruments?',
 pitch:'How is a higher pitch different from a louder sound?',
 composition:'What makes your rhythm your own?',
 notation:'How did your symbols help you perform the pattern?',
 dynamics:'What changed when you performed more softly or loudly?',
 melody:'How did the final note affect the melody?',
 harmony:'How did the second note change what you heard?',
 structure:'How could a listener recognise the return of section A?',
 'music-history':'How did the music reflect its cultural or historical context?',
 texture:'How did adding another layer change the sound?',
 technology:'What did listening to your recording reveal?',
 analysis:'Which details support your musical interpretation?'
};
export function musicActivity(topicId,{yearId='year-4'}={}){
 if(!musicTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Music topic not mapped to selected year.');
 const steps=activities[topicId];
 if(!steps)throw Error('No activity available for topic.');
 return {
  id:`music-${yearId}-${topicId}-starter`,yearId,topicId,
  title:musicTopicNames[topicId]+' activity',
  steps:[...steps],reflection:reflections[topicId],
  materials:['Voice, clapping or safe optional musical instruments'],
  status:'draft',assessmentType:'performance-and-reflection',automaticGrade:false,
  safety:'Use comfortable volume; ask an adult before recording or sharing anything.'
 };
}
// [prompt, answer, distractor 1, distractor 2, explanation]
const bank={
 listening:['Which word describes how loud or quiet music is?','Dynamics','Pitch','Tempo','Dynamics refers to loudness and softness.'],
 songs:['What helps singers perform together?','Listening and keeping a shared pulse','Ignoring one another','Always singing at maximum volume','Listening and shared timing help an ensemble stay together.'],
 pulse:['What is the pulse in music?','A steady underlying beat','The title of a song','Only the fastest note','The pulse is the regular beat you can tap along with.'],
 rhythm:['What does a rest tell a performer?','Be silent for a specified duration','Play louder','Start the piece again','A rest represents a measured period of silence.'],
 'sound-exploration':['Which action changes how a drum sounds?','Tapping it gently instead of firmly','Changing the room name','Looking away from it','Different playing techniques affect the sound produced.'],
 performance:['What is a useful way to improve a performance?','Practise and listen critically','Never rehearse','Ignore feedback','Practice and reflection help improve accuracy and expression.'],
 instruments:['What does timbre mean?','The characteristic quality of a sound','The speed of a piece','The number of bars','Timbre helps distinguish instruments playing the same pitch.'],
 pitch:['What does pitch describe?','How high or low a sound is','How long a piece lasts','How many people listen','Pitch relates to perceived frequency.'],
 composition:['What is composition?','Creating and organising musical ideas','Only copying a recording','Adjusting the room temperature','Composition involves making and arranging musical material.'],
 notation:['How many beats does a crotchet usually last in 4/4 time?','One','Two','Four','A crotchet (quarter note) lasts one beat when the quarter note is the beat unit.'],
 dynamics:['Which marking generally means soft?','p','f','ff','The marking p stands for piano, meaning soft.'],
 melody:['What is a melody?','A sequence of pitches forming a musical line','Only a repeated drum pulse','A type of speaker','A melody is an organised succession of pitched sounds.'],
 harmony:['What is harmony in music?','Notes heard together','Only the speed of a beat','A written title','Harmony concerns how pitches combine simultaneously.'],
 structure:['Which form has a contrasting middle section followed by a return?','ABA','ABC','ABCD','ABA form returns to its opening section after a contrasting B section.'],
 'music-history':['Why is cultural context important when studying music?','It helps explain purpose and meaning','It proves all traditions are identical','It removes the need to listen','Music is shaped by social, historical and cultural contexts.'],
 texture:['What is musical texture?','How musical layers relate','Only the length of a note','Only the name of an instrument','Texture describes how parts or layers of music combine.'],
 technology:['What can a digital audio workstation help with?','Recording and arranging audio','Only printing photographs','Replacing all musical ideas','A DAW supports recording, editing and arranging sound.'],
 analysis:['Which observation provides evidence in musical analysis?','The dynamics grow louder near the ending','This music is good because I say so','The composer must have been happy','Specific audible features can support interpretation.']
};
export function musicKnowledgePractice(topicId,{yearId='year-4',count=4,seed=0}={}){
 if(!musicTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Music topic not mapped to selected year.');
 if(!Number.isInteger(count)||count<1||count>20||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid practice settings.');
 const [prompt,answer,a,b,explanation]=bank[topicId];
 const options=[answer,a,b];
 if(new Set(options).size!==3)throw Error('Duplicate options.');
 return Array.from({length:count},(_,i)=>{
  const shift=(i+seed)%3;
  return {questionId:`music-${yearId}-${topicId}-${seed}-${i}`,yearId,topicId,
   prompt,answer,options:[...options.slice(shift),...options.slice(0,shift)],
   explanation,status:'draft'};
 });
}
export function musicContentCoverage(){
 return Object.entries(pathways).map(([yearId,topics])=>({
  yearId,topicCount:topics.length,starterActivities:topics.filter(id=>Boolean(activities[id])).length,
  uniqueStarterQuestions:topics.filter(id=>Boolean(bank[id])).length
 }));
}
