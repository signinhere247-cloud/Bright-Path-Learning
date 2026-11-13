-- Apply in Supabase SQL Editor before enabling cloud backups.
-- Only authenticated parents can access their own snapshots.
create table if not exists public.family_snapshots (
 parent_id uuid not null references auth.users(id) on delete cascade,
 profile_key text not null check (profile_key ~ '^[A-Za-z0-9_-]{8,80}$'),
 display_name text not null check (char_length(display_name) between 1 and 20),
 learning_age integer not null check (learning_age between 3 and 16),
 save_data jsonb not null check (jsonb_typeof(save_data) = 'object'),
 created_at timestamptz not null default now(),
 primary key(parent_id,profile_key)
);
alter table public.family_snapshots enable row level security;
revoke all on public.family_snapshots from anon;
grant select,insert on public.family_snapshots to authenticated;
create policy "Parents read own snapshots" on public.family_snapshots for select to authenticated using (parent_id = (select auth.uid()));
create policy "Parents create own snapshots" on public.family_snapshots for insert to authenticated with check (parent_id = (select auth.uid()));
-- Deliberately no UPDATE/DELETE policies: first upload only; no silent overwrites.
