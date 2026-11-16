// Step 105: pure staging schema inventory verifier; never connects to Supabase.
export function assessStagingSchema({projectId,tables}={}){
 if(projectId!=='kvsmoxyemuimmlivcevn')throw new Error('Unexpected Supabase project; refuse staging operation.');
 if(!Array.isArray(tables))throw new Error('Invalid schema inventory.');
 const family=tables.find(t=>t.name==='public.family_snapshots');
 if(!family||family.rls_enabled!==true)throw new Error('Family snapshots RLS must be enabled.');
 const cols=new Set((family.columns||[]).map(c=>c.name));
 for(const name of ['parent_id','profile_key','save_data','revision'])if(!cols.has(name))throw new Error('Missing required family column: '+name);
 const primary=new Set(family.primary_keys||[]);
 if(!primary.has('parent_id')||!primary.has('profile_key'))throw new Error('Family composite key is missing.');
 return {projectVerified:true,environment:'testing',familySchemaReady:true,legacyImportLedgerPresent:tables.some(t=>t.name==='public.learning_legacy_imports'),safeToRunReadOnlyInspection:true,safeToRunWrites:false};
}
