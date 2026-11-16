import test from 'node:test';
import assert from 'node:assert/strict';
import {assessCloudBuildConfiguration} from '../src/cloudBuildDiagnostics.js';
test('undetected main ref remains unknown, never assumes cloud is disabled',()=>{
 const x=assessCloudBuildConfiguration({mainRefs:[],testingRefs:['kvsmoxyemuimmlivcevn'],mainAssetsInspected:true,testingAssetsInspected:true});
 assert.equal(x.mainCloudConfigured,'unknown');assert.equal(x.status,'unverified');assert.equal(x.allowsDatabaseWrites,false);
});
test('disabled feature report does not prove backend isolation',()=>{
 const x=assessCloudBuildConfiguration({mainCloudFeatureEnabled:false});assert.equal(x.mainCloudConfigured,'reported-disabled');assert.equal(x.backendIsolationVerified,false);
});
test('distinct public refs still require provenance and isolation testing',()=>{
 const x=assessCloudBuildConfiguration({mainRefs:['aaaaaaaaaaaaaaaaaaaa'],testingRefs:['kvsmoxyemuimmlivcevn'],mainAssetsInspected:true,testingAssetsInspected:true});
 assert.equal(x.status,'distinct-public-refs-observed');assert.equal(x.backendIsolationVerified,false);
});
