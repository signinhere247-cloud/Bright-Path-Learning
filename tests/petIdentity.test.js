import test from 'node:test';
import assert from 'node:assert/strict';
import {renamePet,petDisplayName} from '../src/petIdentity.js';
test('pet names are stored in the returned explorer save',()=>{
 const original={pet:'cat',petMood:75,petName:undefined};
 const updated=renamePet(original,'  Luna  ');
 assert.equal(updated.petName,'Luna');
 assert.equal(petDisplayName(updated),'Luna');
 assert.equal(original.petName,undefined);
});
test('unnamed pets have friendly defaults',()=>{
 assert.equal(petDisplayName({pet:'dog'}),'My Dog');
 assert.equal(petDisplayName({pet:null}),null);
});
test('invalid names and missing pets are rejected',()=>{
 assert.throws(()=>renamePet({pet:'cat'},' '));
 assert.throws(()=>renamePet({pet:'dog'},'a'.repeat(21)));
 assert.throws(()=>renamePet({pet:null},'Luna'));
});
