import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
const journal=main.slice(main.indexOf('function showVillageJournal()'),main.indexOf('function showDiscoveryMenu()'));
test('journal clearly separates highlights, next milestone and earned celebrations',()=>{
 assert.ok(journal.includes('villageLearningHighlights(state,subjects,day)'));
 assert.ok(journal.includes('adventureLearningMilestoneProgress(state,subjects,day)'));
 assert.ok(journal.includes('adventureLearningMilestones(state,subjects,day)'));
 assert.ok(journal.includes('aria-labelledby="earnedAdventureMilestonesHeading"'));
});
test('celebration buttons have readable labels and accessible feedback',()=>{
 assert.ok(journal.includes("button.setAttribute('aria-label','Celebrate '+milestone.title)"));
 assert.ok(journal.includes('role="status" aria-live="polite"'));
 assert.ok(css.includes('#adventureLearningMilestoneMessage:not(:empty)'));
});
test('journal cards, touch targets and progress remain usable on small screens',()=>{
 assert.ok(journal.includes("item.className='village-journal-entry'"));
 assert.ok(css.includes('.village-journal-entry button{min-height:44px'));
 assert.ok(css.includes('@media(max-width:550px){#adventureLearningMilestones'));
 assert.ok(css.includes('.adventure-learning-progress-row progress{width:100%'));
});
