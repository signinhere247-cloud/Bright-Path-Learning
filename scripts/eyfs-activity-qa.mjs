import {eyfsPlayActivities} from '../src/eyfsPlayActivities.js';
import backlog from '../curriculum/eyfs-activity-backlog.json' with {type:'json'};

const planned=backlog.activities;
const byId=new Map(eyfsPlayActivities.map(a=>[a.id,a]));
const expectedAreas=new Map([
 ['P1','Communication and language'],['P2','Personal, social and emotional development'],
 ['P3','Physical development'],['P4','Literacy'],['P5','Mathematics'],
 ['P6','Understanding the world'],['P7','Expressive arts and design']
]);
const findings=[];
const add=(id,field,message)=>findings.push({id,field,message});
if(eyfsPlayActivities.length!==planned.length)add('ALL','count','Implemented and planned guide counts differ');
if(byId.size!==eyfsPlayActivities.length)add('ALL','id','Duplicate implemented activity IDs');
const plannedIds=new Set(planned.map(a=>a.id));
for(const p of planned){
 const a=byId.get(p.id);
 if(!a){add(p.id,'missing','Planned activity has no implemented guide');continue;}
 if(a.strandId!==p.strandId)add(p.id,'strandId','Strand does not match backlog');
 const area=expectedAreas.get(p.strandId.match(/EYFS-(P\d+)-/)?.[1]);
 if(!area||a.area!==area)add(p.id,'area','Learning area does not match strand');
 if(!a.title||!a.minutes||!a.materials||!a.adultPrompt)add(p.id,'guidance','Missing title, duration, materials or adult prompt');
 if(!Array.isArray(a.steps)||a.steps.length<3||a.steps.some(s=>!s.trim()))add(p.id,'steps','Missing or incomplete practical instructions');
 if(!a.alternatives||!a.safety)add(p.id,'inclusion','Missing accessible alternatives or safety guidance');
 if('score' in a||'upload' in a)add(p.id,'privacy','Activity must not require score or upload');
}
for(const a of eyfsPlayActivities)if(!plannedIds.has(a.id))add(a.id,'unplanned','Guide has no backlog trace');
const summary={planned:planned.length,implemented:eyfsPlayActivities.length,areas:new Set(eyfsPlayActivities.map(a=>a.area)).size,codeChecksPassed:findings.length===0,findings,reviewStillRequired:['educator curriculum alignment','statutory ELG evidence','accessibility in real devices','safeguarding review','child learning observations']};
if(process.argv.includes('--json'))console.log(JSON.stringify(summary,null,2));
else console.log('EYFS activity QA: '+summary.implemented+'/'+summary.planned+' guides; '+summary.areas+' areas; '+summary.findings.length+' code findings. Human review still required.');
if(findings.length)process.exitCode=1;
