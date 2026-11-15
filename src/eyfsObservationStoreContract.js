// In-memory contract model for testing only; no database, network or child data persistence.
import {createEyfsObservation} from './eyfsObservations.js';
export function createEyfsObservationStore(){
 const records=new Map();let next=1;
 const authorised=(actor,householdId,childId)=>!!actor&&actor.householdId===householdId&&Array.isArray(actor.childIds)&&actor.childIds.includes(childId);
 const requireAccess=(actor,householdId,childId)=>{if(!authorised(actor,householdId,childId))throw new Error('Access denied');};
 return Object.freeze({
  add(actor,householdId,childId,input){
   requireAccess(actor,householdId,childId);
   const observation=createEyfsObservation(input);
   const id='obs-'+next++;
   const row={id,householdId,childId,...observation};
   records.set(id,row);return {...row};
  },
  list(actor,householdId,childId){
   requireAccess(actor,householdId,childId);
   return [...records.values()].filter(x=>x.householdId===householdId&&x.childId===childId).map(x=>({...x}));
  },
  update(actor,householdId,childId,id,input){
   requireAccess(actor,householdId,childId);
   const old=records.get(id);
   if(!old||old.householdId!==householdId||old.childId!==childId)throw new Error('Observation not found');
   const observation=createEyfsObservation(input);
   const row={...old,...observation};records.set(id,row);return {...row};
  },
  remove(actor,householdId,childId,id){
   requireAccess(actor,householdId,childId);
   const old=records.get(id);
   if(!old||old.householdId!==householdId||old.childId!==childId)throw new Error('Observation not found');
   records.delete(id);return true;
  }
 });
}
