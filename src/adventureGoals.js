import {adventureOverview} from './adventureOverview.js';
/** Gentle, optional next steps based only on the current explorer's progress. */
export function personalisedAdventureGoals(save,subjects,day){
 const progress=adventureOverview(save,subjects,day),goals=[];
 if(progress.lessons===0)goals.push({id:'start-learning',emoji:'📚',title:'Try your first lesson',detail:'Choose a subject and learn something new!',destination:'learn'});
 else goals.push({id:'keep-learning',emoji:'🌟',title:'Keep learning',detail:'Try another lesson or practise a favourite topic.',destination:'learn'});
 if(progress.discovered<progress.discoveriesTotal)goals.push({id:'explore-village',emoji:'🌿',title:'Discover a village secret',detail:progress.discovered+' of '+progress.discoveriesTotal+' discoveries found.',destination:'discoveries'});
 if(!progress.pet)goals.push({id:'pet-friend',emoji:'🐾',title:'Meet a pet companion',detail:'Visit the shop when you feel ready to adopt.',destination:'shop'});
 else goals.push({id:'pet-care',emoji:'🐾',title:'Spend time with your pet',detail:'Care for your companion or play together.',destination:'pet'});
 if(progress.keepsakes===progress.keepsakesTotal&&progress.discovered===progress.discoveriesTotal)goals.push({id:'celebrate',emoji:'🏆',title:'Celebrate your discoveries',detail:'Take a look at your achievements!',destination:'achievements'});
 return goals.slice(0,4);
}
