import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {inspectProductionOutput} from '../scripts/production-output.mjs';
function fixture(fn){const dir=mkdtempSync(join(tmpdir(),'bp-output-'));try{return fn(dir)}finally{rmSync(dir,{recursive:true,force:true})}}
test('production checker reports absent build without claiming success',()=>fixture(dir=>assert.match(inspectProductionOutput(dir).issues.join(' '),/Missing dist\/index.html/)));
test('production checker accepts generated JS and CSS that exist',()=>fixture(dir=>{
 mkdirSync(join(dir,'assets'));writeFileSync(join(dir,'assets','app.js'),'ok');writeFileSync(join(dir,'assets','app.css'),'ok');
 writeFileSync(join(dir,'index.html'),'<script type="module" src="/assets/app.js"></script><link rel="stylesheet" href="/assets/app.css">');
 assert.deepEqual(inspectProductionOutput(dir).issues,[]);
 assert.deepEqual(inspectProductionOutput(dir).assets,['assets/app.js','assets/app.css']);
}));
test('production checker rejects missing bundles and development references',()=>fixture(dir=>{
 writeFileSync(join(dir,'index.html'),'<script type="module" src="/src/main.js"></script><link rel="stylesheet" href="/assets/missing.css">');
 const issues=inspectProductionOutput(dir).issues.join(' ');
 assert.match(issues,/Vite source entry/);assert.match(issues,/Referenced asset missing/);
}));
test('production checker rejects escaping paths',()=>fixture(dir=>{
 writeFileSync(join(dir,'index.html'),'<script src="../secret.js"></script><link href="/assets/app.css" rel="stylesheet">');
 assert.match(inspectProductionOutput(dir).issues.join(' '),/Unsafe asset path/);
}));
test('production checker rejects malformed URL encoding without crashing',()=>fixture(dir=>{
 writeFileSync(join(dir,'index.html'),'<script src="/%ZZ.js"></script><link href="/assets/app.css">');
 assert.match(inspectProductionOutput(dir).issues.join(' '),/Malformed asset URL/);
}));
test('production checker rejects symlinks escaping the generated directory',()=>fixture(dir=>{
 mkdirSync(join(dir,'assets'));
 const external=mkdtempSync(join(tmpdir(),'bp-external-'));
 try{writeFileSync(join(external,'app.js'),'external');writeFileSync(join(dir,'assets','app.css'),'ok');symlinkSync(join(external,'app.js'),join(dir,'assets','app.js'));
 writeFileSync(join(dir,'index.html'),'<script src="/assets/app.js"></script><link href="/assets/app.css">');
 assert.match(inspectProductionOutput(dir).issues.join(' '),/Asset escapes build directory/);
 }finally{rmSync(external,{recursive:true,force:true})}
}));
