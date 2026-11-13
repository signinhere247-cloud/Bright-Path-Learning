// Offline checks for a separate, cloud-disabled preview configuration.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export function inspectPreview(preview,live){
 const issues=[];
 const required=[
  [/^\s*- type: web\s*$/m,'Preview must define a web service'],
  [/^\s*name: brightpath-learning-preview\s*$/m,'Preview must have a distinct service name'],
  [/^\s*runtime: static\s*$/m,'Preview must use static hosting'],
  [/^\s*buildCommand: npm ci && npm run build\s*$/m,'Preview must use reproducible npm ci build'],
  [/^\s*staticPublishPath: \.\/dist\s*$/m,'Preview must publish dist'],
  [/^\s*autoDeploy: false\s*$/m,'Preview must not deploy automatically'],
  [/^\s*envVars: \[\]\s*$/m,'Preview must not configure cloud environment variables']
 ];
 for(const [pattern,message] of required)if(!pattern.test(preview))issues.push(message);
 const liveName=live.match(/^\s*name:\s*(\S+)\s*$/m)?.[1];
 if(liveName && new RegExp(`^\\s*name: ${liveName}\\s*$`,'m').test(preview))issues.push('Preview must not reuse the existing service name');
 if(/VITE_SUPABASE_|SUPABASE_SERVICE_ROLE|SUPABASE_SECRET_KEY|sync:\s*true/i.test(preview))issues.push('Preview must not embed cloud credentials or enable cloud sync');
 return issues;
}

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const issues=inspectPreview(readFileSync(resolve(root,'render.preview.yaml'),'utf8'),readFileSync(resolve(root,'render.yaml'),'utf8'));
 if(issues.length){issues.forEach(x=>console.error(`BLOCKED ${x}`));process.exitCode=1;}
 else console.log('PASS Separate cloud-disabled preview blueprint checked offline (not deployed)');
}
