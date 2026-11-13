import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectPreview} from '../scripts/preview-safety.mjs';
const live='services:\n  - type: web\n    name: brightpath-learning\n    runtime: static\n';
const preview='services:\n  - type: web\n    name: brightpath-learning-preview\n    runtime: static\n    buildCommand: npm ci && npm run build\n    staticPublishPath: ./dist\n    autoDeploy: false\n    envVars: []\n';
test('separate static preview configuration passes',()=>assert.deepEqual(inspectPreview(preview,live),[]));
test('preview cannot reuse live service name',()=>assert.match(inspectPreview(preview.replace('brightpath-learning-preview','brightpath-learning'),live).join(' '),/distinct|reuse/));
test('preview cannot auto deploy',()=>assert.match(inspectPreview(preview.replace('autoDeploy: false','autoDeploy: true'),live).join(' '),/automatically/));
test('preview cannot include cloud environment keys',()=>assert.match(inspectPreview(preview+'    VITE_SUPABASE_URL: example\n',live).join(' '),/cloud credentials/));
