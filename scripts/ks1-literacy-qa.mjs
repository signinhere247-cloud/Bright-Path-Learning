import {ks1PhonicsSequences} from '../src/ks1PhonicsSequences.js';
import {ks1ReadingPassages} from '../src/ks1ReadingPassages.js';
import {ks1WritingActivities} from '../src/ks1WritingActivities.js';
import {ks1SpellingHandwritingActivities} from '../src/ks1SpellingHandwriting.js';
const sets=[['phonics',ks1PhonicsSequences],['reading',ks1ReadingPassages],['writing',ks1WritingActivities],['spelling-handwriting',ks1SpellingHandwritingActivities]];
const ids=sets.flatMap(([,items])=>items.map(x=>x.id));
const findings=[];
for(const [name,items] of sets){
 if(items.length!==4)findings.push(name+' should have four activities');
 if(items.filter(x=>x.year===1).length!==2||items.filter(x=>x.year===2).length!==2)findings.push(name+' has uneven year grouping');
 if(items.some(x=>!x.title||!x.id))findings.push(name+' has incomplete metadata');
}
if(new Set(ids).size!==ids.length)findings.push('Duplicate activity IDs');
const report={stage:'KS1 literacy expansion',status:findings.length?'needs-technical-fixes':'technical-structure-passed-educational-review-pending',groups:sets.map(([name,items])=>({name,count:items.length,year1:items.filter(x=>x.year===1).length,year2:items.filter(x=>x.year===2).length})),totalActivities:ids.length,findings,unresolved:['No live UI integration for these four supplementary modules','No formal Year 1/2 statutory objective-by-objective mapping','No educator validation of phonics sequence, reading difficulty or spelling progression','No practical observation or child writing/reading fluency assessment','Spoken language and accessible alternatives need further coverage']};
console.log(JSON.stringify(report,null,2));
if(findings.length)process.exitCode=1;
