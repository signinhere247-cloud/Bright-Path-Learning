/**
 * BrightPath Computing & Online Safety — Stage 2 Step 9.
 * Draft England-oriented learning pathways and original explained practice.
 * Nursery/Reception: exploratory technology activities, not a separate statutory subject.
 * KS4: GCSE preparation topics, not an exam-board-verified specification.
 * Online safety is age-sensitive; encourage trusted-adult help, not child disclosure.
 * Standalone module: no existing lessons, saves, or production code changed.
 */
const pathways={
 nursery:['devices','digital-creativity','trusted-adults'],
 reception:['devices','instructions','digital-creativity','trusted-adults','personal-information'],
 'year-1':['devices','instructions','algorithms','digital-creativity','trusted-adults','personal-information'],
 'year-2':['algorithms','programming','debugging','digital-creativity','search','trusted-adults','personal-information'],
 'year-3':['algorithms','programming','debugging','networks','search','passwords','online-kindness'],
 'year-4':['programming','debugging','repetition','networks','search','passwords','online-kindness','misinformation'],
 'year-5':['programming','selection','repetition','data','networks','search','privacy','misinformation'],
 'year-6':['programming','selection','variables','data','networks','privacy','digital-footprint','misinformation'],
 'year-7':['algorithms','programming','variables','selection','repetition','binary','hardware','networks','privacy','cybersecurity'],
 'year-8':['algorithms','programming','data-types','logic','binary','hardware','networks','cybersecurity','digital-footprint'],
 'year-9':['algorithms','programming','functions','data-types','logic','binary','databases','networks','cybersecurity','digital-ethics'],
 'year-10':['algorithms','programming','functions','data-types','logic','binary','hardware','operating-systems','networks','databases','cybersecurity','digital-ethics'],
 'year-11':['algorithms','programming','functions','data-types','logic','binary','hardware','operating-systems','networks','databases','cybersecurity','digital-ethics']
};
export const computingTopicNames=Object.freeze({
 devices:'Using digital devices', 'digital-creativity':'Creating with technology',
 'trusted-adults':'Getting help from trusted adults','personal-information':'Keeping personal information private',
 instructions:'Following instructions',algorithms:'Algorithms',programming:'Programming',
 debugging:'Finding and fixing errors',search:'Searching for information',
 networks:'Computer networks',passwords:'Passwords and account safety',
 'online-kindness':'Respectful online behaviour',misinformation:'Checking online information',
 repetition:'Loops and repetition',selection:'Selection and decisions',
 data:'Collecting and presenting data',privacy:'Privacy and permissions',
 'digital-footprint':'Digital footprints',variables:'Variables',
 binary:'Binary representation',hardware:'Computer hardware',
 cybersecurity:'Cybersecurity','data-types':'Data types',logic:'Boolean logic',
 functions:'Functions and procedures',databases:'Databases',
 'digital-ethics':'Ethics and digital impact','operating-systems':'Operating systems'
});
export const computingYearTopicMap=Object.freeze(Object.fromEntries(
 Object.entries(pathways).map(([year,topics])=>[year,Object.freeze([...topics])])
));
export function computingTopicsForYear(yearId){
 if(!Object.hasOwn(computingYearTopicMap,yearId))throw Error('Unknown Computing year.');
 return computingYearTopicMap[yearId].map(id=>({id,title:computingTopicNames[id],yearId}));
}
// [prompt, correct answer, distractor A, distractor B, explanation]
const questions={
 devices:[
 ['Which device can help you type words?','Keyboard','Cup','Spoon','A keyboard lets you enter letters and numbers.'],
 ['What should you do before using someone else’s device?','Ask permission','Take it without asking','Share its password','Asking permission respects other people and their belongings.']
 ],
 'digital-creativity':[
 ['What can you make with a drawing app?','A digital picture','A paper-only drawing','A real tree','A drawing app lets you create pictures on a screen.']
 ],
 'trusted-adults':[
 ['If something online worries you, what is a good next step?','Tell a trusted adult','Keep it secret','Reply to a stranger','A trusted adult can help you stay safe and decide what to do.'],
 ['If an unfamiliar person online asks to meet, what should you do?','Tell a trusted adult','Go alone','Send your address','Do not arrange a meeting; tell a trusted adult.']
 ],
 'personal-information':[
 ['Which detail should you avoid sharing publicly online?','Your home address','Your favourite colour','A made-up character name','A home address can identify where you live and should be kept private.'],
 ['If a game asks for your school name, what should you do?','Ask a trusted adult before sharing','Post it publicly','Send it to strangers','School information can identify you, so ask for help first.']
 ],
 instructions:[
 ['What should you do first when following a set of instructions?','Start with step one','Skip to the end','Ignore the order','Instructions are usually followed in sequence.']
 ],
 algorithms:[
 ['What is an algorithm?','A set of steps for solving a problem','A computer screen','A type of password','An algorithm is a defined sequence of instructions.'],
 ['Why does the order of steps matter?','It can change the result','It never matters','It always makes programs faster','Changing the order can change what an algorithm does.']
 ],
 programming:[
 ['What is a program?','Instructions a computer can execute','Only a picture','A keyboard cable','A computer program contains instructions for a computer to follow.'],
 ['What is an instruction in code?','A command to perform an action','A type of chair','An internet advertisement','Code tells a computer what operations to perform.']
 ],
 debugging:[
 ['What is debugging?','Finding and fixing errors','Deleting all files','Turning off the screen','Debugging identifies and corrects problems in programs.'],
 ['A character moves the wrong way in a game. What should you check?','The movement instructions','The colour of the desk','The room temperature','Inspecting the relevant instructions helps find the error.']
 ],
 search:[
 ['How can you make an online search more useful?','Use clear keywords','Type unrelated words','Believe the first result automatically','Relevant keywords help find suitable information.'],
 ['Why should you check more than one reliable source?','To compare evidence','To copy every claim','To avoid reading','Comparing sources helps assess accuracy.']
 ],
 networks:[
 ['What is a computer network?','Connected devices that share data','A single unplugged lamp','A paper notebook','A network links devices so they can communicate.'],
 ['What does a router often do in a home network?','Direct network traffic','Print every webpage','Store all websites','Routers forward data between networks.']
 ],
 passwords:[
 ['Which password is generally harder to guess?','A long unique passphrase','123456','Your first name','Long, unique passwords are harder to guess.'],
 ['Should you share an account password with an online friend?','No','Yes, always','Only in public chats','Passwords should remain private; ask a trusted adult if help is needed.']
 ],
 'online-kindness':[
 ['What is a respectful response to a disagreement online?','Use calm and kind words','Send insults','Share private messages publicly','Respectful communication avoids harm and escalation.'],
 ['If someone is being bullied online, what is helpful?','Tell a trusted adult and use reporting tools','Join the bullying','Share the hurtful messages widely','Trusted adults and platform reporting can help address bullying.']
 ],
 misinformation:[
 ['What is a warning sign that a claim may be unreliable?','It has no checkable evidence','It names a clear source','It can be verified independently','Unsupported claims need checking before being trusted.'],
 ['A shocking post says “share immediately”. What is best?','Check reliable sources first','Forward without reading','Assume it is true','Urgent language does not establish truth.']
 ],
 repetition:[
 ['What does a loop do in programming?','Repeats instructions','Deletes the program','Turns numbers into pictures','A loop executes a block of instructions repeatedly.']
 ],
 selection:[
 ['What does an if statement help a program do?','Choose based on a condition','Always repeat forever','Turn off all inputs','Selection allows different actions depending on conditions.']
 ],
 data:[
 ['Which chart is useful for comparing counts in categories?','Bar chart','Random sketch','A password list','Bar charts display quantities for different categories.']
 ],
 privacy:[
 ['Why review an app’s permissions?','To limit unnecessary access to data','To make every app public','To remove all security','Permissions control what information or features an app can access.']
 ],
 'digital-footprint':[
 ['What is a digital footprint?','Traces of your activity online','A mark made by a shoe only','A type of mouse','Posts and interactions can leave a record of online activity.']
 ],
 variables:[
 ['What is a variable in a program?','A named place to store a value','A type of monitor','A fixed keyboard key','Variables hold values that programs can read or change.']
 ],
 binary:[
 ['Which digits are used in binary?','0 and 1','1 and 2','0 through 9','Binary uses two digits: zero and one.'],
 ['What is binary 101 in decimal?','5','3','7','101₂ = 1×4 + 0×2 + 1×1 = 5.']
 ],
 hardware:[
 ['Which component carries out many computer instructions?','CPU','Mouse mat','Printer paper','The central processing unit executes instructions.']
 ],
 cybersecurity:[
 ['What is phishing?','A deceptive attempt to obtain information','A safe backup method','A graphics format','Phishing messages try to trick people into revealing information or taking unsafe actions.'],
 ['What is a safer response to a suspicious login link?','Open the official site directly','Enter your password immediately','Forward it to friends','Using the known official site helps avoid fake login pages.']
 ],
 'data-types':[
 ['Which data type is commonly used for true or false?','Boolean','String of paragraphs','Image file','Boolean values represent true or false.']
 ],
 logic:[
 ['When is A AND B true?','When both A and B are true','When either is false','Only when both are false','Logical AND is true only if both inputs are true.']
 ],
 functions:[
 ['Why use a function in a program?','To group reusable instructions','To erase all variables','To remove all conditions','Functions package logic that can be called when needed.']
 ],
 databases:[
 ['What is a database used for?','Organising and retrieving structured information','Only playing sound','Charging a computer','Databases store information for efficient access and updates.']
 ],
 'digital-ethics':[
 ['Why should a developer consider accessibility?','So more people can use the software','To exclude users','To avoid testing','Accessible design supports people with different needs and abilities.'],
 ['What is a concern when training AI with personal data?','Privacy and consent','Screen brightness only','Keyboard colour','Personal information requires careful handling, lawful basis and appropriate safeguards.']
 ],
 'operating-systems':[
 ['What is a main role of an operating system?','Managing hardware and software resources','Writing every user document','Replacing the internet','An operating system manages resources and provides services to applications.']
 ]
};
export function computingPractice(topicId,{yearId='year-4',count=6,seed=0}={}){
 if(!computingTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Topic is not mapped to this year.');
 if(!Number.isInteger(count)||count<1||count>30||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid practice settings.');
 const bank=questions[topicId];
 if(!bank?.length)throw Error('Missing starter questions for topic.');
 return Array.from({length:count},(_,i)=>{
  const [prompt,answer,wrongA,wrongB,explanation]=bank[(i+seed)%bank.length];
  const options=[answer,wrongA,wrongB];
  if(new Set(options).size!==3)throw Error('Duplicate answer choices.');
  const shift=(i+seed)%3;
  return {questionId:`${yearId}-${topicId}-${seed}-${i}`,yearId,topicId,prompt,answer,
   options:[...options.slice(shift),...options.slice(0,shift)],explanation,sourceStatus:'draft'};
 });
}
export function computingContentCoverage(){
 return Object.entries(pathways).map(([yearId,topics])=>({
  yearId,topicCount:topics.length,
  uniqueStarterQuestions:topics.reduce((sum,id)=>sum+(questions[id]?.length||0),0)
 }));
}
