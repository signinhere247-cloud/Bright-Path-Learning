// Key Stage 1 maths: introductory Year 1–2 practice.
const topics={
 'Counting and sequences':'Count forwards and backwards and identify number patterns.',
 'Place value':'Understand tens and ones in two-digit numbers.',
 'Addition':'Add numbers using counting on and partitioning.',
 'Subtraction':'Subtract numbers using counting back and number bonds.',
 'Multiplication':'Understand equal groups, twos, fives and tens.',
 'Division and sharing':'Share quantities into equal groups.',
 'Simple fractions':'Find halves, quarters and thirds of shapes or amounts.',
 'Money':'Recognise UK coins and solve simple money problems.',
 'Time and measures':'Read clocks and compare everyday measures.',
 'Shapes and position':'Identify 2D and 3D shapes, turns and position.',
 'Word problems':'Choose a calculation to solve everyday problems.'
};
const q=(prompt,answer,wrong1,wrong2,explanation)=>({prompt,answer:String(answer),options:[answer,wrong1,wrong2].map(String),explanation});
const rows={
 'Counting and sequences':i=>{const n=5+i*3;return q('What number comes after '+n+'?',n+1,n+2,n-1,'Count one more than '+n+'.');},
 'Place value':i=>{const tens=1+i%9,ones=i%10,n=tens*10+ones;return q('How many tens are in '+n+'?',tens,tens+1,tens-1,'The tens digit in '+n+' is '+tens+'.');},
 'Addition':i=>{const a=7+i*2,b=2+i%5;return q(a+' + '+b+' = ?',a+b,a+b+1,a+b-1,'Count on '+b+' from '+a+'.');},
 'Subtraction':i=>{const a=12+i*3,b=2+i%6;return q(a+' − '+b+' = ?',a-b,a-b+1,a-b-1,'Take '+b+' away from '+a+'.');},
 'Multiplication':i=>{const n=i+1,k=[2,5,10][i%3];return q(n+' groups of '+k+' = ?',n*k,n*k+k,n*k+1,'Add '+k+' a total of '+n+' times.');},
 'Division and sharing':i=>{const k=[2,5,10][i%3],n=i+2;return q('Share '+n*k+' equally between '+k+' children. How many each?',n,n+1,n+2,'Each child gets '+n+'.');},
 'Simple fractions':i=>{const denominator=[2,4,3][i%3],part=i+2;return q('What is 1/'+denominator+' of '+denominator*part+'?',part,part+1,part+2,'Divide '+denominator*part+' into '+denominator+' equal groups.');},
 'Money':i=>{const a=10+i*5,b=5+i%4*5;return q('A toy costs '+a+'p and a sticker costs '+b+'p. Total cost?',a+b+'p',a+b+5+'p',a+b-5+'p','Add '+a+'p and '+b+'p.');},
 'Time and measures':i=>{const hour=i%12+1;return q('A clock shows '+hour+':00. What hour is it?',hour+' o’clock',(hour%12+1)+' o’clock',((hour+9)%12+1)+' o’clock','The minute hand points to 12, so it is '+hour+' o’clock.');},
 'Shapes and position':i=>{const shapes=[['triangle','3 sides','4 sides','5 sides'],['square','4 equal sides','3 sides','5 sides'],['pentagon','5 sides','6 sides','3 sides'],['hexagon','6 sides','5 sides','4 sides'],['rectangle','4 sides','3 sides','5 sides'],['circle','0 straight sides','3 straight sides','4 straight sides'],['cube','6 square faces','4 faces','8 faces'],['cuboid','6 rectangular faces','3 faces','5 faces'],['sphere','one curved surface','4 flat faces','6 flat faces'],['cylinder','2 circular faces','3 triangular faces','4 square faces']];const [shape,answer,a,b]=shapes[i];return q('Which description fits a '+shape+'?',answer,a,b,'A '+shape+' has '+answer+'.');},
 'Word problems':i=>{const a=5+i*2,b=2+i%5;return q('There are '+a+' birds. '+b+' more arrive. How many birds now?',a+b,a+b+1,a+b-1,'Add the birds already there and the new arrivals.');}
};
export const ks1MathsTopics=Object.entries(topics).map(([name,desc])=>[name,desc]);
export function ks1MathsLesson(topic,age){
 if(!Number.isInteger(age)||age<5||age>7)throw Error('KS1 maths is for ages 5–7.');
 if(!rows[topic])throw Error('Unknown KS1 maths topic.');
 const questions=Array.from({length:10},(_,i)=>rows[topic](i));
 if(new Set(questions.map(x=>x.prompt)).size!==10||questions.some(x=>new Set(x.options).size!==3||!x.options.includes(x.answer)))throw Error('KS1 maths validation failed.');
 return {intro:topics[topic],questions};
}
