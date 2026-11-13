// Static, offline deployment safety checks; not a substitute for live security testing.
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';

export function inspectDeployment({pkg,render,gitignore,example,sourceFiles}) {
 const issues=[];
 if(!pkg.scripts?.build || !pkg.scripts?.['release:gate'])issues.push('Build or release gate script missing');
 if(!/runtime:\s*static\b/.test(render) || !/staticPublishPath:\s*\.\/dist\b/.test(render))issues.push('Render must publish dist as a static site');
 if(!/^\.env\s*$/m.test(gitignore) || !/^dist\/\s*$/m.test(gitignore) || !/^node_modules\/\s*$/m.test(gitignore))issues.push('Sensitive/local build paths must be gitignored');
 if(!example.includes('VITE_SUPABASE_URL=') || !example.includes('VITE_SUPABASE_PUBLISHABLE_KEY='))issues.push('Public cloud configuration template missing');
 for(const [name,body] of Object.entries(sourceFiles)) {
  if(/(?:service[_-]?role|SUPABASE_SERVICE_ROLE|SUPABASE_SECRET_KEY)\s*[:=]\s*['"][^'"\s]+/i.test(body))issues.push(`Possible embedded secret in ${name}`);
  if(/import\.meta\.env\.VITE_[A-Z0-9_]*(?:SERVICE_ROLE|SECRET|PRIVATE)[A-Z0-9_]*/.test(body))issues.push(`Private credential exposed to browser in ${name}`);
 }
 return issues;
}

if(process.argv[1] && resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname)) {
 const root=resolve(import.meta.dirname,'..');
 const read=(p)=>readFileSync(resolve(root,p),'utf8');
 const files=Object.fromEntries(readdirSync(resolve(root,'src')).filter(f=>f.endsWith('.js')).map(f=>[`src/${f}`,read(`src/${f}`)]));
 const issues=inspectDeployment({pkg:JSON.parse(read('package.json')),render:read('render.yaml'),gitignore:read('.gitignore'),example:read('.env.example'),sourceFiles:files});
 if(existsSync(resolve(root,'.env')))console.log('INFO Local .env exists and must never be included in release ZIP');
 if(issues.length){for(const issue of issues)console.error(`BLOCKED ${issue}`);process.exitCode=1;}
 else console.log(`PASS Offline deployment safety checks (${Object.keys(files).length} browser source files inspected)`);
}
