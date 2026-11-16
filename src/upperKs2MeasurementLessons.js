// Supplementary Upper KS2 measurement and unit conversion lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const upperKs2MeasurementLessons=[
 {id:'UKS2-MEA-Y5-01',year:5,title:'Convert between metric units',focus:'Convert between different units of metric measure, including kilometres, metres, centimetres and millimetres',explanation:'Metric units are related by powers of ten. One kilometre is 1,000 metres, one metre is 100 centimetres and one centimetre is 10 millimetres. Choose a unit that makes the measurement easy to understand and keep track of the size of each unit.',workedExamples:[{question:'Convert 3.5 metres into centimetres.',answer:'350 cm'},{question:'Convert 4,200 metres into kilometres.',answer:'4.2 km'}],questions:[
 q('How many centimetres are in 2 metres?',['20 cm','200 cm','2,000 cm'],'200 cm','1 metre is 100 centimetres, so 2 metres is 200 centimetres.'),
 q('Convert 750 cm into metres.',['7.5 m','75 m','0.75 m'],'7.5 m','Divide centimetres by 100: 750 ÷ 100 = 7.5 metres.'),
 q('How many millimetres are in 6 cm?',['6 mm','60 mm','600 mm'],'60 mm','Each centimetre contains 10 millimetres.'),
 q('Convert 2.4 km into metres.',['24 m','240 m','2,400 m'],'2,400 m','Multiply kilometres by 1,000 to get metres.'),
 q('Which is the longest length?',['950 mm','95 cm','0.9 m'],'950 mm','950 mm is 95 cm, while 0.9 m is 90 cm; 950 mm and 95 cm are equal, so neither is uniquely longest.')
 ]},
 {id:'UKS2-MEA-Y5-02',year:5,title:'Convert mass and capacity',focus:'Convert between metric units of mass and capacity',explanation:'For mass, 1 kilogram is 1,000 grams. For capacity, 1 litre is 1,000 millilitres. Multiply when changing to a smaller unit and divide when changing to a larger unit. Always include the correct unit in your answer.',workedExamples:[{question:'Convert 3.2 kg into grams.',answer:'3,200 g'},{question:'Convert 450 ml into litres.',answer:'0.45 l'}],questions:[
 q('How many grams are in 5 kg?',['500 g','5,000 g','50,000 g'],'5,000 g','One kilogram is 1,000 grams.'),
 q('Convert 2,750 g into kilograms.',['27.5 kg','2.75 kg','0.275 kg'],'2.75 kg','Divide grams by 1,000.'),
 q('How many millilitres are in 1.5 litres?',['150 ml','1,050 ml','1,500 ml'],'1,500 ml','1 litre is 1,000 millilitres.'),
 q('Convert 600 ml into litres.',['0.06 l','0.6 l','6 l'],'0.6 l','600 divided by 1,000 is 0.6 litres.'),
 q('Which mass is greatest?',['1,250 g','1.2 kg','1,050 g'],'1,250 g','1.2 kg is 1,200 g, so 1,250 g is greatest.')
 ]},
 {id:'UKS2-MEA-Y5-03',year:5,title:'Calculate perimeter',focus:'Measure and calculate the perimeter of composite rectilinear shapes in centimetres and metres',explanation:'Perimeter is the total distance around the outside of a 2-D shape. Add the lengths of every outside edge. For rectangles, opposite sides are equal, so perimeter can be found by adding length + width + length + width.',workedExamples:[{question:'A rectangle is 8 cm long and 3 cm wide. Find its perimeter.',answer:'22 cm'},{question:'A square has sides of 6 m. Find its perimeter.',answer:'24 m'}],questions:[
 q('A rectangle is 9 cm by 4 cm. What is its perimeter?',['13 cm','26 cm','36 cm'],'26 cm','9 + 4 + 9 + 4 = 26 cm.'),
 q('A square has sides of 7 cm. What is its perimeter?',['14 cm','28 cm','49 cm'],'28 cm','A square has four equal sides: 4 × 7 = 28 cm.'),
 q('A triangle has sides of 5 cm, 6 cm and 8 cm. Find its perimeter.',['18 cm','19 cm','20 cm'],'19 cm','5 + 6 + 8 = 19 cm.'),
 q('A rectangle has perimeter 30 cm and length 9 cm. What is its width?',['6 cm','12 cm','21 cm'],'6 cm','The two lengths total 18 cm, leaving 12 cm for two equal widths; each is 6 cm.'),
 q('A shape has outside edges of 4 cm, 3 cm, 2 cm, 1 cm, 2 cm and 4 cm. What is its perimeter?',['14 cm','16 cm','18 cm'],'16 cm','Add all outside edges: 4 + 3 + 2 + 1 + 2 + 4 = 16 cm.')
 ]},
 {id:'UKS2-MEA-Y5-04',year:5,title:'Find the area of rectangles',focus:'Calculate and estimate the area of rectangles using square centimetres and square metres',explanation:'Area measures the surface inside a 2-D shape. For a rectangle, multiply its length by its width. Area is measured in square units, such as cm² or m², not ordinary centimetres or metres.',workedExamples:[{question:'A rectangle is 8 cm long and 5 cm wide. Find its area.',answer:'40 cm²'},{question:'A floor is 6 m by 4 m. Find its area.',answer:'24 m²'}],questions:[
 q('Find the area of a rectangle 7 cm by 3 cm.',['10 cm²','21 cm²','28 cm²'],'21 cm²','Area = length × width = 7 × 3 = 21 cm².'),
 q('A square has sides of 9 m. What is its area?',['18 m²','36 m²','81 m²'],'81 m²','9 × 9 = 81 square metres.'),
 q('A rectangle has area 48 cm² and width 6 cm. What is its length?',['7 cm','8 cm','9 cm'],'8 cm','48 ÷ 6 = 8 cm.'),
 q('Which unit is suitable for the area of a classroom floor?',['cm','m²','litres'],'m²','Square metres measure the area of a floor.'),
 q('A garden is 10 m long and 7 m wide. What is its area?',['17 m²','70 m²','100 m²'],'70 m²','10 × 7 = 70 square metres.')
 ]},
 {id:'UKS2-MEA-Y5-05',year:5,title:'Read timetables and solve time problems',focus:'Solve problems involving converting between units of time and interpreting timetables',explanation:'There are 60 seconds in a minute and 60 minutes in an hour. To calculate elapsed time, count forwards from the start time to the finish time, or convert both times into minutes. Read timetable headings carefully and check whether times are in the morning or afternoon.',workedExamples:[{question:'How many minutes are in 2 hours 15 minutes?',answer:'135 minutes'},{question:'A train leaves at 09:35 and arrives at 10:20. How long is the journey?',answer:'45 minutes'}],questions:[
 q('How many minutes are in 3 hours?',['120','180','300'],'180','3 × 60 = 180 minutes.'),
 q('How many seconds are in 4 minutes?',['24','240','400'],'240','4 × 60 = 240 seconds.'),
 q('A film starts at 14:25 and lasts 90 minutes. When does it finish?',['15:45','15:55','16:05'],'15:55','One hour after 14:25 is 15:25; another 30 minutes is 15:55.'),
 q('A bus journey starts at 08:48 and ends at 09:17. How long is it?',['19 minutes','29 minutes','39 minutes'],'29 minutes','From 08:48 to 09:00 is 12 minutes; then 17 more minutes makes 29.'),
 q('Which is the same as 2.5 hours?',['2 hours 5 minutes','2 hours 30 minutes','2 hours 50 minutes'],'2 hours 30 minutes','Half an hour is 0.5 of an hour, or 30 minutes.')
 ]},
 {id:'UKS2-MEA-Y6-01',year:6,title:'Convert metric units with decimals',focus:'Use decimal notation to express measures and convert between metric units',explanation:'Use place value to convert metric measurements accurately. For example, divide centimetres by 100 to convert to metres, or divide grams by 1,000 to convert to kilograms. Decimal notation can express measurements between whole units.',workedExamples:[{question:'Convert 275 cm into metres.',answer:'2.75 m'},{question:'Convert 0.85 kg into grams.',answer:'850 g'}],questions:[
 q('Convert 4,650 ml into litres.',['4.65 l','46.5 l','0.465 l'],'4.65 l','Divide millilitres by 1,000.'),
 q('Convert 3.08 km into metres.',['308 m','3,080 m','30,800 m'],'3,080 m','Multiply kilometres by 1,000.'),
 q('Convert 725 g into kilograms.',['7.25 kg','0.725 kg','0.0725 kg'],'0.725 kg','725 ÷ 1,000 = 0.725 kg.'),
 q('Which is equal to 1.25 metres?',['12.5 cm','125 cm','1,250 cm'],'125 cm','1.25 × 100 = 125 centimetres.'),
 q('A bottle contains 1.8 litres. How many millilitres is this?',['180 ml','1,080 ml','1,800 ml'],'1,800 ml','1.8 × 1,000 = 1,800 millilitres.')
 ]},
 {id:'UKS2-MEA-Y6-02',year:6,title:'Convert between metric and imperial units',focus:'Use approximate equivalences between metric units and common imperial units such as inches, pounds and pints',explanation:'Some everyday measurements use imperial units. Useful approximate conversions include 1 inch ≈ 2.5 cm, 1 mile ≈ 1.6 km, 1 pound ≈ 0.45 kg and 1 pint ≈ 568 ml. These are approximations, so answers should be described as estimates.',workedExamples:[{question:'Using 1 inch ≈ 2.5 cm, estimate the length of 4 inches.',answer:'10 cm'},{question:'Using 1 mile ≈ 1.6 km, estimate 3 miles.',answer:'4.8 km'}],questions:[
 q('Using 1 inch ≈ 2.5 cm, about how many centimetres are 8 inches?',['10 cm','20 cm','32 cm'],'20 cm','8 × 2.5 = 20 cm.'),
 q('Using 1 mile ≈ 1.6 km, about how far are 5 miles?',['6.5 km','8 km','10 km'],'8 km','5 × 1.6 = 8 km.'),
 q('Using 1 pound ≈ 0.45 kg, about how much do 2 pounds weigh?',['0.45 kg','0.9 kg','2.45 kg'],'0.9 kg','2 × 0.45 = 0.9 kg.'),
 q('Which is the best approximate equivalence for 1 pint?',['568 ml','100 ml','1,500 ml'],'568 ml','One imperial pint is approximately 568 millilitres.'),
 q('A length is 10 inches. Using 1 inch ≈ 2.5 cm, what is its approximate length?',['4 cm','25 cm','40 cm'],'25 cm','10 × 2.5 = 25 cm.')
 ]},
 {id:'UKS2-MEA-Y6-03',year:6,title:'Calculate area and perimeter',focus:'Recognise that shapes with the same area can have different perimeters and vice versa; calculate area and perimeter',explanation:'Area is the amount of surface inside a shape; perimeter is the distance around its boundary. Shapes can have the same area but different perimeters. For a rectangle, area = length × width and perimeter = 2 × (length + width).',workedExamples:[{question:'A rectangle is 10 cm by 4 cm. Find its area and perimeter.',answer:'40 cm² and 28 cm'},{question:'A rectangle has area 36 cm² and length 9 cm. Find its width.',answer:'4 cm'}],questions:[
 q('A rectangle is 12 cm by 5 cm. What is its area?',['17 cm²','34 cm²','60 cm²'],'60 cm²','12 × 5 = 60 cm².'),
 q('A rectangle is 12 cm by 5 cm. What is its perimeter?',['17 cm','34 cm','60 cm'],'34 cm','12 + 5 + 12 + 5 = 34 cm.'),
 q('A square has area 49 cm². What is the length of one side?',['6 cm','7 cm','8 cm'],'7 cm','7 × 7 = 49, so each side is 7 cm.'),
 q('Which statement is correct?',['Area is measured in square units','Perimeter is measured in litres','Area and perimeter are always equal'],'Area is measured in square units','Area measures a surface and uses square units such as cm².'),
 q('A rectangle has perimeter 40 m and length 12 m. What is its width?',['6 m','8 m','16 m'],'8 m','The two lengths total 24 m, leaving 16 m for two widths; each is 8 m.')
 ]},
 {id:'UKS2-MEA-Y6-04',year:6,title:'Calculate volume of cubes and cuboids',focus:'Recognise, describe and estimate volume and calculate the volume of cubes and cuboids',explanation:'Volume measures the space inside a 3-D object. For a cuboid, multiply its length by its width and height. The answer is written in cubic units, such as cm³. A cube has equal length, width and height.',workedExamples:[{question:'A cuboid is 5 cm long, 3 cm wide and 2 cm high. Find its volume.',answer:'30 cm³'},{question:'A cube has sides of 4 cm. Find its volume.',answer:'64 cm³'}],questions:[
 q('Find the volume of a cuboid 6 cm × 2 cm × 3 cm.',['11 cm³','36 cm³','36 cm²'],'36 cm³','6 × 2 × 3 = 36 cubic centimetres.'),
 q('A cube has sides of 3 cm. What is its volume?',['9 cm³','18 cm³','27 cm³'],'27 cm³','3 × 3 × 3 = 27 cm³.'),
 q('Which unit is used for volume?',['cm','cm²','cm³'],'cm³','Cubic centimetres measure three-dimensional space.'),
 q('A cuboid has volume 48 cm³, length 6 cm and width 4 cm. What is its height?',['2 cm','3 cm','4 cm'],'2 cm','6 × 4 = 24; 48 ÷ 24 = 2 cm.'),
 q('How many 1 cm³ cubes fit into a cuboid with volume 20 cm³?',['10','20','40'],'20','Each small cube has a volume of 1 cm³, so 20 fit.')
 ]},
 {id:'UKS2-MEA-Y6-05',year:6,title:'Solve multi-step measurement problems',focus:'Use all four operations to solve problems involving measure, including time, length, mass, capacity, area and volume',explanation:'Read measurement problems carefully and identify the units before calculating. Convert to a common unit when comparing or combining measurements. Choose the correct formula for area, perimeter or volume, show each step and check that the final unit matches what is being asked.',workedExamples:[{question:'A tank holds 2.5 litres. How many millilitres are in 4 full tanks?',answer:'10,000 ml'},{question:'A rectangular floor is 8 m by 6 m. Tiles cover 2 m² each. How many tiles are needed?',answer:'24 tiles'}],questions:[
 q('A runner completes 4 laps of a 400 m track. How far does the runner travel in kilometres?',['0.16 km','1.6 km','16 km'],'1.6 km','4 × 400 = 1,600 m, which is 1.6 km.'),
 q('Three bottles each contain 750 ml. What is their total capacity in litres?',['1.25 l','2.25 l','3.25 l'],'2.25 l','3 × 750 = 2,250 ml = 2.25 litres.'),
 q('A room is 9 m by 7 m. What is its area?',['16 m²','32 m²','63 m²'],'63 m²','9 × 7 = 63 square metres.'),
 q('A journey takes 1 hour 35 minutes. How many minutes is this?',['85 minutes','95 minutes','105 minutes'],'95 minutes','60 + 35 = 95 minutes.'),
 q('A box measures 10 cm × 4 cm × 3 cm. What is its volume?',['17 cm³','120 cm³','140 cm³'],'120 cm³','10 × 4 × 3 = 120 cubic centimetres.')
 ]}
];
export function getUpperKs2MeasurementLesson(id,year){
 if(!Number.isInteger(year)||![5,6].includes(year))throw new Error('Year must be 5 or 6.');
 const lesson=upperKs2MeasurementLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
