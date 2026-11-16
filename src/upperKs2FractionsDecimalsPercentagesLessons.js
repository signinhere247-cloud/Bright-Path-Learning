// Supplementary Upper KS2 fractions, decimals and percentages lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const upperKs2FractionsDecimalsPercentagesLessons=[
 {id:'UKS2-FDP-Y5-01',year:5,title:'Recognise and find equivalent fractions',focus:'Identify, name and write equivalent fractions of a given fraction, represented visually or numerically',explanation:'Equivalent fractions have the same value even when their numerators and denominators are different. Multiply or divide both parts of a fraction by the same non-zero number to create an equivalent fraction. Visual fraction bars and number lines can help you see why the values match.',workedExamples:[{question:'Write an equivalent fraction to 2/3 with denominator 12.',answer:'8/12'},{question:'Simplify 6/10.',answer:'3/5'}],questions:[
 q('Which fraction is equivalent to 3/4?',['6/8','4/6','5/8'],'6/8','Multiply the numerator and denominator of 3/4 by 2 to get 6/8.'),
 q('Which fraction is equivalent to 2/5?',['4/10','3/10','2/10'],'4/10','2/5 multiplied by 2/2 is 4/10.'),
 q('Simplify 8/12.',['2/3','3/4','4/5'],'2/3','Divide the numerator and denominator by 4: 8/12 = 2/3.'),
 q('Complete the equivalent fraction: 3/7 = ?/21.',['6','9','12'],'9','Multiply the denominator by 3, so multiply the numerator by 3: 3 × 3 = 9.'),
 q('Which fraction is not equivalent to 1/2?',['2/4','5/10','3/5'],'3/5','3/5 is 0.6, not one half.')
 ]},
 {id:'UKS2-FDP-Y5-02',year:5,title:'Compare and order fractions',focus:'Compare and order fractions whose denominators are multiples of the same number',explanation:'To compare fractions, make their denominators the same when possible. Convert each fraction into an equivalent fraction with a common denominator, then compare the numerators. A fraction with a larger numerator is greater when the denominators match.',workedExamples:[{question:'Which is greater, 3/4 or 5/8?',answer:'3/4'},{question:'Order 1/2, 3/4 and 1/4 from smallest to largest.',answer:'1/4, 1/2, 3/4'}],questions:[
 q('Which fraction is greater: 2/3 or 3/6?',['2/3','3/6','They are equal'],'2/3','3/6 is 1/2; 2/3 is greater than 1/2.'),
 q('Which is the smallest fraction?',['3/4','2/4','1/4'],'1/4','All have denominator 4, and 1 is the smallest numerator.'),
 q('Which is greater: 5/6 or 7/12?',['5/6','7/12','They are equal'],'5/6','5/6 is 10/12, which is greater than 7/12.'),
 q('Order these from smallest to largest: 2/5, 4/5, 1/5.',['1/5, 2/5, 4/5','2/5, 1/5, 4/5','4/5, 2/5, 1/5'],'1/5, 2/5, 4/5','The denominators are the same, so order the numerators 1, 2, 4.'),
 q('Which fraction is closest to one whole?',['5/6','3/6','1/6'],'5/6','5/6 is only 1/6 away from one whole.')
 ]},
 {id:'UKS2-FDP-Y5-03',year:5,title:'Add and subtract fractions',focus:'Add and subtract fractions with the same denominator and denominators that are multiples of the same number',explanation:'When denominators are the same, add or subtract the numerators and keep the denominator. When denominators differ, first convert to equivalent fractions with a common denominator. Simplify the result where possible.',workedExamples:[{question:'Calculate 2/7 + 3/7.',answer:'5/7'},{question:'Calculate 3/4 − 1/8.',answer:'5/8'}],questions:[
 q('What is 2/9 + 4/9?',['6/9','6/18','2/9'],'6/9','Keep the denominator 9 and add 2 + 4 to get 6/9.'),
 q('What is 7/10 − 3/10?',['4/10','4/20','10/10'],'4/10','Subtract the numerators: 7 − 3 = 4.'),
 q('What is 1/2 + 1/4?',['2/6','3/4','1/4'],'3/4','Convert 1/2 to 2/4, then 2/4 + 1/4 = 3/4.'),
 q('What is 5/6 − 1/3?',['4/3','1/2','2/3'],'1/2','Convert 1/3 to 2/6; 5/6 − 2/6 = 3/6 = 1/2.'),
 q('A ribbon is 3/8 metre long. Another 2/8 metre is added. What is the total length?',['5/8 metre','5/16 metre','1/8 metre'],'5/8 metre','3/8 + 2/8 = 5/8 metre.')
 ]},
 {id:'UKS2-FDP-Y5-04',year:5,title:'Recognise decimals and fractions',focus:'Read and write decimal numbers as fractions and recognise thousandths',explanation:'The first digit after the decimal point shows tenths, the second shows hundredths and the third shows thousandths. For example, 0.37 means 37 hundredths, or 37/100. Use place-value columns to understand the value of each digit.',workedExamples:[{question:'Write 0.6 as a fraction in tenths.',answer:'6/10'},{question:'Write 0.125 as a fraction in thousandths.',answer:'125/1000'}],questions:[
 q('What fraction is equal to 0.4?',['4/10','4/100','40/10'],'4/10','0.4 means four tenths.'),
 q('What is the value of the 7 in 2.7?',['7 tenths','7 hundredths','7 ones'],'7 tenths','In 2.7, the 7 is in the tenths column.'),
 q('Write 0.35 as a fraction.',['35/10','35/100','35/1000'],'35/100','There are 35 hundredths in 0.35.'),
 q('Which decimal is equal to 9/100?',['0.9','0.09','0.009'],'0.09','Nine hundredths is written as 0.09.'),
 q('How many thousandths are in 0.008?',['8','80','800'],'8','0.008 is eight thousandths.')
 ]},
 {id:'UKS2-FDP-Y5-05',year:5,title:'Round and compare decimal numbers',focus:'Round decimals with two decimal places to the nearest whole number and compare numbers with up to three decimal places',explanation:'Line up decimal points when comparing decimals. Add zeros at the end if needed to make the same number of decimal places. To round to the nearest whole number, look at the tenths digit: 5 or more rounds up; 4 or less rounds down.',workedExamples:[{question:'Round 6.72 to the nearest whole number.',answer:'7'},{question:'Which is greater, 0.608 or 0.68?',answer:'0.68'}],questions:[
 q('Round 4.6 to the nearest whole number.',['4','5','6'],'5','The tenths digit is 6, so round 4 up to 5.'),
 q('Which is greatest?',['0.45','0.405','0.5'],'0.5','0.5 is 0.500, which is greater than 0.450 and 0.405.'),
 q('Round 8.24 to the nearest whole number.',['8','9','8.2'],'8','The tenths digit is 2, so round down to 8.'),
 q('Which is smallest?',['2.07','2.7','2.17'],'2.07','Compare as 2.07, 2.70 and 2.17; 2.07 is smallest.'),
 q('Complete the comparison: 0.56 __ 0.506.',['<','=','>'],'>','0.56 is 0.560, which is greater than 0.506.')
 ]},
 {id:'UKS2-FDP-Y6-01',year:6,title:'Simplify and use equivalent fractions',focus:'Use common factors to simplify fractions and express fractions in their simplest form',explanation:'A fraction is in its simplest form when the numerator and denominator have no common factor greater than 1. Divide both by their highest common factor. Equivalent fractions can also be used to compare, add and subtract fractions.',workedExamples:[{question:'Simplify 18/24.',answer:'3/4'},{question:'Write 5/8 as an equivalent fraction with denominator 40.',answer:'25/40'}],questions:[
 q('Simplify 15/25.',['3/5','5/3','2/5'],'3/5','Divide the numerator and denominator by 5.'),
 q('Simplify 21/28.',['3/4','4/3','7/8'],'3/4','Divide both parts by 7 to get 3/4.'),
 q('Which is equivalent to 7/10?',['14/20','14/10','7/20'],'14/20','Multiply numerator and denominator by 2.'),
 q('What is the highest common factor of 18 and 30?',['3','6','9'],'6','The common factors are 1, 2, 3 and 6; the highest is 6.'),
 q('Which fraction is already in its simplest form?',['6/9','8/12','5/7'],'5/7','5 and 7 have no common factor other than 1.')
 ]},
 {id:'UKS2-FDP-Y6-02',year:6,title:'Multiply fractions and mixed numbers',focus:'Multiply simple pairs of proper fractions and multiply proper fractions by whole numbers',explanation:'To multiply a fraction by a whole number, multiply the numerator by the whole number and keep the denominator, then simplify. To multiply two fractions, multiply the numerators together and the denominators together. Convert mixed numbers to improper fractions first when needed.',workedExamples:[{question:'Calculate 3 × 2/5.',answer:'6/5 or 1 1/5'},{question:'Calculate 2/3 × 3/4.',answer:'1/2'}],questions:[
 q('What is 4 × 1/3?',['4/3','1/12','4/12'],'4/3','Multiply the numerator: 4 × 1/3 = 4/3.'),
 q('What is 1/2 × 1/4?',['1/6','1/8','2/6'],'1/8','Multiply numerators and denominators: 1 × 1 over 2 × 4 = 1/8.'),
 q('What is 2/5 × 3?',['5/6','6/5','6/15'],'6/5','2 × 3/5 = 6/5, which is 1 1/5.'),
 q('What is 3/4 × 2/3?',['1/2','6/7','5/12'],'1/2','Multiply to get 6/12, then simplify to 1/2.'),
 q('A recipe uses 2/3 of a cup of oats. How much is needed for 3 batches?',['2 cups','1 cup','3 cups'],'2 cups','3 × 2/3 = 6/3 = 2 cups.')
 ]},
 {id:'UKS2-FDP-Y6-03',year:6,title:'Divide fractions by whole numbers',focus:'Divide proper fractions by whole numbers',explanation:'Dividing a fraction by a whole number means splitting it into that many equal parts. Divide the numerator by the whole number when it divides exactly, or multiply the denominator by the whole number. For example, 3/4 divided by 2 is 3/8.',workedExamples:[{question:'Calculate 1/2 ÷ 2.',answer:'1/4'},{question:'Calculate 3/5 ÷ 3.',answer:'1/5'}],questions:[
 q('What is 1/3 ÷ 2?',['1/5','1/6','2/3'],'1/6','Half of one third is one sixth.'),
 q('What is 3/4 ÷ 2?',['3/8','1/2','3/2'],'3/8','Dividing by 2 doubles the denominator: 3/8.'),
 q('What is 2/5 ÷ 2?',['1/5','2/10','4/5'],'1/5','Half of 2/5 is 1/5.'),
 q('What is 4/7 ÷ 4?',['1/7','4/11','7/4'],'1/7','Sharing 4/7 into 4 equal parts gives 1/7 each.'),
 q('A 3/4 metre strip is cut into 3 equal pieces. How long is each piece?',['1/4 metre','1/3 metre','3/7 metre'],'1/4 metre','3/4 ÷ 3 = 3/12 = 1/4 metre.')
 ]},
 {id:'UKS2-FDP-Y6-04',year:6,title:'Connect fractions, decimals and percentages',focus:'Recall and use equivalences between simple fractions, decimals and percentages',explanation:'Fractions, decimals and percentages are different ways to describe the same part of a whole. One half is 0.5 or 50%; one quarter is 0.25 or 25%; three quarters is 0.75 or 75%. Percent means out of 100.',workedExamples:[{question:'Write 3/4 as a percentage.',answer:'75%'},{question:'Write 0.2 as a percentage.',answer:'20%'}],questions:[
 q('What percentage is equal to 1/2?',['25%','50%','75%'],'50%','One half is 50 out of 100, or 50%.'),
 q('Which decimal is equal to 25%?',['0.025','0.25','2.5'],'0.25','25% means 25/100, which is 0.25.'),
 q('What fraction is equal to 60% in its simplest form?',['3/5','6/5','2/3'],'3/5','60/100 simplifies by dividing by 20 to 3/5.'),
 q('What percentage is equal to 0.75?',['7.5%','75%','750%'],'75%','Multiply the decimal by 100 to get 75%.'),
 q('Which set shows equivalent values?',['1/4, 0.25, 25%','1/4, 0.4, 40%','1/2, 0.25, 25%'],'1/4, 0.25, 25%','One quarter is 25 hundredths, which is 0.25 or 25%.')
 ]},
 {id:'UKS2-FDP-Y6-05',year:6,title:'Calculate percentages and solve fraction problems',focus:'Solve problems involving fractions and percentages of amounts and use fractions to express proportions',explanation:'To find a percentage of an amount, use known fractions or divide by 100 and multiply by the percentage. For example, 10% is one tenth and 25% is one quarter. Break more difficult percentages into manageable parts and check the answer is a sensible part of the whole.',workedExamples:[{question:'Find 25% of 80.',answer:'20'},{question:'Find 10% of 350.',answer:'35'}],questions:[
 q('What is 50% of 64?',['16','32','48'],'32','50% is one half, and half of 64 is 32.'),
 q('What is 10% of 240?',['2.4','24','240'],'24','10% is one tenth; 240 ÷ 10 = 24.'),
 q('What is 25% of 120?',['20','30','40'],'30','25% is one quarter; 120 ÷ 4 = 30.'),
 q('A class has 30 pupils. 3/5 are girls. How many girls are there?',['15','18','20'],'18','30 ÷ 5 = 6, and 6 × 3 = 18.'),
 q('A £60 game is reduced by 20%. What is the sale price?',['£12','£40','£48'],'£48','20% of £60 is £12; £60 − £12 = £48.')
 ]}
];
export function getUpperKs2FractionsDecimalsPercentagesLesson(id,year){
 if(!Number.isInteger(year)||![5,6].includes(year))throw new Error('Year must be 5 or 6.');
 const lesson=upperKs2FractionsDecimalsPercentagesLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
