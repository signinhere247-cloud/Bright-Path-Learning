// EYFS mathematics: 8 guided lessons, 10 varied practice questions per lesson.
const N=10;
const options=(answer,a,b)=>[String(answer),String(a),String(b)];
const question=(prompt,answer,a,b,explanation)=>({prompt,answer:String(answer),options:options(answer,a,b),explanation});
const objects=['stars','apples','blocks','shells','buttons','leaves','beads','books','cups','toys'];
const shapes=[['circle','no corners'],['triangle','three straight sides'],['square','four equal sides'],['rectangle','four sides with opposite sides equal'],['pentagon','five sides'],['hexagon','six sides'],['oval','a stretched circle'],['cube','six square faces'],['sphere','a round ball shape'],['cylinder','two circular ends']];
const patterns=[
 ['red, blue, red, blue','red','green','yellow'],
 ['clap, tap, clap, tap','clap','jump','spin'],
 ['big, small, big, small','big','tiny','medium'],
 ['sun, moon, sun, moon','sun','star','cloud'],
 ['1, 2, 1, 2','1','3','4'],
 ['circle, square, circle, square','circle','triangle','rectangle'],
 ['up, down, up, down','up','left','right'],
 ['A, B, A, B','A','C','D'],
 ['happy, sad, happy, sad','happy','angry','sleepy'],
 ['3, 4, 3, 4','3','5','6']
];
const lessons={
 'Count to ten':{intro:'Point to each object once while counting aloud. The last number tells us how many.',make:()=>objects.map((name,i)=>{const n=i+1;return question('How many '+name+'? Count '+Array(n).fill('●').join(' '),n,n+1,n===1?3:n-1,'There are '+n+' '+name+'. Count each dot once.');})},
 'Number order':{intro:'Numbers follow an order. Practise saying numbers from one to twenty.',make:()=>Array.from({length:N},(_,i)=>{const n=i+1;return question('What number comes after '+n+'?',n+1,n+2,n,'The next number after '+n+' is '+(n+1)+'.');})},
 'More and fewer':{intro:'Compare two groups. More means a bigger amount; fewer means a smaller amount.',make:()=>Array.from({length:N},(_,i)=>{const a=i+2,b=i+1;return question('Group A has '+a+' blocks and Group B has '+b+'. Which group has more?','A','B','Same','Group A has '+a+' and Group B has '+b+'. '+a+' is greater than '+b+'.');})},
 'Adding together':{intro:'Addition joins groups. Count the first group, then count on the second group.',make:()=>Array.from({length:N},(_,i)=>{const a=1+i%5,b=1+Math.floor(i/2)%4;return question(a+' + '+b+' = ?',a+b,a+b+1,a+b-1,'Start at '+a+' and count on '+b+' to get '+(a+b)+'.');})},
 'Taking away':{intro:'Subtraction means taking some away. Count what is left.',make:()=>Array.from({length:N},(_,i)=>{const a=i+3,b=1+i%3;return question(a+' − '+b+' = ?',a-b,a-b+1,a-b+2,'Start with '+a+', take away '+b+', and '+(a-b)+' remain.');})},
 'Shapes around us':{intro:'Look at shapes, their sides, corners and faces. Some shapes are flat and some are solid.',make:()=>shapes.map(([name,clue],i)=>question('Which shape has '+clue+'?',name,shapes[(i+3)%10][0],shapes[(i+6)%10][0],'A '+name+' has '+clue+'.'))},
 'Repeating patterns':{intro:'Find the part that repeats. Say the pattern aloud and predict what comes next.',make:()=>patterns.map(([sequence,answer,a,b])=>question('What comes next? '+sequence+', ...',answer,a,b,'The pattern repeats, so '+answer+' comes next.'))},
 'Size and measures':{intro:'Compare length, height, weight and capacity using everyday objects.',make:()=>[
 question('Which is longer: a 10 cm ribbon or a 5 cm ribbon?','10 cm ribbon','5 cm ribbon','Same length','10 centimetres is longer than 5 centimetres.'),
 question('Which is heavier: 2 kg or 1 kg?','2 kg','1 kg','Same weight','Two kilograms is heavier than one kilogram.'),
 question('Which cup holds more: 500 ml or 200 ml?','500 ml','200 ml','Same amount','500 millilitres is more than 200 millilitres.'),
 question('Which tower is taller: 8 blocks or 4 equal blocks?','8 blocks','4 blocks','Same height','Eight equal blocks make a taller tower.'),
 question('Which pencil is shorter: 6 cm or 12 cm?','6 cm','12 cm','Same length','Six centimetres is shorter than twelve.'),
 question('Which bottle holds less: 1 litre or 2 litres?','1 litre','2 litres','Same amount','One litre is less than two litres.'),
 question('Which is lighter: 100 g or 500 g?','100 g','500 g','Same weight','100 grams is lighter than 500 grams.'),
 question('Which rope is longer: 3 m or 1 m?','3 m','1 m','Same length','Three metres is longer than one metre.'),
 question('Which box is lower: 2 blocks high or 5 equal blocks high?','2 blocks','5 blocks','Same height','Two equal blocks are lower than five.'),
 question('Which jug holds more: 750 ml or 250 ml?','750 ml','250 ml','Same amount','750 millilitres is more than 250 millilitres.')
 ]}
};
export const earlyMathsTopics=Object.entries(lessons).map(([name,{intro}])=>[name,intro]);
export function earlyMathsLesson(topic,age){
 if(!Number.isInteger(age)||age<3||age>5)throw Error('Early maths is designed for ages 3–5.');
 const lesson=lessons[topic];if(!lesson)throw Error('Unknown early maths topic.');
 const questions=lesson.make();
 if(questions.length!==10||new Set(questions.map(q=>q.prompt)).size!==10||questions.some(q=>new Set(q.options).size!==3||!q.options.includes(q.answer)))throw Error('Early maths content validation failed.');
 return {intro:lesson.intro,questions};
}
