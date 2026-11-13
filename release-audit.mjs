import {readFileSync, existsSync} from 'node:fs';
import {resolve,dirname,extname} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const main=readFileSync(resolve(root,'src/main.js'),'utf8');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const checks=[];
function check(name,ok){checks.push({name,ok:Boolean(ok)});console.log(`${ok?'PASS':'FAIL'} ${name}`)}
for(const file of ['index.html','src/main.js','src/style.css','public/world.jpg','render.yaml','package.json'])check(`Required file: ${file}`,existsSync(resolve(root,file)));
for(const match of main.matchAll(/(?:import\s+[^;]*?from\s*|import\s*)['"](\.[^'"]+)['"]/g)){const file=resolve(root,'src',match[1]);check(`Import resolves: ${match[1]}`,existsSync(file)||existsSync(`${file}.js`));}
for(const name of ['showSubjects','showLessons','showQuestion','showFamilyExplorers','showParentReport','showRevisionStudio','showPetCare','showDailyQuests','showBackupControls','showDiscovery'])check(`Gameplay entry: ${name}`,new RegExp(`function\\s+${name}\\s*\\(`).test(main));
for(const name of ['profileBtn','interact','modalBody','app'])check(`DOM element: ${name}`,[html,main].some(source=>source.includes(`id="${name}"`)||source.includes(`id='${name}'`)));
check('3D world dependency',main.includes("from 'three'"));
check('Mobile viewport',/name=["']viewport["']/.test(html));
check('No service-role secret in browser',!/(SUPABASE_SERVICE_ROLE_KEY|service_role\s*[:=])/.test(main));
const failed=checks.filter(c=>!c.ok);console.log(`\n${checks.length-failed.length}/${checks.length} offline release checks passed`);if(failed.length)process.exitCode=1;
