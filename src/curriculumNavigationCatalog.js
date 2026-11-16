// Step 90: pure, non-UI curriculum discovery contract. No pupil data is changed.
// Supplementary modules are draft content and are deliberately hidden from pupils.
import {upperKs2NumberPlaceValueLessons} from './upperKs2NumberPlaceValueLessons.js';
import {upperKs2CalculationLessons} from './upperKs2CalculationLessons.js';
import {upperKs2FractionsDecimalsPercentagesLessons} from './upperKs2FractionsDecimalsPercentagesLessons.js';
import {upperKs2MeasurementLessons} from './upperKs2MeasurementLessons.js';
import {upperKs2GeometryShapeLessons} from './upperKs2GeometryShapeLessons.js';
import {upperKs2PositionDirectionLessons} from './upperKs2PositionDirectionLessons.js';
import {upperKs2StatisticsLessons} from './upperKs2StatisticsLessons.js';

const sources = [
 ['Number and place value',upperKs2NumberPlaceValueLessons],
 ['Calculations',upperKs2CalculationLessons],
 ['Fractions, decimals and percentages',upperKs2FractionsDecimalsPercentagesLessons],
 ['Measurement',upperKs2MeasurementLessons],
 ['Geometry: properties of shape',upperKs2GeometryShapeLessons],
 ['Position and direction',upperKs2PositionDirectionLessons],
 ['Statistics',upperKs2StatisticsLessons]
];

const draftCatalog = sources.flatMap(([topic,lessons]) => lessons.map(lesson => ({
 id:lesson.id, year:lesson.year, subject:'Maths', topic, title:lesson.title,
 reviewStatus:'educator-review-required', published:false,
 questionCount:lesson.questions.length
})));

/** Returns independent summary objects, never question answers or learner records. */
export function listCurriculumLessons({year,subject='Maths',includeDrafts=false}={}){
 if(year!==undefined && (![5,6].includes(year)||!Number.isInteger(year)))throw new Error('Supported years are 5 and 6.');
 if(subject!=='Maths')return [];
 if(!includeDrafts)return [];
 return draftCatalog.filter(x=>year===undefined||x.year===year).map(x=>({...x}));
}

/** Drafts cannot be launched from the pupil interface. */
export function canLaunchCurriculumLesson(id){
 return draftCatalog.some(x=>x.id===id&&x.published===true&&x.reviewStatus==='approved');
}
