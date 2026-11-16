// Supplementary Lower KS2 measurement lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const lowerKs2MeasurementLessons=[
 {id:'LKS2-ME-Y3-01',year:3,title:'Measure and compare lengths',focus:'Measure, compare, add and subtract lengths using metres, centimetres and millimetres',explanation:'Choose a suitable unit and measure from zero on a ruler. There are 10 millimetres in 1 centimetre and 100 centimetres in 1 metre. Convert to the same unit before comparing or calculating.',workedExamples:[{question:'How many millimetres are in 6 centimetres?',answer:'60 mm'},{question:'A ribbon is 45 cm long and another is 20 cm long. What is their total length?',answer:'65 cm'}],questions:[
 q('How many millimetres are in 1 centimetre?',['10 mm','100 mm','1,000 mm'],'10 mm','One centimetre is divided into ten millimetres.'),
 q('Which is the longest length?',['85 cm','1 m','95 cm'],'1 m','One metre is 100 centimetres, which is longer than 95 cm or 85 cm.'),
 q('Convert 7 cm into millimetres.',['7 mm','70 mm','700 mm'],'70 mm','7 × 10 = 70 millimetres.'),
 q('A pencil is 18 cm long. A second pencil is 9 cm long. How much longer is the first?',['7 cm','9 cm','27 cm'],'9 cm','18 − 9 = 9 centimetres.'),
 q('A path is 35 m long. You walk 12 m. How much is left?',['13 m','23 m','47 m'],'23 m','35 − 12 = 23 metres.')
 ]},
 {id:'LKS2-ME-Y3-02',year:3,title:'Measure mass and capacity',focus:'Measure, compare, add and subtract mass and capacity using standard units',explanation:'Mass tells us how heavy something is and is measured in grams (g) or kilograms (kg). Capacity tells us how much a container can hold and is measured in millilitres (ml) or litres (l). There are 1,000 g in 1 kg and 1,000 ml in 1 l.',workedExamples:[{question:'How many grams are in 2 kilograms?',answer:'2,000 g'},{question:'A bottle contains 750 ml. How much more is needed to make 1 litre?',answer:'250 ml'}],questions:[
 q('Which unit is most suitable for the mass of an apple?',['Grams','Kilometres','Litres'],'Grams','An apple has a small mass, so grams are suitable.'),
 q('How many grams are in 1 kilogram?',['100 g','1,000 g','10,000 g'],'1,000 g','One kilogram equals one thousand grams.'),
 q('How many millilitres are in 1 litre?',['100 ml','500 ml','1,000 ml'],'1,000 ml','One litre equals one thousand millilitres.'),
 q('A bag weighs 400 g and another weighs 250 g. What is their total mass?',['550 g','650 g','750 g'],'650 g','400 + 250 = 650 grams.'),
 q('A jug has 900 ml of water. 300 ml is poured out. How much remains?',['500 ml','600 ml','700 ml'],'600 ml','900 − 300 = 600 millilitres.')
 ]},
 {id:'LKS2-ME-Y3-03',year:3,title:'Understand perimeter',focus:'Measure the perimeter of simple 2-D shapes',explanation:'Perimeter is the distance all the way around the outside of a 2-D shape. Add the lengths of every side. Use the same unit for every side before adding.',workedExamples:[{question:'A square has sides of 5 cm. What is its perimeter?',answer:'20 cm'},{question:'A rectangle has sides 8 cm, 3 cm, 8 cm and 3 cm. What is its perimeter?',answer:'22 cm'}],questions:[
 q('What does perimeter measure?',['The space inside a shape','The distance around a shape','The number of corners'],'The distance around a shape','Perimeter is the total distance around the outside edge.'),
 q('A triangle has sides 4 cm, 5 cm and 6 cm. What is its perimeter?',['11 cm','15 cm','20 cm'],'15 cm','4 + 5 + 6 = 15 centimetres.'),
 q('A square has sides of 7 m. What is its perimeter?',['14 m','21 m','28 m'],'28 m','A square has four equal sides: 4 × 7 = 28 metres.'),
 q('A rectangle has lengths 9 cm and 4 cm. What is its perimeter?',['13 cm','26 cm','36 cm'],'26 cm','Add all four sides: 9 + 4 + 9 + 4 = 26 cm.'),
 q('Three sides of a shape measure 3 cm, 6 cm and 5 cm. The final side is 4 cm. What is the perimeter?',['14 cm','18 cm','20 cm'],'18 cm','3 + 6 + 5 + 4 = 18 centimetres.')
 ]},
 {id:'LKS2-ME-Y3-04',year:3,title:'Tell the time and calculate durations',focus:'Tell and write the time from an analogue clock and use 12-hour and 24-hour clocks',explanation:'The short hand shows the hour and the long hand shows the minutes. There are 60 minutes in an hour and 24 hours in a day. In 24-hour time, afternoon times continue counting after 12:00.',workedExamples:[{question:'What time is 20 minutes after 3:15?',answer:'3:35'},{question:'Write 4:30 pm using 24-hour time.',answer:'16:30'}],questions:[
 q('How many minutes are in one hour?',['30','60','100'],'60','One hour contains 60 minutes.'),
 q('What time is 25 minutes after 2:40?',['3:05','3:15','2:65'],'3:05','Twenty minutes takes you to 3:00, then another five minutes makes 3:05.'),
 q('What is 6:00 pm in 24-hour time?',['06:00','16:00','18:00'],'18:00','For 6 pm, add 12 to the hour: 6 + 12 = 18.'),
 q('A lesson starts at 10:15 and ends at 11:00. How long is it?',['35 minutes','45 minutes','55 minutes'],'45 minutes','From 10:15 to 11:00 is 45 minutes.'),
 q('What time is 1 hour and 20 minutes after 13:30?',['14:40','14:50','15:00'],'14:50','One hour after 13:30 is 14:30; add 20 minutes to get 14:50.')
 ]},
 {id:'LKS2-ME-Y4-01',year:4,title:'Convert units of length',focus:'Convert between kilometres, metres, centimetres and millimetres',explanation:'Use known relationships to convert measurements. There are 1,000 metres in a kilometre, 100 centimetres in a metre and 10 millimetres in a centimetre. When changing to a smaller unit, the number gets larger.',workedExamples:[{question:'Convert 3 km into metres.',answer:'3,000 m'},{question:'Convert 2 m 35 cm into centimetres.',answer:'235 cm'}],questions:[
 q('How many metres are in 1 kilometre?',['100 m','1,000 m','10,000 m'],'1,000 m','One kilometre is one thousand metres.'),
 q('Convert 450 cm into metres and centimetres.',['4 m 5 cm','4 m 50 cm','45 m'],'4 m 50 cm','400 cm is 4 m, with 50 cm remaining.'),
 q('How many millimetres are in 8 cm?',['8 mm','80 mm','800 mm'],'80 mm','8 × 10 = 80 millimetres.'),
 q('A walk is 2 km 300 m. How many metres is that?',['230 m','2,030 m','2,300 m'],'2,300 m','2 km is 2,000 m; add 300 m to make 2,300 m.'),
 q('Which is equal to 1.5 m?',['15 cm','150 cm','1,500 cm'],'150 cm','1 metre is 100 cm and half a metre is 50 cm.')
 ]},
 {id:'LKS2-ME-Y4-02',year:4,title:'Find perimeter and area',focus:'Measure and calculate perimeter and find area by counting squares',explanation:'Perimeter is the total distance around a shape. Area measures the surface covered inside a shape. For a rectangle, perimeter is the sum of all four sides. Area can be found by counting equal-sized square units; for a rectangle, multiply its length by its width.',workedExamples:[{question:'A rectangle is 6 cm long and 4 cm wide. What is its perimeter?',answer:'20 cm'},{question:'A rectangle is 6 squares long and 4 squares wide. What is its area?',answer:'24 square units'}],questions:[
 q('What is the area of a rectangle measuring 5 squares by 3 squares?',['8 square units','15 square units','16 square units'],'15 square units','Count the squares: 5 × 3 = 15 square units.'),
 q('A rectangle is 7 cm long and 2 cm wide. What is its perimeter?',['9 cm','14 cm','18 cm'],'18 cm','7 + 2 + 7 + 2 = 18 centimetres.'),
 q('What unit is suitable for the area of a small book cover?',['Square centimetres','Litres','Kilograms'],'Square centimetres','Area is measured in square units, such as square centimetres.'),
 q('A shape covers 4 rows of 5 equal squares. What is its area?',['9 square units','20 square units','25 square units'],'20 square units','4 rows of 5 squares gives 4 × 5 = 20 square units.'),
 q('A square has sides of 8 cm. What is its perimeter?',['16 cm','32 cm','64 cm'],'32 cm','A square has four equal sides: 4 × 8 = 32 cm.')
 ]},
 {id:'LKS2-ME-Y4-03',year:4,title:'Convert units of mass and capacity',focus:'Convert between common units of mass and capacity',explanation:'There are 1,000 grams in a kilogram and 1,000 millilitres in a litre. Convert mixed measures by changing the larger unit into the smaller unit, then adding the remaining amount.',workedExamples:[{question:'Convert 3 kg 250 g into grams.',answer:'3,250 g'},{question:'Convert 2 l 150 ml into millilitres.',answer:'2,150 ml'}],questions:[
 q('Convert 4 kg into grams.',['400 g','4,000 g','40,000 g'],'4,000 g','4 × 1,000 = 4,000 grams.'),
 q('Convert 1,750 g into kilograms and grams.',['1 kg 75 g','1 kg 750 g','17 kg 50 g'],'1 kg 750 g','1,000 g makes 1 kg, leaving 750 g.'),
 q('How many millilitres are in 3 litres?',['300 ml','3,000 ml','30,000 ml'],'3,000 ml','3 × 1,000 = 3,000 millilitres.'),
 q('A container holds 1 l 400 ml. How many millilitres is that?',['1,040 ml','1,400 ml','1,4000 ml'],'1,400 ml','1 litre is 1,000 ml; add 400 ml.'),
 q('A parcel weighs 2 kg 600 g. Another weighs 1 kg 500 g. What is their combined mass?',['3 kg 100 g','4 kg 100 g','4 kg 200 g'],'4 kg 100 g','2,600 g + 1,500 g = 4,100 g, which is 4 kg 100 g.')
 ]},
 {id:'LKS2-ME-Y4-04',year:4,title:'Work with time and timetables',focus:'Convert between hours, minutes and seconds and solve time problems',explanation:'There are 60 seconds in a minute and 60 minutes in an hour. Read timetables carefully, including the departure and arrival times. Split longer durations at the next hour to make calculations easier.',workedExamples:[{question:'How many minutes are in 2 hours and 15 minutes?',answer:'135 minutes'},{question:'A train leaves at 09:40 and arrives at 10:25. How long is the journey?',answer:'45 minutes'}],questions:[
 q('How many seconds are in 3 minutes?',['60 seconds','180 seconds','300 seconds'],'180 seconds','3 × 60 = 180 seconds.'),
 q('Convert 150 minutes into hours and minutes.',['1 hour 50 minutes','2 hours 30 minutes','2 hours 50 minutes'],'2 hours 30 minutes','120 minutes is 2 hours, with 30 minutes remaining.'),
 q('A film starts at 14:20 and lasts 1 hour 35 minutes. When does it finish?',['15:45','15:55','16:05'],'15:55','14:20 plus 1 hour is 15:20; add 35 minutes to reach 15:55.'),
 q('A bus leaves at 08:55 and arrives at 09:35. How long is the journey?',['30 minutes','40 minutes','50 minutes'],'40 minutes','Five minutes to 09:00, then 35 more minutes makes 40 minutes.'),
 q('How many minutes are in 1 hour and 45 minutes?',['95 minutes','105 minutes','115 minutes'],'105 minutes','60 + 45 = 105 minutes.')
 ]}
];
export function getLowerKs2MeasurementLesson(id,year){
 if(!Number.isInteger(year)||![3,4].includes(year))throw new Error('Year must be 3 or 4.');
 const lesson=lowerKs2MeasurementLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
