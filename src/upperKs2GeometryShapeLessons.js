// Supplementary Upper KS2 geometry: properties of shape lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const upperKs2GeometryShapeLessons=[
 {id:'UKS2-GEO-Y5-01',year:5,title:'Classify 2-D shapes and polygons',focus:'Compare and classify geometric shapes based on their properties and distinguish regular and irregular polygons',explanation:'A polygon is a closed 2-D shape made from straight sides. Regular polygons have all sides equal and all interior angles equal. Irregular polygons do not have all sides and angles equal. Use the number of sides and the angle properties to classify shapes.',workedExamples:[{question:'What is a regular polygon with 6 equal sides called?',answer:'A regular hexagon'},{question:'Is a rectangle with unequal length and width a regular polygon?',answer:'No, its sides are not all equal'}],questions:[
 q('How many sides does a pentagon have?',['4','5','6'],'5','A pentagon has five straight sides.'),
 q('What makes a polygon regular?',['All sides and angles are equal','It has exactly four sides','It has curved edges'],'All sides and angles are equal','A regular polygon has equal sides and equal interior angles.'),
 q('Which shape is not a polygon?',['Triangle','Circle','Hexagon'],'Circle','A circle has a curved boundary, not straight sides.'),
 q('How many sides does an octagon have?',['6','7','8'],'8','An octagon has eight sides.'),
 q('A shape has 4 equal sides and 4 right angles. What is it?',['Square','Rectangle with unequal sides','Triangle'],'Square','A square has four equal sides and four right angles.')
 ]},
 {id:'UKS2-GEO-Y5-02',year:5,title:'Understand and compare angles',focus:'Know that angles are measured in degrees and estimate, compare and measure angles up to 180 degrees',explanation:'An angle measures the turn between two straight lines that meet at a point. A right angle is 90°, an acute angle is less than 90°, and an obtuse angle is greater than 90° but less than 180°. A straight angle is 180°. Estimate first, then measure carefully with a protractor.',workedExamples:[{question:'What type of angle is 45°?',answer:'Acute'},{question:'How many degrees are in a straight angle?',answer:'180°'}],questions:[
 q('Which is an acute angle?',['35°','90°','120°'],'35°','An acute angle is smaller than 90°.'),
 q('Which is an obtuse angle?',['60°','90°','135°'],'135°','An obtuse angle is greater than 90° and less than 180°.'),
 q('How many degrees are in a right angle?',['45°','90°','180°'],'90°','A right angle is exactly 90 degrees.'),
 q('Which angle is closest to a straight angle?',['175°','90°','25°'],'175°','A straight angle is 180°, so 175° is closest.'),
 q('An angle is 110°. What type is it?',['Acute','Obtuse','Reflex'],'Obtuse','110° is greater than 90° and less than 180°.')
 ]},
 {id:'UKS2-GEO-Y5-03',year:5,title:'Angles on a straight line and around a point',focus:'Recognise that angles at a point sum to 360 degrees, angles on a straight line sum to 180 degrees and vertically opposite angles are equal',explanation:'Angles on a straight line add to 180°. Angles around a point add to 360°. When two straight lines cross, vertically opposite angles are equal. Use these facts to calculate a missing angle by subtracting the known angles from the total.',workedExamples:[{question:'One angle on a straight line is 125°. Find the other angle.',answer:'55°'},{question:'Three angles around a point are 90°, 120° and 80°. Find the fourth.',answer:'70°'}],questions:[
 q('An angle on a straight line is 70°. What is the other angle?',['90°','110°','290°'],'110°','180° − 70° = 110°.'),
 q('Angles around a point total how many degrees?',['180°','270°','360°'],'360°','A full turn is 360 degrees.'),
 q('Three angles around a point are 100°, 90° and 80°. What is the fourth angle?',['80°','90°','100°'],'90°','360° − (100° + 90° + 80°) = 90°.'),
 q('Two straight lines cross. One angle is 65°. What is the vertically opposite angle?',['65°','115°','295°'],'65°','Vertically opposite angles are equal.'),
 q('An angle on a straight line is 142°. Find the missing angle.',['28°','38°','48°'],'38°','180° − 142° = 38°.')
 ]},
 {id:'UKS2-GEO-Y5-04',year:5,title:'Describe 3-D shapes and their properties',focus:'Identify and describe 3-D shapes, including cubes, cuboids and other common solids, using faces, edges and vertices',explanation:'A 3-D shape has length, width and height. Faces are the flat or curved surfaces, edges are where faces meet, and vertices are corners where edges meet. A cube has 6 square faces, 12 edges and 8 vertices. A cuboid also has 6 faces, 12 edges and 8 vertices.',workedExamples:[{question:'How many faces does a cube have?',answer:'6'},{question:'How many vertices does a cuboid have?',answer:'8'}],questions:[
 q('How many edges does a cube have?',['8','12','6'],'12','A cube has 12 edges.'),
 q('How many vertices does a cuboid have?',['6','8','12'],'8','A cuboid has eight corners, called vertices.'),
 q('Which solid has one curved surface and two circular flat faces?',['Cylinder','Cube','Pyramid'],'Cylinder','A cylinder has two circular flat faces and one curved surface.'),
 q('What is a face of a 3-D shape?',['A corner','A surface','A line where faces meet'],'A surface','A face is a surface of a solid shape.'),
 q('Which solid has a single polygon base and triangular faces meeting at one point?',['Pyramid','Sphere','Cylinder'],'Pyramid','A pyramid has a polygon base and triangular faces that meet at an apex.')
 ]},
 {id:'UKS2-GEO-Y5-05',year:5,title:'Reflect and translate shapes',focus:'Identify, describe and represent the position of a shape following reflection or translation',explanation:'A reflection flips a shape across a mirror line. Each point stays the same perpendicular distance from the mirror line on the opposite side. A translation slides a shape without turning or flipping it. Every point moves the same distance in the same direction.',workedExamples:[{question:'A shape is translated 3 squares right and 2 squares up. What happens to its orientation?',answer:'It stays the same'},{question:'In a reflection, a point is 4 squares from the mirror line. How far is its image from the mirror line?',answer:'4 squares on the opposite side'}],questions:[
 q('What does a translation do?',['Slides a shape','Turns a shape','Flips a shape'],'Slides a shape','A translation moves every point the same distance in the same direction.'),
 q('What does a reflection do?',['Enlarges a shape','Flips a shape in a mirror line','Changes its angles'],'Flips a shape in a mirror line','Reflection produces a mirror image across a line.'),
 q('A point is 3 squares from a mirror line. How far away is its reflected image?',['1 square','3 squares','6 squares'],'3 squares','The image is the same perpendicular distance from the mirror line.'),
 q('A shape moves 5 squares left. What is this movement called?',['Rotation','Translation','Reflection'],'Translation','Sliding a shape is a translation.'),
 q('During a translation, what happens to the shape size?',['It doubles','It becomes smaller','It stays the same'],'It stays the same','Translation changes position only, not size or orientation.')
 ]},
 {id:'UKS2-GEO-Y6-01',year:6,title:'Draw and construct 2-D shapes accurately',focus:'Draw 2-D shapes using given dimensions and angles and recognise, describe and build simple 3-D shapes',explanation:'Use a ruler to draw accurate lengths and a protractor to construct angles. Mark measurements clearly and check that sides meet at the correct points. A diagram should include labels and units so another person can understand the shape.',workedExamples:[{question:'A triangle has angles 50° and 60°. Find its third angle.',answer:'70°'},{question:'A rectangle is 8 cm long and 3 cm wide. What are the lengths of its opposite sides?',answer:'Two sides of 8 cm and two sides of 3 cm'}],questions:[
 q('What is the total of the interior angles in a triangle?',['90°','180°','360°'],'180°','The interior angles in every triangle add to 180 degrees.'),
 q('A triangle has angles 45° and 85°. Find the third angle.',['40°','50°','60°'],'50°','180° − 45° − 85° = 50°.'),
 q('Which tool is used to measure an angle accurately?',['Ruler','Protractor','Compass only'],'Protractor','A protractor measures angles in degrees.'),
 q('A rectangle has one side of 9 cm and an adjacent side of 4 cm. What is its perimeter?',['13 cm','26 cm','36 cm'],'26 cm','Opposite sides match: 9 + 4 + 9 + 4 = 26 cm.'),
 q('How many right angles does a square have?',['2','3','4'],'4','Each of the four interior angles in a square is 90 degrees.')
 ]},
 {id:'UKS2-GEO-Y6-02',year:6,title:'Calculate angles in triangles and quadrilaterals',focus:'Use known angle facts to calculate missing angles in triangles and quadrilaterals',explanation:'The interior angles of a triangle add to 180°. The interior angles of a quadrilateral add to 360°. A right-angled triangle has one 90° angle, and an equilateral triangle has three 60° angles. Subtract the known angles from the total to find a missing angle.',workedExamples:[{question:'A quadrilateral has angles 90°, 80° and 100°. Find the fourth angle.',answer:'90°'},{question:'An isosceles triangle has a top angle of 40°. Find each equal base angle.',answer:'70°'}],questions:[
 q('A triangle has angles 40° and 65°. What is the third angle?',['65°','75°','85°'],'75°','180° − 40° − 65° = 75°.'),
 q('What is the total of the interior angles in a quadrilateral?',['180°','270°','360°'],'360°','A quadrilateral has interior angles that add to 360 degrees.'),
 q('A quadrilateral has angles 90°, 90° and 70°. Find the fourth angle.',['90°','100°','110°'],'110°','360° − 90° − 90° − 70° = 110°.'),
 q('An equilateral triangle has three equal angles. What is each angle?',['45°','60°','90°'],'60°','180° divided by 3 is 60°.'),
 q('An isosceles triangle has two equal angles of 55°. Find the third angle.',['60°','70°','80°'],'70°','180° − 55° − 55° = 70°.')
 ]},
 {id:'UKS2-GEO-Y6-03',year:6,title:'Understand circles and their parts',focus:'Recognise, describe and name parts of a circle, including radius, diameter and circumference',explanation:'The centre is the middle point of a circle. A radius is a straight line from the centre to the circumference. A diameter passes through the centre and joins two points on the circumference. The diameter is twice the radius. The circumference is the distance around the circle.',workedExamples:[{question:'A circle has radius 4 cm. What is its diameter?',answer:'8 cm'},{question:'A circle has diameter 18 cm. What is its radius?',answer:'9 cm'}],questions:[
 q('What is the diameter of a circle with radius 6 cm?',['3 cm','6 cm','12 cm'],'12 cm','Diameter is twice the radius: 2 × 6 = 12 cm.'),
 q('What is the radius of a circle with diameter 20 cm?',['5 cm','10 cm','40 cm'],'10 cm','Radius is half the diameter.'),
 q('Which line passes through the centre and joins two points on the circumference?',['Radius','Diameter','Chord that misses the centre'],'Diameter','The diameter crosses the centre and reaches the circumference at both ends.'),
 q('What is the circumference?',['The distance around a circle','The distance across its centre','The point in the middle'],'The distance around a circle','Circumference is the perimeter of a circle.'),
 q('A radius is 3.5 cm. What is the diameter?',['1.75 cm','7 cm','10.5 cm'],'7 cm','Double 3.5 cm to get 7 cm.')
 ]},
 {id:'UKS2-GEO-Y6-04',year:6,title:'Angles in polygons and turns',focus:'Recognise angles where they meet at a point, on a straight line or are vertically opposite and use angle facts to solve problems',explanation:'Use 180° for a straight line, 360° for a full turn and equality for vertically opposite angles. A polygon is made of straight sides. You can split a polygon into triangles to reason about its interior angles. Always identify which angle total applies before calculating.',workedExamples:[{question:'Five angles around a point are 60°, 70°, 80°, 90° and x. Find x.',answer:'60°'},{question:'A regular hexagon has six equal interior angles. Their total is 720°. Find one interior angle.',answer:'120°'}],questions:[
 q('Two angles on a straight line are x and 125°. Find x.',['45°','55°','65°'],'55°','180° − 125° = 55°.'),
 q('An angle is vertically opposite to 118°. What is its size?',['62°','118°','242°'],'118°','Vertically opposite angles are equal.'),
 q('Four angles around a point are 90°, 80°, 100° and x. Find x.',['80°','90°','100°'],'90°','360° − 90° − 80° − 100° = 90°.'),
 q('A regular pentagon has five equal interior angles with a total of 540°. What is each angle?',['100°','108°','120°'],'108°','540° ÷ 5 = 108°.'),
 q('A regular hexagon has six equal interior angles with a total of 720°. What is each angle?',['110°','120°','130°'],'120°','720° ÷ 6 = 120°.')
 ]},
 {id:'UKS2-GEO-Y6-05',year:6,title:'Use shape properties to solve problems',focus:'Use knowledge of shape properties, angles, symmetry and position to reason and solve multi-step geometry problems',explanation:'Geometry problems often combine several facts. Look for equal sides, parallel lines, right angles, symmetry and known angle totals. Draw or annotate a diagram, write down the fact you are using and calculate one unknown at a time. Check that your answer is consistent with the shape.',workedExamples:[{question:'A rectangle has perimeter 34 cm and length 10 cm. Find its width.',answer:'7 cm'},{question:'A triangle has angles 35° and 75°. Find the third angle and classify it.',answer:'70°, acute'}],questions:[
 q('A rectangle has perimeter 42 cm and length 13 cm. What is its width?',['8 cm','9 cm','16 cm'],'8 cm','The two lengths total 26 cm, leaving 16 cm for two widths; each is 8 cm.'),
 q('A triangle has angles 48° and 62°. What is the third angle?',['60°','70°','80°'],'70°','180° − 48° − 62° = 70°.'),
 q('A square has perimeter 36 cm. What is its area?',['36 cm²','72 cm²','81 cm²'],'81 cm²','Each side is 36 ÷ 4 = 9 cm; area is 9 × 9 = 81 cm².'),
 q('A circle has diameter 14 cm. What is its radius?',['6 cm','7 cm','28 cm'],'7 cm','The radius is half the diameter.'),
 q('A quadrilateral has three angles of 85°, 95° and 110°. What is the fourth angle?',['60°','70°','80°'],'70°','360° − 85° − 95° − 110° = 70°.')
 ]}
];
export function getUpperKs2GeometryShapeLesson(id,year){
 if(!Number.isInteger(year)||![5,6].includes(year))throw new Error('Year must be 5 or 6.');
 const lesson=upperKs2GeometryShapeLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
