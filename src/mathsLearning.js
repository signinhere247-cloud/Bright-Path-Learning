/**
 * BrightPath Mathematics content expansion — Stage 2 Step 5.
 * England-focused teaching strands and deterministic practice generators.
 * Authored practice is not a complete or officially verified GCSE curriculum.
 * Standalone module: existing live lessons and save IDs remain unchanged.
 */
const yearTopics={
 nursery:['counting','shapes','patterns','comparison'],
 reception:['counting','addition','subtraction','shapes','patterns','comparison'],
 'year-1':['place-value','addition','subtraction','measurement','shapes','time','money'],
 'year-2':['place-value','addition','subtraction','multiplication','division','fractions','measurement','time','money','statistics'],
 'year-3':['place-value','addition','subtraction','multiplication','division','fractions','measurement','time','geometry','statistics'],
 'year-4':['place-value','addition','subtraction','multiplication','division','fractions','decimals','measurement','geometry','statistics'],
 'year-5':['place-value','operations','fractions','decimals','percentages','measurement','geometry','statistics'],
 'year-6':['operations','fractions','decimals','percentages','ratio','algebra','geometry','statistics'],
 'year-7':['integers','operations','fractions','decimals','percentages','ratio','algebra','geometry','statistics','probability'],
 'year-8':['integers','fractions','percentages','ratio','algebra','linear-equations','geometry','statistics','probability'],
 'year-9':['indices','standard-form','ratio','algebra','linear-equations','sequences','pythagoras','geometry','statistics','probability'],
 'year-10':['indices','standard-form','surds','algebra','linear-equations','quadratics','sequences','pythagoras','trigonometry','probability','statistics'],
 'year-11':['indices','standard-form','surds','algebra','linear-equations','quadratics','sequences','pythagoras','trigonometry','probability','statistics']
};
export const mathsTopicNames=Object.freeze({
 counting:'Counting',shapes:'2D and 3D shapes',patterns:'Patterns',comparison:'Comparing quantities',
 'place-value':'Place value',addition:'Addition',subtraction:'Subtraction',multiplication:'Multiplication',
 division:'Division',fractions:'Fractions',measurement:'Measurement',time:'Time',money:'Money',
 statistics:'Statistics',geometry:'Geometry',decimals:'Decimals',percentages:'Percentages',
 operations:'Mixed operations',ratio:'Ratio and proportion',algebra:'Algebra',
 integers:'Positive and negative integers',probability:'Probability',indices:'Indices',
 'standard-form':'Standard form',surds:'Surds','linear-equations':'Linear equations',
 sequences:'Sequences',pythagoras:'Pythagoras',trigonometry:'Trigonometry',quadratics:'Quadratics'
});
export const mathsYearTopicMap=Object.freeze(Object.fromEntries(
 Object.entries(yearTopics).map(([year,topics])=>[year,Object.freeze([...topics])])
));
export function mathsTopicsForYear(yearId){
 if(!Object.hasOwn(mathsYearTopicMap,yearId))throw Error('Unknown maths year.');
 return mathsYearTopicMap[yearId].map(id=>({id,title:mathsTopicNames[id],yearId}));
}
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const fmt=n=>Number.isInteger(n)?String(n):String(Number(n.toFixed(4)));
const choose=(items,i)=>items[i%items.length];
function makeQuestion(prompt,answer,explanation,distractors){
 const correct=String(answer);
 const options=[correct,...distractors.map(String)].filter((value,index,array)=>array.indexOf(value)===index);
 if(options.length!==3)throw Error('Question must have three distinct options.');
 return {prompt,answer:correct,options,explanation};
}
/**
 * Reproducible practice questions. Every question has a worked explanation.
 * seed changes values; no learner information is used.
 */
export function generateMathsPractice(topicId,{yearId='year-4',count=12,seed=0}={}){
 if(!mathsTopicsForYear(yearId).some(topic=>topic.id===topicId))throw Error('Topic is not mapped to the selected year.');
 if(!Number.isInteger(count)||count<1||count>40||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid practice settings.');
 const yearIndex=yearId==='nursery'?0:yearId==='reception'?1:Number(yearId.slice(5))+1;
 const max=yearIndex<=2?10:yearIndex<=4?100:yearIndex<=8?1000:10000;
 return Array.from({length:count},(_,i)=>{
  const n=i+seed*7;
  const a=2+(n*17+yearIndex*11)%Math.max(5,Math.min(max,400));
  const b=2+(n*11+yearIndex*3)%Math.max(4,Math.min(max/3,80));
  const small=2+n%8, k=2+(n*3)%9;
  let prompt,answer,explanation,wrong;
  switch(topicId){
   case 'counting':answer=(a%10)+1;prompt=`What number comes after ${answer-1}?`;explanation=`Counting forward one from ${answer-1} gives ${answer}.`;wrong=[answer+1,answer+2];break;
   case 'comparison':answer=a>b?'First':'Second';prompt=`Which group has more: first (${a}) or second (${b})?`;explanation=`${Math.max(a,b)} is greater than ${Math.min(a,b)}.`;wrong=[answer==='First'?'Second':'First','Equal'];break;
   case 'patterns':answer=a+2;prompt=`Continue the pattern: ${a-4}, ${a-2}, ${a}, ...`;explanation='The pattern increases by two each time.';wrong=[a+1,a+3];break;
   case 'shapes':{const shapes=[['Triangle',3],['Square',4],['Pentagon',5],['Hexagon',6]];const [name,sides]=choose(shapes,n);answer=sides;prompt=`How many sides does a ${name.toLowerCase()} have?`;explanation=`A ${name.toLowerCase()} has ${sides} straight sides.`;wrong=[sides+1,sides-1];break;}
   case 'place-value':answer=Math.floor(a/10)%10;prompt=`What is the tens digit in ${a}?`;explanation=`In ${a}, the tens digit is ${answer}.`;wrong=[answer+1,(answer+2)%10];break;
   case 'addition':answer=a+b;prompt=`${a} + ${b} = ?`;explanation=`Adding ${b} to ${a} gives ${answer}.`;wrong=[answer+1,answer+2];break;
   case 'subtraction':answer=a;prompt=`${a+b} − ${b} = ?`;explanation=`Subtract ${b} from ${a+b} to get ${a}.`;wrong=[a+1,a+2];break;
   case 'multiplication':answer=small*k;prompt=`${small} × ${k} = ?`;explanation=`${small} groups of ${k} make ${answer}.`;wrong=[answer+k,answer+small];break;
   case 'division':answer=small;prompt=`${small*k} ÷ ${k} = ?`;explanation=`${k} × ${small} = ${small*k}, so the quotient is ${small}.`;wrong=[small+1,small+2];break;
   case 'operations':answer=a+b*k;prompt=`${a} + ${b} × ${k} = ?`;explanation=`Multiply first: ${b} × ${k} = ${b*k}; then add ${a}.`;wrong=[(a+b)*k,answer+1];break;
   case 'integers':answer=-small+k;prompt=`−${small} + ${k} = ?`;explanation=`Start at −${small} and move ${k} places right on the number line.`;wrong=[answer+1,answer-1];break;
   case 'fractions':{const denominator=choose([2,3,4,5,8,10],n);answer=small;prompt=`What is 1/${denominator} of ${small*denominator}?`;explanation=`Divide ${small*denominator} by ${denominator} to get ${small}.`;wrong=[small+1,small+2];break;}
   case 'decimals':answer=fmt((small+k)/10);prompt=`${fmt(small/10)} + ${fmt(k/10)} = ?`;explanation=`Add the tenths: ${small} tenths + ${k} tenths = ${small+k} tenths.`;wrong=[fmt((small+k+1)/10),fmt((small+k+2)/10)];break;
   case 'percentages':{const percent=choose([10,20,25,50],n);answer=small;const whole=small*100/percent;prompt=`What is ${percent}% of ${whole}?`;explanation=`${percent}/100 × ${whole} = ${small}.`;wrong=[small+1,small+2];break;}
   case 'ratio':answer=small*k;prompt=`A recipe uses ${small} cups for one batch. How many cups for ${k} batches?`;explanation=`Multiply ${small} by ${k}: ${answer} cups.`;wrong=[answer+small,answer+k];break;
   case 'algebra':answer=a;prompt=`Solve x + ${b} = ${a+b}.`;explanation=`Subtract ${b} from both sides: x = ${a}.`;wrong=[a+1,a+2];break;
   case 'linear-equations':answer=small;prompt=`Solve ${k}x + ${b} = ${k*small+b}.`;explanation=`Subtract ${b}, then divide by ${k}: x = ${small}.`;wrong=[small+1,small+2];break;
   case 'sequences':answer=a+3*k;prompt=`Find the next term: ${a}, ${a+k}, ${a+2*k}, ...`;explanation=`Add ${k} each time to reach ${answer}.`;wrong=[answer+k,answer-k];break;
   case 'measurement':answer=small*100;prompt=`How many centimetres are in ${small} metres?`;explanation='One metre is 100 centimetres.';wrong=[small*10,small*1000];break;
   case 'time':answer=small*60;prompt=`How many minutes are in ${small} hours?`;explanation='Each hour contains 60 minutes.';wrong=[small*30,small*100];break;
   case 'money':answer=small*100;prompt=`How many pence are in £${small}?`;explanation='£1 equals 100 pence.';wrong=[small*10,small*1000];break;
   case 'geometry':answer=small*4;prompt=`What is the perimeter of a square with sides ${small} cm long?`;explanation=`Four equal sides: 4 × ${small} = ${answer} cm.`;wrong=[small*2,small*small];break;
   case 'statistics':answer=small+k;prompt=`Find the mean of ${small}, ${small+2*k}.`;explanation=`Add the values and divide by two: (${small} + ${small+2*k}) ÷ 2 = ${answer}.`;wrong=[answer+1,answer+k];break;
   case 'probability':{const red=small,blue=k;answer=red+'/'+(red+blue);prompt=`A bag has ${red} red and ${blue} blue counters. What is the probability of red?`;explanation=`There are ${red+blue} counters, ${red} of them red. Probability = ${answer}.`;wrong=[blue+'/'+(red+blue),red+'/'+(red+blue+1)];if(red===blue)wrong[0]='1/1';break;}
   case 'indices':answer=small*small;prompt=`Evaluate ${small}².`;explanation=`${small}² means ${small} × ${small} = ${answer}.`;wrong=[small*2,answer+small];break;
   case 'standard-form':answer=String(small*1000);prompt=`Write ${small} × 10³ as an ordinary number.`;explanation=`10³ = 1000, so ${small} × 1000 = ${answer}.`;wrong=[small*100,small*10000];break;
   case 'surds':answer=small;prompt=`Simplify √${small*small}.`;explanation=`${small} × ${small} = ${small*small}, so the principal square root is ${small}.`;wrong=[small*small,small+1];break;
   case 'quadratics':answer=small;prompt=`For x² − ${small+k}x + ${small*k} = 0, which is one solution?`;explanation=`Factorise as (x − ${small})(x − ${k}) = 0, so x = ${small} or x = ${k}.`;wrong=[-small,small+k];if(small===k)wrong=[-small,small+1];break;
   case 'pythagoras':{const scale=small;answer=5*scale;prompt=`A right triangle has shorter sides ${3*scale} cm and ${4*scale} cm. Find the hypotenuse.`;explanation=`c² = ${3*scale}² + ${4*scale}² = ${25*scale*scale}; c = ${answer} cm.`;wrong=[4*scale,7*scale];break;}
   case 'trigonometry':answer='0.5';prompt='In a right triangle, the opposite side is 3 cm and hypotenuse is 6 cm. What is sin θ?';explanation='sin θ = opposite ÷ hypotenuse = 3 ÷ 6 = 0.5.';wrong=['2','0.25'];break;
   default:throw Error('Unsupported topic.');
  }
  return {...makeQuestion(prompt,answer,explanation,wrong),topicId,yearId,questionId:`${yearId}-${topicId}-${seed}-${i}`};
 });
}
