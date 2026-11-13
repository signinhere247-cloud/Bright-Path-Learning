import test from 'node:test';
import assert from 'node:assert/strict';
import {PROFILE_MENU_GROUPS,profileMenuIds} from '../src/profileNavigation.js';
test('profile navigation retains every existing destination exactly once',()=>{
 const ids=profileMenuIds();
 assert.equal(ids.length,12);
 assert.equal(new Set(ids).size,ids.length);
 for(const id of ['adventureOverview','achievements','dailyQuests','discoveryShortcut','petCare','shopShortcut','homeShortcut','backupControls','familyControls','cloudControls','parentReport','revisionStudio'])assert.ok(ids.includes(id));
});
test('guardian tools are separated from explorer adventures',()=>{
 const family=PROFILE_MENU_GROUPS.find(g=>g.id==='family');
 assert.ok(family.items.some(item=>item.id==='parentReport'));
 assert.ok(!PROFILE_MENU_GROUPS.find(g=>g.id==='adventure').items.some(item=>item.id==='parentReport'));
});
