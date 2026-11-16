// Supplementary Lower KS2 addition and subtraction lessons.
// Draft learning content: educator review and statutory objective mapping remain required.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const lowerKs2AdditionSubtractionLessons=[
 {id:'LKS2-AS-Y3-01',year:3,title:'Mental addition and subtraction',focus:'Add and subtract mentally using place value and known facts',explanation:'Partition numbers into hundreds, tens and ones. Add or subtract one part at a time, checking whether you need to exchange across a place-value boundary.',workedExamples:[{question:'Calculate 236 + 40.',answer:'276'},{question:'Calculate 582 − 200.',answer:'382'}],questions:[
 q('What is 347 + 30?',['367','377','647'],'377','Add 3 tens to the tens digit: 347 + 30 = 377.'),
 q('What is 625 − 40?',['585','595','615'],'585','Subtract 4 tens: 625 − 40 = 585.'),
 q('What is 198 + 5?',['193','203','213'],'203','198 + 2 = 200, then add 3 more.'),
 q('What is 460 − 70?',['390','430','530'],'390','Subtract 7 tens from 46 tens to get 39 tens.'),
 q('What is 325 + 100?',['335','425','525'],'425','Adding 100 increases the hundreds by one.')
 ]},
 {id:'LKS2-AS-Y3-02',year:3,title:'Column addition',focus:'Add numbers with up to three digits using a written method',explanation:'Write numbers in columns so hundreds, tens and ones are aligned. Add the ones first, then tens and hundreds. Exchange 10 ones for 1 ten or 10 tens for 1 hundred when needed.',workedExamples:[{question:'Calculate 243 + 125.',answer:'368'},{question:'Calculate 278 + 146.',answer:'424'}],questions:[
 q('What is 234 + 123?',['347','357','367'],'357','4 ones + 3 ones = 7; 3 tens + 2 tens = 5 tens; 2 hundreds + 1 hundred = 3 hundreds.'),
 q('What is 268 + 125?',['383','393','403'],'393','8 + 5 = 13, exchange 10 ones for a ten; the total is 393.'),
 q('What is 356 + 217?',['563','573','583'],'573','Add the columns, exchanging where needed: 573.'),
 q('What is 409 + 182?',['581','591','601'],'591','9 + 2 = 11; exchange one ten. The total is 591.'),
 q('A library has 245 fiction books and 138 non-fiction books. How many altogether?',['373','383','393'],'383','245 + 138 = 383 books.')
 ]},
 {id:'LKS2-AS-Y3-03',year:3,title:'Column subtraction',focus:'Subtract numbers with up to three digits using exchange',explanation:'Align hundreds, tens and ones. Subtract the ones, tens and hundreds. If there are not enough ones or tens, exchange one from the next column.',workedExamples:[{question:'Calculate 456 − 123.',answer:'333'},{question:'Calculate 402 − 178.',answer:'224'}],questions:[
 q('What is 478 − 235?',['233','243','253'],'243','478 − 200 = 278; −30 = 248; −5 = 243.'),
 q('What is 352 − 128?',['214','224','234'],'224','Exchange one ten for ten ones: 352 − 128 = 224.'),
 q('What is 600 − 245?',['345','355','365'],'355','Exchange across the hundreds and tens columns: 600 − 245 = 355.'),
 q('What is 731 − 306?',['415','425','435'],'425','731 − 300 = 431; subtract 6 to get 425.'),
 q('There are 425 seats. If 187 are occupied, how many are empty?',['228','238','248'],'238','425 − 187 = 238 empty seats.')
 ]},
 {id:'LKS2-AS-Y3-04',year:3,title:'Estimate and check answers',focus:'Estimate sums and differences and check using inverse operations',explanation:'Round numbers to make an estimate before calculating. Check addition with subtraction, and subtraction with addition. An estimate helps you decide whether an answer is sensible.',workedExamples:[{question:'Estimate 198 + 304 by rounding to the nearest 100.',answer:'About 500'},{question:'Check 425 − 175 = 250 using addition.',answer:'250 + 175 = 425'}],questions:[
 q('Estimate 287 + 412 to the nearest hundred.',['About 600','About 700','About 800'],'About 700','287 rounds to 300 and 412 rounds to 400; 300 + 400 = 700.'),
 q('Which calculation checks 560 − 230 = 330?',['330 + 230 = 560','560 + 230 = 330','560 − 330 = 230'],'330 + 230 = 560','Use addition to check a subtraction.'),
 q('Estimate 621 − 198 to the nearest hundred.',['About 300','About 400','About 500'],'About 400','621 rounds to 600 and 198 rounds to 200; 600 − 200 = 400.'),
 q('A pupil says 348 + 251 = 599. Is this sensible?',['Yes, because the estimate is about 600','No, it should be about 500','No, it should be about 700'],'Yes, because the estimate is about 600','350 + 250 is about 600, so 599 is sensible.'),
 q('Which addition checks 702 − 286 = 416?',['416 + 286 = 702','702 + 286 = 416','416 − 286 = 702'],'416 + 286 = 702','The difference plus the amount taken away should equal the starting number.')
 ]},
 {id:'LKS2-AS-Y4-01',year:4,title:'Mental strategies with larger numbers',focus:'Use place value and known facts to add and subtract mentally',explanation:'Partition thousands, hundreds, tens and ones. Choose an efficient strategy, such as adjusting to a friendly number and compensating afterwards.',workedExamples:[{question:'Calculate 2,300 + 500.',answer:'2,800'},{question:'Calculate 4,000 − 600.',answer:'3,400'}],questions:[
 q('What is 3,450 + 300?',['3,480','3,750','3,850'],'3,750','Add 3 hundreds to 3,450.'),
 q('What is 5,200 − 700?',['4,500','4,700','5,700'],'4,500','52 hundreds − 7 hundreds = 45 hundreds.'),
 q('What is 1,999 + 6?',['2,005','2,015','1,995'],'2,005','Add 1 to reach 2,000, then add the remaining 5.'),
 q('What is 6,030 − 40?',['5,990','6,000','6,070'],'5,990','6,030 − 30 = 6,000; subtract 10 more.'),
 q('What is 2,750 + 250?',['2,900','3,000','3,100'],'3,000','250 completes the next thousand.')
 ]},
 {id:'LKS2-AS-Y4-02',year:4,title:'Column addition with four digits',focus:'Add numbers with up to four digits using formal written methods',explanation:'Align thousands, hundreds, tens and ones. Add from the ones column and exchange 10 of a place-value unit for one unit in the next column when necessary.',workedExamples:[{question:'Calculate 2,345 + 1,212.',answer:'3,557'},{question:'Calculate 2,786 + 1,458.',answer:'4,244'}],questions:[
 q('What is 1,234 + 2,143?',['3,277','3,377','3,477'],'3,377','Add each aligned place-value column to get 3,377.'),
 q('What is 2,568 + 1,247?',['3,715','3,815','3,915'],'3,815','Exchange from ones and tens as needed; the total is 3,815.'),
 q('What is 3,409 + 2,186?',['5,495','5,595','5,695'],'5,595','3,409 + 2,186 = 5,595.'),
 q('What is 4,675 + 2,308?',['6,883','6,983','7,083'],'6,983','Add the columns, keeping place values aligned.'),
 q('A school raised £2,475 on Monday and £1,860 on Tuesday. How much did it raise?',['£4,235','£4,335','£4,435'],'£4,335','2,475 + 1,860 = 4,335.')
 ]},
 {id:'LKS2-AS-Y4-03',year:4,title:'Column subtraction with four digits',focus:'Subtract numbers with up to four digits using exchange',explanation:'Align the place-value columns. Exchange one thousand for ten hundreds, one hundred for ten tens, or one ten for ten ones when the top digit is too small to subtract.',workedExamples:[{question:'Calculate 4,568 − 1,234.',answer:'3,334'},{question:'Calculate 5,002 − 1,768.',answer:'3,234'}],questions:[
 q('What is 3,876 − 1,243?',['2,533','2,633','2,733'],'2,633','Subtract each place-value column: 3,876 − 1,243 = 2,633.'),
 q('What is 4,502 − 1,276?',['3,126','3,226','3,326'],'3,226','Exchange across the zero where needed; the result is 3,226.'),
 q('What is 6,000 − 2,485?',['3,415','3,515','3,615'],'3,515','Exchange across place values to calculate 6,000 − 2,485 = 3,515.'),
 q('What is 7,341 − 2,608?',['4,633','4,733','4,833'],'4,733','7,341 − 2,608 = 4,733.'),
 q('A stadium has 5,250 seats. If 3,875 are occupied, how many are empty?',['1,275','1,375','1,475'],'1,375','5,250 − 3,875 = 1,375.')
 ]},
 {id:'LKS2-AS-Y4-04',year:4,title:'Two-step problems and checking',focus:'Solve addition and subtraction problems and check using estimation and inverse operations',explanation:'Read a problem carefully, identify the steps and choose the correct operations. Estimate first, then calculate and check that the answer fits the question.',workedExamples:[{question:'A shop has 1,250 apples, sells 375 and receives 240 more. How many now?',answer:'1,115'},{question:'Check 3,400 − 1,275 = 2,125.',answer:'2,125 + 1,275 = 3,400'}],questions:[
 q('A school has 1,245 pupils. 138 join and 96 leave. How many pupils remain?',['1,277','1,287','1,297'],'1,287','1,245 + 138 = 1,383; 1,383 − 96 = 1,287.'),
 q('A charity needs £3,000. It raises £1,275 and then £985. How much more is needed?',['£640','£740','£840'],'£740','1,275 + 985 = 2,260; 3,000 − 2,260 = 740.'),
 q('A journey is 4,250 metres. A walker completes 1,875 metres, then 1,240 metres. How far remains?',['1,035 m','1,135 m','1,235 m'],'1,135 m','1,875 + 1,240 = 3,115; 4,250 − 3,115 = 1,135.'),
 q('Which is the best estimate for 2,987 + 1,012?',['About 3,000','About 4,000','About 5,000'],'About 4,000','Round to 3,000 + 1,000 = 4,000.'),
 q('A library has 6,200 books. It lends 1,450 and later receives 375. How many books does it have?',['5,025','5,125','5,225'],'5,125','6,200 − 1,450 = 4,750; 4,750 + 375 = 5,125.')
 ]}
];
export function getLowerKs2AdditionSubtractionLesson(id,year){
 if(!Number.isInteger(year)||![3,4].includes(year))throw new Error('Year must be 3 or 4.');
 const lesson=lowerKs2AdditionSubtractionLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
