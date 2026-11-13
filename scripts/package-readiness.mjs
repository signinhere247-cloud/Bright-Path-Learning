// Offline source-package audit; never claims that a production build exists.
import {readFileSync, existsSync, readdirSync, statSync} from 'node:fs';
import {resolve, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

export const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
export const excluded=new Set(['node_modules','dist','.git','.env','.env.local','.env.production','.env.preview']);
export function excludedReleasePath(name){
 return excluded.has(name)||name==='.env'||name.startsWith('.env.')||name.endsWith('.pem')||name.endsWith('.key')||name==='id_rsa'||name==='id_ed25519';
}
export function inspectPackage(rootDir=root){
 const issues=[]; const files=[];
 const required=['package.json','index.html','src/main.js','src/style.css','render.preview.yaml','PREVIEW-DEPLOYMENT.md','RELEASE-CHECKLIST.md','CLOUD-BACKUP-SETUP.md'];
 for(const name of required) if(!existsSync(resolve(rootDir,name)))issues.push(`Missing source file: ${name}`);
 function visit(dir){
  for(const entry of readdirSync(dir,{withFileTypes:true})){
   if(excludedReleasePath(entry.name))continue;
   const full=resolve(dir,entry.name);const name=relative(rootDir,full).split(sep).join('/');
   if(entry.isSymbolicLink()){issues.push(`Symbolic link excluded from release inventory: ${name}`);continue;}
   if(entry.isDirectory())visit(full);
   else if(entry.isFile())files.push(name);
  }
 }
 visit(rootDir);
 const pkgPath=resolve(rootDir,'package.json');
 if(existsSync(pkgPath)){
  try{
   const pkg=JSON.parse(readFileSync(pkgPath,'utf8'));
   for(const key of ['build','test','release:gate','test:browser'])if(!pkg.scripts?.[key])issues.push(`Missing npm script: ${key}`);
  }catch{issues.push('Invalid package.json');}
 }
 const lock=existsSync(resolve(rootDir,'package-lock.json'));
 if(!lock)issues.push('package-lock.json absent: npm ci cannot run until npm install generates a lockfile');
 const build=existsSync(resolve(rootDir,'dist/index.html'));
 if(!build)issues.push('Built website absent: run npm ci and npm run build before preview deployment');
 return {files:files.sort(),issues,lock,build};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=inspectPackage();
 console.log(`Source-package inventory: ${result.files.length} files (excludes node_modules, dist, git and .env files)`);
 console.log(`Lockfile: ${result.lock?'present':'missing'}; production output: ${result.build?'present':'missing'}`);
 for(const issue of result.issues)console.log(`BLOCKED ${issue}`);
 console.log('This is an inventory only. Browser and live cloud verification are separate release gates.');
 if(result.issues.length)process.exitCode=1;
}
