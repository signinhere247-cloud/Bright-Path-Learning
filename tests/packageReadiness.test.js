import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,symlinkSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {inspectPackage} from '../scripts/package-readiness.mjs';
function fixture(fn){const dir=mkdtempSync(join(tmpdir(),'bp-release-'));try{
 for(const file of ['src/main.js','src/style.css','index.html','render.preview.yaml','PREVIEW-DEPLOYMENT.md','RELEASE-CHECKLIST.md','CLOUD-BACKUP-SETUP.md']){
  const full=join(dir,file);mkdirSync(join(full,'..'),{recursive:true});writeFileSync(full,'ok');
 }
 writeFileSync(join(dir,'package.json'),JSON.stringify({scripts:{build:'vite build',test:'node --test', 'release:gate':'node gate','test:browser':'node browser'}}));
 return fn(dir);
}finally{rmSync(dir,{recursive:true,force:true});}}
test('inventory reports missing lockfile and production build without claiming success',()=>fixture(dir=>{
 const result=inspectPackage(dir);assert.equal(result.lock,false);assert.equal(result.build,false);
 assert.match(result.issues.join(' '),/package-lock.json/);assert.match(result.issues.join(' '),/Built website absent/);
}));
test('inventory excludes credentials, dependency trees and generated build files',()=>fixture(dir=>{
 mkdirSync(join(dir,'node_modules'));writeFileSync(join(dir,'node_modules','private.txt'),'x');
 writeFileSync(join(dir,'.env'),'secret');writeFileSync(join(dir,'.env.preview'),'secret');
 mkdirSync(join(dir,'dist'));writeFileSync(join(dir,'dist','index.html'),'built');
 writeFileSync(join(dir,'package-lock.json'),'{}');
 const result=inspectPackage(dir);assert.deepEqual(result.issues,[]);
 assert.equal(result.files.some(f=>f.includes('private')||f.startsWith('.env')||f.startsWith('dist/')),false);
}));
test('inventory flags missing release scripts',()=>fixture(dir=>{
 writeFileSync(join(dir,'package.json'),JSON.stringify({scripts:{build:'vite build'}}));
 assert.match(inspectPackage(dir).issues.join(' '),/Missing npm script: test:browser/);
}));

test('inventory excludes nested credentials and private keys',()=>fixture(dir=>{
 mkdirSync(join(dir,'src','private'),{recursive:true});
 writeFileSync(join(dir,'src','private','.env.staging'),'secret');
 writeFileSync(join(dir,'src','private','deploy.pem'),'secret');
 writeFileSync(join(dir,'src','private','id_ed25519'),'secret');
 const result=inspectPackage(dir);
 assert.equal(result.files.some(f=>/env\.staging|deploy\.pem|id_ed25519/.test(f)),false);
}));
test('inventory rejects symbolic links rather than following outside-project paths',()=>fixture(dir=>{
 symlinkSync(join(dir,'src','main.js'),join(dir,'linked-main.js'));
 const result=inspectPackage(dir);
 assert.match(result.issues.join(' '),/Symbolic link excluded/);
 assert.equal(result.files.includes('linked-main.js'),false);
}));
