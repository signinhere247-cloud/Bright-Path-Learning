// Supplementary Upper KS2 position and direction lessons.
// Draft content requires educator and statutory objective review.
const q=(prompt,options,answer,explanation)=>({prompt,options,answer,explanation});
export const upperKs2PositionDirectionLessons=[
 {id:'UKS2-POS-Y5-01',year:5,title:'Read and plot coordinates in the first quadrant',focus:'Describe positions on a coordinate grid using ordered pairs',explanation:'Coordinates describe the position of a point on a grid. Read the horizontal coordinate first (across the x-axis), then the vertical coordinate (up the y-axis). The point (3, 5) is 3 units across and 5 units up from the origin (0, 0).',workedExamples:[{question:'Where is a point 4 units across and 2 units up?',answer:'(4, 2)'},{question:'What does the coordinate (6, 3) tell you?',answer:'6 across and 3 up'}],questions:[
 q('Which coordinate is written correctly for 2 across and 7 up?',['(7, 2)','(2, 7)','(2, 0)'],'(2, 7)','Write the across value first, followed by the up value.'),
 q('In the point (5, 4), what is the x-coordinate?',['4','5','9'],'5','The x-coordinate is the first number.'),
 q('In the point (3, 8), how many units up is the point?',['3','8','11'],'8','The y-coordinate is the second number and shows the vertical position.'),
 q('What are the coordinates of the origin?',['(1, 1)','(0, 1)','(0, 0)'],'(0, 0)','The origin is where the two axes meet.'),
 q('A point is at (7, 1). How many units across is it?',['1','7','8'],'7','The first coordinate gives the horizontal distance.')
 ]},
 {id:'UKS2-POS-Y5-02',year:5,title:'Describe movement on a coordinate grid',focus:'Use coordinate language to describe horizontal and vertical movement',explanation:'On a coordinate grid, moving right increases the x-coordinate and moving left decreases it. Moving up increases the y-coordinate and moving down decreases it. Keep track of each change separately and write the new ordered pair in x-then-y order.',workedExamples:[{question:'Move from (2, 3) four units right. Where do you arrive?',answer:'(6, 3)'},{question:'Move from (5, 6) two units down. Where do you arrive?',answer:'(5, 4)'}],questions:[
 q('Move from (1, 4) three units right. What is the new point?',['(4, 4)','(1, 7)','(3, 4)'],'(4, 4)','Add 3 to the x-coordinate: 1 + 3 = 4.'),
 q('Move from (6, 5) two units left. What is the new point?',['(8, 5)','(4, 5)','(6, 3)'],'(4, 5)','Subtract 2 from the x-coordinate.'),
 q('Move from (3, 2) five units up. What is the new point?',['(8, 2)','(3, 7)','(3, 5)'],'(3, 7)','Add 5 to the y-coordinate.'),
 q('Move from (4, 8) three units down. What is the new point?',['(1, 8)','(4, 5)','(4, 11)'],'(4, 5)','Subtract 3 from the y-coordinate.'),
 q('Which movement changes only the x-coordinate?',['Moving up','Moving down','Moving left'],'Moving left','A left or right movement changes the horizontal coordinate only.')
 ]},
 {id:'UKS2-POS-Y5-03',year:5,title:'Translate shapes on a grid',focus:'Describe and represent the position of a shape after a translation',explanation:'A translation slides a shape without rotating, reflecting or resizing it. Every point moves the same number of squares in the same direction. To translate a shape, apply the same horizontal and vertical movement to each vertex, then join the new points in the same order.',workedExamples:[{question:'Translate point (2, 3) five right and one up.',answer:'(7, 4)'},{question:'A triangle moves 2 left and 3 down. What happens to its size and orientation?',answer:'Both stay the same'}],questions:[
 q('Translate (1, 2) three right and two up.',['(4, 4)','(3, 2)','(1, 7)'],'(4, 4)','Add 3 to x and 2 to y.'),
 q('Translate (6, 5) two left and one down.',['(8, 6)','(4, 4)','(4, 6)'],'(4, 4)','Subtract 2 from x and 1 from y.'),
 q('What happens to the size of a shape during a translation?',['It doubles','It stays the same','It halves'],'It stays the same','A translation changes position only.'),
 q('A point moves from (3, 4) to (3, 9). Which translation occurred?',['5 right','5 up','5 down'],'5 up','The x-coordinate is unchanged and y increases by 5.'),
 q('A point moves from (8, 2) to (5, 2). Which translation occurred?',['3 left','3 right','3 down'],'3 left','The x-coordinate decreases by 3, so it moves left.')
 ]},
 {id:'UKS2-POS-Y5-04',year:5,title:'Reflect shapes in a mirror line',focus:'Identify, describe and represent reflections of shapes in horizontal and vertical mirror lines',explanation:'A reflection creates a mirror image across a line. Each original point and its image lie on a line at right angles to the mirror line, and both are the same distance from it. A point on the mirror line does not move. Check the distance from the line, not just the direction.',workedExamples:[{question:'A point is 3 squares left of a vertical mirror line. Where is its image?',answer:'3 squares right of the line'},{question:'What happens to a point that lies exactly on the mirror line?',answer:'It stays in the same place'}],questions:[
 q('A point is 4 squares above a horizontal mirror line. Where is its image?',['4 squares above','4 squares below','8 squares below'],'4 squares below','The image is the same distance on the opposite side.'),
 q('A point lies on the mirror line. Where is its reflection?',['It stays on the line','It moves 1 square','It disappears'],'It stays on the line','Points on the mirror line do not move.'),
 q('What must be equal for a point and its reflected image?',['Their distances from the mirror line','Their x-coordinates in every reflection','Their colours'],'Their distances from the mirror line','The perpendicular distances to the mirror line are equal.'),
 q('A point is 2 squares right of a vertical mirror line. Where is its image?',['2 squares right','2 squares left','4 squares left'],'2 squares left','The reflected point is the same distance on the opposite side.'),
 q('Does reflection change the size of a shape?',['Yes, it doubles','Yes, it halves','No, it stays the same'],'No, it stays the same','Reflection preserves lengths and angles.')
 ]},
 {id:'UKS2-POS-Y5-05',year:5,title:'Describe routes and turns',focus:'Use directional language, compass points and angle turns to describe routes',explanation:'Describe a route using clear instructions such as north, south, east, west, left, right, forwards and backwards. A quarter turn is 90°, a half turn is 180° and a three-quarter turn is 270°. State the starting direction and each turn so another person can follow the route.',workedExamples:[{question:'You face north and make a quarter turn clockwise. Which way do you face?',answer:'East'},{question:'You face east and make a half turn. Which way do you face?',answer:'West'}],questions:[
 q('You face north and turn clockwise by 90°. Which direction do you face?',['West','East','South'],'East','A quarter turn clockwise from north points east.'),
 q('You face south and make a half turn. Which way do you face?',['North','East','West'],'North','A half turn reverses the direction.'),
 q('How many degrees are in a three-quarter turn?',['90°','180°','270°'],'270°','Three quarter turns are 3 × 90° = 270°.'),
 q('Which compass direction is opposite east?',['North','West','South'],'West','West is directly opposite east.'),
 q('You face west and turn clockwise by 90°. Which way do you face?',['South','North','East'],'North','A clockwise quarter turn from west points north.')
 ]},
 {id:'UKS2-POS-Y6-01',year:6,title:'Use coordinates in all four quadrants',focus:'Describe positions on the full coordinate grid, including all four quadrants',explanation:'The coordinate grid has a horizontal x-axis and a vertical y-axis. The origin is (0, 0). In the four quadrants, positive x is right, negative x is left, positive y is up and negative y is down. Always write x first and y second. For example, (-3, 2) is 3 left and 2 up.',workedExamples:[{question:'Where is (-4, 3) relative to the origin?',answer:'4 left and 3 up'},{question:'Which point is 2 right and 5 down?',answer:'(2, -5)'}],questions:[
 q('Which point is 3 left and 4 up?',['(3, 4)','(-3, 4)','(-4, 3)'],'(-3, 4)','Left is negative x; up is positive y.'),
 q('Which point is 5 right and 2 down?',['(5, -2)','(-5, 2)','(2, -5)'],'(5, -2)','Right is positive x; down is negative y.'),
 q('In which direction is the point (-6, -1) from the origin?',['Left and up','Right and down','Left and down'],'Left and down','Both coordinates are negative.'),
 q('What is the y-coordinate of (4, -7)?',['4','-7','7'],'-7','The second number is the y-coordinate.'),
 q('Which point lies on the x-axis?',['(0, 5)','(3, 0)','(2, 4)'],'(3, 0)','Points on the x-axis have a y-coordinate of zero.')
 ]},
 {id:'UKS2-POS-Y6-02',year:6,title:'Plot and interpret points in four quadrants',focus:'Plot specified points and use coordinates to interpret and describe patterns',explanation:'Plot a coordinate by moving along the x-axis first and then vertically to the y-value. Negative values move left or down. Look for patterns in coordinates: points with the same x-value are vertically aligned, while points with the same y-value are horizontally aligned.',workedExamples:[{question:'Which point has the same x-coordinate as (3, -2) but y-coordinate 5?',answer:'(3, 5)'},{question:'A point is (-2, -4). What are its horizontal and vertical positions?',answer:'2 left and 4 down'}],questions:[
 q('Which point is vertically aligned with (4, 2)?',['(1, 2)','(4, -3)','(-4, 2)'],'(4, -3)','Vertically aligned points share the same x-coordinate.'),
 q('Which point is horizontally aligned with (-3, 5)?',['(-3, -2)','(4, 5)','(5, -3)'],'(4, 5)','Horizontally aligned points share the same y-coordinate.'),
 q('Where is (-1, 6)?',['1 right and 6 up','1 left and 6 up','1 left and 6 down'],'1 left and 6 up','Negative x means left; positive y means up.'),
 q('Which point is in the lower-right quadrant?',['(-2, -3)','(2, -3)','(-2, 3)'],'(2, -3)','Lower-right has positive x and negative y.'),
 q('What is the x-coordinate of (-8, 0)?',['0','8','-8'],'-8','The first value is the x-coordinate.')
 ]},
 {id:'UKS2-POS-Y6-03',year:6,title:'Reflect coordinates in axes',focus:'Recognise and describe reflections of points and shapes in the x-axis and y-axis',explanation:'Reflecting a point in the x-axis changes the sign of its y-coordinate but keeps x the same: (x, y) becomes (x, -y). Reflecting in the y-axis changes the sign of x but keeps y the same: (x, y) becomes (-x, y). A point on an axis stays where it is when reflected in that same axis.',workedExamples:[{question:'Reflect (3, 4) in the x-axis.',answer:'(3, -4)'},{question:'Reflect (-2, 5) in the y-axis.',answer:'(2, 5)'}],questions:[
 q('Reflect (6, 2) in the x-axis.',['(-6, 2)','(6, -2)','(-6, -2)'],'(6, -2)','Reflection in the x-axis changes the sign of y only.'),
 q('Reflect (-4, 3) in the y-axis.',['(4, 3)','(-4, -3)','(4, -3)'],'(4, 3)','Reflection in the y-axis changes the sign of x only.'),
 q('Reflect (2, -7) in the x-axis.',['(-2, -7)','(2, 7)','(-2, 7)'],'(2, 7)','Keep x and change the sign of y.'),
 q('Reflect (-5, -1) in the y-axis.',['(5, -1)','(-5, 1)','(5, 1)'],'(5, -1)','Keep y and change the sign of x.'),
 q('What happens when (0, 4) is reflected in the y-axis?',['It becomes (0, -4)','It stays (0, 4)','It becomes (4, 0)'],'It stays (0, 4)','A point on the y-axis remains in the same place.')
 ]},
 {id:'UKS2-POS-Y6-04',year:6,title:'Translate coordinates and shapes',focus:'Describe and perform translations using coordinate changes and vector-style movement descriptions',explanation:'A translation moves every point by the same horizontal and vertical amounts. For example, 3 right and 2 down changes (x, y) to (x + 3, y - 2). Apply the same changes to every vertex of a shape to preserve its size and orientation.',workedExamples:[{question:'Translate (-2, 4) four right and three down.',answer:'(2, 1)'},{question:'A point moves from (5, -1) to (2, 3). Describe the translation.',answer:'3 left and 4 up'}],questions:[
 q('Translate (1, -2) two left and five up.',['(3, 3)','(-1, 3)','(-1, -7)'],'(-1, 3)','Subtract 2 from x and add 5 to y.'),
 q('Translate (-3, 4) six right and two down.',['(3, 2)','(-9, 6)','(3, 6)'],'(3, 2)','Add 6 to x and subtract 2 from y.'),
 q('A point moves from (2, 5) to (7, 1). What is the movement?',['5 right and 4 down','5 left and 4 up','4 right and 5 down'],'5 right and 4 down','x increases by 5 and y decreases by 4.'),
 q('Which statement about a translated shape is true?',['Its angles change','Every point moves by the same amount','It must rotate'],'Every point moves by the same amount','A translation applies one identical movement to all points.'),
 q('Translate (0, -3) one left and two down.',['(1, -1)','(-1, -5)','(-1, 1)'],'(-1, -5)','Subtract 1 from x and 2 from y.')
 ]},
 {id:'UKS2-POS-Y6-05',year:6,title:'Combine position and direction skills',focus:'Solve multi-step problems involving coordinates, reflections, translations, routes and turns',explanation:'Multi-step position problems may involve more than one transformation or movement. Work through each instruction in order and record the new position after each step. Do not combine movements too early if it makes the route difficult to follow. Check signs, direction and coordinate order at every stage.',workedExamples:[{question:'Start at (2, 1), move 3 left and 4 up, then 2 right. Where do you finish?',answer:'(1, 5)'},{question:'Reflect (4, -3) in the y-axis, then translate 1 up.',answer:'(-4, -2)'}],questions:[
 q('Start at (1, 2). Move 4 right, then 3 down. Where do you finish?',['(5, -1)','(-3, 5)','(4, -1)'],'(5, -1)','The x-coordinate becomes 5; the y-coordinate becomes -1.'),
 q('Reflect (3, -2) in the x-axis, then move 2 left.',['(1, 2)','(5, 2)','(1, -2)'],'(1, 2)','First reflect to (3, 2), then move left to (1, 2).'),
 q('Face east and turn anticlockwise by 90°. Which way do you face?',['South','North','West'],'North','An anticlockwise quarter turn from east points north.'),
 q('Start at (-2, 3), translate 5 right and 6 down. What is the final point?',['(3, -3)','(-7, 9)','(3, 9)'],'(3, -3)','Add 5 to x and subtract 6 from y.'),
 q('Reflect (0, -6) in the x-axis, then reflect the result in the y-axis.',['(0, 6)','(0, -6)','(6, 0)'],'(0, 6)','The first reflection changes y to 6; x remains zero in the second reflection.')
 ]}
];
export function getUpperKs2PositionDirectionLesson(id,year){
 if(!Number.isInteger(year)||![5,6].includes(year))throw new Error('Year must be 5 or 6.');
 const lesson=upperKs2PositionDirectionLessons.find(item=>item.id===id&&item.year===year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 return {...lesson,workedExamples:lesson.workedExamples.map(x=>({...x})),questions:lesson.questions.map(x=>({...x,options:[...x.options]}))};
}
