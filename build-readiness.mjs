import {existsSync, readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve, dirname, extname} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(resolve(root,'package.json'),'utf8'));
const require = createRequire(resolve(root,'package.json'));
const problems=[];
for (const name of Object.keys({...pkg.dependencies, ...pkg.devDependencies})) {
  try { require.resolve(`${name}/package.json`); console.log(`READY dependency: ${name}`); }
  catch { problems.push(`Missing dependency: ${name}`); }
}
const visited=new Set();
function scan(file) {
  if (visited.has(file)) return;
  visited.add(file);
  const source=readFileSync(file,'utf8');
  for (const match of source.matchAll(/(?:import|export)\s+(?:[^'";]*?\s+from\s*)?['"](\.[^'"]+)['"]/g)) {
    const target=resolve(dirname(file),match[1]);
    const candidate=extname(target) ? target : `${target}.js`;
    if (!existsSync(candidate)) problems.push(`Missing local import: ${file} -> ${match[1]}`);
    else if (candidate.endsWith('.js')) scan(candidate);
  }
}
scan(resolve(root,'src/main.js'));
console.log(`Checked ${visited.size} JavaScript source files`);
const lockPath=resolve(root,'package-lock.json');
if (!existsSync(lockPath)) {
  problems.push('Missing package-lock.json: reproducible installation not established');
} else {
  try {
    const lock=JSON.parse(readFileSync(lockPath,'utf8'));
    const lockedRoot=lock.packages?.[''];
    if (!lockedRoot || lock.name!==pkg.name || lock.version!==pkg.version ||
        JSON.stringify(lockedRoot.dependencies||{})!==JSON.stringify(pkg.dependencies||{}) ||
        JSON.stringify(lockedRoot.devDependencies||{})!==JSON.stringify(pkg.devDependencies||{})) {
      problems.push('package-lock.json root dependencies do not match package.json');
    }
  } catch { problems.push('package-lock.json is unreadable or invalid'); }
}
if (problems.length) {
  for (const problem of problems) console.error(`BLOCKED ${problem}`);
  console.error('On a machine with registry access run npm install, retain package-lock.json, then run npm ci and npm run build.');
  process.exitCode=1;
} else {
  console.log('Dependency and local import preflight passed. Run npm run build and browser tests to verify runtime.');
}
