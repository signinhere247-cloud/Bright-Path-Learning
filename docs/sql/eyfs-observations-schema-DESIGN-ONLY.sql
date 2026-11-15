-- Step 36 DESIGN REFERENCE ONLY. DO NOT APPLY TO PRODUCTION.
-- Requires verified staging deployment of family_snapshots and parent auth/RLS.
create table public.eyfs_observations (
 id uuid primary key default gen_random_uuid(),
 parent_id uuid not null,
 profile_key text not null,
 activity_id text not null check (activity_id ~ '^ACT-EYFS-P[1-7]-[0-9]{2}$'),
 status text not null check (status in ('noted','developing','needs-support')),
 note text not null check (char_length(btrim(note)) between 3 and 500),
 review_required boolean not null default true check (review_required = true),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint eyfs_observation_profile_fk foreign key(parent_id,profile_key)
   references public.family_snapshots(parent_id,profile_key) on delete cascade
);
create index eyfs_observations_parent_profile_idx
 on public.eyfs_observations(parent_id,profile_key,created_at desc);
alter table public.eyfs_observations enable row level security;
revoke all on public.eyfs_observations from anon;
-- Authenticated grants and RLS are included here for design review only.
grant select,insert,update,delete on public.eyfs_observations to authenticated;
create policy "Parents read own child observations"
 on public.eyfs_observations for select to authenticated
 using (parent_id = (select auth.uid()));
create policy "Parents add own child observations"
 on public.eyfs_observations for insert to authenticated
 with check (parent_id = (select auth.uid()));
create policy "Parents update own child observations"
 on public.eyfs_observations for update to authenticated
 using (parent_id = (select auth.uid()))
 with check (parent_id = (select auth.uid()));
create policy "Parents delete own child observations"
 on public.eyfs_observations for delete to authenticated
 using (parent_id = (select auth.uid()));
-- Before deployment: prevent updates to immutable parent_id/profile_key/activity_id,
-- restrict writable columns, validate activity IDs against an authoritative catalogue,
-- define retention and audit requirements, and verify policy behaviour on staging.
