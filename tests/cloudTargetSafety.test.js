import test from 'node:test';
import assert from 'node:assert/strict';
import {assertSafeCloudTarget,TESTING_PROJECT_REF} from '../src/cloudTargetSafety.js';
const testUrl='https://'+TESTING_PROJECT_REF+'.supabase.co';
test('production rejects testing project',()=>assert.throws(()=>assertSafeCloudTarget({url:testUrl,hostname:'bright-path-learning.onrender.com'}),/cannot use the testing database/));
test('testing host accepts testing project',()=>assert.equal(assertSafeCloudTarget({url:testUrl,hostname:'brightpath-cloud-auth-testing.onrender.com'}),TESTING_PROJECT_REF));
test('production accepts a distinct syntactically valid project',()=>assert.equal(assertSafeCloudTarget({url:'https://abcdefghijklmnopqrst.supabase.co',hostname:'bright-path-learning.onrender.com'}),'abcdefghijklmnopqrst'));
test('rejects malformed and insecure URLs',()=>{for(const url of ['http://'+TESTING_PROJECT_REF+'.supabase.co','https://evil.example','https://'+TESTING_PROJECT_REF+'.supabase.co.evil.example','https://'+TESTING_PROJECT_REF+'.supabase.co/?token=secret','not a url'])assert.throws(()=>assertSafeCloudTarget({url,hostname:'bright-path-learning.onrender.com'}));});

test('custom domain cannot point to the testing project',()=>assert.throws(()=>assertSafeCloudTarget({url:testUrl,hostname:'learn.brightpath.example'}),/cannot use the testing database/));
test('unrecognised preview host cannot point to the testing project',()=>assert.throws(()=>assertSafeCloudTarget({url:testUrl,hostname:'unknown-preview.onrender.com'}),/cannot use the testing database/));
test('local development may use testing project',()=>assert.equal(assertSafeCloudTarget({url:testUrl,hostname:'localhost'}),TESTING_PROJECT_REF));

test('live host accepts existing project only with explicit promotion',()=>assert.equal(assertSafeCloudTarget({url:testUrl,hostname:'bright-path-learning.onrender.com',allowExistingProduction:true}),TESTING_PROJECT_REF));
test('live host rejects a nonboolean promotion flag',()=>assert.throws(()=>assertSafeCloudTarget({url:testUrl,hostname:'bright-path-learning.onrender.com',allowExistingProduction:'true'}),/cannot use the testing database/));
test('promotion does not enable arbitrary custom domains',()=>assert.throws(()=>assertSafeCloudTarget({url:testUrl,hostname:'learning.example.com',allowExistingProduction:true}),/cannot use the testing database/));
