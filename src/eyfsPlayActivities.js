// Adult-supported EYFS play activity: no scoring, uploads or child-data collection.
export const eyfsPlayActivities=Object.freeze([
 {id:'ACT-EYFS-P1-01',strandId:'EYFS-P1-01',title:'Conversation circle',area:'Communication and language',minutes:'5–10',materials:'One familiar safe object',steps:['Ask the child to choose a familiar object.','Take turns noticing and talking about it.','Wait for a word, gesture, sign, picture choice or other response.','Follow the child’s idea with one open question.'],alternatives:'Use pictures, signs, AAC or quiet pointing. A child may listen without speaking.',safety:'Use a clean, age-appropriate object; supervise throughout.',adultPrompt:'What do you notice about your object?'},
 {id:'ACT-EYFS-P1-02',strandId:'EYFS-P1-02',title:'Story word explorer',area:'Communication and language',minutes:'5–10',materials:'A picture book or two printed pictures',steps:['Let the child choose a book or picture.','Read or describe it together.','Explore two interesting words using pictures, objects or gestures.','Invite the child to show or use a word in their own way.'],alternatives:'Offer audio descriptions, signs, AAC or tactile objects.',safety:'Choose age-appropriate materials and supervise.',adultPrompt:'Which picture would you like to explore?'},
 {id:'ACT-EYFS-P1-03',strandId:'EYFS-P1-03',title:'Rhythm and rhyme play',area:'Communication and language',minutes:'5–10',materials:'A familiar rhyme, clapping or a safe shaker',steps:['Invite the child to choose a familiar rhyme or rhythm.','Sing or tap it slowly together, following the child’s pace.','Pause before a repeated word or sound and invite any kind of response.','Try a new rhythm or repeat the favourite part together.'],alternatives:'Offer signs, AAC, gentle tapping, visual rhythm cards or quiet listening instead of singing.',safety:'Use age-appropriate instruments and comfortable sound levels; stop if the child dislikes the noise.',adultPrompt:'Shall we sing, tap or listen together?'},
 {id:'ACT-EYFS-P1-04',strandId:'EYFS-P1-04',title:'Make-believe story',area:'Communication and language',minutes:'5–10',materials:'Two safe toys, puppets or picture cards',steps:['Let the child choose a character or toy.','Ask where the character might go or what they might do.','Take turns adding one event using words, actions or pictures.','Invite the child to choose an ending and celebrate their ideas.'],alternatives:'Use pointing, gesture, picture choice, AAC or adult narration following the child’s lead.',safety:'Choose safe, age-appropriate props and avoid frightening themes unless the child welcomes them.',adultPrompt:'What happens next in your story?'}

]);
export function getEyfsPlayActivity(id){return eyfsPlayActivities.find(a=>a.id===id)||null;}
export function createEyfsActivityPanel(doc=document){
 const panel=doc.createElement('section');panel.setAttribute('aria-label','EYFS play activities');
 const heading=doc.createElement('h2');heading.textContent='Play and learn together';panel.append(heading);
 const intro=doc.createElement('p');intro.textContent='Short, optional activities for ages 3–5 with a grown-up. No scores, photos or uploads.';panel.append(intro);
 const choose=doc.createElement('select');choose.setAttribute('aria-label','Choose a play activity');
 for(const activity of eyfsPlayActivities){const option=doc.createElement('option');option.value=activity.id;option.textContent=activity.title;choose.append(option);}
 const detail=doc.createElement('div');detail.setAttribute('aria-live','polite');
 const render=()=>{const a=getEyfsPlayActivity(choose.value);detail.replaceChildren();
  const title=doc.createElement('h3');title.textContent=a.title+' · '+a.minutes+' minutes';detail.append(title);
  for(const [label,value] of [['Learning area',a.area],['You need',a.materials],['Try asking',a.adultPrompt]]){const p=doc.createElement('p');const strong=doc.createElement('strong');strong.textContent=label+': ';p.append(strong,doc.createTextNode(value));detail.append(p);}
  const list=doc.createElement('ol');for(const step of a.steps){const li=doc.createElement('li');li.textContent=step;list.append(li);}detail.append(list);
  for(const [label,value] of [['Different ways to join in',a.alternatives],['Stay safe',a.safety]]){const p=doc.createElement('p');const strong=doc.createElement('strong');strong.textContent=label+': ';p.append(strong,doc.createTextNode(value));detail.append(p);}
 };
 choose.addEventListener('change',render);panel.append(choose,detail);render();return panel;
}
