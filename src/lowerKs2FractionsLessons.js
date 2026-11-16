// Supplementary Lower KS2 fractions lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const lowerKs2FractionsLessons=[
 {id:'LKS2-FR-Y3-01',year:3,title:'Understand unit and non-unit fractions',focus:'Recognise and use unit and non-unit fractions as numbers',explanation:'A fraction describes equal parts of a whole. The denominator tells how many equal parts make the whole; the numerator tells how many parts are being considered. A unit fraction has a numerator of 1.',workedExamples:[{question:'What fraction is one part out of 5 equal parts?',answer:'1/5'},{question:'How many quarters are in 3/4?',answer:'3 quarters'}],questions:[
 q('What does the denominator tell you?',['How many equal parts make the whole','How many parts are shaded','The size of the whole number'],'How many equal parts make the whole','The denominator is the bottom number and tells how many equal parts make one whole.'),
 q('Which is a unit fraction?',['2/5','1/7','3/4'],'1/7','A unit fraction has 1 as its numerator.'),
 q('A shape is split into 8 equal parts and 3 are shaded. What fraction is shaded?',['3/8','8/3','5/8'],'3/8','Three of the eight equal parts are shaded.'),
 q('How many sixths make one whole?',['5','6','7'],'6','Six equal sixths make one whole.'),
 q('Which fraction is greater?',['1/4','3/4','They are equal'],'3/4','Three quarters is more than one quarter when the parts are the same size.')
 ]},
 {id:'LKS2-FR-Y3-02',year:3,title:'Count in tenths',focus:'Count up and down in tenths and understand tenths as fractions',explanation:'One tenth is one of ten equal parts. Ten tenths make one whole. You can count in tenths using fraction notation, such as 1/10, 2/10, 3/10.',workedExamples:[{question:'What comes after 4/10 when counting in tenths?',answer:'5/10'},{question:'How many tenths make 2 wholes?',answer:'20 tenths'}],questions:[
 q('What comes next? 2/10, 3/10, 4/10, …',['4/10','5/10','6/10'],'5/10','The numerator increases by one tenth each time.'),
 q('How many tenths make one whole?',['5','10','100'],'10','Ten tenths are equal to one whole.'),
 q('Which fraction means seven tenths?',['7/10','10/7','7/100'],'7/10','Seven tenths is written with 7 as the numerator and 10 as the denominator.'),
 q('What is 1/10 more than 8/10?',['7/10','9/10','10/10'],'9/10','Add one more tenth.'),
 q('What is 10/10 equal to?',['One whole','One half','Ten wholes'],'One whole','Ten tenths complete one whole.')
 ]},
 {id:'LKS2-FR-Y3-03',year:3,title:'Find fractions of amounts',focus:'Find unit and non-unit fractions of quantities',explanation:'To find one part, divide the amount by the denominator. To find more than one part, multiply that result by the numerator. For example, 1/4 of 20 is 20 ÷ 4 = 5; 3/4 is 5 × 3 = 15.',workedExamples:[{question:'Find 1/5 of 30.',answer:'6'},{question:'Find 3/4 of 20.',answer:'15'}],questions:[
 q('What is 1/3 of 18?',['5','6','9'],'6','18 ÷ 3 = 6.'),
 q('What is 1/4 of 28?',['6','7','8'],'7','28 ÷ 4 = 7.'),
 q('What is 2/5 of 20?',['4','8','10'],'8','20 ÷ 5 = 4; 4 × 2 = 8.'),
 q('There are 24 sweets. What is 3/4 of 24?',['16','18','20'],'18','24 ÷ 4 = 6; 6 × 3 = 18.'),
 q('What is 1/8 of 40?',['4','5','8'],'5','40 ÷ 8 = 5.')
 ]},
 {id:'LKS2-FR-Y3-04',year:3,title:'Compare, add and subtract fractions',focus:'Compare and calculate fractions with the same denominator',explanation:'When fractions have the same denominator, each part is the same size. Compare the numerators to compare the fractions. To add or subtract them, add or subtract the numerators and keep the denominator the same.',workedExamples:[{question:'Which is greater: 3/8 or 5/8?',answer:'5/8'},{question:'Calculate 2/7 + 3/7.',answer:'5/7'}],questions:[
 q('Which is greater?',['2/6','5/6','They are equal'],'5/6','The parts are the same size; five parts are more than two.'),
 q('What is 1/5 + 2/5?',['3/5','3/10','2/5'],'3/5','Add the numerators and keep the denominator.'),
 q('What is 6/8 − 2/8?',['4/8','4/16','8/8'],'4/8','Six eighths minus two eighths is four eighths.'),
 q('Put these in order, smallest first.',['1/9, 4/9, 7/9','7/9, 4/9, 1/9','4/9, 1/9, 7/9'],'1/9, 4/9, 7/9','With equal denominators, order by numerator.'),
 q('A cake is cut into 6 equal slices. Sam eats 2/6 and Lee eats 1/6. What fraction is eaten?',['2/6','3/6','3/12'],'3/6','2/6 + 1/6 = 3/6.')
 ]},
 {id:'LKS2-FR-Y4-01',year:4,title:'Recognise equivalent fractions',focus:'Recognise and show families of common equivalent fractions',explanation:'Equivalent fractions have different numerators and denominators but the same value. Multiply or divide the numerator and denominator by the same non-zero number to find an equivalent fraction.',workedExamples:[{question:'Complete: 1/2 = ?/4.',answer:'2/4'},{question:'Give an equivalent fraction to 3/4 with denominator 8.',answer:'6/8'}],questions:[
 q('Which fraction is equivalent to 1/2?',['2/3','2/4','3/4'],'2/4','Multiply the numerator and denominator of 1/2 by 2.'),
 q('Complete: 2/3 = ?/6.',['3','4','5'],'4','Multiply numerator and denominator by 2: 4/6.'),
 q('Which fraction is equivalent to 3/5?',['6/10','6/15','9/10'],'6/10','Multiply the numerator and denominator by 2.'),
 q('Which is equivalent to 4/8?',['1/2','1/4','3/4'],'1/2','Divide the numerator and denominator by 4.'),
 q('Complete: 5/10 = ?/2.',['1','2','5'],'1','5/10 is equivalent to 1/2.')
 ]},
 {id:'LKS2-FR-Y4-02',year:4,title:'Count in hundredths',focus:'Count in hundredths and recognise hundredths as fractions and decimals',explanation:'One hundredth is one of one hundred equal parts. One hundred hundredths make one whole. Hundredths can be written as fractions, such as 23/100, or decimals, such as 0.23.',workedExamples:[{question:'Write twenty-seven hundredths as a fraction.',answer:'27/100'},{question:'Write 45/100 as a decimal.',answer:'0.45'}],questions:[
 q('How many hundredths make one whole?',['10','50','100'],'100','One whole is equal to 100 hundredths.'),
 q('Which fraction means thirty-six hundredths?',['36/10','36/100','100/36'],'36/100','Hundredths have 100 as the denominator.'),
 q('What is 0.08 as a fraction?',['8/10','8/100','80/100'],'8/100','Eight hundredths is 8/100.'),
 q('What is 1/100 more than 34/100?',['33/100','35/100','44/100'],'35/100','Add one hundredth to the numerator.'),
 q('Which is equal to 0.5?',['5/100','50/100','5/10 only'],'50/100','Five tenths is equivalent to fifty hundredths.')
 ]},
 {id:'LKS2-FR-Y4-03',year:4,title:'Add and subtract fractions',focus:'Add and subtract fractions with the same denominator',explanation:'When fractions have the same denominator, add or subtract the numerators and keep the denominator. Check that your answer makes sense and notice when the result is one whole or more.',workedExamples:[{question:'Calculate 3/8 + 2/8.',answer:'5/8'},{question:'Calculate 7/10 − 4/10.',answer:'3/10'}],questions:[
 q('What is 2/9 + 4/9?',['6/9','6/18','8/9'],'6/9','Add the numerators and keep ninths.'),
 q('What is 8/12 − 3/12?',['5/12','5/24','11/12'],'5/12','Subtract the numerators and keep twelfths.'),
 q('What is 3/7 + 3/7?',['6/7','6/14','3/7'],'6/7','Three sevenths plus three sevenths is six sevenths.'),
 q('What is 9/10 − 2/10?',['7/10','7/20','11/10'],'7/10','Nine tenths minus two tenths is seven tenths.'),
 q('A jug is 2/8 full. Another 3/8 is poured in. What fraction is full now?',['5/8','5/16','6/8'],'5/8','2/8 + 3/8 = 5/8.')
 ]},
 {id:'LKS2-FR-Y4-04',year:4,title:'Find fractions of quantities and solve problems',focus:'Calculate fractions of quantities and use fractions in context',explanation:'To find a fraction of an amount, divide by the denominator and multiply by the numerator. Use this method in practical problems and check that the answer is a sensible part of the whole.',workedExamples:[{question:'Find 3/8 of 40.',answer:'15'},{question:'Find 2/5 of 35.',answer:'14'}],questions:[
 q('What is 3/4 of 32?',['20','24','28'],'24','32 ÷ 4 = 8; 8 × 3 = 24.'),
 q('What is 2/3 of 27?',['9','18','21'],'18','27 ÷ 3 = 9; 9 × 2 = 18.'),
 q('A class has 28 pupils. 3/7 of them walk to school. How many pupils walk?',['9','12','16'],'12','28 ÷ 7 = 4; 4 × 3 = 12.'),
 q('What is 5/6 of 42?',['30','35','36'],'35','42 ÷ 6 = 7; 7 × 5 = 35.'),
 q('A box holds 40 crayons. 3/5 are blue. How many are not blue?',['16','24','26'],'16','3/5 of 40 is 24 blue crayons; 40 − 24 = 16 are not blue.')
 ]}
];
export function getLowerKs2FractionsLesson(id,year){
 if(!Number.isInteger(year)||![3,4].includes(year))throw new Error('Year must be 3 or 4.');
 const lesson=lowerKs2FractionsLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
