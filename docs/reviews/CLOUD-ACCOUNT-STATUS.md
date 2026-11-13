# Optional cloud accounts — implementation status (2026-11-13)

Source code includes optional Supabase email-link sign-in, parent-owned family snapshots, first-time uploads, revision-checked manual sync, opt-in automatic sync, conflict pausing, and local restore recovery. The related SQL migrations are in `supabase/migrations/` and must be applied in filename order to a **staging** Supabase project before cloud tests.

**Not verified live:** Supabase authentication, RLS isolation between two parents, SQL RPC behaviour, cloud upload/download, conflict detection across devices, automatic syncing, and restoration. No claim of secure production cloud backup should be made until those tests pass. Local browser storage is not a substitute for an independent downloadable backup.

Required environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (public client values only). Never include a service-role key in frontend variables. Do not connect the current live V3 deployment during staging.
