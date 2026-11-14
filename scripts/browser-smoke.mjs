// Run after `npm install` and `npx playwright install chromium`.
// This is a real-browser smoke test, not a substitute for manual gameplay checks.
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';

let chromium;
try { ({chromium}=await import('playwright')); }
catch { console.error('Playwright is missing. Install dependencies first: npm install'); process.exit(2); }
const port=Number(process.env.BRIGHTPATH_TEST_PORT||4179);
const url=`http://127.0.0.1:${port}`;
const production=process.env.BRIGHTPATH_BROWSER_MODE==='production';
const artifactDir=resolve(process.env.BRIGHTPATH_TEST_ARTIFACTS||'test-artifacts/browser');
const results=[];
const selectedDevice=process.env.BRIGHTPATH_BROWSER_DEVICE||'both';
const server=spawn('npm',['run',production?'preview':'dev','--','--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});
let browser;
let serverOutput='';
for(const stream of [server.stdout,server.stderr])stream.on('data',chunk=>{serverOutput=(serverOutput+chunk.toString()).slice(-6000);});
async function ready(){
 for(let i=0;i<45;i++){
  if(server.exitCode!==null)throw new Error(`${production?'Production preview':'Development'} server exited (${server.exitCode})`);
  try {const r=await fetch(url);if(r.ok)return;}catch{}
  await delay(350);
 }
 throw new Error(`${production?'Production preview':'Development'} server did not become ready`);
}
async function closeModal(page){
 await page.locator('#close').click({noWaitAfter:true,timeout:10000});
 await page.locator('#modal').waitFor({state:'hidden',timeout:10000});
}
async function coinBalance(page){
 const value=Number((await page.locator('#coinCount').innerText()).match(/\d+/)?.[0]);
 if(!Number.isFinite(value))throw new Error('BrightCoins balance missing');
 return value;
}
async function answerCountingQuestion(page,correct=true){
 const result=await page.evaluate(chooseCorrect=>{
  const prompt=document.querySelector('.question')?.textContent||'';
  const match=prompt.match(/What number comes after (\\d+)\\?/);
  if(!match)return {error:'Unexpected counting prompt: '+prompt};
  const expected=String(Number(match[1])+1);
  const options=[...document.querySelectorAll('.choices button')];
  const selected=options.find(button=>((button.textContent||'').trim()===expected)===chooseCorrect);
  if(!selected)return {error:'No matching answer option for: '+prompt};
  selected.click();
  const next=document.querySelector('#next');
  if(!next)return {error:'Answer did not reveal Next button: '+prompt};
  next.click();
  return {ok:true};
 },correct);
 if(result.error)throw new Error(result.error);
}
async function completeCountingLesson(page){
 console.log('Counting lesson started');
 await page.locator('#learnBtn').click();
 await page.locator('[data-subject="Maths"]').click();
 await page.locator('[data-topic="Counting"]').click();
 for(let i=0;i<20;i++){
  await answerCountingQuestion(page,true);
  if((i+1)%5===0)console.log(`Counting lesson completed ${i+1}/20 questions`);
 }
 await page.getByRole('heading',{name:/Lesson complete/}).waitFor();
}
// Deliberately answer a counting lesson incorrectly to exercise genuine low-score history.
async function completeWeakCountingLesson(page){
 await page.locator('#learnBtn').click();
 await page.locator('[data-subject="Maths"]').click();
 await page.locator('[data-topic="Counting"]').click();
 for(let i=0;i<20;i++){
  await answerCountingQuestion(page,false);
 }
 await page.getByRole('heading',{name:/Good practice/}).waitFor();
}
const browserParentPin='846291';
async function unlockParentMenu(page){
 const pin=page.locator('#parentPinEntry');
 if(await pin.count()){
  await pin.fill(browserParentPin);
  await page.locator('#parentPinContinue').click({noWaitAfter:true});
  await pin.waitFor({state:'detached'});
 }
}
async function openFamily(page){
 await page.locator('#profileBtn').click();
 await page.getByRole('button',{name:'Family explorers'}).click();
 await unlockParentMenu(page);
}
async function scenario(name,viewport){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce'});
 const page=await context.newPage();
 // Fail stalled interactions promptly and identify the last completed checkpoint.
 page.setDefaultTimeout(10000);
 page.setDefaultNavigationTimeout(25000);
 const errors=[];
 let stage='initial page load';
 const checkpoint=name=>{stage=name;console.log(`CHECK ${name} (${viewport.width}x${viewport.height})`);};
 console.log(`START ${name} browser scenario (${viewport.width}x${viewport.height})`);
 page.on('pageerror',e=>errors.push(e.message));
 try {
  await page.goto(url,{waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  await page.locator('#profileBtn').click();
  await page.getByRole('button',{name:'Family explorers'}).click();
 await unlockParentMenu(page);
  await page.locator('#newExplorerName').fill('Browser Test Child');
  await page.locator('#newExplorerAge').selectOption('8');
  await page.locator('#addExplorer').click();
  await page.locator('#profileBtn').click();
  await page.getByRole('button',{name:'Family explorers'}).click();
 await unlockParentMenu(page);
  // Creating a child automatically makes that child the active explorer.
  await page.getByText('Browser Test Child (current)').waitFor();
  // Exercise an actual switch to the original explorer, then back again.
  await page.getByRole('button',{name:/Switch to Explorer$/}).click();
  await openFamily(page);
  await page.getByRole('button',{name:/Switch to Browser Test Child/}).click();
  await openFamily(page);
  await page.getByText('Browser Test Child (current)').waitFor();
  checkpoint('profile creation and switching');
  // Confirm the active explorer survives a genuine page reload.
  await page.reload({waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  await page.locator('#profileBtn').click();
  await page.getByRole('button',{name:'Family explorers'}).click();
 await unlockParentMenu(page);
  await page.getByText('Browser Test Child (current)').waitFor();
  checkpoint('profile reload persistence');
  // First pass awards 25 coins; repeating the same topic awards only 5.
  checkpoint('begin lesson rewards');
  const startingCoins=await coinBalance(page);
  await closeModal(page);
  await completeCountingLesson(page);
  checkpoint('first lesson completed');
  const firstReward=await coinBalance(page);
  if(firstReward!==startingCoins+25)throw new Error(`First lesson reward mismatch: ${startingCoins} -> ${firstReward}`);
  await closeModal(page);
  await completeCountingLesson(page);
  checkpoint('repeat lesson completed');
  const repeatReward=await coinBalance(page);
  if(repeatReward!==firstReward+5)throw new Error(`Repeat lesson reward mismatch: ${firstReward} -> ${repeatReward}`);
  await page.reload({waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  if(await coinBalance(page)!==repeatReward)throw new Error('Repeat lesson coins were not persisted after reload');
  await page.locator('#profileBtn').click();
  await page.locator('#achievements').click();
  await page.getByText('1 lessons completed',{exact:false}).waitFor();
  await closeModal(page);
  checkpoint('lesson rewards and reload');
  // Purchase a pet and furniture through the same controls families use.
  await page.locator('#profileBtn').click();
  await page.locator('#shopShortcut').click();
  await page.locator('[data-buy="cat"]').click();
  if(await coinBalance(page)!==repeatReward-80)throw new Error('Pet adoption did not deduct exactly 80 BrightCoins');
  if(!(await page.locator('[data-buy="dog"]').isDisabled()))throw new Error('A second pet can still be adopted');
  await page.locator('[data-buy="lamp"]').click();
  const purchaseBalance=repeatReward-115;
  if(await coinBalance(page)!==purchaseBalance)throw new Error('Furniture purchase did not deduct exactly 35 BrightCoins');
  if(!(await page.locator('[data-buy="lamp"]').isDisabled()))throw new Error('Purchased furniture can be bought again');
  await closeModal(page);
  await page.locator('#profileBtn').click();
  await page.locator('#petCare').click();
  await page.getByText(/Your cat is/).waitFor();
  await page.locator('[data-pet-action="feed"]').click();
  await page.getByText(/Your cat is/).waitFor();
  await closeModal(page);
  await page.locator('#profileBtn').click();
  await page.locator('#homeShortcut').click();
  await page.locator('[data-place="lamp"]').click();
  await page.locator('[data-remove="lamp"]').waitFor();
  await page.locator('#exitHome').click();
  await page.reload({waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  if(await coinBalance(page)!==purchaseBalance)throw new Error('Purchase balance was not saved after reload');
  await page.locator('#profileBtn').click();
  await page.locator('#petCare').click();
  await page.getByText(/Your cat is/).waitFor();
  await closeModal(page);
  await page.locator('#profileBtn').click();
  await page.locator('#homeShortcut').click();
  await page.locator('[data-remove="lamp"]').waitFor();
  await page.locator('#exitHome').click();
  checkpoint('pet, furniture and purchase persistence');
  // All three discoveries award once per UTC day; quests are claimed once too.
  const discoveries=[['pond','Frogs'],['garden','Roots'],['observatory','The Sun']];
  let discoveryCoins=await coinBalance(page);
  for(const [id,answer] of discoveries){
   await page.locator('#profileBtn').click();
   await page.locator('#discoveryShortcut').click();
   await page.locator(`[data-open-discovery="${id}"]`).click();
   await page.locator('[data-discovery-choice]').filter({hasText:answer}).click();
   if(await coinBalance(page)!==discoveryCoins+8)throw new Error(`${id} discovery reward mismatch`);
   discoveryCoins+=8;
   await page.locator('#discoveryClose').click();
   await page.locator('#profileBtn').click();
   await page.locator('#discoveryShortcut').click();
   await page.locator(`[data-open-discovery="${id}"]`).click();
   await page.locator('[data-discovery-choice]').filter({hasText:answer}).click();
   if(await coinBalance(page)!==discoveryCoins)throw new Error(`${id} discovery rewarded twice in one day`);
   await page.locator('#discoveryClose').click();
  }
  await page.locator('#profileBtn').click();
  await page.locator('#dailyQuests').click();
  for(const [id,reward] of [['first-discovery',12],['three-discoveries',20],['one-lesson',15]]){
   const button=page.locator(`[data-quest="${id}"]`);
   if(await button.isDisabled())throw new Error(`${id} quest not ready after activities`);
   await button.click();
   discoveryCoins+=reward;
   if(await coinBalance(page)!==discoveryCoins)throw new Error(`${id} quest reward mismatch`);
   if(!(await page.locator(`[data-quest="${id}"]`).isDisabled()))throw new Error(`${id} quest can be claimed twice`);
  }
  await closeModal(page);
  await page.reload({waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  if(await coinBalance(page)!==discoveryCoins)throw new Error('Discovery and quest rewards did not persist');
  await page.locator('#profileBtn').click();
  await page.locator('#dailyQuests').click();
  for(const [id] of [['first-discovery'],['three-discoveries'],['one-lesson']]){
   const button=page.locator(`[data-quest="${id}"]`);
   if(!(await button.isDisabled()))throw new Error(`${id} quest claim not persisted`);
  }
  await closeModal(page);
  checkpoint('daily discoveries and quests');
  // A sibling must not inherit the first explorer's coins or achievements.
  await openFamily(page);
  await page.locator('#newExplorerName').fill('Sibling Test Child');
  await page.locator('#newExplorerAge').selectOption('8');
  await page.locator('#addExplorer').click();
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  const siblingCoins=await coinBalance(page);
  if(siblingCoins!==100)throw new Error(`New sibling inherited coins: ${siblingCoins}`);
  await page.locator('#profileBtn').click();
  await page.locator('#achievements').click();
  await page.getByText('0 lessons completed',{exact:false}).waitFor();
  await closeModal(page);
  await openFamily(page);
  await page.getByRole('button',{name:/Switch to Browser Test Child/}).click();
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  if(await coinBalance(page)!==discoveryCoins)throw new Error('Original explorer coins changed after switching siblings');
  await page.locator('#profileBtn').click();
  await page.locator('#achievements').click();
  await page.getByText('1 lessons completed',{exact:false}).waitFor();
  await closeModal(page);
  checkpoint('sibling isolation');
  // Parent report must show each explorer's own attempts, achievements and charts.
  await page.locator('#profileBtn').click();
  await page.locator('#parentReport').click();
 await unlockParentMenu(page);
  const report=page.locator('.report-child');
  if(await report.count()!==3)throw new Error('Parent report did not include all three family explorers');
  const firstChild=report.filter({has:page.getByRole('heading',{name:/Browser Test Child/})});
  const sibling=report.filter({has:page.getByRole('heading',{name:/Sibling Test Child/})});
  if(await firstChild.count()!==1||await sibling.count()!==1)throw new Error('Parent report mixed up explorer names');
  await firstChild.getByText(/Recorded attempts:\s*2/).waitFor();
  await firstChild.getByText(/Completed topics:\s*1/).waitFor();
  await firstChild.getByText(/Maths.*Counting.*100%/).first().waitFor();
  await firstChild.locator('.progress-chart').first().waitFor();
  await sibling.getByText(/Recorded attempts:\s*0/).waitFor();
  await sibling.getByText(/Completed topics:\s*0/).waitFor();
  await sibling.getByText('No scored attempts recorded yet.').waitFor();
  await page.locator('#reportBack').click();
  await page.locator('#revisionStudio').click();
  await page.getByText(/No topics need extra practice/).waitFor();
  await page.locator('#revisionBack').click();
  await closeModal(page);
  // Recheck the report after a reload, not just from in-memory state.
  await page.reload({waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  await page.locator('#profileBtn').click();
  await page.locator('#parentReport').click();
 await unlockParentMenu(page);
  await page.locator('.report-child').filter({has:page.getByRole('heading',{name:/Browser Test Child/})}).getByText(/Recorded attempts:\s*2/).waitFor();
  await page.locator('#reportBack').click();
  await closeModal(page);
  checkpoint('parent reports and reload');
  // A genuine low score must trigger revision suggestions without awarding coins.
  const beforePractice=await coinBalance(page);
  await completeWeakCountingLesson(page);
  if(await coinBalance(page)!==beforePractice)throw new Error('A failed lesson awarded BrightCoins');
  await closeModal(page);
  await page.locator('#profileBtn').click();
  await page.locator('#revisionStudio').click();
  await page.getByRole('button',{name:/Maths · Counting/}).waitFor();
  await page.getByText(/Practise next · Recent average 0%/).waitFor();
  await page.locator('#revisionBack').click();
  await closeModal(page);
  await page.reload({waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  await page.locator('#profileBtn').click();
  await page.locator('#revisionStudio').click();
  await page.getByRole('button',{name:/Maths · Counting/}).waitFor();
  // Practising from the recommendation itself must launch the correct topic.
  await page.getByRole('button',{name:/Maths · Counting/}).click();
  await page.locator('.question').waitFor();
  for(let i=0;i<20;i++){
   const prompt=await page.locator('.question').innerText();
   const match=prompt.match(/What number comes after (\d+)\?/);
   if(!match)throw new Error(`Revision launched the wrong topic: ${prompt}`);
   await page.locator('.choices button').filter({hasText:new RegExp(`^${Number(match[1])+1}$`)}).click();
   await page.locator('#next').click();
  }
  await page.getByRole('heading',{name:/Lesson complete/}).waitFor();
  if(await coinBalance(page)!==beforePractice+5)throw new Error('Revision repeat lesson reward mismatch');
  await closeModal(page);
  // The most recent three attempts govern suggestions; three strong attempts
  // after the weak one should clear it from the revision list.
  for(let i=0;i<2;i++){
   await completeCountingLesson(page);
   await closeModal(page);
  }
  await page.locator('#profileBtn').click();
  await page.locator('#revisionStudio').click();
  await page.getByText(/No topics need extra practice/).waitFor();
  await page.locator('#revisionBack').click();
  await closeModal(page);
  await page.reload({waitUntil:'networkidle',timeout:30000});
  await page.locator('#game canvas').waitFor({state:'visible',timeout:15000});
  await page.locator('#profileBtn').click();
  await page.locator('#revisionStudio').click();
  await page.getByText(/No topics need extra practice/).waitFor();
  await page.locator('#revisionBack').click();
  await closeModal(page);
  checkpoint('weak-score revision and recovery');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  if(overflow)throw new Error('Unexpected horizontal page overflow');
  if(errors.length)throw new Error(`Browser errors: ${errors.join('; ')}`);
  results.push({device:name,status:'passed',lastCheckpoint:stage});
  console.log(`PASS ${name} (${production?'production':'development'}): 3D canvas, family profiles, first/repeat lesson rewards, pet/furniture purchases, pet care, discoveries, daily quests, sibling isolation, parent reports, weak-score revision and recovery, reload persistence, no overflow or uncaught errors`);
 }catch(error){
  const safeName=name.replace(/[^a-z0-9-]/gi,'-').toLowerCase();
  await mkdir(artifactDir,{recursive:true});
  const path=join(artifactDir,`failure-${safeName}.png`);
  results.push({device:name,status:'failed',lastCheckpoint:stage,error:error.message,screenshot:path});
  try{await page.screenshot({path,fullPage:true,timeout:5000});console.error(`Screenshot saved: ${path}`);}catch{}
  throw new Error(`${name} failed at ${stage}: ${error.message}`);
 }finally{await context.close();}
}
try{
 await ready();
 browser=await chromium.launch({headless:true});
 if(selectedDevice!=='mobile')await scenario('desktop',{width:1280,height:800});
 if(selectedDevice!=='desktop')await scenario('mobile',{width:390,height:844});
} catch(e){console.error('FAIL browser smoke:',e.message);if(serverOutput)console.error('Server output (last 6000 chars):',serverOutput);process.exitCode=1;}
finally{
 await browser?.close();
 server.kill('SIGTERM');
 await mkdir(artifactDir,{recursive:true});
 await writeFile(join(artifactDir,'results.json'),JSON.stringify({mode:production?'production':'development',results,passed:results.length===(selectedDevice==='both'?2:1)&&results.every(result=>result.status==='passed')},null,2)+'\n');
 if(serverOutput)await writeFile(join(artifactDir,'server.log'),serverOutput);
 // Vite runs through npm and can leave a descendant process keeping Node alive.
 // All browser contexts, diagnostics and results are complete at this point.
 process.exit(process.exitCode||0);
}
