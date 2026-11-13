import test from 'node:test';
import assert from 'node:assert/strict';
import {journeySuggestions} from '../src/journeySuggestions.js';
test('recommends topics needing practice before exploring other subjects',()=>{
 const save={completed:{'Maths:Addition':true},practiceNeeds:{'English:Reading':2}};
 const suggestions=journeySuggestions(save,['Maths','English']);
 assert.equal(suggestions[0].kind,'practice');
 assert.equal(suggestions[0].subject,'English');
 assert.equal(suggestions[0].topic,'Reading');
});
test('new explorers are offered least explored subjects without sharing progress',()=>{
 const suggestions=journeySuggestions({completed:{}},['Maths','English']);
 assert.equal(suggestions[0].kind,'explore');
 assert.equal(suggestions[0].subject,'English');
 assert.deepEqual(journeySuggestions({},[]),[]);
});
