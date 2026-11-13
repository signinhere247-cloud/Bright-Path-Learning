import test from 'node:test';
import assert from 'node:assert/strict';
import {cloudConfigured,validParentEmail} from '../src/cloudFamily.js';
test('cloud remains opt-in without both environment values',()=>{
 assert.equal(cloudConfigured({}),false);
 assert.equal(cloudConfigured({VITE_SUPABASE_URL:'https://example.supabase.co'}),false);
 assert.equal(cloudConfigured({VITE_SUPABASE_URL:'https://example.supabase.co',VITE_SUPABASE_PUBLISHABLE_KEY:'public-key'}),true);
});
test('email addresses validated before authentication request',()=>{
 assert.equal(validParentEmail('parent@example.com'),true);
 for(const value of ['',null,'invalid','parent @example.com','a'.repeat(255)+'@example.com'])assert.equal(validParentEmail(value),false);
});
