import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DISCOVERIES,completeDiscovery} from '../src/villageActivities.js';
import {villageLearningSuggestion} from '../src/villageLearningSuggestion.js';
import {villageLearningHighlights} from '../src/villageLearningHighlights.js';
import {adventureLearningMilestones} from '../src/adventureLearningMilestones.js';
import {adventureLearningMilestoneProgress} from '../src/adventureLearningMilestoneProgress.js';
const subjects=['Maths','English','Science','History','Geography','Computing'];
const day='2026-11-13';
test('recommendations skip unavailable practice topics and keep valid topics',()=>{
 const bank={Science:[['Plants','Learn about plants']]};
 const save={completed:{},practiceNeeds:{'Science:Retired topic':8,'Science:Plants':2}};
 assert.equal(villageLearningSuggestion(save,'pond',subjects,bank).topic,'Plants');
 assert.equal(villageLearningSuggestion({completed:{},practiceNeeds:{'Science:Retired topic':8}},'pond',subjects,bank).kind,'explore');
});
test('discovery rewards and cross-activity milestones use the same child save',()=>{
 const first={coins:0,completed:{'Science:Plants':true},discoveries:{}};
 const second={coins:0,completed:{},discoveries:{}};
 const pond=DISCOVERIES.find(d=>d.id==='pond');
 const earned=completeDiscovery(first,'pond',pond.answer,day);
 assert.equal(earned.earned,8);
 assert.equal(adventureLearningMilestones(earned.save,subjects,day).length,1);
 assert.equal(adventureLearningMilestoneProgress(earned.save,subjects,day).title,'Growing Adventurer');
 assert.equal(villageLearningHighlights(second,subjects,day).discoveries,0);
 assert.equal(adventureLearningMilestones(second,subjects,day).length,0);
 const again=completeDiscovery(earned.save,'pond',pond.answer,day);
 assert.equal(again.earned,0);
});
test('UI supplies real academy catalogue to both discovery and journal recommendations',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.ok(main.includes('villageLearningSuggestion(state,entry.id,subjects,lessonBank)'));
 assert.ok(main.includes('villageLearningSuggestion(state,activity.id,subjects,lessonBank)'));
});
