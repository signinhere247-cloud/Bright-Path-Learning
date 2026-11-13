import test from 'node:test';
import assert from 'node:assert/strict';
import {PET_PERSONALITIES,petPersonality,choosePetPersonality,petBehaviour} from '../src/petPersonality.js';
test('personality selection is immutable and profile-specific',()=>{
 const original={pet:'dog',petMood:70};
 const changed=choosePetPersonality(original,'playful');
 assert.equal(petPersonality(changed),'playful');
 assert.equal(original.petPersonality,undefined);
});
test('existing pets default to curious',()=>{
 assert.equal(petPersonality({pet:'cat'}),'curious');
 assert.equal(petPersonality({pet:null}),null);
});
test('temperaments change movement parameters',()=>{
 assert.ok(petBehaviour('playful').speed>petBehaviour('sleepy').speed);
 assert.equal(Object.keys(PET_PERSONALITIES).length,3);
});
test('invalid personality choices are rejected',()=>{
 assert.throws(()=>choosePetPersonality({pet:'cat'},'flying'));
 assert.throws(()=>choosePetPersonality({pet:null},'sleepy'));
});
