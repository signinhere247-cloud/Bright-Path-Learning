import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectDeployment} from '../scripts/deployment-safety.mjs';
const good={pkg:{scripts:{build:'vite build','release:gate':'node scripts/release-gate.mjs'}},render:'runtime: static\nstaticPublishPath: ./dist',gitignore:'node_modules/\ndist/\n.env\n',example:'VITE_SUPABASE_URL=\nVITE_SUPABASE_PUBLISHABLE_KEY=',sourceFiles:{'src/main.js':'const x=import.meta.env.VITE_SUPABASE_URL;'}};
test('safe static deployment configuration passes',()=>assert.deepEqual(inspectDeployment(good),[]));
test('rejects public environment secret exposure',()=>assert.match(inspectDeployment({...good,sourceFiles:{'src/main.js':'import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY'}}).join(' '),/Private credential/));
test('rejects embedded service-role credentials',()=>assert.match(inspectDeployment({...good,sourceFiles:{'src/main.js':'SUPABASE_SERVICE_ROLE="danger"'}}).join(' '),/Possible embedded secret/));
test('rejects missing local secret ignore',()=>assert.match(inspectDeployment({...good,gitignore:'dist/\nnode_modules/'}).join(' '),/gitignored/));
