// Release candidate cloud safety gate. Offline checks are not live account verification.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=(name)=>readFileSync(resolve(root,name),'utf8');
const files={cloudFamily:read('src/cloudFamily.js'),cloudSync:read('src/cloudSync.js'),cloudRecovery:read('src/cloudRecovery.js'),cloudTarget:read('src/cloudTargetSafety.js')};
const checks=[
 ['Cloud client validates destination before creating Supabase client',/assertSafeCloudTarget\(/.test(files.cloudFamily)&&files.cloudFamily.indexOf('assertSafeCloudTarget(')<files.cloudFamily.indexOf("import('@supabase/supabase-js')")],
 ['Cloud uploads use verified parent identity',/parent_id:user\.id/.test(files.cloudFamily)],
 ['Cloud downloads restrict parent identity',/eq\('parent_id',user\.id\)/.test(files.cloudFamily)],
 ['Cloud sync checks signed-in parent ownership',/planCloudSync\(profile,remote,revision,user\.id\)/.test(files.cloudFamily)&&/remote\.parent_id!==parentId/.test(files.cloudSync)],
 ['Cloud sync uses optimistic revision',/p_expected_revision:payload\.expected_revision/.test(files.cloudFamily)],
 ['Restore preserves recovery copy before local overwrite',files.cloudRecovery.indexOf('preserveBeforeCloudRestore(storage,currentFamily)')<files.cloudRecovery.indexOf('writeFamily(storage,nextFamily)')],
 ['Restore blocks changes to sibling profiles',/Cloud restore attempted to change another explorer/.test(files.cloudRecovery)],
 ['No service role credentials in browser source',!Object.values(files).some(s=>/SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEY/.test(s))],
];
let failures=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'BLOCKED'} ${name}`);if(!ok)failures++;}
console.log(`Offline cloud release safeguards: ${checks.length-failures}/${checks.length} passed`);
console.log('NOT VERIFIED: two independent signed-in parent accounts, browser-to-browser recovery, production Supabase project and deployment configuration.');
if(failures)process.exitCode=1;
