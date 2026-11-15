-- Step 37 HARDENED DESIGN ONLY. Not an executable production migration.
-- Apply only after staging review of Step 36 schema and parent profile ownership.
revoke update on public.eyfs_observations from authenticated;
grant update(status,note,updated_at) on public.eyfs_observations to authenticated;
-- Never grant update of id, parent_id, profile_key, activity_id, created_at or review_required.
-- RLS policies from Step 36 must be enabled and independently verified.
-- Trigger prevents ownership changes even through elevated application pathways.
create or replace function public.eyfs_observations_immutable_identity()
returns trigger language plpgsql set search_path = ''
as $$
begin
 if new.id is distinct from old.id
    or new.parent_id is distinct from old.parent_id
    or new.profile_key is distinct from old.profile_key
    or new.activity_id is distinct from old.activity_id
    or new.created_at is distinct from old.created_at
    or new.review_required is distinct from old.review_required then
   raise exception 'Observation identity fields cannot be changed';
 end if;
 new.updated_at = now();
 return new;
end; $$;
create trigger eyfs_observations_immutable_identity_trigger
before update on public.eyfs_observations
for each row execute function public.eyfs_observations_immutable_identity();
-- Staging tests must cover cross-parent reads/writes, attempted ownership changes,
-- revoked sessions, and inability to edit immutable columns.
