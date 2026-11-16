// Supplementary Lower KS2 statistics lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const lowerKs2StatisticsLessons=[
 {id:'LKS2-ST-Y3-01',year:3,title:'Collect and organise information',focus:'Interpret and present data using simple tables and tally charts',explanation:'A tally chart helps you record how often something happens. Make one tally for each item and group tallies in fives to make totals easier to count. A frequency table shows the total for each category.',workedExamples:[{question:'A tally has |||| and one more stroke. How many is that?',answer:'5'},{question:'A table shows 7 red counters and 4 blue counters. How many counters are there altogether?',answer:'11'}],questions:[
 q('Why are tally marks often grouped in fives?',['To make totals easier to count','To make the chart colourful','Because data must be in fives'],'To make totals easier to count','Groups of five can be counted quickly and help reduce counting errors.'),
 q('A category has |||| || tallies. What is its total?',['6','7','8'],'7','Five tallies plus two more makes seven.'),
 q('Which information belongs in a table heading?',['What each column shows','A random drawing','The answer to every question'],'What each column shows','Headings explain what information is recorded in each column.'),
 q('A class records 8 cats and 5 dogs. Which category has more?',['Cats','Dogs','They are equal'],'Cats','Eight is greater than five.'),
 q('What should you do before collecting answers for a class survey?',['Decide on a clear question','Guess the results','Choose the winning answer'],'Decide on a clear question','A clear question helps everyone understand what information to provide.')
 ]},
 {id:'LKS2-ST-Y3-02',year:3,title:'Read pictograms',focus:'Interpret and present data in pictograms',explanation:'A pictogram uses pictures or symbols to represent data. A key tells you what each picture is worth. If one picture represents two children, count in twos rather than ones.',workedExamples:[{question:'A key says one star represents 2 votes. What do 4 stars represent?',answer:'8 votes'},{question:'A pictogram shows 3 symbols, each worth 5 books. How many books is that?',answer:'15 books'}],questions:[
 q('What does the key in a pictogram tell you?',['What each symbol represents','Who drew the chart','The title colour'],'What each symbol represents','The key explains the value of each picture or part-picture.'),
 q('One picture represents 3 pets. What do 5 pictures represent?',['8 pets','15 pets','20 pets'],'15 pets','5 groups of 3 make 15.'),
 q('One symbol represents 2 votes. How many votes do 6 symbols show?',['8','10','12'],'12','6 × 2 = 12 votes.'),
 q('A chart shows 4 full symbols and a half symbol. Each full symbol is 10. What is the total?',['40','45','50'],'45','Four full symbols represent 40; half of 10 is 5; 40 + 5 = 45.'),
 q('Why must you check the pictogram key before answering?',['Symbols may represent more than one item','All symbols always mean one','The key gives the date'],'Symbols may represent more than one item','The key tells you the value of each symbol, which may be more than one.')
 ]},
 {id:'LKS2-ST-Y3-03',year:3,title:'Read and compare bar charts',focus:'Interpret and present data in bar charts',explanation:'A bar chart uses separate bars to compare categories. Read the labels and scale on the vertical axis. The height of each bar shows the number in that category.',workedExamples:[{question:'A bar reaches 6 on the scale. What is its value?',answer:'6'},{question:'A chart shows 9 apples and 4 pears. How many more apples are there?',answer:'5'}],questions:[
 q('What does the height of a bar show?',['The value for that category','The colour of the paper','The number of letters in its label'],'The value for that category','The bar height matches the category value on the scale.'),
 q('A bar chart shows 7 books borrowed on Monday and 10 on Tuesday. Which day had more?',['Monday','Tuesday','The same'],'Tuesday','10 is greater than 7.'),
 q('A chart uses a scale counting in twos. The bar reaches 8. What is its value?',['4','8','16'],'8','Read the labelled scale: the bar reaches the value 8.'),
 q('A class votes for football 12 times and tennis 5 times. How many more votes did football receive?',['7','8','17'],'7','12 − 5 = 7 votes.'),
 q('What should a bar chart include to explain its subject?',['A clear title','Only pictures','No labels'],'A clear title','A title tells the reader what the chart is about.')
 ]},
 {id:'LKS2-ST-Y3-04',year:3,title:'Ask questions and solve problems with data',focus:'Solve one-step and comparison questions using information presented in scaled pictograms, tables and bar charts',explanation:'Use the title, labels, key and scale to find the correct information. You can compare categories, find totals and work out differences. Always check that you have read the scale correctly.',workedExamples:[{question:'A table shows 6 red, 8 blue and 3 green beads. How many beads are there?',answer:'17'},{question:'There are 11 sunny days and 7 rainy days. How many more sunny days?',answer:'4'}],questions:[
 q('A table shows 5, 7 and 4 for three groups. What is the total?',['12','16','17'],'16','5 + 7 + 4 = 16.'),
 q('A pictogram key says each symbol is worth 4. Three symbols represent how many?',['7','12','16'],'12','3 × 4 = 12.'),
 q('A bar chart shows 14 children chose apples and 9 chose bananas. How many more chose apples?',['5','6','23'],'5','14 − 9 = 5.'),
 q('Which part of a chart helps you understand what is being counted?',['Title and labels','Border thickness','Page number'],'Title and labels','The title and labels explain the subject and categories.'),
 q('A table shows 6 children walk, 8 travel by car and 5 cycle. How many do not travel by car?',['11','13','19'],'11','6 walking + 5 cycling = 11 children.')
 ]},
 {id:'LKS2-ST-Y4-01',year:4,title:'Interpret and compare data in tables',focus:'Interpret and present discrete and continuous data using appropriate graphical methods, including tables',explanation:'A table organises information into rows and columns. Read the headings first, then compare values or combine categories. Discrete data is counted in separate values, while continuous data is measured and can take any value within a range.',workedExamples:[{question:'A table shows 13 pupils in Year 3 and 16 in Year 4. How many pupils are there altogether?',answer:'29'},{question:'Which is continuous data: number of siblings or height?',answer:'Height'}],questions:[
 q('Which is an example of discrete data?',['Number of books','Length of a ribbon','Temperature'],'Number of books','Books are counted in whole items, making the data discrete.'),
 q('Which is an example of continuous data?',['Number of pets','Height of a plant','Number of goals'],'Height of a plant','Height is measured and can take many values within a range.'),
 q('A table records 18 boys and 15 girls. How many children are recorded?',['23','33','35'],'33','18 + 15 = 33.'),
 q('A table shows 24 tickets sold on Friday and 31 on Saturday. How many more were sold on Saturday?',['5','7','55'],'7','31 − 24 = 7 tickets.'),
 q('What should you read first when using a table?',['The headings','The smallest number only','The page colour'],'The headings','Headings tell you what each row and column represents.')
 ]},
 {id:'LKS2-ST-Y4-02',year:4,title:'Use scales in bar charts',focus:'Interpret and present data in bar charts with suitable scales',explanation:'A bar chart can use a scale that counts in twos, fives, tens or another equal step. Check the intervals between numbered marks before reading a bar. Bars should start at zero unless the chart clearly explains a different scale.',workedExamples:[{question:'The vertical scale counts 0, 5, 10, 15. A bar reaches 10. What is its value?',answer:'10'},{question:'A bar chart has 4 bars with values 5, 10, 15 and 20. What is their total?',answer:'50'}],questions:[
 q('A scale counts in fives. What comes after 15?',['16','20','25'],'20','Counting in fives gives 5, 10, 15, 20.'),
 q('A bar reaches the third interval on a scale of 0, 2, 4, 6, 8. What is its value?',['4','6','8'],'6','The third marked interval after zero is 6.'),
 q('A chart shows 25, 30 and 15 for three days. What is the total?',['60','65','70'],'70','25 + 30 + 15 = 70.'),
 q('Why must the intervals on a bar chart scale be equal?',['So bar heights can be compared fairly','To make the bars different colours','So the chart has fewer labels'],'So bar heights can be compared fairly','Equal intervals keep the visual comparison accurate.'),
 q('A bar is halfway between 10 and 20 on a scale marked evenly. What is its value?',['12','15','18'],'15','Halfway between 10 and 20 is 15.')
 ]},
 {id:'LKS2-ST-Y4-03',year:4,title:'Read and interpret time graphs',focus:'Interpret and present continuous data using time graphs',explanation:'A time graph shows how a measured value changes over time. Read the time along the horizontal axis and the measured value on the vertical axis. Points joined by lines help show a trend between measurements.',workedExamples:[{question:'A temperature rises from 12°C at 9 am to 17°C at noon. By how many degrees did it rise?',answer:'5°C'},{question:'A graph shows a value falling from 20 to 14. What is the decrease?',answer:'6'}],questions:[
 q('Which axis usually shows time on a time graph?',['Horizontal axis','Vertical axis','Neither axis'],'Horizontal axis','Time is commonly shown along the horizontal axis.'),
 q('A temperature changes from 8°C to 13°C. What is the increase?',['3°C','5°C','21°C'],'5°C','13 − 8 = 5 degrees.'),
 q('A plant grows from 14 cm to 19 cm. How much does it grow?',['4 cm','5 cm','6 cm'],'5 cm','19 − 14 = 5 centimetres.'),
 q('What can a rising line on a time graph show?',['The measured value is increasing','The value is always zero','Time is moving backwards'],'The measured value is increasing','A rising line means the measured value is getting larger over that interval.'),
 q('A graph shows 6 litres at 10 am and 4 litres at 11 am. What happened?',['It increased by 2 litres','It decreased by 2 litres','It stayed the same'],'It decreased by 2 litres','4 is 2 less than 6, so the amount decreased by 2 litres.')
 ]},
 {id:'LKS2-ST-Y4-04',year:4,title:'Choose charts and solve data problems',focus:'Solve comparison, sum and difference problems using information presented in charts and tables',explanation:'Choose a way to present data that makes it easy to understand. Tables are useful for exact values, bar charts compare categories, and time graphs show change over time. Use totals, differences and comparisons to answer questions.',workedExamples:[{question:'Which chart is suitable for showing how temperature changes each hour?',answer:'Time graph'},{question:'A survey records 16 votes for cycling, 12 for walking and 7 for the bus. How many votes were cast?',answer:'35'}],questions:[
 q('Which is most suitable for showing how a temperature changes during a day?',['Time graph','Tally chart only','Picture of a thermometer'],'Time graph','A time graph shows how a continuous measurement changes over time.'),
 q('Which is useful for comparing favourite fruit categories?',['Bar chart','Time graph','Calendar'],'Bar chart','A bar chart makes category totals easy to compare.'),
 q('A survey records 12, 9 and 14 votes. How many votes were cast?',['25','35','36'],'35','12 + 9 + 14 = 35.'),
 q('A chart shows 28 people on Monday and 19 on Tuesday. What is the difference?',['7','9','47'],'9','28 − 19 = 9.'),
 q('A class has 15 pupils. 6 choose football and 5 choose netball. How many choose another activity?',['3','4','5'],'4','15 − 6 − 5 = 4 pupils.')
 ]}
];
export function getLowerKs2StatisticsLesson(id,year){
 if(!Number.isInteger(year)||![3,4].includes(year))throw new Error('Year must be 3 or 4.');
 const lesson=lowerKs2StatisticsLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
