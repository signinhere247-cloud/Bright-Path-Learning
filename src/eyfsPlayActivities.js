// Adult-supported EYFS play activity: no scoring, uploads or child-data collection.
export const eyfsPlayActivities=Object.freeze([
 {id:'ACT-EYFS-P1-01',strandId:'EYFS-P1-01',title:'Conversation circle',area:'Communication and language',minutes:'5–10',materials:'One familiar safe object',steps:['Ask the child to choose a familiar object.','Take turns noticing and talking about it.','Wait for a word, gesture, sign, picture choice or other response.','Follow the child’s idea with one open question.'],alternatives:'Use pictures, signs, AAC or quiet pointing. A child may listen without speaking.',safety:'Use a clean, age-appropriate object; supervise throughout.',adultPrompt:'What do you notice about your object?'},
 {id:'ACT-EYFS-P1-02',strandId:'EYFS-P1-02',title:'Story word explorer',area:'Communication and language',minutes:'5–10',materials:'A picture book or two printed pictures',steps:['Let the child choose a book or picture.','Read or describe it together.','Explore two interesting words using pictures, objects or gestures.','Invite the child to show or use a word in their own way.'],alternatives:'Offer audio descriptions, signs, AAC or tactile objects.',safety:'Choose age-appropriate materials and supervise.',adultPrompt:'Which picture would you like to explore?'}
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
