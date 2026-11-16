// Supplementary Upper KS2 calculation lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const upperKs2CalculationLessons=[
 {id:'UKS2-CAL-Y5-01',year:5,title:'Add and subtract large numbers',focus:'Add and subtract whole numbers with more than four digits using formal written methods',explanation:'Line up digits in the correct place-value columns. Add from the ones column, exchanging when a total is ten or more. For subtraction, exchange from the next column when needed. Estimate first to check whether your answer is sensible.',workedExamples:[{question:'Calculate 34,586 + 27,945.',answer:'62,531'},{question:'Calculate 70,000 − 28,764.',answer:'41,236'}],questions:[
 q('What is 45,678 + 12,345?',['58,013','57,923','58,023'],'58,023','Add by place value: 45,678 + 12,345 = 58,023.'),
 q('What is 80,000 − 36,425?',['43,575','44,575','53,575'],'43,575','Subtracting 36,425 from 80,000 gives 43,575.'),
 q('A library has 18,750 books and buys 6,825 more. How many books does it have now?',['25,575','24,575','26,575'],'25,575','18,750 + 6,825 = 25,575.'),
 q('What is 63,204 − 18,709?',['44,495','45,495','44,595'],'44,495','63,204 − 18,709 = 44,495.'),
 q('Which estimate is closest to 29,850 + 41,120?',['60,000','70,000','80,000'],'70,000','Round to 30,000 + 40,000 = 70,000.')
 ]},
 {id:'UKS2-CAL-Y5-02',year:5,title:'Multiply up to four digits by one digit',focus:'Multiply numbers up to four digits by a one-digit number using a formal written method',explanation:'Use short multiplication for larger numbers. Multiply each digit by the one-digit number, working from right to left. Record any exchange above the next column and add it in at the next step.',workedExamples:[{question:'Calculate 2,346 × 3.',answer:'7,038'},{question:'Calculate 4,125 × 6.',answer:'24,750'}],questions:[
 q('What is 1,234 × 4?',['4,836','4,936','5,036'],'4,936','1,234 multiplied by 4 equals 4,936.'),
 q('What is 2,105 × 3?',['6,215','6,315','6,415'],'6,315','2,105 × 3 = 6,315.'),
 q('A box holds 248 cards. How many cards are in 5 boxes?',['1,140','1,240','1,340'],'1,240','248 × 5 = 1,240 cards.'),
 q('What is 3,409 × 2?',['6,808','6,818','6,908'],'6,818','3,409 doubled is 6,818.'),
 q('Which is the product of 1,506 and 6?',['8,036','9,036','9,136'],'9,036','1,506 × 6 = 9,036.')
 ]},
 {id:'UKS2-CAL-Y5-03',year:5,title:'Divide up to four digits by one digit',focus:'Divide numbers up to four digits by a one-digit number using short division and interpret remainders',explanation:'Use short division from the leftmost digit. If a number does not divide exactly, exchange the remainder into the next place-value column. A remainder is what is left after making as many equal groups as possible.',workedExamples:[{question:'Calculate 936 ÷ 4.',answer:'234'},{question:'Calculate 875 ÷ 6.',answer:'145 remainder 5'}],questions:[
 q('What is 864 ÷ 4?',['206','216','226'],'216','864 divided by 4 is 216.'),
 q('What is 735 ÷ 5?',['137','147','157'],'147','735 ÷ 5 = 147.'),
 q('What is 947 ÷ 3?',['315 remainder 2','316 remainder 1','314 remainder 5'],'315 remainder 2','3 × 315 = 945, leaving a remainder of 2.'),
 q('A teacher shares 1,248 pencils equally among 6 classes. How many pencils does each class get?',['208','218','228'],'208','1,248 ÷ 6 = 208.'),
 q('What is 1,005 ÷ 4?',['250 remainder 1','251 remainder 1','251 remainder 2'],'251 remainder 1','4 × 251 = 1,004, leaving 1.')
 ]},
 {id:'UKS2-CAL-Y5-04',year:5,title:'Explore factors, multiples and prime numbers',focus:'Identify multiples, factors, common factors and prime numbers',explanation:'A multiple is the result of multiplying a number by a whole number. A factor divides exactly into another number. A prime number has exactly two factors: 1 and itself. The number 1 is not prime.',workedExamples:[{question:'List the factors of 12.',answer:'1, 2, 3, 4, 6 and 12'},{question:'Is 17 a prime number?',answer:'Yes'}],questions:[
 q('Which number is a factor of 24?',['5','6','7'],'6','24 ÷ 6 = 4, so 6 is a factor of 24.'),
 q('Which is a multiple of 9?',['26','36',' forty'],'36','9 × 4 = 36.'),
 q('Which number is prime?',['21','27','29'],'29','29 has exactly two factors: 1 and 29.'),
 q('What is the lowest common multiple of 4 and 6?',['8','12','24'],'12','12 is the smallest positive number in both times tables.'),
 q('Which list contains all the factors of 10?',['1, 2, 5, 10','1, 2, 10','2, 5, 10'],'1, 2, 5, 10','These are the whole numbers that divide exactly into 10.')
 ]},
 {id:'UKS2-CAL-Y5-05',year:5,title:'Solve multi-step calculation problems',focus:'Solve addition, subtraction, multiplication and division multi-step problems in context',explanation:'Read the whole problem and identify what you need to find. Decide which operation or sequence of operations is needed. Estimate first, show each step clearly and check that the final answer matches the question and uses the correct units.',workedExamples:[{question:'A coach carries 48 pupils. How many pupils can 6 full coaches carry?',answer:'288 pupils'},{question:'A shop has 950 pencils and sells 275 in the morning and 318 in the afternoon. How many remain?',answer:'357 pencils'}],questions:[
 q('A school buys 8 packs of 125 books. How many books does it buy?',['900','1,000','1,100'],'1,000','8 × 125 = 1,000 books.'),
 q('A hall has 1,200 seats. 875 are occupied. How many are empty?',['225','325','425'],'325','1,200 − 875 = 325 seats.'),
 q('Four teams each score 235 points. What is their combined score?',['840','940','1,040'],'940','4 × 235 = 940 points.'),
 q('A baker packs 864 biscuits into boxes of 12. How many full boxes can be filled?',['62','72','82'],'72','864 ÷ 12 = 72 boxes.'),
 q('A trip costs £18 per pupil for 35 pupils. What is the total cost?',['£530','£630','£730'],'£630','18 × 35 = 630 pounds.')
 ]},
 {id:'UKS2-CAL-Y6-01',year:6,title:'Use formal addition and subtraction methods',focus:'Solve addition and subtraction multi-step problems using formal written methods',explanation:'Use column addition and subtraction with accurate place-value alignment. In multi-step problems, decide the order of calculations and keep intermediate answers. Check using the inverse operation or an estimate.',workedExamples:[{question:'Calculate 458,796 + 276,845.',answer:'735,641'},{question:'Calculate 900,000 − 468,275.',answer:'431,725'}],questions:[
 q('What is 367,845 + 258,976?',['626,721','625,821','626,821'],'626,821','367,845 + 258,976 = 626,821.'),
 q('What is 700,000 − 286,459?',['413,541','414,541','423,541'],'413,541','700,000 − 286,459 = 413,541.'),
 q('A charity raises £128,650 and then £97,875. How much has it raised altogether?',['£216,525','£226,525','£236,525'],'£226,525','128,650 + 97,875 = 226,525.'),
 q('What is 1,000,000 − 625,008?',['374,992','375,092','384,992'],'374,992','1,000,000 − 625,008 = 374,992.'),
 q('A stadium has 54,320 seats. 38,765 are sold. How many remain?',['15,455','15,555','16,555'],'15,555','54,320 − 38,765 = 15,555.')
 ]},
 {id:'UKS2-CAL-Y6-02',year:6,title:'Multiply up to four digits by two digits',focus:'Multiply multi-digit numbers up to four digits by a two-digit whole number using a formal written method',explanation:'Use long multiplication. Multiply by the ones digit first, then multiply by the tens digit and place the second partial product in the tens column. Add the partial products to find the total. Estimate to check your result.',workedExamples:[{question:'Calculate 234 × 12.',answer:'2,808'},{question:'Calculate 1,205 × 24.',answer:'28,920'}],questions:[
 q('What is 125 × 24?',['2,800','3,000','3,200'],'3,000','125 × 24 = 125 × (20 + 4) = 2,500 + 500 = 3,000.'),
 q('What is 306 × 15?',['4,490','4,590','4,690'],'4,590','306 × 15 = 306 × 10 + 306 × 5 = 3,060 + 1,530 = 4,590.'),
 q('A theatre has 28 rows with 36 seats in each row. How many seats are there?',['988','1,008','1,028'],'1,008','28 × 36 = 1,008 seats.'),
 q('What is 2,104 × 13?',['27,352','27,452','28,352'],'27,352','2,104 × 13 = 21,040 + 6,312 = 27,352.'),
 q('Which is the product of 415 and 22?',['8,930','9,130','9,230'],'9,130','415 × 22 = 8,300 + 830 = 9,130.')
 ]},
 {id:'UKS2-CAL-Y6-03',year:6,title:'Divide up to four digits by two digits',focus:'Divide numbers up to four digits by a two-digit whole number using formal written methods, including long division',explanation:'Use short or long division depending on the numbers. Estimate how many times the divisor fits, multiply to check, subtract and bring down the next digit. Interpret any remainder in the context: it may stay as a remainder, become a fraction or require rounding.',workedExamples:[{question:'Calculate 936 ÷ 12.',answer:'78'},{question:'Calculate 1,275 ÷ 15.',answer:'85'}],questions:[
 q('What is 864 ÷ 24?',['26','36','46'],'36','24 × 36 = 864, so the quotient is 36.'),
 q('What is 1,092 ÷ 14?',['68','78','88'],'78','14 × 78 = 1,092.'),
 q('What is 1,250 ÷ 25?',['40','50','60'],'50','25 × 50 = 1,250.'),
 q('A coach has 864 passengers to allocate equally across 18 trips. How many passengers per trip?',['38','48','58'],'48','864 ÷ 18 = 48.'),
 q('What is 1,000 ÷ 16?',['52.5','62.5','72.5'],'62.5','16 × 62.5 = 1,000.')
 ]},
 {id:'UKS2-CAL-Y6-04',year:6,title:'Use order of operations and common factors',focus:'Use knowledge of the order of operations and identify common factors, common multiples and prime numbers',explanation:'Use the order of operations: brackets first, then multiplication and division from left to right, then addition and subtraction from left to right. Common factors divide exactly into two or more numbers; common multiples appear in more than one times table.',workedExamples:[{question:'Calculate 6 + 4 × 3.',answer:'18'},{question:'Find the highest common factor of 12 and 18.',answer:'6'}],questions:[
 q('Calculate 5 + 3 × 4.',['32','17','20'],'17','Multiply first: 3 × 4 = 12, then add 5 to get 17.'),
 q('Calculate (5 + 3) × 4.',['17','32','35'],'32','Brackets first: 5 + 3 = 8; then 8 × 4 = 32.'),
 q('Which is a common factor of 18 and 30?',['4','6','8'],'6','6 divides exactly into both 18 and 30.'),
 q('What is the lowest common multiple of 5 and 8?',['13','30','40'],'40','40 is the smallest positive multiple shared by 5 and 8.'),
 q('Which number is prime?',['39','41','51'],'41','41 has exactly two factors: 1 and 41.')
 ]},
 {id:'UKS2-CAL-Y6-05',year:6,title:'Solve complex problems with the four operations',focus:'Solve addition, subtraction, multiplication and division multi-step problems in context, deciding which operations and methods to use',explanation:'Complex problems may require more than one operation. Identify the information you need, decide the order of steps and record calculations clearly. Use estimation and inverse operations to check. Consider how remainders and units should be interpreted in the situation.',workedExamples:[{question:'A school orders 24 boxes of 36 exercise books and shares them equally among 8 classes. How many books does each class receive?',answer:'108 books'},{question:'A charity has £5,000. It spends £1,275 on supplies and £865 on transport. How much remains?',answer:'£2,860'}],questions:[
 q('A shop receives 32 crates of 24 bottles. It sells 275 bottles. How many remain?',['493','503','513'],'493','32 × 24 = 768; 768 − 275 = 493 bottles.'),
 q('A school buys 15 packs of 48 pens and shares them equally among 12 classes. How many pens does each class receive?',['50','60','70'],'60','15 × 48 = 720; 720 ÷ 12 = 60 pens.'),
 q('A coach ticket costs £27. What is the cost for 36 tickets?',['£872','£972','£1,072'],'£972','27 × 36 = 972 pounds.'),
 q('A warehouse has 2,400 items. It packs them into boxes of 32. How many full boxes can it fill?',['65','70','75'],'75','2,400 ÷ 32 = 75 boxes.'),
 q('A fundraiser collects £1,850 on Friday and twice as much on Saturday. What is the total over both days?',['£3,700','£5,550','£5,750'],'£5,550','Saturday is 2 × £1,850 = £3,700; total is £1,850 + £3,700 = £5,550.')
 ]}
];
export function getUpperKs2CalculationLesson(id,year){
 if(!Number.isInteger(year)||![5,6].includes(year))throw new Error('Year must be 5 or 6.');
 const lesson=upperKs2CalculationLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
