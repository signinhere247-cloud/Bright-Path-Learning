import {ks1FoundationSubjects,ks1FoundationBank,ks1FoundationLesson} from '../src/ks1Foundation.js';
const subjects=ks1FoundationSubjects.map(name=>{const topics=ks1FoundationBank[name].map(([topic])=>{const lesson=ks1FoundationLesson(name,topic,6);return {name:topic,questions:lesson.questions.length};});return {name,topics,questionTotal:topics.reduce((n,t)=>n+t.questions,0)};});
const gaps={
 'KS1 Science':['Year-specific plants, animals, everyday materials and seasonal change progression','Working scientifically through observations, comparisons and simple investigations'],
 'KS1 History':['Chronology, significant people/events and local history using real sources'],
 'KS1 Geography':['Local fieldwork, maps, compass directions, place and human/physical features'],
 'KS1 Art':['Drawing, painting, sculpture and artist-inspired practical making'],
 'KS1 Computing':['Programming and debugging, safe technology use and digital literacy'],
 'KS1 Design and Technology':['Design, make, evaluate and cooking/nutrition with safe adult supervision'],
 'KS1 Music':['Singing, listening, composing and performing using real sound'],
 'KS1 PE':['Physical movement, games, dance and evidence of practical participation']
};
const report={stage:'KS1 foundation subjects',status:'inventory-only-unverified',years:['Year 1','Year 2'],subjects,topicTotal:subjects.reduce((n,s)=>n+s.topics.length,0),questionTotal:subjects.reduce((n,s)=>n+s.questionTotal,0),reviewGaps:subjects.map(s=>({subject:s.name,gaps:gaps[s.name]||['Year-specific statutory objectives and authentic practical work need review']})),findings:['Questions do not establish hands-on science, arts, design or PE performance','Year 1 and Year 2 objective coverage remains unverified','Religious education and additional personal development provision require separate local-policy review']};
console.log(JSON.stringify(report,null,2));
