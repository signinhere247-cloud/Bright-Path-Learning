-- Security hardening: do not permit direct browser UPDATEs that bypass revision checks.
-- Run after the snapshot and revision migrations. The function owner must be a
-- trusted database administrator (normally postgres when run in SQL Editor).
revoke update on public.family_snapshots from authenticated;
revoke all on function public.update_family_snapshot(text,bigint,text,integer,jsonb) from public, anon, authenticated;

create or replace function public.update_family_snapshot(
 p_profile_key text, p_expected_revision bigint, p_display_name text,
 p_learning_age integer, p_save_data jsonb
) returns bigint
language plpgsql security definer set search_path = ''
as $$
declare updated_revision bigint;
begin
 if (select auth.uid()) is null then raise exception 'Authentication required'; end if;
 if p_profile_key is null or p_profile_key !~ '^[A-Za-z0-9_-]{8,80}$'
    or p_expected_revision is null or p_expected_revision < 0 then
   raise exception 'Invalid sync request';
 end if;
 update public.family_snapshots
 set display_name=p_display_name, learning_age=p_learning_age,
     save_data=p_save_data, revision=revision+1
 where parent_id=(select auth.uid()) and profile_key=p_profile_key
   and revision=p_expected_revision
 returning revision into updated_revision;
 if updated_revision is null then raise exception 'SYNC_CONFLICT'; end if;
 return updated_revision;
end; $$;

revoke all on function public.update_family_snapshot(text,bigint,text,integer,jsonb) from public, anon;
grant execute on function public.update_family_snapshot(text,bigint,text,integer,jsonb) to authenticated;
-- Keep SELECT and INSERT policies from migration 003. No client UPDATE grant.
