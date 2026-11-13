import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

// Source-level regression guard: the recovery action must remain available
// when cloud credentials are not configured, without requiring Supabase.
test('cloud recovery button is outside the cloud configuration conditional',()=>{
  const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
  const start=source.indexOf('function showCloudControls(){');
  const end=source.indexOf('function showFamilyExplorers(){',start);
  const section=source.slice(start,end);
  const conditionalEnd=section.indexOf("':'<p>Cloud accounts are not configured yet.");
  assert.ok(conditionalEnd>=0,'expected offline cloud-account message');
  const recoveryButton=section.indexOf('<button id="cloudRecovery">');
  assert.ok(recoveryButton>conditionalEnd,'recovery must be available offline');
  assert.match(section,/\$\('#cloudRecovery'\)\.onclick=/);
  assert.ok(section.indexOf("if(!cloudConfigured())return;")>recoveryButton);
});
