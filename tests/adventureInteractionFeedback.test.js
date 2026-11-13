import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adventureInteractionFeedback} from '../src/adventureInteractionFeedback.js';
test('each world destination has a specific understandable action',()=>{
 assert.equal(adventureInteractionFeedback({name:'My Home'}).action,'Enter home');
 assert.equal(adventureInteractionFeedback({name:'Shop'}).action,'Visit shop');
 assert.equal(adventureInteractionFeedback({name:'Maths'}).action,'Learn');
 assert.equal(adventureInteractionFeedback({id:'pond',name:'Pond Discovery'}).action,'Explore');
});
test('empty destinations have no action and labels remain plain text',()=>{
 const empty=adventureInteractionFeedback(null);
 assert.equal(empty.action,'');
 assert.ok(empty.hint.includes('Explore'));
 const named=adventureInteractionFeedback({name:'Maths'});
 assert.ok(named.label.includes('Maths'));
});
test('game uses contextual prompt, visible action and accessible label',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.ok(main.includes("adventureInteractionFeedback(mode==='world'?near:null,Boolean("));
 assert.ok(main.includes("$('#tip').textContent=feedback.hint"));
 assert.ok(main.includes("$('#interact').textContent=feedback.action"));
 assert.ok(main.includes("$('#interact').setAttribute('aria-label',feedback.label)"));
 assert.ok(main.includes("mode==='world'&&near?'block':'none'"));
});
