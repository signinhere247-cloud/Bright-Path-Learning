// Step 98: read-only compatibility audit of existing BrightPath cloud profile model.
// Never performs cloud calls, migrations, auth, uploads, or changes to local saves.
export const EXISTING_CLOUD_MODEL=Object.freeze({
 provider:'supabase',
 parentAuth:'email-otp',
 familyTable:'public.family_snapshots',
 familyOwnerColumn:'parent_id',
 childKeyColumn:'profile_key',
 childKeyPattern:'^[A-Za-z0-9_-]{8,80}$',
 snapshotColumn:'save_data',
 revisionColumn:'revision',
 syncRpc:'update_family_snapshot',
 syncRevisionPolicy:'exact-match',
 maxProfiles:8
});
export function inspectLearningSchemaCompatibility({childProfileId,parentId,lessonSchemaChildIdType='text'}={}){
 const issues=[];
 if(typeof childProfileId!=='string'||!new RegExp(EXISTING_CLOUD_MODEL.childKeyPattern).test(childProfileId))issues.push('child-profile-key-mismatch');
 if(typeof parentId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(parentId))issues.push('parent-auth-id-required');
 if(lessonSchemaChildIdType!=='text')issues.push('lesson-child-key-type-mismatch');
 return {compatible:issues.length===0,issues,requiredParentOwnershipKey:'(parent_id, profile_key)',existingFamilyTable:EXISTING_CLOUD_MODEL.familyTable};
}
