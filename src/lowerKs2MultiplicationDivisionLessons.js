// Supplementary Lower KS2 multiplication and division lessons.
// Draft content: educator review and statutory objective mapping remain required.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const lowerKs2MultiplicationDivisionLessons=[
 {id:'LKS2-MD-Y3-01',year:3,title:'Recall the 3, 4 and 8 times tables',focus:'Recall and use multiplication and division facts for the 3, 4 and 8 tables',explanation:'Multiplication is equal groups. Division shares or groups equally. For Year 3, practise the 3, 4 and 8 times tables. Notice that the 4 times table is double the 2 times table and the 8 times table is double the 4 times table.',workedExamples:[{question:'What is 7 × 4?',answer:'28'},{question:'What is 32 ÷ 8?',answer:'4'}],questions:[
 q('What is 8 × 6?',['42','48','56'],'48','Eight groups of six make 48.'),
 q('What is 3 × 9?',['18','27','36'],'27','Three groups of nine make 27.'),
 q('What is 32 ÷ 4?',['6','8','9'],'8','32 shared into groups of 4 makes 8 groups.'),
 q('Which multiplication equals 24?',['3 × 8','4 × 8','3 × 9'],'3 × 8','3 multiplied by 8 equals 24.'),
 q('If 8 × 5 = 40, what is 40 ÷ 8?',['4','5','8'],'5','Division reverses multiplication: 40 ÷ 8 = 5.')
 ]},
 {id:'LKS2-MD-Y3-02',year:3,title:'Multiply and divide using known facts',focus:'Write and calculate multiplication and division statements using known tables',explanation:'Use a multiplication fact to work out a related division fact. A fact family links two multiplication and two division statements, for example 6 × 4 = 24, 4 × 6 = 24, 24 ÷ 6 = 4 and 24 ÷ 4 = 6.',workedExamples:[{question:'Complete: 7 × 3 = 21, so 21 ÷ 3 = ?',answer:'7'},{question:'Write a division fact linked to 8 × 4 = 32.',answer:'32 ÷ 8 = 4'}],questions:[
 q('If 4 × 7 = 28, what is 28 ÷ 7?',['3','4','7'],'4','Use the inverse multiplication fact.'),
 q('Which statement belongs to the 6 × 3 = 18 fact family?',['18 ÷ 6 = 3','18 ÷ 6 = 6','18 × 3 = 6'],'18 ÷ 6 = 3','Division reverses multiplication.'),
 q('What is 24 ÷ 3?',['6','7','8'],'8','Three groups of eight make 24.'),
 q('There are 36 counters shared equally between 4 children. How many does each child get?',['8','9','10'],'9','36 ÷ 4 = 9.'),
 q('Which multiplication checks 40 ÷ 8 = 5?',['5 × 8 = 40','5 × 5 = 40','8 × 8 = 40'],'5 × 8 = 40','Multiply the quotient by the divisor to check.')
 ]},
 {id:'LKS2-MD-Y3-03',year:3,title:'Multiply a two-digit number by a one-digit number',focus:'Calculate two-digit by one-digit multiplication using partitioning and written methods',explanation:'Partition the two-digit number into tens and ones. Multiply each part, then add the results. For 23 × 3, calculate 20 × 3 and 3 × 3, then add 60 + 9.',workedExamples:[{question:'Calculate 12 × 4.',answer:'48'},{question:'Calculate 23 × 3.',answer:'69'}],questions:[
 q('What is 14 × 3?',['32','42','52'],'42','10 × 3 = 30 and 4 × 3 = 12; total 42.'),
 q('What is 21 × 4?',['74','84','94'],'84','20 × 4 = 80 and 1 × 4 = 4.'),
 q('What is 32 × 3?',['86','96','106'],'96','30 × 3 = 90 and 2 × 3 = 6.'),
 q('What is 16 × 5?',['70','80','90'],'80','10 × 5 = 50 and 6 × 5 = 30.'),
 q('There are 4 bags with 23 marbles in each. How many marbles are there?',['82','92','102'],'92','23 × 4 = 92 marbles.')
 ]},
 {id:'LKS2-MD-Y3-04',year:3,title:'Solve multiplication and division problems',focus:'Solve problems involving multiplication, division, scaling and correspondence',explanation:'Look for equal groups, repeated amounts or a scaling relationship. Decide whether to multiply or divide, then check that your answer fits the situation.',workedExamples:[{question:'A recipe uses 3 apples. How many apples are needed for 4 batches?',answer:'12'},{question:'24 pencils are packed into boxes of 6. How many boxes are needed?',answer:'4'}],questions:[
 q('A ticket costs £4. What is the cost of 6 tickets?',['£20','£24','£28'],'£24','6 × £4 = £24.'),
 q('A ribbon is 8 cm long. What is the total length of 5 ribbons?',['35 cm','40 cm','45 cm'],'40 cm','5 × 8 = 40 cm.'),
 q('Thirty-six biscuits are shared equally among 8 plates. How many biscuits go on each plate?',['4','4 remainder 4','5'],'4 remainder 4','8 × 4 = 32, with 4 biscuits left.'),
 q('A pack has 4 red and 3 blue pencils. How many pencils are in 5 identical packs?',['30','35','40'],'35','Each pack has 7 pencils; 7 × 5 = 35.'),
 q('A 6 cm strip is made 4 times as long. How long is it?',['18 cm','24 cm','30 cm'],'24 cm','6 × 4 = 24 cm.')
 ]},
 {id:'LKS2-MD-Y4-01',year:4,title:'Recall all multiplication tables to 12 × 12',focus:'Recall multiplication and division facts for all tables up to 12 × 12',explanation:'Build fluency with multiplication facts up to 12 × 12 and use them to solve related division facts. Look for links between known facts to work out less familiar ones.',workedExamples:[{question:'What is 12 × 8?',answer:'96'},{question:'What is 108 ÷ 9?',answer:'12'}],questions:[
 q('What is 7 × 8?',['54','56','64'],'56','Seven groups of eight make 56.'),
 q('What is 9 × 12?',['98','108','118'],'108','9 × 10 = 90 and 9 × 2 = 18; total 108.'),
 q('What is 144 ÷ 12?',['10','11','12'],'12','12 × 12 = 144.'),
 q('What is 11 × 6?',['56','66','76'],'66','Eleven groups of six make 66.'),
 q('Which is equal to 84?',['7 × 12','7 × 11','8 × 11'],'7 × 12','7 multiplied by 12 equals 84.')
 ]},
 {id:'LKS2-MD-Y4-02',year:4,title:'Multiply larger numbers by one digit',focus:'Use written methods to multiply two-digit and three-digit numbers by one digit',explanation:'Partition the larger number or use a formal written method. Multiply each place-value column by the one-digit number, exchanging when a product is 10 or more.',workedExamples:[{question:'Calculate 34 × 3.',answer:'102'},{question:'Calculate 123 × 4.',answer:'492'}],questions:[
 q('What is 26 × 3?',['68','78','88'],'78','20 × 3 = 60 and 6 × 3 = 18; total 78.'),
 q('What is 42 × 5?',['200','210','220'],'210','40 × 5 = 200 and 2 × 5 = 10.'),
 q('What is 112 × 4?',['428','448','468'],'448','100 × 4 + 12 × 4 = 400 + 48.'),
 q('What is 231 × 3?',['683','693','703'],'693','200 × 3 + 30 × 3 + 1 × 3 = 693.'),
 q('There are 124 seats in each row. How many seats are in 4 rows?',['486','496','506'],'496','124 × 4 = 496 seats.')
 ]},
 {id:'LKS2-MD-Y4-03',year:4,title:'Divide larger numbers and interpret remainders',focus:'Divide up to three-digit numbers by one digit, including remainders',explanation:'Use known multiplication facts, grouping or a written method to divide. A remainder is what is left after making as many complete groups as possible. Interpret it in the context: it may be left over, or another group may be needed.',workedExamples:[{question:'Calculate 96 ÷ 4.',answer:'24'},{question:'Calculate 98 ÷ 6.',answer:'16 remainder 2'}],questions:[
 q('What is 84 ÷ 7?',['11','12','13'],'12','7 × 12 = 84.'),
 q('What is 156 ÷ 3?',['42','52','62'],'52','150 ÷ 3 = 50 and 6 ÷ 3 = 2.'),
 q('What is 95 ÷ 4?',['23 remainder 3','24 remainder 1','22 remainder 3'],'23 remainder 3','4 × 23 = 92, leaving 3.'),
 q('How many full boxes of 8 can be filled with 67 pencils?',['7','8','9'],'8','8 × 8 = 64, so 8 full boxes can be filled.'),
 q('A coach carries 52 children in groups of 6. How many coaches are needed if each coach carries at most 6?',['8','9','10'],'9','8 coaches carry 48; one more coach is needed for the remaining 4 children.')
 ]},
 {id:'LKS2-MD-Y4-04',year:4,title:'Solve multiplication and division problems',focus:'Solve problems using multiplication and division, including efficient strategies',explanation:'Identify the quantities and relationship in the problem. Choose multiplication or division, show your method and interpret any remainder in context. Check by using the inverse operation.',workedExamples:[{question:'Seven packs contain 24 cards each. How many cards are there?',answer:'168'},{question:'168 cards are shared equally among 7 children. How many each?',answer:'24'}],questions:[
 q('A hall has 18 rows with 12 chairs in each row. How many chairs are there?',['206','216','226'],'216','18 × 12 = 216 chairs.'),
 q('A farmer packs 144 eggs into boxes of 12. How many boxes are needed?',['10','11','12'],'12','144 ÷ 12 = 12 boxes.'),
 q('A school buys 6 packs of 35 pencils. How many pencils is that?',['200','210','220'],'210','35 × 6 = 210 pencils.'),
 q('A 125 cm ribbon is cut into pieces of 8 cm. How many full pieces can be cut and how much is left?',['15 remainder 5 cm','16 remainder 3 cm','14 remainder 7 cm'],'15 remainder 5 cm','8 × 15 = 120; 5 cm remains.'),
 q('A theatre has 9 sections with 108 seats in each. How many seats are there altogether?',['872','972','1,072'],'972','108 × 9 = 972 seats.')
 ]}
];
export function getLowerKs2MultiplicationDivisionLesson(id,year){
 if(!Number.isInteger(year)||![3,4].includes(year))throw new Error('Year must be 3 or 4.');
 const lesson=lowerKs2MultiplicationDivisionLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
