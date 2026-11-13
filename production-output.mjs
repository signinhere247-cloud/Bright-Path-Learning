// Verify a generated Vite site before anyone uploads it to preview hosting.
import {existsSync,readFileSync,statSync,realpathSync} from 'node:fs';
import {resolve,relative,sep,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
const projectRoot=resolve(fileURLToPath(new URL('..',import.meta.url)));
const outside=(base,path)=>{const rel=relative(base,path);return rel==='..'||rel.startsWith(`..${sep}`)||isAbsolute(rel)};
export function inspectProductionOutput(dir=resolve(projectRoot,'dist')){
 const issues=[];const assets=[];const index=resolve(dir,'index.html');
 if(!existsSync(index))return {issues:['Missing dist/index.html: production build has not been generated'],assets};
 const root=realpathSync(dir);
 if(outside(root,realpathSync(index))){issues.push('Production index.html points outside build directory');return {issues,assets};}
 const html=readFileSync(index,'utf8');
 if(/<script\b[^>]*\bsrc=["']\/src\//i.test(html))issues.push('HTML still references Vite source entry /src/');
 if(/@vite\/client|localhost:\d+|127\.0\.0\.1:\d+/i.test(html))issues.push('Development-only reference in production HTML');
 const refs=[...html.matchAll(/<(?:script|link)\b[^>]*>/gi)].flatMap(tag=>[...tag[0].matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]));
 const local=refs.filter(ref=>!(/^(?:https?:|data:|\/\/|#|mailto:)/i.test(ref)));
 const built=local.filter(ref=>/\.(?:js|css)(?:[?#]|$)/i.test(ref));
 if(!built.some(ref=>/\.js(?:[?#]|$)/i.test(ref)))issues.push('No generated JavaScript bundle referenced by index.html');
 if(!built.some(ref=>/\.css(?:[?#]|$)/i.test(ref)))issues.push('No generated CSS bundle referenced by index.html');
 for(const ref of local){
  let pathname;
  try{pathname=decodeURIComponent(ref.split(/[?#]/)[0]);}catch{issues.push(`Malformed asset URL: ${ref}`);continue;}
  if(pathname.includes('\\')||pathname.includes('\0')){issues.push(`Unsafe asset path: ${ref}`);continue;}
  const full=resolve(dir,pathname.replace(/^\/+/,''));
  if(outside(resolve(dir),full)||full===resolve(dir)){issues.push(`Unsafe asset path: ${ref}`);continue;}
  if(!existsSync(full)||!statSync(full).isFile()){issues.push(`Referenced asset missing: ${ref}`);continue;}
  if(outside(root,realpathSync(full))){issues.push(`Asset escapes build directory through symlink: ${ref}`);continue;}
  assets.push(relative(dir,full).split(sep).join('/'));
 }
 return {issues,assets};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=inspectProductionOutput();
 console.log(`Production output: ${result.assets.length} referenced local assets verified`);
 for(const issue of result.issues)console.log(`BLOCKED ${issue}`);
 if(!result.issues.length)console.log('PASS Production output structure (not a browser gameplay test)');
 else process.exitCode=1;
}
