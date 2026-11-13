-- Run once in Supabase SQL Editor. Enable email confirmation in Auth settings.
create table if not exists public.family_profiles (
 id uuid primary key default gen_random_uuid(),
 parent_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(name) between 1 and 40),
 stage text not null check (stage in ('early','ks1','ks2','ks3','ks4')),
 game_state jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
alter table public.family_profiles enable row level security;
create policy "parents select own profiles" on public.family_profiles for select to authenticated using ((select auth.uid())=parent_id);
create policy "parents insert own profiles" on public.family_profiles for insert to authenticated with check ((select auth.uid())=parent_id);
create policy "parents update own profiles" on public.family_profiles for update to authenticated using ((select auth.uid())=parent_id) with check ((select auth.uid())=parent_id);
create policy "parents delete own profiles" on public.family_profiles for delete to authenticated using ((select auth.uid())=parent_id);
