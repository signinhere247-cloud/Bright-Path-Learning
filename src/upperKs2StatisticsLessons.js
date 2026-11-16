// Supplementary Upper KS2 statistics and data handling lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const upperKs2StatisticsLessons=[
 {id:'UKS2-STA-Y5-01',year:5,title:'Read and interpret tables',focus:'Complete, read and interpret information in tables, including timetables',explanation:'A table organises information into rows and columns. Read the headings first so you know what each number represents. Check the units and labels, then locate the correct row and column before answering. A timetable is a table that shows times and events or journeys.',workedExamples:[{question:'A table shows 12 red, 9 blue and 7 green counters. How many blue counters are there?',answer:'9'},{question:'A bus leaves at 10:15 and arrives at 10:50. How long is the journey?',answer:'35 minutes'}],questions:[
 q('A table shows 14 apples, 8 pears and 11 oranges. How many pears are there?',['8','11','14'],'8','Find the pears row or column; its value is 8.'),
 q('A class records 16 boys and 13 girls. How many pupils are there altogether?',['3','29','30'],'29','Add the two groups: 16 + 13 = 29.'),
 q('A train leaves at 09:25 and arrives at 10:05. How long is the journey?',['30 minutes','40 minutes','50 minutes'],'40 minutes','From 09:25 to 10:00 is 35 minutes, then 5 more minutes makes 40.'),
 q('A table shows books borrowed: Monday 18, Tuesday 23, Wednesday 15. Which day had the most books borrowed?',['Monday','Tuesday','Wednesday'],'Tuesday','23 is the greatest value.'),
 q('A table shows 6 teams with 5 players each. How many players are there?',['11','25','30'],'30','Multiply 6 teams by 5 players: 6 × 5 = 30.')
 ]},
 {id:'UKS2-STA-Y5-02',year:5,title:'Solve comparison and total problems from data',focus:'Solve comparison, sum and difference problems using information presented in a line graph or table',explanation:'When answering questions about data, identify the values you need and choose the correct operation. A total usually requires addition, a difference requires subtraction, and a comparison asks which value is greater or smaller and by how much. Always include the unit where one is given.',workedExamples:[{question:'A line graph shows 24 visitors on Monday and 31 on Tuesday. How many more visited on Tuesday?',answer:'7 visitors'},{question:'Sales were 18, 22 and 15 over three days. Find the total.',answer:'55'}],questions:[
 q('A chart shows 35 books read by Year 5 and 28 by Year 6. How many more did Year 5 read?',['7','13','63'],'7','Subtract 28 from 35 to find the difference.'),
 q('A table shows 16, 19 and 24 visitors on three days. What is the total?',['49','59','69'],'59','16 + 19 + 24 = 59.'),
 q('A line graph shows temperatures of 12°C at 9 am and 18°C at midday. How much did the temperature rise?',['5°C','6°C','30°C'],'6°C','18 − 12 = 6 degrees Celsius.'),
 q('A team scored 42 points in one match and 37 in another. What is the difference?',['5 points','9 points','79 points'],'5 points','42 − 37 = 5.'),
 q('A shop sold 27 toys on Saturday and 34 on Sunday. How many toys were sold altogether?',['7','51','61'],'61','27 + 34 = 61 toys.')
 ]},
 {id:'UKS2-STA-Y5-03',year:5,title:'Read and interpret line graphs',focus:'Use information presented in line graphs to solve comparison, sum and difference problems',explanation:'A line graph shows how values change, often over time. Read the horizontal axis to identify the time or category and the vertical axis to read the value. Check the scale carefully: each grid interval may represent more than one unit. A rising line shows an increase and a falling line shows a decrease.',workedExamples:[{question:'A line graph rises from 8 to 14. By how much has the value increased?',answer:'6'},{question:'A graph shows 20 litres at 10 am and 13 litres at 11 am. How much has been used?',answer:'7 litres'}],questions:[
 q('A line graph rises from 5 to 12. What is the increase?',['5','7','17'],'7','12 − 5 = 7.'),
 q('A graph shows 18°C at midday and 11°C at 3 pm. What is the decrease?',['6°C','7°C','29°C'],'7°C','18 − 11 = 7 degrees.'),
 q('A water tank contains 40 litres. The graph shows 15 litres used. How much remains?',['15 litres','25 litres','55 litres'],'25 litres','40 − 15 = 25 litres.'),
 q('A line graph is flat between two points. What does this show?',['The value stayed the same','The value doubled','The value fell to zero'],'The value stayed the same','A horizontal line means there was no change.'),
 q('A graph scale increases by 5 each grid line. The point is 4 grid lines above zero. What is its value?',['9','20','25'],'20','Four intervals of 5 give 4 × 5 = 20.')
 ]},
 {id:'UKS2-STA-Y5-04',year:5,title:'Collect and organise data',focus:'Plan and complete a simple data collection and present information clearly in a table',explanation:'A useful data question is clear and can be answered consistently. Decide what information to collect, choose suitable categories or units and record each result once. Use tally marks to keep count, then total the tallies and transfer the results into a labelled frequency table. Check that the totals match the number of responses.',workedExamples:[{question:'A survey records 7 votes for apples and 5 for bananas. How many votes were counted?',answer:'12 votes'},{question:'A tally has three groups of five and two extra marks. What is the total?',answer:'17'}],questions:[
 q('A survey has 9 votes for football and 6 for swimming. How many votes were cast?',['3','15','54'],'15','Add the votes: 9 + 6 = 15.'),
 q('A tally shows two groups of five and four extra marks. What is the frequency?',['9','14','24'],'14','Two groups of five make 10; add 4 to get 14.'),
 q('What should a table heading tell the reader?',['What the data values represent','The colour of the paper','Who made the ruler'],'What the data values represent','Clear headings explain the categories and units.'),
 q('A class has 28 pupils. A survey records 28 answers. What does this suggest?',['Every pupil gave one answer','Four pupils gave two answers','No one answered'],'Every pupil gave one answer','The number of responses matches the class size, assuming one response per pupil.'),
 q('Which is the best way to record the number of times each colour is chosen?',['A frequency table','A list with no labels','A paragraph with missing totals'],'A frequency table','A frequency table organises categories and their counts.')
 ]},
 {id:'UKS2-STA-Y5-05',year:5,title:'Choose and compare ways to present data',focus:'Recognise when a table or line graph is an appropriate way to present data and explain what it shows',explanation:'Different displays help readers notice different features. Tables show exact values and are useful for looking up information. Line graphs are useful for showing change over time. Choose a display that fits the question, label axes and units, use an even scale and give the graph a clear title.',workedExamples:[{question:'Which display is useful for showing temperature changes during a day?',answer:'A line graph'},{question:'Which display is useful for looking up the exact number of pupils in each class?',answer:'A labelled table'}],questions:[
 q('Which display is usually best for showing how a temperature changes each hour?',['Line graph','Unlabelled list','Picture of a thermometer only'],'Line graph','A line graph makes changes over time easy to see.'),
 q('Which display makes it easy to look up an exact value in a set of categories?',['A labelled table','A decorative drawing','A paragraph with no numbers'],'A labelled table','Rows and columns make exact values easy to find.'),
 q('Why should a graph have labelled axes?',['To explain what each scale represents','To make the graph harder to read','To hide the data'],'To explain what each scale represents','Axis labels tell readers what is measured and in which units.'),
 q('What should the scale on a graph be?',['Evenly spaced and suitable for the data','Different at every interval','Chosen to hide small values'],'Evenly spaced and suitable for the data','An even scale allows values to be read fairly and accurately.'),
 q('What is a sensible title for a graph showing rainfall each month?',['Monthly rainfall','My favourite food','A long story'],'Monthly rainfall','The title should describe the information shown.')
 ]},
 {id:'UKS2-STA-Y6-01',year:6,title:'Read and interpret pie charts',focus:'Interpret and construct pie charts and use them to compare information',explanation:'A pie chart shows how a whole is divided into categories. The complete circle represents the total, or 100%. Each sector represents a proportion of the whole. A larger sector represents a larger share. Read the key and any labels carefully; use the given totals or percentages to compare categories.',workedExamples:[{question:'A pie chart represents 40 pupils. One quarter chose art. How many pupils chose art?',answer:'10 pupils'},{question:'A category represents 25% of a whole of 80. Find its value.',answer:'20'}],questions:[
 q('A pie chart represents 60 pupils. Half chose football. How many pupils is that?',['20','30','40'],'30','Half of 60 is 30.'),
 q('A sector represents 25% of 100 votes. How many votes is that?',['15','25','50'],'25','25% is one quarter; one quarter of 100 is 25.'),
 q('A pie chart shows 20% choosing reading from 50 children. How many children chose reading?',['5','10','20'],'10','20% of 50 is 10.'),
 q('What does the whole pie chart represent?',['The total data set','Only the largest category','One person'],'The total data set','The full circle represents all the data combined.'),
 q('Which sector represents the greatest proportion?',['The largest sector','The smallest sector','Every sector equally'],'The largest sector','A larger sector represents a larger share of the whole.')
 ]},
 {id:'UKS2-STA-Y6-02',year:6,title:'Interpret line graphs and changing data',focus:'Read and interpret line graphs and describe trends over time',explanation:'A line graph can show how a quantity changes over time. Read the axes and scale before describing the pattern. Identify increases, decreases, peaks, lowest points and periods with no change. Avoid claiming that one event caused another just because the graph shows them happening at the same time.',workedExamples:[{question:'A line graph shows 4, 7, 9 and 6 over four days. On which day is the value highest?',answer:'Day 3'},{question:'The value falls from 15 to 9. What is the decrease?',answer:'6'}],questions:[
 q('Values over four days are 3, 6, 8 and 5. Which day has the highest value?',['Day 1','Day 3','Day 4'],'Day 3','8 is the greatest value and occurs on Day 3.'),
 q('A graph rises from 12 to 17. What is the increase?',['4','5','29'],'5','17 − 12 = 5.'),
 q('A graph falls from 21 to 13. What is the decrease?',['6','8','34'],'8','21 − 13 = 8.'),
 q('What does a flat section of a line graph show?',['No change during that interval','A sudden increase','A value below zero'],'No change during that interval','A horizontal line indicates the value stayed constant.'),
 q('Why should you check the vertical axis scale?',['Intervals may represent more than one unit','It tells you the colour of the line','It changes the data values'],'Intervals may represent more than one unit','The scale determines the actual value represented by each grid interval.')
 ]},
 {id:'UKS2-STA-Y6-03',year:6,title:'Calculate the mean average',focus:'Calculate and interpret the mean as an average',explanation:'The mean is found by adding all the values and dividing by how many values there are. It gives a single value that represents the set. Check that every value is included and count the number of values, not the size of the numbers.',workedExamples:[{question:'Find the mean of 4, 6 and 8.',answer:'6'},{question:'Find the mean of 5, 7, 10 and 14.',answer:'9'}],questions:[
 q('Find the mean of 3, 6 and 9.',['5','6','7'],'6','Add to get 18, then divide by 3: 18 ÷ 3 = 6.'),
 q('Find the mean of 4, 8, 12 and 16.',['8','10','12'],'10','The total is 40; 40 ÷ 4 = 10.'),
 q('Five scores total 45. What is their mean?',['8','9','10'],'9','Divide the total by the five scores: 45 ÷ 5 = 9.'),
 q('The mean of 6 and 10 is what?',['7','8','9'],'8','(6 + 10) ÷ 2 = 8.'),
 q('Four numbers have a mean of 7. What is their total?',['11','28','49'],'28','If the mean is 7 for 4 values, the total is 7 × 4 = 28.')
 ]},
 {id:'UKS2-STA-Y6-04',year:6,title:'Compare data using averages and range',focus:'Use the mean and range to describe and compare data sets',explanation:'The mean is the total divided by the number of values. The range is the difference between the greatest and smallest values. The mean describes a typical value, while the range describes how spread out the data is. Two sets can have the same mean but different ranges.',workedExamples:[{question:'Find the range of 4, 7, 9 and 12.',answer:'8'},{question:'Set A has a mean of 6 and Set B has a mean of 8. Which has the greater mean?',answer:'Set B'}],questions:[
 q('Find the range of 3, 8, 10 and 14.',['8','11','35'],'11','Range = greatest − smallest = 14 − 3 = 11.'),
 q('Find the range of 12, 15, 15 and 19.',['4','7','19'],'7','19 − 12 = 7.'),
 q('A data set has values 5, 5, 5 and 5. What is its range?',['0','5','20'],'0','The greatest and smallest values are both 5.'),
 q('Which data set has the greater range: A (2, 4, 6) or B (1, 4, 8)?',['A','B','They are equal'],'B','A has range 6 − 2 = 4; B has range 8 − 1 = 7.'),
 q('A set of 5 numbers has a total of 60. What is its mean?',['10','12','15'],'12','60 ÷ 5 = 12.')
 ]},
 {id:'UKS2-STA-Y6-05',year:6,title:'Solve problems using statistical information',focus:'Use tables, line graphs, pie charts and averages to solve multi-step problems and explain conclusions',explanation:'When solving a statistics problem, identify what the question asks and select the relevant information from the display. You may need to calculate a total, difference, fraction, percentage, mean or range. Show your working, use the correct units and explain what the result tells you. Do not make conclusions that the data cannot support.',workedExamples:[{question:'A survey of 40 pupils shows 25% prefer cycling. How many pupils is that?',answer:'10 pupils'},{question:'Scores are 6, 8, 10 and 12. Find the mean and range.',answer:'Mean 9; range 6'}],questions:[
 q('A pie chart represents 80 people. 25% chose option A. How many chose A?',['10','20','40'],'20','25% is one quarter; 80 ÷ 4 = 20.'),
 q('Five daily sales are 4, 6, 8, 10 and 12. What is the mean?',['7','8','9'],'8','The total is 40; 40 ÷ 5 = 8.'),
 q('A line graph shows 32 visitors on Monday and 47 on Tuesday. How many more visited Tuesday?',['12','15','79'],'15','47 − 32 = 15.'),
 q('A data set has a greatest value of 28 and a smallest value of 9. What is its range?',['17','19','37'],'19','28 − 9 = 19.'),
 q('A table shows 18 votes for cats, 12 for dogs and 10 for rabbits. How many votes were recorded altogether?',['30','38','40'],'40','18 + 12 + 10 = 40 votes.')
 ]}
];
export function getUpperKs2StatisticsLesson(id,year){
 if(!Number.isInteger(year)||![5,6].includes(year))throw new Error('Year must be 5 or 6.');
 const lesson=upperKs2StatisticsLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
