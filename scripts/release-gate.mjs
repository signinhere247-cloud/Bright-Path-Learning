// Conservative local release gate. Never interprets an offline check as live verification.
import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const run=(args)=>spawnSync('npm',args,{cwd:root,encoding:'utf8',timeout:120000});
const steps=[];
function check(name,args){
 const result=run(args);
 const passed=result.status===0 && !result.error;
 steps.push({name,status:passed?'PASS':'BLOCKED',detail:passed?'Command succeeded':(result.error?.message||`Exit ${result.status}`)});
 console.log(`${passed?'PASS':'BLOCKED'} ${name}`);
 if(!passed){const lines=(result.stderr||result.stdout||'').trim().split('\n');console.log(`  ${lines.slice(-3).join(' | ')}`);}
 return passed;
}
const lock=existsSync(resolve(root,'package-lock.json'));
steps.push({name:'Reproducible dependency lockfile',status:lock?'PASS':'BLOCKED',detail:lock?'package-lock.json present':'Generate and commit package-lock.json with npm install'});
console.log(`${lock?'PASS':'BLOCKED'} Reproducible dependency lockfile`);
check('Offline unit tests',['test']);
check('Offline source audit',['run','audit']);
check('Static deployment safety',['run','check:deploy']);
check('Isolated preview blueprint',['run','check:preview']);
const dependencies=check('Build prerequisites',['run','check:build']);
if(dependencies){if(check('Production build',['run','build']))check('Generated website assets',['run','check:output']);}
else{steps.push({name:'Production build',status:'NOT RUN',detail:'Build prerequisites failed'});console.log('NOT RUN Production build');}
// These require a real browser and a configured staging service; do not infer success.
steps.push({name:'Browser gameplay',status:'NOT VERIFIED',detail:'Run npm run test:browser after installing Chromium; complete BROWSER-TEST-PLAN.md'});
steps.push({name:'Staging cloud security',status:'NOT VERIFIED',detail:'Apply migrations to staging and test with two independent parent accounts'});
console.log('NOT VERIFIED Browser gameplay');
console.log('NOT VERIFIED Staging cloud security');
const blocked=steps.filter(s=>s.status!=='PASS');
console.log(`\nRelease gate: ${steps.length-blocked.length}/${steps.length} checks passed; ${blocked.length} blockers/unverified checks.`);
if(blocked.length)process.exitCode=1;
