// Supplementary Upper KS2 number and place value lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const upperKs2NumberPlaceValueLessons=[
 {id:'UKS2-NPV-Y5-01',year:5,title:'Read and write numbers to one million',focus:'Read, write, order and compare numbers to at least 1,000,000',explanation:'Large whole numbers are grouped into periods of three digits: ones, thousands and millions. Each digit has a value depending on its position. Use place-value columns to read and write numbers accurately, including zero placeholders.',workedExamples:[{question:'What is the value of the 6 in 462,315?',answer:'60,000'},{question:'Write in digits: seven hundred and four thousand, twenty-nine.',answer:'704,029'}],questions:[
 q('What is the value of the 8 in 583,214?',['8,000','80,000','800,000'],'80,000','The 8 is in the ten-thousands column, so its value is 80,000.'),
 q('Which number is greatest?',['509,812','590,182','590,128'],'590,182','Compare from the left: both larger choices begin 590; then compare the remaining digits. 182 is greater than 128.'),
 q('Write 306,045 in words.',['Three hundred and six thousand and forty-five','Thirty-six thousand and forty-five','Three hundred and six thousand and four hundred and five'],'Three hundred and six thousand and forty-five','306,045 has 306 thousands and 45 ones.'),
 q('What is the missing digit in 4□2,715 if the number is 432,715?',['2','3','4'],'3','The ten-thousands digit is 3.'),
 q('Which is the correct order from smallest to largest?',['245,601; 245,610; 246,015','246,015; 245,610; 245,601','245,610; 245,601; 246,015'],'245,601; 245,610; 246,015','Compare each number from left to right; 245,601 is smallest and 246,015 is largest.')
 ]},
 {id:'UKS2-NPV-Y5-02',year:5,title:'Understand powers of ten',focus:'Determine the value of each digit in numbers up to 1,000,000 and multiply and divide by 10, 100 and 1,000',explanation:'Each place to the left is ten times the value of the place to its right. Multiplying a whole number by 10, 100 or 1,000 makes each digit worth 10, 100 or 1,000 times as much. Dividing reverses the change. Think about place value rather than simply moving digits.',workedExamples:[{question:'What is 34 × 100?',answer:'3,400'},{question:'What is 56,000 ÷ 1,000?',answer:'56'}],questions:[
 q('What is 7 × 1,000?',['700','7,000','70,000'],'7,000','Multiplying 7 by 1,000 gives 7,000.'),
 q('What is 42,000 ÷ 100?',['42','420','4,200'],'420','Dividing 42,000 by 100 gives 420.'),
 q('How many times greater is the value of the 5 in 50,000 than the value of the 5 in 500?',['10','100','1,000'],'100','50,000 ÷ 500 = 100.'),
 q('What is 608 × 10?',['608','6,080','60,800'],'6,080','Multiplying by 10 makes each digit ten times its previous value.'),
 q('What is 93,000 ÷ 1,000?',['93','930','9,300'],'93','93,000 divided by 1,000 is 93.')
 ]},
 {id:'UKS2-NPV-Y5-03',year:5,title:'Round large numbers',focus:'Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000',explanation:'To round, find the place you are rounding to and look at the digit immediately to its right. If that digit is 5 or more, round up; if it is 4 or less, keep the rounding digit the same. Replace following digits with zeros.',workedExamples:[{question:'Round 46,782 to the nearest 1,000.',answer:'47,000'},{question:'Round 349,200 to the nearest 100,000.',answer:'300,000'}],questions:[
 q('Round 68,451 to the nearest 10,000.',['60,000','70,000','68,000'],'70,000','The thousands digit is 8, so round 60,000 up to 70,000.'),
 q('Round 124,650 to the nearest 1,000.',['124,000','125,000','130,000'],'125,000','The hundreds digit is 6, so round up to 125,000.'),
 q('Round 75,249 to the nearest 100.',['75,200','75,300','76,000'],'75,200','The tens digit is 4, so keep the hundreds digit the same.'),
 q('Round 850,000 to the nearest 100,000.',['800,000','850,000','900,000'],'900,000','The ten-thousands digit is 5, so round 800,000 up to 900,000.'),
 q('Which number rounds to 40,000 to the nearest 10,000?',['34,999','36,500','45,100'],'36,500','36,500 is between 35,000 and 45,000, so it rounds to 40,000.')
 ]},
 {id:'UKS2-NPV-Y5-04',year:5,title:'Work with negative numbers',focus:'Interpret negative numbers in context, count forwards and backwards through zero and interpret negative values',explanation:'Negative numbers are less than zero and are shown with a minus sign. On a number line, values get smaller as you move left. Temperature and levels below sea level are everyday contexts for negative numbers.',workedExamples:[{question:'What is 3 less than 2?',answer:'−1'},{question:'The temperature rises from −4°C to 3°C. How many degrees does it rise?',answer:'7°C'}],questions:[
 q('Which number is smallest?',['−2','0','3'],'−2','Negative two is to the left of zero and three on a number line.'),
 q('What is 5 more than −3?',['−8','2','8'],'2','Starting at −3 and moving five steps right gives 2.'),
 q('A lift moves from floor −2 to floor 4. How many floors does it travel upwards?',['2','4','6'],'6','From −2 to 4 is a rise of six floors.'),
 q('Which temperature is coldest?',['−6°C','−1°C','2°C'],'−6°C','The lower the negative number, the colder the temperature.'),
 q('What is 4 less than 1?',['−5','−3','3'],'−3','1 − 4 = −3.')
 ]},
 {id:'UKS2-NPV-Y5-05',year:5,title:'Explore Roman numerals',focus:'Read Roman numerals to 1,000 (M) and recognise years written in Roman numerals',explanation:'Roman numerals use letters: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500 and M = 1,000. Usually, a smaller value after a larger value is added; a smaller value before a larger one is subtracted, as in IV = 4 and IX = 9.',workedExamples:[{question:'What number is XL?',answer:'40'},{question:'Write 90 in Roman numerals.',answer:'XC'}],questions:[
 q('What number does D represent?',['50','500','1,000'],'500','D represents 500 in Roman numerals.'),
 q('What is XIV as a number?',['14','16','24'],'14','X is 10 and IV is 4, making 14.'),
 q('Which Roman numeral represents 49?',['IL','XLIX','XXXXIX'],'XLIX','XL is 40 and IX is 9, giving 49.'),
 q('What is the value of CM?',['900','1,100','1,500'],'900','C before M means 100 is subtracted from 1,000.'),
 q('Which Roman numeral represents 700?',['DCC','CCD','MCC'],'DCC','D is 500 and CC is 200, making 700.')
 ]},
 {id:'UKS2-NPV-Y6-01',year:6,title:'Read and compare numbers to ten million',focus:'Read, write, order and compare numbers up to 10,000,000 and determine the value of each digit',explanation:'Numbers to ten million have a millions period as well as thousands and ones. Compare numbers by checking the highest place value first. A zero can act as a placeholder and must be kept when writing a number in digits.',workedExamples:[{question:'What is the value of the 7 in 7,304,219?',answer:'7,000,000'},{question:'Write in digits: six million, forty-two thousand and nine.',answer:'6,042,009'}],questions:[
 q('What is the value of the 4 in 4,582,103?',['40,000','400,000','4,000,000'],'4,000,000','The 4 is in the millions column.'),
 q('Which number is greatest?',['8,092,451','8,209,451','8,029,541'],'8,209,451','Compare the hundred-thousands and ten-thousands digits after the 8 million.'),
 q('Write 5,060,018 in words.',['Five million, sixty thousand and eighteen','Five million, six hundred thousand and eighteen','Five million, sixty thousand and one hundred and eight'],'Five million, sixty thousand and eighteen','The number has 5 million, 60 thousand and 18.'),
 q('Which number is smallest?',['3,450,001','3,405,100','3,450,010'],'3,405,100','The ten-thousands digit is 0 in the second number, making it smaller.'),
 q('What is the missing digit in 9,□12,456 if the number is 9,312,456?',['1','2','3'],'3','The hundred-thousands digit is 3.')
 ]},
 {id:'UKS2-NPV-Y6-02',year:6,title:'Multiply and divide by powers of ten',focus:'Multiply and divide numbers by 10, 100 and 1,000, giving answers up to three decimal places',explanation:'When multiplying by 10, 100 or 1,000, each digit moves into a place worth 10, 100 or 1,000 times as much. When dividing, each digit moves into a place worth less. Use a place-value chart to keep track of decimal points and zeros.',workedExamples:[{question:'What is 4.37 × 100?',answer:'437'},{question:'What is 625 ÷ 1,000?',answer:'0.625'}],questions:[
 q('What is 3.6 × 10?',['0.36','36','360'],'36','Multiplying 3.6 by 10 gives 36.'),
 q('What is 48.2 ÷ 100?',['4.82','0.482','0.0482'],'0.482','Dividing by 100 makes the value one hundred times smaller.'),
 q('What is 0.075 × 1,000?',['0.75','7.5','75'],'75','0.075 multiplied by 1,000 is 75.'),
 q('What is 9,400 ÷ 10?',['94','940','9,040'],'940','Dividing 9,400 by 10 gives 940.'),
 q('Which calculation equals 6.08?',['608 ÷ 100','608 × 100','6.08 ÷ 10'],'608 ÷ 100','608 divided by 100 is 6.08.')
 ]},
 {id:'UKS2-NPV-Y6-03',year:6,title:'Round and estimate with large numbers',focus:'Round any whole number to a required degree of accuracy and use rounding to check answers',explanation:'Rounding gives an approximate value that is easier to work with. Identify the required place, check the digit immediately to its right and round up for 5 or more. An estimate can help you decide whether a calculation answer is sensible.',workedExamples:[{question:'Round 6,748,219 to the nearest 100,000.',answer:'6,700,000'},{question:'Estimate 398,200 + 201,600 by rounding each number to the nearest 100,000.',answer:'600,000'}],questions:[
 q('Round 7,849,321 to the nearest million.',['7,000,000','8,000,000','7,800,000'],'8,000,000','The hundred-thousands digit is 8, so round 7 million up to 8 million.'),
 q('Round 3,456,780 to the nearest 10,000.',['3,450,000','3,460,000','3,500,000'],'3,460,000','The thousands digit is 6, so round 3,450,000 up to 3,460,000.'),
 q('Estimate 49,600 + 31,200 by rounding to the nearest 10,000.',['70,000','80,000','90,000'],'80,000','49,600 rounds to 50,000 and 31,200 rounds to 30,000; total 80,000.'),
 q('Which is the best estimate for 198 × 51?',['1,000','10,000','100,000'],'10,000','198 is about 200 and 51 is about 50; 200 × 50 = 10,000.'),
 q('Round 845,000 to the nearest 100,000.',['800,000','850,000','900,000'],'800,000','The ten-thousands digit is 4, so round down to 800,000.')
 ]},
 {id:'UKS2-NPV-Y6-04',year:6,title:'Use negative numbers in context',focus:'Use negative numbers in context and calculate intervals across zero',explanation:'Negative numbers are below zero. When finding the difference between a negative and a positive number, count the distance across zero as well as the distance on each side. A number line can help show the interval clearly.',workedExamples:[{question:'What is the difference between −7 and 5?',answer:'12'},{question:'At dawn it is −3°C and by midday it is 6°C. What is the temperature increase?',answer:'9°C'}],questions:[
 q('What is the difference between −4 and 8?',['4','12','−12'],'12','From −4 to zero is 4, and from zero to 8 is 8; 4 + 8 = 12.'),
 q('A diver is at −12 metres and rises to −5 metres. How far does the diver rise?',['5 metres','7 metres','17 metres'],'7 metres','The distance from −12 to −5 is 7 metres.'),
 q('Which is greatest?',['−9','−2','−5'],'−2','Among negative numbers, the one closest to zero is greatest.'),
 q('The temperature falls from 4°C to −6°C. How many degrees does it fall?',['2°C','10°C','−10°C'],'10°C','From 4 to zero is 4 degrees and from zero to −6 is 6 degrees; total 10.'),
 q('What is 6 less than −2?',['−8','−4','4'],'−8','Moving six places left from −2 gives −8.')
 ]},
 {id:'UKS2-NPV-Y6-05',year:6,title:'Solve multi-step place-value problems',focus:'Use place value, comparison, rounding and powers of ten to solve problems',explanation:'Number sense means choosing a sensible strategy and checking that an answer is reasonable. Use place value to break numbers apart, compare values, apply powers of ten and round to estimate. Explain each step so another person can follow your reasoning.',workedExamples:[{question:'A stadium has 48,750 seats. Round to the nearest 1,000.',answer:'49,000'},{question:'A number is 100 times as large as 36. What is the number?',answer:'3,600'}],questions:[
 q('A number has 6 in the millions column, 4 in the ten-thousands column and 9 in the hundreds column. What is it?',['6,040,900','6,400,900','6,004,900'],'6,040,900','The values are 6,000,000 + 40,000 + 900 = 6,040,900.'),
 q('Which number is 1,000 times greater than 7,205?',['72,050','720,500','7,205,000'],'7,205,000','Multiplying 7,205 by 1,000 gives 7,205,000.'),
 q('A town has 2,486,000 people. To the nearest 100,000, what is the population?',['2,400,000','2,500,000','2,000,000'],'2,500,000','The ten-thousands digit is 8, so round 2,400,000 up to 2,500,000.'),
 q('Which statement is true?',['−3 is greater than −8','−8 is greater than 0','0 is less than −3'],'−3 is greater than −8','On a number line, −3 is to the right of −8, so it is greater.'),
 q('A school orders 125 boxes with 100 pencils in each. How many pencils is that?',['1,250','12,500','125,000'],'12,500','125 × 100 = 12,500 pencils.')
 ]}
];
export function getUpperKs2NumberPlaceValueLesson(id,year){
 if(!Number.isInteger(year)||![5,6].includes(year))throw new Error('Year must be 5 or 6.');
 const lesson=upperKs2NumberPlaceValueLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
