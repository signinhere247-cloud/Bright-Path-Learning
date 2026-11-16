// Supplementary Lower KS2 geometry lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const lowerKs2GeometryLessons=[
 {id:'LKS2-GE-Y3-01',year:3,title:'Recognise and describe 2D shapes',focus:'Draw 2-D shapes and recognise them in different orientations',explanation:'A 2-D shape is flat. It has sides and vertices (corners). A polygon is a closed 2-D shape made from straight sides. Turning a shape does not change its properties.',workedExamples:[{question:'How many sides does a pentagon have?',answer:'5'},{question:'What is the name of a 2-D shape with 6 straight sides?',answer:'Hexagon'}],questions:[
 q('How many sides does a hexagon have?',['5','6','8'],'6','A hexagon has six straight sides.'),
 q('Which shape has 4 equal sides and 4 right angles?',['Square','Triangle','Pentagon'],'Square','A square has four equal sides and four right angles.'),
 q('What is a vertex?',['A curved edge','A corner where sides meet','The space inside a shape'],'A corner where sides meet','A vertex is a corner of a shape where two sides meet.'),
 q('Which of these is not a polygon?',['Rectangle','Circle','Triangle'],'Circle','A polygon is made from straight sides; a circle has a curved edge.'),
 q('A shape has 8 straight sides. What is it called?',['Heptagon','Octagon','Hexagon'],'Octagon','An octagon has eight sides.')
 ]},
 {id:'LKS2-GE-Y3-02',year:3,title:'Recognise and describe 3D shapes',focus:'Make 3-D shapes and describe their properties',explanation:'A 3-D shape has length, width and height. It can have flat faces, curved surfaces, edges and vertices. A cube has six square faces; a cuboid has six rectangular faces.',workedExamples:[{question:'How many faces does a cube have?',answer:'6'},{question:'Which 3-D shape has one circular face and one curved surface?',answer:'Cone'}],questions:[
 q('How many faces does a cube have?',['4','6','8'],'6','A cube has six square faces.'),
 q('Which shape has two circular faces and one curved surface?',['Cylinder','Sphere','Pyramid'],'Cylinder','A cylinder has two flat circular faces and one curved surface.'),
 q('What is an edge on a 3-D shape?',['A line where two faces meet','A corner','A flat face'],'A line where two faces meet','An edge is where two faces join.'),
 q('Which 3-D shape has one curved surface and no flat faces?',['Cone','Sphere','Cuboid'],'Sphere','A sphere has one continuous curved surface and no flat faces.'),
 q('How many vertices does a cuboid have?',['6','8','12'],'8','A cuboid has eight corners, called vertices.')
 ]},
 {id:'LKS2-GE-Y3-03',year:3,title:'Make and interpret 2D shapes',focus:'Recognise 2-D shapes and construct simple 2-D shapes using practical resources',explanation:'You can build and draw 2-D shapes using straight lines, rulers, sticks or geoboards. Count the sides and vertices to check the shape. Shapes can look different when rotated but still have the same properties.',workedExamples:[{question:'How many sticks of equal length could make a triangle?',answer:'3'},{question:'A shape has 4 sides and opposite sides equal. What could it be?',answer:'Rectangle'}],questions:[
 q('How many straight sides are needed to make a triangle?',['2','3','4'],'3','A triangle is a closed shape with three straight sides.'),
 q('Which tool is useful for drawing a straight side accurately?',['Ruler','Compass only','Protractor only'],'Ruler','A ruler helps you draw and measure straight line segments.'),
 q('If you turn a square onto one corner, what happens to its number of sides?',['It becomes 3','It stays 4','It becomes 5'],'It stays 4','Rotation changes the orientation, not the shape properties.'),
 q('Which shape can be made with 5 straight sides?',['Pentagon','Hexagon','Octagon'],'Pentagon','A pentagon has five straight sides.'),
 q('A closed shape has 4 straight sides. Which statement must be true?',['It is a quadrilateral','It is always a square','It has 4 curved sides'],'It is a quadrilateral','Any four-sided polygon is a quadrilateral.')
 ]},
 {id:'LKS2-GE-Y3-04',year:3,title:'Understand right angles and turns',focus:'Recognise angles as a property of shape or a description of a turn',explanation:'An angle is made when two straight lines or sides meet. A right angle is a quarter turn. A half turn is two right angles and a full turn is four right angles. Angles can be found in shapes and in everyday turns.',workedExamples:[{question:'How many right angles are in a half turn?',answer:'2'},{question:'What fraction of a full turn is a quarter turn?',answer:'One quarter'}],questions:[
 q('How many right angles make a full turn?',['2','3','4'],'4','A full turn is four quarter turns, so it contains four right angles.'),
 q('How many right angles make a half turn?',['1','2','4'],'2','A half turn is 180 degrees, or two right angles.'),
 q('Which object commonly has a right angle?',['The corner of a book','The edge of a ball','A curved hoop'],'The corner of a book','The square corner of a book is a right angle.'),
 q('A quarter turn clockwise from facing north points in which direction?',['West','East','South'],'East','Turning a quarter turn clockwise from north points east.'),
 q('Which angle is smaller than a right angle?',['Acute angle','Obtuse angle','Straight angle'],'Acute angle','An acute angle is less than a right angle.')
 ]},
 {id:'LKS2-GE-Y4-01',year:4,title:'Classify 2D shapes',focus:'Compare and classify geometric shapes, including quadrilaterals and triangles, based on their properties',explanation:'Shapes can be classified by their sides, angles and parallel lines. A quadrilateral is any polygon with four sides. A square, rectangle, rhombus, parallelogram and trapezium are all quadrilaterals.',workedExamples:[{question:'What is the name for any four-sided polygon?',answer:'Quadrilateral'},{question:'How many pairs of parallel sides does a rectangle have?',answer:'2'}],questions:[
 q('Which shape is a quadrilateral?',['Triangle','Pentagon','Rhombus'],'Rhombus','A rhombus has four sides, so it is a quadrilateral.'),
 q('How many pairs of parallel sides does a rectangle have?',['1','2','4'],'2','Both pairs of opposite sides in a rectangle are parallel.'),
 q('Which property is true of every square?',['Four equal sides','Exactly one right angle','Three vertices'],'Four equal sides','Every square has four equal sides and four right angles.'),
 q('How many sides does a quadrilateral have?',['3','4','5'],'4','The word quadrilateral describes a four-sided polygon.'),
 q('Which shape has exactly one pair of parallel sides in the usual UK definition?',['Trapezium','Square','Rhombus'],'Trapezium','A trapezium has one pair of parallel sides.')
 ]},
 {id:'LKS2-GE-Y4-02',year:4,title:'Identify lines of symmetry',focus:'Identify lines of symmetry in 2-D shapes presented in different orientations',explanation:'A line of symmetry divides a shape into two matching halves that fit exactly on top of each other when folded along the line. Some shapes have more than one line of symmetry, and some have none.',workedExamples:[{question:'How many lines of symmetry does a square have?',answer:'4'},{question:'How many lines of symmetry does a non-square rectangle have?',answer:'2'}],questions:[
 q('How many lines of symmetry does a square have?',['2','4','8'],'4','A square has two lines through opposite midpoints and two diagonals.'),
 q('How many lines of symmetry does a non-square rectangle have?',['1','2','4'],'2','A non-square rectangle has one horizontal and one vertical line of symmetry through its centre.'),
 q('Which shape has no lines of symmetry?',['A typical scalene triangle','A square','An equilateral triangle'],'A typical scalene triangle','A scalene triangle has no equal sides and no line that divides it into matching halves.'),
 q('What must happen when a shape is folded along a line of symmetry?',['The halves match exactly','The shape doubles in size','The corners disappear'],'The halves match exactly','A line of symmetry makes two matching mirror-image halves.'),
 q('How many lines of symmetry does an equilateral triangle have?',['1','2','3'],'3','Each vertex can be joined to the midpoint of the opposite side.')
 ]},
 {id:'LKS2-GE-Y4-03',year:4,title:'Compare and order angles',focus:'Compare and order angles up to two right angles by size',explanation:'An angle measures the amount of turn between two lines. A right angle is 90 degrees. An acute angle is smaller than a right angle; an obtuse angle is greater than 90 degrees but smaller than a straight angle. A straight angle is 180 degrees.',workedExamples:[{question:'Is 120 degrees acute, right or obtuse?',answer:'Obtuse'},{question:'Which is larger: 45 degrees or 90 degrees?',answer:'90 degrees'}],questions:[
 q('An angle of 35 degrees is which type?',['Acute','Right','Obtuse'],'Acute','35 degrees is less than 90 degrees, so it is acute.'),
 q('An angle of 145 degrees is which type?',['Acute','Right','Obtuse'],'Obtuse','145 degrees is greater than 90 degrees and less than 180 degrees.'),
 q('How many degrees are in a right angle?',['45','90','180'],'90','A right angle measures 90 degrees.'),
 q('Which angle is the largest?',['60 degrees','100 degrees','150 degrees'],'150 degrees','150 degrees is greater than both 100 and 60 degrees.'),
 q('What is the name for an angle of exactly 180 degrees?',['Acute angle','Straight angle','Reflex angle'],'Straight angle','A straight angle measures 180 degrees.')
 ]},
 {id:'LKS2-GE-Y4-04',year:4,title:'Classify triangles and quadrilaterals',focus:'Identify and compare triangles and quadrilaterals using their properties',explanation:'Triangles have three sides. An equilateral triangle has three equal sides, an isosceles triangle has at least two equal sides, and a scalene triangle has no equal sides. Quadrilaterals have four sides and can be compared by side lengths, angles and parallel sides.',workedExamples:[{question:'What type of triangle has three equal sides?',answer:'Equilateral'},{question:'What type of triangle has no equal sides?',answer:'Scalene'}],questions:[
 q('A triangle has three equal sides. What type is it?',['Isosceles','Equilateral','Scalene'],'Equilateral','An equilateral triangle has three equal sides.'),
 q('A triangle has two equal sides. What type is it?',['Isosceles','Scalene','Equilateral'],'Isosceles','An isosceles triangle has at least two equal sides.'),
 q('How many sides does a quadrilateral have?',['3','4','5'],'4','A quadrilateral is a polygon with four sides.'),
 q('Which quadrilateral has four equal sides but does not have to have four right angles?',['Rhombus','Rectangle','Trapezium'],'Rhombus','A rhombus has four equal sides; its angles do not have to be right angles.'),
 q('Which property is shared by all rectangles?',['Four right angles','Four equal sides','No parallel sides'],'Four right angles','Every rectangle has four right angles; its sides need not all be equal.')
 ]}
];
export function getLowerKs2GeometryLesson(id,year){
 if(!Number.isInteger(year)||![3,4].includes(year))throw new Error('Year must be 3 or 4.');
 const lesson=lowerKs2GeometryLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
