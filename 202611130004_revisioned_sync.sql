-- Apply only after 202611130003_family_snapshots.sql.
-- Existing backups start at revision 0. All changes require an exact revision match.
alter table public.family_snapshots add column if not exists revision bigint not null default 0 check (revision >= 0);
create or replace function public.update_family_snapshot(
 p_profile_key text, p_expected_revision bigint, p_display_name text,
 p_learning_age integer, p_save_data jsonb
) returns bigint
language plpgsql security invoker set search_path = public
as $$
declare updated_revision bigint;
begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 if p_profile_key !~ '^[A-Za-z0-9_-]{8,80}$' or p_expected_revision < 0 or p_expected_revision is null then
  raise exception 'Invalid sync request';
 end if;
 update public.family_snapshots
 set display_name=p_display_name,learning_age=p_learning_age,save_data=p_save_data,revision=revision+1
 where parent_id=auth.uid() and profile_key=p_profile_key and revision=p_expected_revision
 returning revision into updated_revision;
 if updated_revision is null then raise exception 'SYNC_CONFLICT'; end if;
 return updated_revision;
end; $$;
-- The RPC executes with caller privileges and the same owner-scoped RLS policy.
-- Do not grant unrestricted table UPDATE to the browser: use a narrow column grant.
grant update(display_name,learning_age,save_data,revision) on public.family_snapshots to authenticated;
create policy "Parents update own snapshots" on public.family_snapshots
 for update to authenticated using (parent_id = (select auth.uid()))
 with check (parent_id = (select auth.uid()));
revoke all on function public.update_family_snapshot(text,bigint,text,integer,jsonb) from public;
grant execute on function public.update_family_snapshot(text,bigint,text,integer,jsonb) to authenticated;
