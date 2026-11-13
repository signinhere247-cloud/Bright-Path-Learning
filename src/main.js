import {hasParentPin,setParentPin,verifyParentPin} from './parentGate.js';
import {cloudConfigured,parentAccount,requestParentLink,signOutParent,previewParentCloudProfiles,uploadCloudExplorer,listCloudExplorers,downloadCloudExplorer,syncCloudExplorer} from './cloudFamily.js';
import {prepareCloudRestore} from './cloudSaves.js';
import {applyCloudRestore,inspectCloudRecovery,restoreCloudRecovery,clearCloudRecovery} from './cloudRecovery.js';
import {readSyncLinks,linkCloudProfile} from './cloudSync.js';
import {autoSyncEnabled,setAutoSyncEnabled,createAutoSyncCoordinator} from './autoCloudSync.js';
import {buildParentInsights} from './parentInsights.js';
import {buildProgressCharts} from './progressCharts.js';
import {revisionRecommendations} from './revisionRecommendations.js';
import * as THREE from 'three';
import {buildFantasyVillage} from './fantasyVillage.js';
import {addCottageLandscape} from './cottageLandscape.js';
import {addStorybookTrees} from './storybookTrees.js';
import {buildVillageTerrain} from './villageTerrain.js';
import {addWoodlandDetails} from './woodlandDetails.js';
import {addVillageMagic} from './villageMagic.js';
import {loadVillageModels} from './villageModels.js';
import {villageModelManifest} from './villageModelManifest.js';
import {buildFantasyAcademy} from './fantasyAcademies.js';
import {buildFantasyExplorer} from './fantasyExplorer.js';
import {buildFantasyPet} from './fantasyPets.js';
import {buildFantasyHome,fantasyFurniture} from './fantasyHome.js';
import {availableHomeActions,homeActionMessage} from './homeInteractions.js';
import {nearestVillageDestination,villageDirections} from './villageNavigation.js';
import {villageJournal,journalSummary} from './villageJournal.js';
import {villageKeepsakes,keepsakeProgress} from './villageKeepsakes.js';
import {explorerMilestones} from './explorerMilestones.js';
import {milestoneCelebration} from './milestoneCelebrations.js';
import {adventureOverview} from './adventureOverview.js';
import {personalisedAdventureGoals} from './adventureGoals.js';
import {waypointHint} from './adventureWaypoints.js';
import {PROFILE_MENU_GROUPS} from './profileNavigation.js';
import {lessonStepProgress,lessonAnswerFeedback} from './lessonExperience.js';
import {learningHint} from './learningHints.js';
import {practiceTopics,recordPracticeNeed} from './practiceTopics.js';
import {recordLearningDay,learningStreak} from './learningStreaks.js';
import {recordDailySubject,dailyLearningChallenge} from './dailyLearningChallenges.js';
import {challengeKeepsakes} from './challengeKeepsakes.js';
import {learningJourney} from './learningJourney.js';
import {journeySuggestions} from './journeySuggestions.js';
import {learningDashboard} from './learningDashboard.js';
import {chooseLearningGoal,clearLearningGoal,learningGoalProgress} from './learningGoals.js';
import {recogniseLearningGoal,learningGoalCelebration} from './learningGoalCelebrations.js';
import {achievementGallery} from './achievementGallery.js';
import {galleryCelebration} from './galleryCelebrations.js';
import {filterAchievementGallery} from './galleryFilters.js';
import {achievementNextStep} from './achievementNextSteps.js';
import {achievementProgress} from './achievementProgress.js';
import {achievementRecommendations} from './achievementRecommendations.js';
import {achievementSpotlight} from './achievementSpotlight.js';
import {achievementCollectionSummary} from './achievementCollectionSummary.js';
import './style.css';
import {makeBackup,parseBackup} from './backup.js';
import {importExplorerBackup,inspectImportRecovery,restoreImportRecovery,clearImportRecovery} from './familyBackupRestore.js';
import {readFamily,writeFamily,updateActive,addExplorer,selectExplorer} from './familyProfiles.js';
import {questionSet,learningBand} from './curriculum.js';
import {progressSummary} from './lessonProgress.js';
import {completeLessonAttempt} from './lessonCompletion.js';
import {purchaseItem,placeFurniture,moveFurniture,removeFurniture} from './worldEconomy.js';
import {commitEconomyChange} from './economyCommit.js';
import {commitRewardChange} from './rewardCommit.js';
import {careForPet,petStatus,PET_ACTIONS} from './petCare.js';
import {petDisplayName,renamePet} from './petIdentity.js';
import {PET_PERSONALITIES,petPersonality,choosePetPersonality,petBehaviour} from './petPersonality.js';
import {companionTarget,companionMotion,activityAnimation} from './petWorld.js';
import {DISCOVERIES,completeDiscovery,discoveryStatus} from './villageActivities.js';
import {questProgress,claimDailyQuest} from './dailyQuests.js';
import {buildParentReport} from './parentReport.js';

const $=s=>document.querySelector(s), app=$('#app');
const defaults={coins:100,completed:{},profile:'Explorer',avatar:'#f7ad65',outfit:'#7b5ee8',pet:null,petMood:75,inventory:['bed','desk'],placed:[{item:'bed',x:-2,z:-1},{item:'desk',x:2,z:-1}],sound:false};
let family=readFamily(localStorage);
// A legacy guest save may have been restored by the backup importer before reload.
const activeProfile=()=>family.profiles.find(p=>p.id===family.activeId);
let state=structuredClone(activeProfile().save);
const save=()=>{family=updateActive(family,state,Number(localStorage.getItem('bp-age')||activeProfile().age));writeFamily(localStorage,family);if(autoSyncEnabled(localStorage))autoCloud.changed(family.activeId)};
const commitEconomy=transform=>{const next=commitEconomyChange(state,transform,candidate=>{const updated=updateActive(family,candidate,Number(localStorage.getItem('bp-age')||activeProfile().age));writeFamily(localStorage,updated);family=updated});state=next;if(autoSyncEnabled(localStorage))autoCloud.changed(family.activeId)};
const autoCloud=createAutoSyncCoordinator({
 linked:id=>readSyncLinks(localStorage)[id]!==undefined,
 upload:async id=>{const profile=family.profiles.find(p=>p.id===id);if(!profile)throw Error('Explorer is no longer available.');const revision=readSyncLinks(localStorage)[id];const next=await syncCloudExplorer(structuredClone(profile),revision);linkCloudProfile(localStorage,id,next)},
 onStatus:message=>{console.info('[BrightPath cloud]',message);const status=document.querySelector('#cloudStatus');if(status)status.textContent=message}
});
// First-time migration keeps the existing guest explorer and its age.
if(!localStorage.getItem('brightpath-family-v1'))writeFamily(localStorage,family);
const subjects=['Maths','English','Science','History','Geography','Computing'];
const palette=['#f7ad65','#b67549','#8b523b','#e7c3a6','#c7906e'];
const shop=[{id:'sofa',name:'Cozy sofa',price:60,color:0x50b7a3},{id:'lamp',name:'Floor lamp',price:35,color:0xffd16a},{id:'plant',name:'Indoor plant',price:25,color:0x3db873},{id:'rug',name:'Soft rug',price:30,color:0xf284ba},{id:'chair',name:'Comfy chair',price:45,color:0x718cf5},{id:'bed',name:'Dream bed',price:90,color:0xe4a7ef},{id:'desk',name:'Study desk',price:55,color:0xb98354},{id:'cat',name:'Adopt a cat',price:80,color:0xf7c38b},{id:'dog',name:'Adopt a dog',price:80,color:0xc18a58}];
const lessonBank={
Maths:[['Counting','Count objects and identify the next number.'],['Addition','Combine quantities and solve sums.'],['Subtraction','Find how much remains.'],['Multiplication','Use equal groups to multiply.'],['Division','Share quantities into equal groups.'],['Fractions','Find a fraction of a quantity.'],['Percentages','Calculate a percentage of a number.'],['Algebra','Solve simple equations.']],
English:[['Spelling','Recognise correctly spelled words.'],['Grammar','Identify parts of speech.'],['Punctuation','Choose correct punctuation.'],['Vocabulary','Understand word meanings.'],['Reading','Read short passages and answer questions.']],
Science:[['Living things','Explore plants, animals and life.'],['Human body','Learn about body systems.'],['Materials','Explore properties of materials.'],['Forces','Learn how objects move.'],['Space','Explore Earth and the solar system.']],
History:[['Ancient civilisations','Discover the past.'],['Chronology','Put events in time order.']],
Geography:[['Continents','Explore our world.'],['Weather','Learn about climate and weather.']],
Computing:[['Algorithms','Learn sequences and instructions.'],['Online safety','Make safe digital choices.']]
};
const facts={
'Living things':[['Which part of a plant absorbs water?','Roots',['Leaves','Roots','Flowers']],['Which animal is a mammal?','Dolphin',['Shark','Dolphin','Trout']],['What do plants need for photosynthesis?','Light',['Moonlight only','Light','Plastic']]],
'Human body':[['Which organ pumps blood?','Heart',['Lungs','Heart','Stomach']],['Which organ helps you breathe?','Lungs',['Kidneys','Lungs','Liver']],['What protects the brain?','Skull',['Rib cage','Skull','Pelvis']]],
'Materials':[['Which material is magnetic?','Iron',['Wood','Iron','Glass']],['Which material is transparent?','Glass',['Brick','Glass','Wood']],['Which is a liquid at room temperature?','Water',['Ice','Water','Stone']]],
'Forces':[['Which force pulls objects toward Earth?','Gravity',['Friction','Gravity','Magnetism']],['Which force slows a sliding box?','Friction',['Friction','Light','Sound']],['What measures force?','Newton',['Newton','Litre','Metre']]],
'Space':[['Which planet is closest to the Sun?','Mercury',['Earth','Mercury','Jupiter']],['What does Earth orbit?','The Sun',['The Moon','The Sun','Mars']],['What is our galaxy called?','Milky Way',['Andromeda','Milky Way','Orion']]],
'Spelling':[['Choose the correct spelling.','because',['becaus','because','becose']],['Choose the correct spelling.','friend',['freind','friend','frend']],['Choose the correct spelling.','beautiful',['beautifull','beautiful','beutiful']]],
'Grammar':[['Which word is a verb?','run',['blue','run','chair']],['Which word is an adjective?','bright',['bright','jump','table']],['Which word is a noun?','garden',['quickly','garden','under']]],
'Punctuation':[['Which ends a question?','?',['!','?',',']],['Which punctuation marks a contraction?','Apostrophe',['Comma','Apostrophe','Colon']],['Which ends a statement?','Full stop',['Full stop','Question mark','Comma']]],
'Vocabulary':[['What is a synonym of happy?','Joyful',['Angry','Joyful','Tired']],['What is the opposite of ancient?','Modern',['Old','Modern','Historic']],['What does enormous mean?','Very large',['Very small','Very large','Very fast']]],
'Reading':[['Mia packed a coat because rain was forecast. Why did she pack it?','Rain was expected',['She was swimming','Rain was expected','It was summer']],['Leo watered his plant every morning. What did Leo care for?','A plant',['A bike','A plant','A dog']],['The train arrived late. Was it on time?','No',['Yes','No','Not stated']]],
'Ancient civilisations':[['Which civilisation built pyramids at Giza?','Ancient Egyptians',['Romans','Ancient Egyptians','Vikings']],['Which city was central to the Roman Empire?','Rome',['Athens','Rome','Paris']],['What did historians study?','The past',['The future','The past','The weather']]],
'Chronology':[['Which came first?','Stone Age',['Victorian era','Stone Age','Modern day']],['A decade is how many years?','10',['5','10','100']],['A century is how many years?','100',['10','100','1000']]],
'Continents':[['Which continent contains Kenya?','Africa',['Asia','Africa','Europe']],['Which continent contains Brazil?','South America',['North America','South America','Asia']],['Which is a continent?','Antarctica',['Greenland','Antarctica','Iceland']]],
'Weather':[['Which instrument measures temperature?','Thermometer',['Barometer','Thermometer','Compass']],['What is precipitation?','Water falling from clouds',['Wind speed','Water falling from clouds','Sunshine']],['What causes day and night?','Earth rotating',['Earth rotating','Moon orbiting','Rain']]],
'Algorithms':[['What is an algorithm?','Step-by-step instructions',['A type of computer','Step-by-step instructions','A password']],['What is a loop?','Repeated instructions',['A computer screen','Repeated instructions','A file']],['What is debugging?','Finding and fixing errors',['Drawing images','Finding and fixing errors','Turning off power']]],
'Online safety':[['Should you share your password?','No',['Yes','No','Only in games']],['What should you do if something online worries you?','Tell a trusted adult',['Keep it secret','Tell a trusted adult','Share it widely']],['Is every online message trustworthy?','No',['Yes','No','Always']]]
};
function questions(subject,topic,age){return questionSet(subject,topic,age,facts)}
app.innerHTML=`<div id="game"></div><div id="hud"><div class="brand">✦ BrightPath <span>3D Adventure</span></div><div class="hud-right"><span id="coinCount"></span><button id="learnBtn">Learn</button><button id="profileBtn">Profile</button><button id="helpBtn">How to play</button></div></div><div id="tip">Walk to a glowing portal and press <b>Enter</b>, or tap it</div><div id="joystick"><button data-dir="up">▲</button><div><button data-dir="left">◀</button><button data-dir="down">▼</button><button data-dir="right">▶</button></div></div><button id="interact">Interact</button><div id="modal" class="hidden"><div class="dialog"><button class="close" id="close">✕</button><div id="modalBody"></div></div></div>`;
const refresh=()=>$('#coinCount').textContent=`🪙 ${state.coins} BrightCoins`;refresh();
const scene=new THREE.Scene();scene.background=new THREE.Color('#b9d9d7');scene.fog=new THREE.FogExp2('#b9d9d7',0.008);
const camera=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,.1,250);const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;$('#game').appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xfff0db,0x667d68,1.45));let sun=new THREE.DirectionalLight(0xffd6a1,2.5);sun.position.set(-22,28,14);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-38;sun.shadow.camera.right=38;sun.shadow.camera.top=38;sun.shadow.camera.bottom=-38;sun.shadow.normalBias=0.025;sun.shadow.bias=-0.00015;scene.add(sun);
function mesh(g,c,x=0,y=0,z=0){const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:c,roughness:.83}));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m}
const box=(w,h,d,c,x,y,z)=>mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z);
const sphere=(r,c,x,y,z)=>mesh(new THREE.SphereGeometry(r,12,10),c,x,y,z);
const cylinder=(rt,rb,h,c,x,y,z)=>mesh(new THREE.CylinderGeometry(rt,rb,h,10),c,x,y,z);
buildVillageTerrain(THREE,scene);
addStorybookTrees(THREE,scene);
addWoodlandDetails(THREE,scene);
for(let i=0;i<25;i++){let x=Math.sin(i*18)*19,z=Math.cos(i*23)*18;sphere(.22,[0xffe69d,0xf79bca,0xffffff][i%3],x,.25,z)}
// Layered fantasy scenery is decorative: existing interactive portals retain their positions.
const fantasyVillage=buildFantasyVillage(THREE,scene);
const villageMagic=addVillageMagic(THREE,scene);
addCottageLandscape(THREE,scene);
// Approved GLB scenery loads alongside the existing interactive village.
// Missing models never prevent lessons or movement from working.
void loadVillageModels(scene,villageModelManifest).catch(error=>console.warn('Village scenery load failed',error));
const buildings=[{name:'Maths',x:-12,z:-9,c:0xf6ac63},{name:'English',x:-4,z:-14,c:0xee8cb5},{name:'Science',x:5,z:-14,c:0x71c7bf},{name:'History',x:13,z:-9,c:0xb29bf2},{name:'Geography',x:-12,z:4,c:0x87b8f1},{name:'Computing',x:13,z:4,c:0x9ad47b},{name:'My Home',x:-7,z:12,c:0xf0ba85},{name:'Shop',x:7,z:12,c:0xe3a1e9}];
function label(text,x,y,z){let c=document.createElement('canvas');c.width=512;c.height=128;let ctx=c.getContext('2d');ctx.fillStyle='#173a55';ctx.roundRect(0,0,512,128,24);ctx.fill();ctx.fillStyle='white';ctx.font='bold 55px system-ui';ctx.textAlign='center';ctx.fillText(text,256,83);let t=new THREE.CanvasTexture(c),s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true}));s.scale.set(4.4,1.1,1);s.position.set(x,y,z);scene.add(s)}
for(const building of buildings)buildFantasyAcademy(THREE,scene,building,label);
const explorer=buildFantasyExplorer(THREE,state.avatar,state.outfit);
const avatar=explorer.group;scene.add(avatar);
// A small animated companion follows the active explorer in the 3D world.
const companion=new THREE.Group();scene.add(companion);
let companionKind=null,petActivity=null;
let petModel=null;
function rebuildCompanion(){
 if(petModel){companion.remove(petModel.group);petModel.dispose();petModel=null}
 companionKind=['cat','dog'].includes(state.pet)?state.pet:null;
 companion.visible=Boolean(companionKind);
 if(!companionKind)return;
 petModel=buildFantasyPet(THREE,companionKind);
 companion.add(petModel.group);
 companion.position.set(position.x+1.35,0,position.z+1.05);
}
let position={x:0,z:3},keys=new Set(),last=performance.now(),near=null,mode='world',homeObjects=[];
const home=buildFantasyHome(THREE);
let worldPosition={x:0,z:3};
rebuildCompanion();
function modal(html){$('#modalBody').innerHTML=html;$('#modal').classList.remove('hidden')}
function close(){ if(mode==='home'){exitHome();return;} $('#modal').classList.add('hidden') }$('#close').onclick=close;
function buttons(items,cb){return items.map((it,i)=>`<button class="choice" data-choice="${i}">${it}</button>`).join('')}
function showSubjects(){modal(`<h2>Learning Academy</h2><p>Choose a subject to explore its lessons.</p><div class="cards">${subjects.map(s=>`<button data-subject="${s}">${s}</button>`).join('')}</div>`);$('#modalBody').onclick=e=>{let s=e.target.dataset.subject;if(s)showLessons(s)}}
function showLessons(s){const practice=practiceTopics(state,s),practiceHtml=practice.length?`<section class="practice-recommendations"><h3>🎯 Practise again</h3><p>These topics could use another try.</p>${practice.filter(item=>lessonBank[s].some(([name])=>name===item.topic)).slice(0,3).map(item=>`<button data-topic="${item.topic}">Practise ${item.topic} again</button>`).join('')}</section>`:'';modal(`<button class="back" id="back">← Subjects</button><h2>${s} Academy</h2><p>Choose a lesson. Choose a topic and practise at your own level.</p>${practiceHtml}<div class="cards">${lessonBank[s].map(([name,desc])=>`<button data-topic="${name}"><b>${name}</b><small>${desc}</small>${state.completed[s+':'+name]?' ✓':''}</button>`).join('')}</div>`);$('#back').onclick=showSubjects;$('#modalBody').onclick=e=>{let t=e.target.closest('[data-topic]');if(t)startLesson(s,t.dataset.topic)}}
let current=null;function startLesson(s,t){let age=activeProfile().age;current={s,t,q:questions(s,t,age),i:0,correct:0,missed:0,settled:false};showQuestion()}
function localLearningDate(){const now=new Date();return [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-')}
function showQuestion(){let c=current;if(c.i>=c.q.length){
 if(c.settled)return;
 try{
  const result=completeLessonAttempt(state,c.s,c.t,c.correct,c.q.length);
  // Commit the new progress only after the browser has persisted it successfully.
  const previous=state;
  state=recordLearningDay(recordPracticeNeed(result.save,c.s,c.t,c.missed>0),localLearningDate());
  if(result.passed)state=recordDailySubject(state,new Date().toISOString().slice(0,10),c.s);
  state=recogniseLearningGoal(state,subjects);
  try{save()}catch(err){state=previous;throw err}
  c.settled=true;
  refresh();
  const pass=result.passed,earned=result.earned;
  modal(`<h2>${pass?'Lesson complete! 🌟':'Good practice!'}</h2><p>You answered <b>${c.correct} of ${c.q.length}</b> correctly.</p><p>${pass?`You earned ${earned} BrightCoins!`:'Try again to reach 70% and earn BrightCoins.'}</p><button id="again">Try again</button><button id="lessons">More lessons</button>`);
  $('#again').onclick=()=>startLesson(c.s,c.t);$('#lessons').onclick=()=>showLessons(c.s);
 }catch(err){
  modal(`<h2>Progress could not be saved</h2><p>Your lesson results have not been awarded yet. Please free some device storage if needed, then try again.</p><p id="lessonSaveError" role="alert"></p><button id="retryLessonSave">Retry saving results</button>`);
  $('#lessonSaveError').textContent=err.message;
  $('#retryLessonSave').onclick=()=>showQuestion();
 }
 return;
 }let q=c.q[c.i],options=[...q.options].sort((a,b)=>a.localeCompare(b)),step=lessonStepProgress(c.i,c.q.length);modal(`<div class="progress">${step.label} · ${c.correct} correct</div><progress class="lesson-progress-bar" value="${step.current}" max="${step.total}" aria-label="Lesson progress"></progress><h2>${c.t}</h2><p class="progress">Learning level: ${learningBand(activeProfile().age)}</p><p class="question">${q.prompt}</p><div class="choices">${buttons(options)}</div><div id="feedback" role="status"></div>`);$('#modalBody').onclick=e=>{let btn=e.target.closest('[data-choice]');if(!btn||$('#feedback').textContent)return;let choice=options[Number(btn.dataset.choice)],ok=choice===q.answer,feedback=lessonAnswerFeedback(ok,c.i+1===c.q.length);c.correct+=Number(ok);if(!ok)c.missed++;$('#modalBody').querySelectorAll('[data-choice]').forEach(button=>button.disabled=true);const hint=learningHint(q,choice),feedbackArea=$('#feedback');feedbackArea.replaceChildren();const heading=document.createElement('strong'),answer=document.createElement('p'),explanation=document.createElement('p'),suggestion=document.createElement('p'),next=document.createElement('button');heading.textContent=hint.title;answer.textContent='Correct answer: '+q.answer;explanation.className='answer-explanation';explanation.textContent=hint.explanation;suggestion.className='learning-suggestion';suggestion.textContent=hint.suggestion;next.id='next';next.textContent=feedback.nextLabel;feedbackArea.append(heading,answer,explanation,suggestion,next);next.onclick=()=>{c.i++;showQuestion()}}}
function itemModel(id,x,z,rotation=0){const group=fantasyFurniture(THREE,id,shop.find(i=>i.id===id)?.color);group.position.set(x,0,z);group.rotation.y=rotation;group.userData.furnitureId=id;home.scene.add(group);return group}
function clearHome(){for(const o of homeObjects){home.scene.remove(o);o.traverse(x=>{x.geometry?.dispose();if(Array.isArray(x.material))x.material.forEach(m=>m.dispose());else x.material?.dispose()})}homeObjects=[]}
// Edit mode keeps controls visible while the 3D room remains unobstructed.
let decorating=false,selectedFurniture=null,dragFurniture=null;
const floorPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
const furnitureRay=new THREE.Raycaster(),furniturePointer=new THREE.Vector2();
function furniturePoint(e){
 const rect=renderer.domElement.getBoundingClientRect();
 if(!rect.width||!rect.height)return null;
 furniturePointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
 furnitureRay.setFromCamera(furniturePointer,camera);
 const point=new THREE.Vector3();
 return furnitureRay.ray.intersectPlane(floorPlane,point)?{x:THREE.MathUtils.clamp(point.x,-5.7,5.7),z:THREE.MathUtils.clamp(point.z,-4.7,4.7)}:null;
}
function renderFurniture(){clearHome();for(const p of state.placed)homeObjects.push(itemModel(p.item,p.x,p.z,p.rotation||0))}
function furnitureControls(){
 let panel=document.querySelector('#decoratorControls');
 if(!panel){panel=document.createElement('div');panel.id='decoratorControls';panel.setAttribute('role','group');panel.setAttribute('aria-label','Furniture decorating controls');document.body.appendChild(panel)}
 panel.hidden=mode!=='home'||!decorating;
 if(panel.hidden)return;
 const available=state.inventory.filter(id=>!state.placed.some(p=>p.item===id));
 panel.innerHTML=`<strong>Decorate your home</strong><p>Tap an item, then drag it anywhere on the floor.</p><label for="decoratorItem">Furniture</label><select id="decoratorItem"><option value="">Choose furniture</option>${state.placed.map(p=>`<option value="${p.item}">${shop.find(i=>i.id===p.item)?.name||p.item} (placed)</option>`).join('')}${available.map(id=>`<option value="${id}">${shop.find(i=>i.id===id)?.name||id} (new)</option>`).join('')}</select><div class="decoratorActions"><button id="decoratorAdd">Place new</button><button id="decoratorRotate">Rotate ↻</button><button id="decoratorRemove">Remove</button><button id="decoratorDone">Done decorating</button></div><p id="decoratorError" role="status"></p>`;
 const choice=panel.querySelector('#decoratorItem');choice.value=selectedFurniture||'';
 choice.onchange=()=>{selectedFurniture=choice.value||null};
 const error=message=>panel.querySelector('#decoratorError').textContent=message;
 panel.querySelector('#decoratorAdd').onclick=()=>{const id=selectedFurniture;if(!id||state.placed.some(p=>p.item===id)){error('Choose an unplaced item.');return}try{commitEconomy(current=>placeFurniture(current,id,0,0));renderFurniture();furnitureControls()}catch(err){error(err.message)}};
 panel.querySelector('#decoratorRotate').onclick=()=>{if(!selectedFurniture){error('Choose an item first.');return}const p=state.placed.find(p=>p.item===selectedFurniture);if(!p){error('Place this item first.');return}try{commitEconomy(current=>moveFurniture(current,p.item,p.x,p.z,(p.rotation||0)+Math.PI/4));renderFurniture()}catch(err){error(err.message)}};
 panel.querySelector('#decoratorRemove').onclick=()=>{if(!selectedFurniture){error('Choose an item first.');return}try{commitEconomy(current=>removeFurniture(current,selectedFurniture));renderFurniture();furnitureControls()}catch(err){error(err.message)}};
 panel.querySelector('#decoratorDone').onclick=()=>{decorating=false;selectedFurniture=null;furnitureControls();showHome()};
}
renderer.domElement.addEventListener('pointerdown',e=>{
 if(mode!=='home'||!decorating||!$('#modal').classList.contains('hidden'))return;
 const point=furniturePoint(e);if(!point)return;
 furnitureRay.setFromCamera(furniturePointer,camera);
 const hits=furnitureRay.intersectObjects(homeObjects,true);
 const hit=hits.find(h=>{let o=h.object;while(o&&!o.userData.furnitureId)o=o.parent;return !!o});
 if(hit){let o=hit.object;while(o&&!o.userData.furnitureId)o=o.parent;selectedFurniture=o.userData.furnitureId;dragFurniture=selectedFurniture;furnitureControls()}
 else if(selectedFurniture&&state.placed.some(p=>p.item===selectedFurniture))dragFurniture=selectedFurniture;
 if(dragFurniture){e.preventDefault();renderer.domElement.setPointerCapture?.(e.pointerId)}
});
renderer.domElement.addEventListener('pointermove',e=>{
 if(!dragFurniture||mode!=='home'||!decorating)return;
 const point=furniturePoint(e),model=homeObjects.find(o=>o.userData.furnitureId===dragFurniture);
 if(point&&model)model.position.set(point.x,0,point.z);
});
function finishFurnitureDrag(e){
 if(!dragFurniture)return;
 const id=dragFurniture;dragFurniture=null;
 const point=furniturePoint(e);
 if(point){const p=state.placed.find(p=>p.item===id);if(p)try{commitEconomy(current=>moveFurniture(current,id,point.x,point.z,p.rotation||0))}catch(err){const status=document.querySelector('#decoratorError');if(status)status.textContent=err.message}}
 renderFurniture();
}
renderer.domElement.addEventListener('pointerup',finishFurnitureDrag);
renderer.domElement.addEventListener('pointercancel',()=>{dragFurniture=null;renderFurniture()});
function showHome(){
 if(mode!=='home'){worldPosition={...position};scene.remove(avatar);home.scene.add(avatar);if(companionKind){scene.remove(companion);home.scene.add(companion);companion.position.set(1.35,0,4.05)}}
 mode='home';position={x:0,z:3};avatar.position.set(0,0,3);renderFurniture();
 if(decorating){$('#modal').classList.add('hidden');furnitureControls();return}
 furnitureControls();
 modal(`<h2>My 3D Home</h2><p>Arrange your furniture anywhere on the floor. Drag to move, rotate with a button, and save automatically.</p><button id="startDecorating">Decorate my home</button><h3>Enjoy your home</h3><div id="homeActions">${availableHomeActions(state).map(a=>`<button data-home-action="${a.id}">${a.label}</button>`).join('')||'<p>Place furniture to unlock home activities.</p>'}</div><p id="homeActionStatus" role="status" aria-live="polite"></p><button id="exitHome">Back to Adventure World</button>`);
 $('#homeActions').onclick=e=>{const id=e.target.closest('[data-home-action]')?.dataset.homeAction;if(!id)return;try{$('#homeActionStatus').textContent=homeActionMessage(state,id)}catch(err){$('#homeActionStatus').textContent=err.message}};
 $('#startDecorating').onclick=()=>{decorating=true;showHome()};
 $('#exitHome').onclick=exitHome;
}
function exitHome(){if(mode!=='home')return;decorating=false;dragFurniture=null;selectedFurniture=null;furnitureControls();mode='world';clearHome();home.scene.remove(avatar);scene.add(avatar);if(companionKind){home.scene.remove(companion);scene.add(companion);companion.position.set(worldPosition.x+1.35,0,worldPosition.z+1.05)}position={...worldPosition};$('#modal').classList.add('hidden')}
function showShop(){modal(`<h2>BrightCoins Shop</h2><p>Your balance: <b>${state.coins}</b> BrightCoins</p><div class="cards">${shop.map(it=>`<button data-buy="${it.id}" ${(state.inventory.includes(it.id)||((it.id==='cat'||it.id==='dog')&&state.pet))?'disabled':''}><b>${it.name}</b><small>${it.price} BrightCoins</small></button>`).join('')}</div><div id="shopStatus" role="status"></div>`);$('#modalBody').onclick=e=>{let id=e.target.closest('[data-buy]')?.dataset.buy;if(!id)return;let it=shop.find(i=>i.id===id);try{commitEconomy(current=>purchaseItem(current,it));rebuildCompanion();refresh();showShop()}catch(err){$('#shopStatus').textContent=err.message}}}
function showPetCare(){
 const status=petStatus(state);
 modal(`<h2>My Pet 🐾</h2><p>${status.adopted?`Your ${state.pet} is ${status.label.toLowerCase()}! · Happiness ${status.mood}/100`:'Visit the BrightCoins Shop to adopt a cat or dog.'}</p>${status.adopted?`<p id="petDisplayName"></p><label for="petNameInput">Pet name</label><input id="petNameInput" maxlength="20" aria-label="Pet name"><button id="savePetName">Save pet name</button>`:''}${status.adopted?Object.entries(PET_ACTIONS).map(([key,activity])=>`<button data-pet-action="${key}">${activity.label}</button>`).join(''):''}<p id="petCareMessage" role="status"></p><button id="petBack">Back to profile</button>`);
 if(status.adopted){$('#petDisplayName').textContent=petDisplayName(state);$('#petNameInput').value=state.petName||'';$('#savePetName').onclick=()=>{try{commitEconomy(current=>renamePet(current,$('#petNameInput').value));showPetCare();$('#petCareMessage').textContent='Pet name saved!'}catch(err){$('#petCareMessage').textContent=err.message}}};
 if(status.adopted){const choices=document.createElement('div');choices.innerHTML='<label for="petPersonalityChoice">Pet personality</label><select id="petPersonalityChoice"></select><button id="savePetPersonality">Save personality</button>';$('#petBack').before(choices);const selector=$('#petPersonalityChoice');for(const [id,personality] of Object.entries(PET_PERSONALITIES)){const option=document.createElement('option');option.value=id;option.textContent=personality.label+' — '+personality.description;selector.append(option)}selector.value=petPersonality(state);$('#savePetPersonality').onclick=()=>{try{commitEconomy(current=>choosePetPersonality(current,selector.value));showPetCare();$('#petCareMessage').textContent='Pet personality saved!'}catch(err){$('#petCareMessage').textContent=err.message}}}
 $('#petBack').onclick=showProfile;
 $('#modalBody').onclick=e=>{const action=e.target.closest('[data-pet-action]')?.dataset.petAction;if(!action)return;try{commitEconomy(current=>careForPet(current,action));petActivity={action,start:performance.now(),...activityAnimation(action)};showPetCare()}catch(err){$('#petCareMessage').textContent=err.message}};
}
function showBackupControls(){
  modal(`<h2>Save & restore progress</h2><p>This guest backup includes the current explorer, lessons, BrightCoins and home. It stays on your device unless you share the downloaded file.</p><button id="downloadBackup">Download backup</button><button id="inspectImportRecovery">Review previous import recovery</button><p><label>Choose a BrightPath backup (.json) <input type="file" id="importBackup" accept=".json,application/json"></label></p><div id="backupMessage" role="status"></div>`);
  $('#inspectImportRecovery').onclick=()=>{try{const recovery=inspectImportRecovery(localStorage);if(!recovery){$('#backupMessage').textContent='No previous import recovery copy exists.';return;}modal(`<h2>Previous import recovery</h2><p>A family snapshot from before the last backup import is stored on this device.</p><p id="recoveryNames"></p><p>Restoring replaces all current family progress. Download current backups before proceeding.</p><label>Type RESTORE to confirm <input id="importRecoveryConfirm" autocomplete="off"></label><button id="restoreImportRecovery">Restore previous family</button><button id="clearImportRecovery">Clear recovery copy</button><button id="importRecoveryBack">Back</button><p id="importRecoveryStatus" role="alert"></p>`);$('#recoveryNames').textContent=recovery.profiles.map(p=>`${p.name} (age ${p.age})`).join(' · ');$('#importRecoveryBack').onclick=showBackupControls;$('#restoreImportRecovery').onclick=()=>{if($('#importRecoveryConfirm').value!=='RESTORE'){$('#importRecoveryStatus').textContent='Type RESTORE to confirm.';return;}try{autoCloud.stop();restoreImportRecovery(localStorage);location.reload()}catch(e){$('#importRecoveryStatus').textContent=e.message}};$('#clearImportRecovery').onclick=()=>{if($('#importRecoveryConfirm').value!=='RESTORE'){$('#importRecoveryStatus').textContent='Type RESTORE to confirm clearing this copy.';return;}try{clearImportRecovery(localStorage);showBackupControls()}catch(e){$('#importRecoveryStatus').textContent=e.message}};}catch(e){$('#backupMessage').textContent=e.message}};
  $('#downloadBackup').onclick=()=>{try{const data=makeBackup(state,Number(localStorage.getItem('bp-age')||9));const blob=new Blob([data],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='brightpath-explorer-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#backupMessage').textContent='Backup downloaded. Keep it somewhere private.'}catch(e){$('#backupMessage').textContent=e.message}};
  $('#importBackup').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>2_000_000)throw Error('Backup is too large.');const backup=parseBackup(await file.text());const count=Object.keys(backup.save.completed).length;modal(`<h2>Review backup</h2><p>Explorer: <b id="importName"></b></p><p>${count} completed lessons · ${backup.save.coins} BrightCoins · Learning age ${backup.age}</p><p><strong>Warning:</strong> Restoring replaces the current guest explorer's progress on this device. Download your current backup first if you want to keep it.</p><label>Type RESTORE to confirm <input id="restoreConfirm" autocomplete="off"></label><button id="confirmImport">Restore this backup</button><button id="cancelImport">Cancel</button><div id="importError" role="alert"></div>`);$('#importName').textContent=backup.save.profile;$('#cancelImport').onclick=showBackupControls;$('#confirmImport').onclick=()=>{if($('#restoreConfirm').value!=='RESTORE'){$('#importError').textContent='Type RESTORE exactly to continue.';return}try{autoCloud.stop();family=importExplorerBackup(localStorage,family,backup);location.reload()}catch(err){$('#importError').textContent=err.message}}}catch(err){$('#backupMessage').textContent=err.message}};
}
function showAdventureOverview(){
 const overview=adventureOverview(state,subjects,new Date().toISOString().slice(0,10));
 modal(`<h2>My Adventure Progress 🌟</h2><p>Every step of your adventure counts!</p><div id="adventureStats" class="cards"></div><h3>Ideas for your next adventure 🎯</h3><div id="adventureGoals"></div><button id="overviewDashboard">My learning dashboard 📊</button><button id="overviewJourney">My learning journey map 🗺️</button><button id="overviewAchievements">View achievements 🏆</button><button id="overviewDiscoveries">Village discoveries 🌿</button><button id="overviewBack">Back to profile</button>`);
 const stats=[['📚 Lessons completed',overview.lessons],['🌿 Village discoveries',overview.discovered+' / '+overview.discoveriesTotal],['✨ Keepsakes collected',overview.keepsakes+' / '+overview.keepsakesTotal],['🏆 Milestones earned',overview.milestones+' / '+overview.milestonesTotal],['🐾 Pet companion',overview.pet||'Not adopted yet'],['🪙 BrightCoins',overview.coins]];
 const container=$('#adventureStats');
 for(const [label,value] of stats){const item=document.createElement('div'),heading=document.createElement('b'),detail=document.createElement('small');heading.textContent=label;detail.textContent=String(value);item.append(heading,detail);container.append(item)}
 const goals=personalisedAdventureGoals(state,subjects,new Date().toISOString().slice(0,10)),goalContainer=$('#adventureGoals');
 for(const goal of goals){
  const item=document.createElement('div'),button=document.createElement('button');
  button.textContent=goal.emoji+' '+goal.title+' — '+goal.detail;
  button.onclick=()=>{if(goal.destination==='learn')showSubjects();else if(goal.destination==='discoveries')showDiscoveryMenu();else if(goal.destination==='shop')showShop();else if(goal.destination==='pet')showPetCare();else if(goal.destination==='achievements')showAchievements()};
  item.append(button);goalContainer.append(item);
 }
 $('#overviewDashboard').onclick=showLearningDashboard;$('#overviewJourney').onclick=showLearningJourney;$('#overviewAchievements').onclick=showAchievements;$('#overviewDiscoveries').onclick=showDiscoveryMenu;$('#overviewBack').onclick=showProfile;
}
function showLearningGoals(){
 const celebration=learningGoalCelebration(state,subjects),goal=celebration.goal;
 modal(`<h2>My Learning Goal 🎯</h2><p>Pick a subject and a goal that feels fun. There is no deadline or penalty for changing your mind.</p><section class="learning-goal-panel"><div id="learningGoalStatus"></div><label for="learningGoalSubject">Subject</label><select id="learningGoalSubject"></select><label for="learningGoalTarget">Topics to complete</label><select id="learningGoalTarget"><option value="1">1 topic</option><option value="3">3 topics</option><option value="5">5 topics</option><option value="10">10 topics</option></select><button id="learningGoalSave">Set my goal</button><button id="learningGoalClear">Clear goal</button><p id="learningGoalMessage" role="alert"></p></section><section class="goal-keepsakes"><h3>🌟 My goal stars</h3><p>Every completed goal stays in your collection, even when you choose a new one.</p><div id="goalKeepsakes" aria-live="polite"></div></section><button id="learningGoalBack">Back to my dashboard</button>`);
 const select=$('#learningGoalSubject');
 for(const subject of subjects){const option=document.createElement('option');option.value=subject;option.textContent=subject;select.append(option)}
 if(goal){select.value=goal.subject;$('#learningGoalTarget').value=String(goal.target)}
 const status=$('#learningGoalStatus');
 if(goal){const title=document.createElement('strong'),bar=document.createElement('progress'),message=document.createElement('p');title.textContent=goal.subject+': '+goal.completed+' of '+goal.target+' topics completed';bar.max=goal.target;bar.value=goal.progress;bar.setAttribute('aria-label','Learning goal progress');message.textContent=goal.achieved?'🎉 Goal achieved! Well done! You collected a learning star!':'Every completed topic brings you closer!';status.append(title,bar,message)}
 else status.textContent='No goal chosen yet — you can start whenever you like.';
 const persist=next=>{const previous=state;state=recogniseLearningGoal(next,subjects);try{save();showLearningGoals()}catch(err){state=previous;$('#learningGoalMessage').textContent='Could not save goal: '+err.message}};
 const keepsakeArea=$('#goalKeepsakes');
 if(!celebration.earned.length)keepsakeArea.textContent='Your first learning star is waiting for you! ✨';
 for(const badge of celebration.earned){const item=document.createElement('span');item.className='goal-keepsake';item.textContent='⭐ '+badge;keepsakeArea.append(item)}
 $('#learningGoalSave').onclick=()=>{try{persist(chooseLearningGoal(state,subjects,select.value,Number($('#learningGoalTarget').value)))}catch(err){$('#learningGoalMessage').textContent=err.message}};
 $('#learningGoalClear').onclick=()=>persist(clearLearningGoal(state));
 $('#learningGoalBack').onclick=showLearningDashboard;
}
function showLearningDashboard(){
 const dashboard=learningDashboard(state,subjects);
 modal(`<h2>My Learning Dashboard 📊</h2><p>See what you've explored and where you'd like to practise next.</p><div class="learning-dashboard-summary"><strong>${dashboard.completed} topics completed</strong><span>${dashboard.attempts} recorded lesson attempts</span><span>${dashboard.challenges} daily challenges completed</span></div><div id="learningDashboardRows"></div><button id="dashboardGoals">Set my learning goal 🎯</button><button id="dashboardBack">Back to my progress</button>`);
 const container=$('#learningDashboardRows');
 for(const row of dashboard.rows){
  const section=document.createElement('section'),heading=document.createElement('h3'),details=document.createElement('p'),bar=document.createElement('progress'),note=document.createElement('p'),button=document.createElement('button');
  section.className='learning-dashboard-subject';heading.textContent=row.subject;
  details.textContent=row.completed+' topics completed · '+row.attempts+' scored attempts';
  bar.max=100;bar.value=row.recentAverage??0;bar.setAttribute('aria-label',row.subject+' recent average score');
  note.textContent=row.recentAverage===null?'No scored attempts yet — start whenever you like.':'Recent average: '+row.recentAverage+'% across up to five attempts.';
  if(row.practice.length)note.textContent+=' Suggested practice: '+row.practice.join(', ')+'.';
  button.textContent='Explore '+row.subject;button.onclick=()=>showLessons(row.subject);
  section.append(heading,details,bar,note,button);container.append(section);
 }
 $('#dashboardGoals').onclick=showLearningGoals;
 $('#dashboardBack').onclick=showAdventureOverview;
}
function showLearningJourney(){
 const stops=learningJourney(state,subjects),suggestions=journeySuggestions(state,subjects);
 modal(`<h2>My Learning Journey Map 🗺️</h2><p>Follow your learning path at your own pace. Every achievement stays collected!</p><ol class="learning-journey-map" id="journeyStops"></ol><section class="journey-suggestions"><h3>✨ Ideas just for you</h3><p>Choose what sounds fun — these are suggestions, not homework.</p><div id="journeySuggestions"></div></section><button id="journeyBack">Back to my progress</button>`);
 const list=$('#journeyStops');
 for(const stop of stops){
  const item=document.createElement('li'),heading=document.createElement('strong'),detail=document.createElement('span'),progress=document.createElement('progress'),button=document.createElement('button');
  item.className='journey-stop '+(stop.complete?'journey-complete':'journey-upcoming');
  heading.textContent=(stop.complete?'✓ ':'')+stop.emoji+' '+stop.title;
  detail.textContent=stop.complete?'Milestone reached!':stop.current+' of '+stop.goal+' completed';
  progress.value=stop.progress;progress.max=stop.goal;progress.setAttribute('aria-label',stop.title+' progress');
  button.textContent=stop.complete?'Explore more':'Keep going →';
  button.onclick=()=>stop.destination==='challenges'?showDailyQuests():showSubjects();
  item.append(heading,detail,progress,button);list.append(item);
 }
 const suggestionsBox=$('#journeySuggestions');
 for(const suggestion of suggestions){
  const button=document.createElement('button'),detail=document.createElement('small');
  button.type='button';button.textContent=suggestion.kind==='practice'?'🎯 '+suggestion.title:'📚 '+suggestion.title;
  detail.textContent=suggestion.detail;
  const item=document.createElement('div');item.className='journey-suggestion';item.append(button,detail);suggestionsBox.append(item);
  button.onclick=()=>suggestion.kind==='practice'&&lessonBank[suggestion.subject]?.some(([name])=>name===suggestion.topic)?startLesson(suggestion.subject,suggestion.topic):showLessons(suggestion.subject);
 }
 $('#journeyBack').onclick=showAdventureOverview;
}
function showAchievementGallery(){
 const gallery=achievementGallery(state,subjects,new Date().toISOString().slice(0,10));
 modal(`<h2>My Achievement Gallery 🏅</h2><p>All your learning and adventure keepsakes in one place.</p><p><strong>${gallery.earned} of ${gallery.total}</strong> achievements collected or unlocked</p><section class="gallery-collection-summary" aria-labelledby="galleryCollectionHeading"><h3 id="galleryCollectionHeading">🏆 My collection</h3><div id="galleryCollectionCategories"></div></section><p id="galleryCelebration" class="gallery-celebration" role="status" aria-live="polite"></p><div class="gallery-filters" role="group" aria-label="Filter achievements"><button type="button" data-gallery-filter="all" aria-pressed="true">All</button><button type="button" data-gallery-filter="earned" aria-pressed="false">Collected</button><button type="button" data-gallery-filter="upcoming" aria-pressed="false">Still to unlock</button></div><p id="galleryFilterStatus" role="status"></p><section class="gallery-spotlight" aria-labelledby="gallerySpotlightHeading"><h3 id="gallerySpotlightHeading">✨ Your achievement spotlight</h3><div id="gallerySpotlightContent"></div></section><section class="gallery-recommendations"><h3>🌟 Almost there!</h3><p>Here are a few achievements you could work towards next.</p><div id="galleryRecommendations"></div></section><div id="achievementGalleryGroups"></div><button id="galleryBack">Back to achievements</button>`);
 const collection=achievementCollectionSummary(gallery),collectionRoot=$('#galleryCollectionCategories');
 for(const category of collection.categories){
  const item=document.createElement('div'),name=document.createElement('strong'),count=document.createElement('span');
  item.className='gallery-collection-category';name.textContent=category.title;
  count.textContent=category.earned+' of '+category.total+' collected';
  item.append(name,count);
  if(category.total>0){const bar=document.createElement('progress');bar.max=category.total;bar.value=category.earned;bar.setAttribute('aria-label',category.title+' collected');item.append(bar)}
  else{const note=document.createElement('small');note.textContent='Your first star will appear here soon!';item.append(note)}
  collectionRoot.append(item);
 }
 const spotlight=achievementSpotlight(gallery),spotlightRoot=$('#gallerySpotlightContent');
 if(spotlight){
  const title=document.createElement('strong'),bar=document.createElement('progress'),count=document.createElement('p'),button=document.createElement('button');
  title.textContent=spotlight.emoji+' '+spotlight.title;
  bar.max=spotlight.progress.max;bar.value=spotlight.progress.value;bar.setAttribute('aria-label',spotlight.title+' progress');
  count.textContent=spotlight.progress.label+' · '+spotlight.remaining+' to go';
  button.type='button';button.textContent=spotlight.next.label+' →';
  button.onclick=()=>{if(spotlight.next.destination==='learn')showSubjects();else if(spotlight.next.destination==='discoveries')showDiscoveryMenu();else if(spotlight.next.destination==='shop')showShop();else if(spotlight.next.destination==='challenges')showDailyQuests()};
  spotlightRoot.append(title,bar,count,button);
 }else spotlightRoot.textContent='Keep exploring! New achievements will appear as you play and learn.';
 const suggestions=$('#galleryRecommendations');
 const recommended=achievementRecommendations(gallery);
 if(!recommended.length)suggestions.textContent='Explore the village and academy to discover more achievements!';
 for(const item of recommended){
  const row=document.createElement('div'),label=document.createElement('span'),button=document.createElement('button');
  row.className='gallery-recommendation';label.textContent=item.badge.emoji+' '+item.badge.title+' · '+item.remaining+' to go';
  button.type='button';button.textContent=item.next.label;button.setAttribute('aria-label',item.next.label+' for '+item.badge.title);
  button.onclick=()=>{if(item.next.destination==='learn')showSubjects();else if(item.next.destination==='discoveries')showDiscoveryMenu();else if(item.next.destination==='shop')showShop();else if(item.next.destination==='challenges')showDailyQuests()};
  row.append(label,button);suggestions.append(row);
 }
 const root=$('#achievementGalleryGroups');
 const renderGallery=filter=>{
 root.replaceChildren();
 const filtered=filterAchievementGallery(gallery,filter);
 $('#galleryFilterStatus').textContent=filtered.visible+' achievements shown';
 for(const group of filtered.groups){
  const section=document.createElement('section'),heading=document.createElement('h3'),grid=document.createElement('div');
  section.className='achievement-gallery-section';heading.textContent=group.title;grid.className='achievement-gallery-grid';
  for(const badge of group.items){
   const card=document.createElement('div'),symbol=document.createElement('span'),name=document.createElement('strong'),detail=document.createElement('small');
   card.className='achievement-gallery-card '+(badge.earned?'unlocked':'locked');
   symbol.textContent=badge.earned?badge.emoji:'🔒';symbol.setAttribute('aria-hidden','true');
   name.textContent=badge.title;detail.textContent=badge.detail;
   card.setAttribute('aria-label',badge.title+(badge.earned?', earned':', locked'));
   if(badge.earned){
    const celebrate=document.createElement('button');celebrate.type='button';celebrate.className='gallery-celebrate-button';celebrate.textContent='Celebrate 🎉';
    celebrate.setAttribute('aria-label','Celebrate '+badge.title);
    celebrate.onclick=()=>{const message=galleryCelebration(badge);const banner=$('#galleryCelebration');banner.textContent=message.title+' '+message.message;banner.classList.remove('gallery-celebration-pop');void banner.offsetWidth;banner.classList.add('gallery-celebration-pop')};
    card.append(symbol,name,detail,celebrate);
   }else{
    const step=achievementNextStep(badge);
    card.append(symbol,name,detail);
    const progress=achievementProgress(badge);
    if(progress){
     const bar=document.createElement('progress'),count=document.createElement('small');
     bar.className='gallery-progress';bar.max=progress.max;bar.value=progress.value;
     bar.setAttribute('aria-label',badge.title+' progress');
     count.textContent=progress.label;card.append(bar,count);
    }
    if(step){
     const explain=document.createElement('p'),action=document.createElement('button');
     explain.className='gallery-next-step';explain.textContent=step.description;
     action.type='button';action.className='gallery-next-button';action.textContent=step.label+' →';
     action.onclick=()=>{if(step.destination==='learn')showSubjects();else if(step.destination==='discoveries')showDiscoveryMenu();else if(step.destination==='shop')showShop();else if(step.destination==='challenges')showDailyQuests()};
     card.append(explain,action);
    }
   }
   grid.append(card);
  }
  if(!group.items.length){const empty=document.createElement('p');empty.textContent='Your first keepsake will appear here when you complete a goal.';grid.append(empty)}
  if(group.items.length){section.append(heading,grid);root.append(section)}
 }
 if(!filtered.visible){const empty=document.createElement('p');empty.textContent=filter==='earned'?'No collected achievements yet. Keep exploring!':'Everything is unlocked in this view — amazing work!';root.append(empty)}
 };
 renderGallery('all');
 document.querySelectorAll('[data-gallery-filter]').forEach(button=>button.onclick=()=>{
  document.querySelectorAll('[data-gallery-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  $('#galleryCelebration').textContent='';
  renderGallery(button.dataset.galleryFilter);
 });
 $('#galleryBack').onclick=showAchievements;
}
function showAchievements(){
 const summary=progressSummary(state,subjects),milestones=explorerMilestones(state,new Date().toISOString().slice(0,10)),streak=learningStreak(state);
 modal(`<h2>My Learning Journey 🏆</h2><p><strong>${summary.total}</strong> lessons completed · <strong>${state.coins}</strong> BrightCoins</p><h3>Subject progress</h3><div class="cards">${subjects.map(s=>`<div><b>${s}</b><small>${summary.counts[s]} completed</small></div>`).join('')}</div><section class="learning-streak"><h3>🔥 My learning days</h3><p><strong>${streak.learningDays}</strong> days of learning · <strong>${streak.bestRecentRun}</strong> days in my most recent run</p><p>${streak.milestones.length?'Learning milestones: '+streak.milestones.map(n=>n+' days 🌟').join(' · '):'Complete a lesson to begin collecting learning days!'}</p><small>Every day you learn counts. Taking a break never takes away your achievements.</small></section><h3>Learning badges</h3><p>${summary.badges.length?summary.badges.join(' · '):'Complete your first lesson to earn a badge!'}</p><h3>Explorer milestones (${milestones.earned}/${milestones.total})</h3><div id="explorerMilestones"></div><p id="milestoneCelebration" role="status" aria-live="polite"></p><button id="openAchievementGallery">My achievement gallery 🏅</button><button id="backToProfile">Back to profile</button>`);
 const container=$('#explorerMilestones');
 for(const milestone of milestones.milestones){const item=document.createElement('div');const button=document.createElement('button');button.textContent=(milestone.earned?milestone.emoji+' ':'🔒 ')+milestone.name+' · '+milestone.progress+'/'+milestone.goal;button.disabled=!milestone.earned;button.setAttribute('aria-label',milestone.earned?'Celebrate '+milestone.name:milestone.name+' locked');button.onclick=()=>{const celebration=milestoneCelebration(milestone);if(celebration){$('#milestoneCelebration').textContent=celebration.title+' '+celebration.message;const banner=$('#milestoneCelebration');banner.classList.remove('milestone-pop');void banner.offsetWidth;banner.classList.add('milestone-pop')}};item.append(button);container.append(item)}
 $('#openAchievementGallery').onclick=showAchievementGallery;
 $('#backToProfile').onclick=showProfile;
}
function showDailyQuests(){
 const day=new Date().toISOString().slice(0,10),quests=questProgress(state,day),challenge=dailyLearningChallenge(state,day),keepsakes=challengeKeepsakes(state);
 modal(`<h2>Daily Adventures ✨</h2><p>Complete learning adventures to earn extra BrightCoins. Quests reset each day (UTC).</p><section class="daily-learning-challenge"><h3>🌟 Optional learning challenge</h3><p>${challenge.title}</p><p>${challenge.description}</p><progress value="${challenge.count}" max="${challenge.goal}" aria-label="Daily subject challenge progress"></progress><p>${challenge.count}/${challenge.goal} subjects ${challenge.complete?'· Well done! 🎉':'· No pressure — come back whenever you like.'}</p><button id="challengeSubjects">Choose a subject 📚</button></section><section class="challenge-keepsakes"><h3>🏆 Learning keepsakes</h3><p>${keepsakes.total} daily challenges completed. Your achievements stay with you!</p><div class="challenge-keepsake-grid">${keepsakes.badges.map(b=>`<div class="challenge-keepsake ${b.earned?'earned':'locked'}" aria-label="${b.name}: ${b.earned?'earned':'locked'}"><span aria-hidden="true">${b.earned?b.emoji:'🔒'}</span><strong>${b.name}</strong><small>${b.earned?'Collected!':'Complete '+b.goal+' daily challenges'}</small></div>`).join('')}</div><p id="challengeCelebration" role="status" aria-live="polite">${challenge.complete?'🎉 Wonderful work! You completed today’s learning challenge.':''}</p></section><div class="cards">${quests.map(q=>`<div><b>${q.name}</b><small>${q.description} · ${q.count}/${q.goal} · 🪙 ${q.reward}</small><button data-quest="${q.id}" ${q.claimed||q.count<q.goal?'disabled':''}>${q.claimed?'Claimed ✓':q.count<q.goal?'Not ready':'Claim reward'}</button></div>`).join('')}</div><p id="questMessage" role="status"></p><button id="questBack">Back to profile</button>`);
 $('#challengeSubjects').onclick=showSubjects;
 $('#questBack').onclick=showProfile;
 $('#modalBody').onclick=e=>{const btn=e.target.closest('[data-quest]');if(!btn)return;try{const result=commitRewardChange(state,old=>claimDailyQuest(old,btn.dataset.quest,day),candidate=>{const updated=updateActive(family,candidate,Number(localStorage.getItem('bp-age')||activeProfile().age));writeFamily(localStorage,updated);family=updated});state=result.save;if(autoSyncEnabled(localStorage))autoCloud.changed(family.activeId);refresh();showDailyQuests()}catch(err){$('#questMessage').textContent=err.message}};
}
function requireParentAccess(next){
 const setup=!hasParentPin(localStorage);
 modal(`<h2>${setup?'Set up parent access':'Parent access'}</h2><p>${setup?'A parent should set a 6–12 digit PIN to protect family, backup and cloud menus on this device.':'Enter the parent PIN to continue.'} This local PIN is not a replacement for secure parent account sign-in.</p><label>Parent PIN <input id="parentPinEntry" type="password" inputmode="numeric" autocomplete="off" minlength="6" maxlength="12"></label><button id="parentPinContinue">${setup?'Set PIN and continue':'Unlock'}</button><button id="parentPinCancel">Cancel</button><p id="parentPinError" role="alert"></p><p><a href="/privacy.html" target="_blank" rel="noopener">Family privacy information</a></p>`);
 $('#parentPinCancel').onclick=showProfile;
 $('#parentPinContinue').onclick=async()=>{const button=$('#parentPinContinue');button.disabled=true;try{const pin=$('#parentPinEntry').value;if(setup)await setParentPin(localStorage,pin);else if(!await verifyParentPin(localStorage,pin))throw Error('Incorrect parent PIN.');next()}catch(e){$('#parentPinError').textContent=e.message;button.disabled=false}};
}
function showProfile(){modal(`<h2>My Explorer</h2><label>Explorer name <input id="profileName" maxlength="20" value="${state.profile.replaceAll('"','&quot;')}"></label><p>Choose skin tone</p><div class="swatches">${palette.map(c=>`<button data-skin="${c}" style="background:${c}" aria-label="Skin tone"></button>`).join('')}</div><p>Choose outfit colour</p><div class="swatches">${['#7b5ee8','#28a8a4','#f080b0','#f2aa35','#4a79df'].map(c=>`<button data-outfit="${c}" style="background:${c}" aria-label="Outfit colour"></button>`).join('')}</div><p>Completed lessons: ${Object.keys(state.completed).length} · Pet: ${state.pet||'none yet'}</p><label>Practice difficulty <select id="age">${[4,6,8,10,12,14,16].map(a=>`<option value="${a}" ${Number(localStorage.getItem('bp-age')||9)===a?'selected':''}>Approx. age ${a}</option>`).join('')}</select></label><button id="saveProfile">Save profile</button>${PROFILE_MENU_GROUPS.map(group=>`<section class="profile-menu-group" aria-labelledby="profile-group-${group.id}"><h3 id="profile-group-${group.id}">${group.title}</h3><div class="profile-menu-grid">${group.items.map(item=>`<button type="button" id="${item.id}">${item.label}</button>`).join('')}</div></section>`).join('')}`);$('#modalBody').onclick=e=>{let skin=e.target.dataset.skin,outfit=e.target.dataset.outfit;if(skin){state.avatar=skin;explorer.setAppearance(state.avatar,state.outfit)}if(outfit){state.outfit=outfit;explorer.setAppearance(state.avatar,state.outfit)}if(e.target.id==='adventureOverview'){showAdventureOverview();return}if(e.target.id==='achievements'){showAchievements();return}if(e.target.id==='dailyQuests'){showDailyQuests();return}if(e.target.id==='discoveryShortcut'){showDiscoveryMenu();return}if(e.target.id==='petCare'){showPetCare();return}if(e.target.id==='shopShortcut'){showShop();return}if(e.target.id==='homeShortcut'){showHome();return}if(e.target.id==='backupControls'){requireParentAccess(showBackupControls);return}if(e.target.id==='familyControls'){requireParentAccess(showFamilyExplorers);return}if(e.target.id==='cloudControls'){requireParentAccess(showCloudControls);return}if(e.target.id==='parentReport'){requireParentAccess(showParentReport);return}if(e.target.id==='revisionStudio'){showRevisionStudio();return}if(e.target.id==='saveProfile'){state.profile=$('#profileName').value.trim()||'Explorer';localStorage.setItem('bp-age',$('#age').value);save();close()}}}
function showRevisionStudio(){
 const suggestions=revisionRecommendations(state,subjects);
 modal(`<h2>My revision suggestions 📚</h2><p>Based on your recent lesson results. These are practice suggestions, not a judgement of ability. Complete lessons to receive suggestions.</p>${suggestions.length?`<div class="cards">${suggestions.map((r,i)=>`<button data-revise="${i}"><b>${escapeReport(r.subject)} · ${escapeReport(r.topic)}</b><small>${r.priority} · Recent average ${r.average}%</small></button>`).join('')}</div>`:'<p>No topics need extra practice based on recorded results yet. Try a lesson to get started!</p>'}<button id="revisionBack">Back to profile</button>`);
 $('#revisionBack').onclick=showProfile;
 $('#modalBody').onclick=e=>{const button=e.target.closest('[data-revise]');if(button){const r=suggestions[Number(button.dataset.revise)];if(r)startLesson(r.subject,r.topic)}};
}
function showParentReport(){
 // Save current in-memory progress before building the report.
 try{save()}catch(err){modal(`<h2>Parent learning report</h2><p role="alert">Could not save progress: ${escapeReport(err.message)}</p><button id="reportBack">Back</button>`);$('#reportBack').onclick=showProfile;return}
 const reports=buildParentReport(family,subjects);
 modal(`<h2>Parent learning report</h2><p>Progress saved on this device. This report includes recorded lesson scores from this update onward. Older completed lessons have no individual score history. Time spent is not tracked.</p>${reports.map(r=>`<section class="report-child"><h3>${escapeReport(r.name)} ${r.current?'(current explorer)':''}</h3><p>Learning age: ${r.age} · BrightCoins: ${r.coins} · Pet: ${escapeReport(r.pet||'None')}</p><p>Completed topics: <b>${r.completedLessons}</b> · Recorded attempts: <b>${r.history.totalAttempts}</b></p><ul>${Object.entries(r.subjects).map(([subject,count])=>`<li>${escapeReport(subject)}: ${count}</li>`).join('')}</ul><p>Achievements: ${r.badges.length?r.badges.map(escapeReport).join(', '):'None yet'}</p><h4>Recent learning results</h4>${r.history.recent.length?`<ul>${r.history.recent.map(h=>`<li>${escapeReport(h.subject)} – ${escapeReport(h.topic)}: ${h.percent}% (${h.passed?'passed':'practice'}) · ${escapeReport(h.at.slice(0,10))}</li>`).join('')}</ul>`:'<p>No scored attempts recorded yet.</p>'}<h4>Learning insights</h4><ul>${buildParentInsights(family.profiles.find(p=>p.id===r.id)?.save,subjects).messages.map(message=>`<li>${escapeReport(message)}</li>`).join('')}</ul><h4>Visual progress by subject</h4>${buildProgressCharts(family.profiles.find(p=>p.id===r.id)?.save,subjects).map(c=>`<div class="progress-chart"><strong>${escapeReport(c.subject)}</strong>${c.count?`<div class="progress-track" role="img" aria-label="${escapeReport(c.subject)} recent average ${c.recentAverage} percent"><span style="width:${c.recentAverage}%"></span></div><small>Recent average: ${c.recentAverage}% · ${c.count} attempts${c.change===null?' · Trend available after 6 attempts':` · ${c.change>0?'+':''}${c.change} percentage points vs first five`}</small><div class="progress-spark" aria-label="Last ${c.points.length} scores">${c.points.map(v=>`<span title="${v}%" style="height:${Math.max(3,v)}%"></span>`).join('')}</div>`:'<p>No recorded scores yet.</p>'}</div>`).join('')}<h4>Subject results</h4><ul>${Object.entries(r.history.bySubject).map(([s,h])=>`<li>${escapeReport(s)}: ${h.attempts?h.average+'% average, '+h.recentAverage+'% recent (last 5)':'No scored attempts yet'}</li>`).join('')}</ul></section>`).join('')}<p>Reports are private to this browser. Cloud sharing and detailed lesson history are not available in this build.</p><button id="reportBack">Back to profile</button>`);
 $('#reportBack').onclick=showProfile;
}
function escapeReport(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function showCloudControls(){
 modal(`<h2>Parent cloud account</h2><p>Your explorers and progress remain on this device. Signing in does not upload, overwrite or merge any saves.</p>${cloudConfigured()?'<label>Parent email <input id="parentEmail" type="email" autocomplete="email"></label><button id="parentLink">Send secure sign-in link</button><button id="cloudPreview">Check my cloud profiles</button><button id="cloudUpload">Upload current explorer (first backup only)</button><button id="cloudSyncNow">Sync linked explorer safely</button><label><input type="checkbox" id="autoCloudToggle" ${autoSyncEnabled(localStorage)?"checked":""}> Automatically sync this device after saving (opt-in)</label><p>Automatic sync only updates an existing linked backup. It pauses on conflicts or errors; it never silently replaces newer cloud progress.</p><button id="cloudRestore">Restore a cloud backup</button><p>If your sign-in link expired, enter your email above and request a new one. Existing local saves are unaffected.</p><button id="cloudSignOut">Sign out</button>':'<p>Cloud accounts are not configured yet. Local family profiles still work.</p>'}<button id="cloudRecovery">Inspect cloud-restore recovery copy</button><button id="cloudBack">Back to profile</button><p id="cloudStatus" role="status"></p>`);
 $('#cloudBack').onclick=showProfile;
 $('#cloudRecovery').onclick=()=>{try{const copy=inspectCloudRecovery(localStorage);if(!copy){$('#cloudStatus').textContent='No cloud-restore recovery copy is stored on this device.';return;}modal(`<h2>Cloud restoration recovery</h2><p>Saved family profiles: ${copy.profiles.length}. This copy contains progress from before a cloud restoration.</p><ul>${copy.profiles.map(p=>`<li>${escapeReport(p.name)} (age ${p.age})</li>`).join('')}</ul><p>Restoring replaces the current family progress on this device. Download backups before proceeding.</p><label>Type RECOVER to restore <input id="recoveryConfirm" autocomplete="off"></label><button id="recoverFamily">Restore previous family</button><label>Type CLEAR to discard recovery copy <input id="clearConfirm" autocomplete="off"></label><button id="clearRecovery">Discard recovery copy</button><button id="recoveryBack">Cancel</button><p id="recoveryMessage" role="alert"></p>`);$('#recoveryBack').onclick=showCloudControls;$('#recoverFamily').onclick=()=>{if($('#recoveryConfirm').value!=='RECOVER'){$('#recoveryMessage').textContent='Type RECOVER exactly.';return;}try{restoreCloudRecovery(localStorage);location.reload()}catch(e){$('#recoveryMessage').textContent=e.message}};$('#clearRecovery').onclick=()=>{if($('#clearConfirm').value!=='CLEAR'){$('#recoveryMessage').textContent='Type CLEAR exactly.';return;}try{clearCloudRecovery(localStorage);showCloudControls()}catch(e){$('#recoveryMessage').textContent=e.message}};}catch(e){$('#cloudStatus').textContent=e.message}};
 if(cloudConfigured())$('#autoCloudToggle').onchange=e=>{setAutoSyncEnabled(localStorage,e.target.checked);if(e.target.checked){autoCloud.resume();$('#cloudStatus').textContent='Automatic sync enabled. New local changes will sync after a short delay when this explorer is linked.'}else{$('#cloudStatus').textContent='Automatic sync disabled. Existing cloud backups are unchanged.';autoCloud.pause()}};
 if(!cloudConfigured())return;
 const status=$('#cloudStatus');
 $('#parentLink').onclick=async()=>{status.textContent='Requesting sign-in link…';try{await requestParentLink($('#parentEmail').value.trim());status.textContent='If the address can receive sign-in emails, check its inbox for a link.'}catch(e){status.textContent=e.message}};
 $('#cloudPreview').onclick=async()=>{status.textContent='Checking your account…';try{const user=await parentAccount();if(!user){status.textContent='Not signed in yet. Open the link sent to your email.';return}const profiles=await previewParentCloudProfiles();status.textContent=`Signed in. ${profiles.length} cloud explorer profile(s) found. No data was changed.`}catch(e){status.textContent=e.message}};
 $('#cloudUpload').onclick=async()=>{status.textContent='Uploading…';try{save();await uploadCloudExplorer(activeProfile());linkCloudProfile(localStorage,activeProfile().id,0);autoCloud.resume();status.textContent='Cloud backup created and linked on this device (revision 0). Local progress remains saved.'}catch(e){status.textContent=e.message}};
 $('#cloudRestore').onclick=async()=>{status.textContent='Checking cloud backups…';try{const rows=await listCloudExplorers();if(!rows.length){status.textContent='No cloud backups found.';return}modal(`<h2>Restore cloud progress</h2><p>Choose a cloud backup and a local explorer. This will replace that local explorer’s progress. Download a local backup first.</p><label>Cloud backup <select id="remoteBackup"></select></label><label>Replace local explorer <select id="localTarget"></select></label><label>Type RESTORE <input id="cloudConfirm" autocomplete="off"></label><button id="cloudApply">Restore selected backup</button><button id="cloudCancel">Cancel</button><p id="cloudRestoreStatus" role="alert"></p>`);for(const r of rows){const o=document.createElement('option');o.value=r.profile_key;o.textContent=`${r.display_name} (age ${r.learning_age})`;$('#remoteBackup').append(o)}for(const p of family.profiles){const o=document.createElement('option');o.value=p.id;o.textContent=p.save.profile;$('#localTarget').append(o)}$('#cloudCancel').onclick=showCloudControls;$('#cloudApply').onclick=async()=>{const msg=$('#cloudRestoreStatus');if($('#cloudConfirm').value!=='RESTORE'){msg.textContent='Type RESTORE exactly to confirm.';return}const btn=$('#cloudApply');btn.disabled=true;try{save();const remote=await downloadCloudExplorer($('#remoteBackup').value);const next=prepareCloudRestore(family,{profile_key:remote.id,learning_age:remote.age,save_data:remote.save},$('#localTarget').value);applyCloudRestore(localStorage,family,next,$('#localTarget').value);location.reload()}catch(e){msg.textContent=e.message;btn.disabled=false}}}catch(e){status.textContent=e.message}};
 $('#cloudSyncNow').onclick=async()=>{const btn=$('#cloudSyncNow');btn.disabled=true;status.textContent='Checking cloud version…';try{save();const profile=activeProfile();const revision=readSyncLinks(localStorage)[profile.id];const next=await syncCloudExplorer(profile,revision);linkCloudProfile(localStorage,profile.id,next);autoCloud.resume();status.textContent=`Cloud sync complete (revision ${next}). Local progress is safe.`}catch(e){status.textContent=e.message}finally{btn.disabled=false}};
 $('#cloudSignOut').onclick=async()=>{try{await signOutParent();status.textContent='Signed out. Local progress remains on this device.'}catch(e){status.textContent=e.message}};
}
function showFamilyExplorers(){
 modal(`<h2>Family explorers</h2><p>Each child has their own lessons, BrightCoins, pets and home. Saves stay on this device.</p><div id="familyList"></div><h3>Add an explorer</h3><label>Name <input id="newExplorerName" maxlength="20" autocomplete="off"></label><label>Learning age <select id="newExplorerAge">${Array.from({length:14},(_,i)=>i+3).map(a=>`<option value="${a}" ${a===9?'selected':''}>${a}</option>`).join('')}</select></label><button id="addExplorer">Create explorer</button><button id="familyBack">Back to profile</button><p id="familyError" role="alert"></p>`);
 const list=$('#familyList');for(const p of family.profiles){const row=document.createElement('p');const btn=document.createElement('button');btn.textContent=p.id===family.activeId?`${p.save.profile} (current)`:`Switch to ${p.save.profile}`;btn.disabled=p.id===family.activeId;btn.onclick=()=>{try{save();autoCloud.stop();family=selectExplorer(family,p.id);writeFamily(localStorage,family);location.reload()}catch(err){$('#familyError').textContent=err.message}};row.append(btn,document.createTextNode(` · age ${p.age} · 🪙 ${p.save.coins}`));list.append(row)}
 $('#familyBack').onclick=showProfile;
 $('#addExplorer').onclick=()=>{try{save();const id='explorer_'+crypto.randomUUID().replaceAll('-','');const next=addExplorer(family,$('#newExplorerName').value,Number($('#newExplorerAge').value),id);autoCloud.stop();writeFamily(localStorage,next);family=next;location.reload()}catch(err){$('#familyError').textContent=err.message}};
}
// Glowing discovery markers are interactive alongside academy buildings.
for(const discovery of DISCOVERIES){
 const marker=cylinder(.48,.65,1.1,discovery.color,discovery.x,.55,discovery.z);
 marker.userData.discoveryId=discovery.id;
 sphere(.55,discovery.color,discovery.x,1.25,discovery.z);
 label(discovery.name,discovery.x,2.15,discovery.z);
}
function showVillageKeepsakes(){
 const keepsakes=villageKeepsakes(state),progress=keepsakeProgress(state);
 modal(`<h2>My Village Keepsakes ✨</h2><p>You've unlocked ${progress.unlocked} of ${progress.total} keepsakes. Earn each by completing its village discovery. No extra BrightCoins are needed.</p><div id="keepsakeGallery"></div><button id="keepsakeBack">Back to discoveries</button>`);
 const gallery=$('#keepsakeGallery');
 for(const keepsake of keepsakes){
  const item=document.createElement('p');
  item.textContent=keepsake.unlocked?keepsake.emoji+' '+keepsake.name:'🔒 Mystery keepsake — '+keepsake.id;
  gallery.append(item);
 }
 $('#keepsakeBack').onclick=showDiscoveryMenu;
}
function showVillageJournal(){
 const day=new Date().toISOString().slice(0,10),entries=villageJournal(state,day),summary=journalSummary(state,day);
 modal(`<h2>My Village Journal 📖</h2><p>You've discovered ${summary.discovered} of ${summary.total} village secrets. Today: ${summary.today} completed.</p><div id="journalEntries"></div><button id="journalBack">Back to discoveries</button>`);
 const container=$('#journalEntries');
 for(const entry of entries){
  const item=document.createElement('section');
  const heading=document.createElement('h3');heading.textContent=(entry.visited?'✨ ':'🔒 ')+entry.name;
  const description=document.createElement('p');description.textContent=entry.visited?entry.explanation+' Last completed: '+entry.lastVisit+(entry.completedToday?' · Completed today!':''):'Explore this location and answer its question to unlock your journal note.';
  item.append(heading,description);container.append(item);
 }
 $('#journalBack').onclick=showDiscoveryMenu;
}
function showDiscoveryMenu(){
 modal(`<h2>Village discoveries 🌿</h2><p>Explore the village to discover nature, weather, numbers and stars. Each correct discovery earns 8 BrightCoins once per day.</p><button id="openVillageJournal">My Village Journal 📖</button><button id="openVillageKeepsakes">My Keepsakes ✨</button><div class="cards">${DISCOVERIES.map(d=>`<button data-open-discovery="${d.id}">${d.name}</button>`).join('')}</div><button id="discoveryMenuBack">Back to profile</button>`);
 $('#discoveryMenuBack').onclick=showProfile;
 $('#openVillageJournal').onclick=showVillageJournal;
 $('#openVillageKeepsakes').onclick=showVillageKeepsakes;
 $('#modalBody').onclick=e=>{const id=e.target.closest('[data-open-discovery]')?.dataset.openDiscovery;if(id){const activity=DISCOVERIES.find(d=>d.id===id);if(activity)showDiscovery(activity)}};
}
function showDiscovery(activity){
 const day=new Date().toISOString().slice(0,10),done=discoveryStatus(state,activity.id,day);
 modal(`<h2>${activity.name} ✨</h2><p>${done?'You already earned today’s reward. You can still practise!':'Answer the question correctly to earn 8 BrightCoins today.'}</p><p class="question">${activity.prompt}</p><div class="choices">${activity.options.map((choice,i)=>`<button data-discovery-choice="${i}">${choice}</button>`).join('')}</div><p id="discoveryFeedback" role="status"></p><button id="discoveryClose">Back to village</button>`);
 $('#discoveryClose').onclick=close;
 $('#modalBody').onclick=e=>{const btn=e.target.closest('[data-discovery-choice]');if(!btn||$('#discoveryFeedback').dataset.answered)return;try{
  const result=commitRewardChange(state,old=>completeDiscovery(old,activity.id,activity.options[Number(btn.dataset.discoveryChoice)],day),candidate=>{const updated=updateActive(family,candidate,Number(localStorage.getItem('bp-age')||activeProfile().age));writeFamily(localStorage,updated);family=updated});
  if(result.earned){state=result.save;if(autoSyncEnabled(localStorage))autoCloud.changed(family.activeId);refresh();}
  $('#discoveryFeedback').textContent=`${result.correct?'Correct!':'Try again tomorrow for a new reward, or visit another discovery.'} ${result.explanation} ${result.earned?`+${result.earned} BrightCoins!`:''}`;
  $('#discoveryFeedback').dataset.answered='yes';
  $('#modalBody').querySelectorAll('[data-discovery-choice]').forEach(b=>b.disabled=true);
 }catch(err){$('#discoveryFeedback').textContent=err.message}};
}
function interact(b){if(!b)return;if(b.id&&DISCOVERIES.some(d=>d.id===b.id)){showDiscovery(b);return}if(b.name==='My Home')showHome();else if(b.name==='Shop')showShop();else showLessons(b.name)}
$('#learnBtn').onclick=showSubjects;$('#profileBtn').onclick=showProfile;$('#helpBtn').onclick=()=>modal('<h2>How to play</h2><p>Use arrow keys, WASD or the on-screen direction buttons to walk around the 3D world. Approach a building and press Enter or Interact. Tap buildings directly too.</p><p>Complete lessons to earn BrightCoins, buy furniture, decorate your home and adopt a pet.</p><p><b>Guest mode:</b> Progress saves on this device only. Secure family accounts are not yet connected.</p>');$('#interact').onclick=()=>interact(near);
const villageGuide=document.createElement('button');villageGuide.id='villageGuide';villageGuide.textContent='🧭 Village guide';villageGuide.setAttribute('aria-label','Open village directions');$('#interact').after(villageGuide);
let activeWaypoint=null;
const waypointStatus=document.createElement('div');waypointStatus.id='waypointStatus';waypointStatus.setAttribute('role','status');waypointStatus.setAttribute('aria-live','off');villageGuide.after(waypointStatus);
const cancelWaypoint=document.createElement('button');cancelWaypoint.id='cancelWaypoint';cancelWaypoint.textContent='✕ Clear directions';cancelWaypoint.hidden=true;waypointStatus.after(cancelWaypoint);
cancelWaypoint.onclick=()=>{activeWaypoint=null;waypointStatus.textContent='';cancelWaypoint.hidden=true};
villageGuide.onclick=()=>{
 const destinations=[...DISCOVERIES,...buildings.map(b=>({...b,x:b.x,z:b.z+4}))];
 const directions=villageDirections(position,destinations);
 modal('<h2>Village guide 🧭</h2><p>Choose a destination to see how far away it is.</p><div id="villageGuideList"></div><p id="villageGuideMessage" role="status"></p><button id="closeVillageGuide">Back to exploring</button>');
 const list=$('#villageGuideList');
 for(const d of directions){const button=document.createElement('button');button.textContent=d.name+' · '+d.distance+' steps · '+d.direction;button.onclick=()=>{activeWaypoint={name:d.name,x:d.x,z:d.z};close();waypointStatus.textContent='🧭 Head '+d.direction+' towards '+d.name+'.';cancelWaypoint.hidden=false};list.append(button)}
 $('#closeVillageGuide').onclick=close;
};
const movementKeys=new Set(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d']);
const typingTarget=element=>element?.closest?.('input,textarea,select,[contenteditable]');
function clearMovement(){for(const key of movementKeys)keys.delete(key)}
window.addEventListener('keydown',e=>{
 if(typingTarget(e.target)||!$('#modal').classList.contains('hidden'))return;
 const key=e.key.toLowerCase();
 if(movementKeys.has(key)||key===' ')e.preventDefault();
 if(movementKeys.has(key))keys.add(key);
 if(e.key==='Enter')interact(near);
});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',clearMovement);
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearMovement()});
for(const button of document.querySelectorAll('[data-dir]')){
 const key={up:'arrowup',down:'arrowdown',left:'arrowleft',right:'arrowright'}[button.dataset.dir];
 const release=()=>keys.delete(key);
 button.setAttribute('aria-label',`${button.dataset.dir} movement`);
 button.addEventListener('pointerdown',e=>{
  if(!$('#modal').classList.contains('hidden'))return;
  e.preventDefault();keys.add(key);
  if(button.setPointerCapture)button.setPointerCapture(e.pointerId);
 });
 for(const event of ['pointerup','pointercancel','lostpointercapture','pointerleave'])button.addEventListener(event,release);
}

const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
renderer.domElement.addEventListener('click',e=>{
 if(mode!=='world'||!$('#modal').classList.contains('hidden'))return;
 const rect=renderer.domElement.getBoundingClientRect();
 if(!rect.width||!rect.height)return;
 pointer.x=((e.clientX-rect.left)/rect.width)*2-1;
 pointer.y=-((e.clientY-rect.top)/rect.height)*2+1;
 raycaster.setFromCamera(pointer,camera);
 // Academy geometry is nested inside Groups. Resolve the clicked mesh through
 // its ancestors rather than only testing top-level scene children.
 const hits=raycaster.intersectObjects(scene.children,true);
 for(const hit of hits){
  let node=hit.object;
  while(node&&!node.userData?.interactionBuilding)node=node.parent;
  if(node){const building=buildings.find(b=>b.name===node.userData.interactionBuilding);if(building){interact(building);return}}
 }
 // Keep the original ground/portal proximity interaction as a fallback.
 const groundHit=hits.find(hit=>Math.abs(hit.point.y)<.35);
 if(!groundHit)return;
 const {x,z}=groundHit.point;
 const discovery=DISCOVERIES.find(d=>Math.hypot(x-d.x,z-d.z)<1.6);
 const building=buildings.find(b=>Math.hypot(x-b.x,z-b.z)<4);
 if(discovery)interact(discovery);else if(building)interact(building);
});
function frame(now){requestAnimationFrame(frame);fantasyVillage.update(now);villageMagic.update(now);let dt=Math.min(.05,(now-last)/1000);last=now;let moving=$('#modal').classList.contains('hidden')&&!decorating;if(!moving)clearMovement();if(moving){let dx=Number(keys.has('arrowright')||keys.has('d'))-Number(keys.has('arrowleft')||keys.has('a')),dz=Number(keys.has('arrowdown')||keys.has('s'))-Number(keys.has('arrowup')||keys.has('w'));let len=Math.hypot(dx,dz)||1;position.x=THREE.MathUtils.clamp(position.x+dx/len*dt*5,-18,18);position.z=THREE.MathUtils.clamp(position.z+dz/len*dt*5,-18,18);if(dx||dz)avatar.rotation.y=Math.atan2(dx,dz)}avatar.position.set(position.x,0,position.z);explorer.animate(now,moving&&(keys.has('arrowright')||keys.has('arrowleft')||keys.has('arrowup')||keys.has('arrowdown')||keys.has('w')||keys.has('a')||keys.has('s')||keys.has('d')));
 if(companion.visible){
  const behaviour=petBehaviour(petPersonality(state));
  const goal=companionTarget(position,now),next=companionMotion(companion.position,{x:position.x+1.35+(goal.x-position.x-1.35)*behaviour.sway/.22,z:position.z+1.05+(goal.z-position.z-1.05)*behaviour.sway/.22},dt*behaviour.speed);
  companion.position.x=next.x;companion.position.z=next.z;
  const active=petActivity&&now-petActivity.start<petActivity.duration;
  companion.position.y=active?Math.abs(Math.sin((now-petActivity.start)*.011))*petActivity.bounce:Math.sin(now*.004)*behaviour.bob;
  if(petActivity&&!active)petActivity=null;
  companion.rotation.y=Math.atan2(position.x-companion.position.x,position.z-companion.position.z);
  petModel?.animate(now,Math.hypot(goal.x-companion.position.x,goal.z-companion.position.z)>.12,active?petActivity.action:null);
 }
 let target=new THREE.Vector3(position.x,2,position.z);camera.position.lerp(new THREE.Vector3(position.x,8,position.z+12),.07);camera.lookAt(target);near=mode==='world'?(nearestVillageDestination(position,DISCOVERIES,2.7)||buildings.find(b=>Math.hypot(position.x-b.x,position.z-(b.z+4))<3.5)):null;villageGuide.hidden=mode!=='world';cancelWaypoint.hidden=mode!=='world'||!activeWaypoint;waypointStatus.hidden=mode!=='world';if(activeWaypoint&&mode==='world'){const hint=waypointHint(position,activeWaypoint);if(hint){const message=hint.arrived?'🎉 You reached '+activeWaypoint.name+'!':'🧭 '+activeWaypoint.name+' · '+hint.distance+' steps · Head '+hint.direction;if(waypointStatus.textContent!==message)waypointStatus.textContent=message;if(hint.arrived){activeWaypoint=null;cancelWaypoint.hidden=true}}}$('#tip').innerHTML=near?`Near <b>${near.name}</b> — press Enter or Interact`:'Explore the world · Visit a glowing portal to learn';$('#interact').style.display=near?'block':'none';renderer.render(mode==='home'?home.scene:scene,camera)}requestAnimationFrame(frame);
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
