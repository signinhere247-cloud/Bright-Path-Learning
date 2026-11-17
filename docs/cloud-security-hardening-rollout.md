# BrightPath cloud security hardening — staged rollout (NOT APPLIED)

## Verified testing database facts (read-only, 17 Nov 2026)
- Project: `kvsmoxyemuimmlivcevn` (testing only).
- `public.family_snapshots` has parent-scoped SELECT, INSERT, UPDATE RLS policies.
- `public.update_family_snapshot` currently runs SECURITY DEFINER and is EXECUTE-granted only to authenticated, service_role and postgres.
- Authenticated role has SELECT and INSERT but **not UPDATE** on `family_snapshots`. The current RPC is needed for updates; simply switching it to SECURITY INVOKER would break sync.
- **Completed on testing 17 Nov 2026:** revoked authenticated TRUNCATE, DELETE, REFERENCES and TRIGGER. Read-only privilege verification confirmed SELECT=true, INSERT=true, UPDATE=false, TRUNCATE=false, DELETE=false, RPC EXECUTE=true. No saved rows were changed.
- Supabase security advisor warns about the privileged RPC and disabled leaked-password protection.

## Required preflight before any write or privilege change
1. Confirm a separate production Supabase project exists; verify project ref distinct from testing, and do not publish service-role keys to the frontend.
2. Back up testing database, verify restoration plan, and obtain two disposable parent test accounts. Do not touch real saved profiles.
3. Test read/insert/update and conflicting revisions for two parents, including cross-parent denial.
4. Only then consider converting the existing RPC to SECURITY INVOKER **in a transaction together with granting authenticated UPDATE** on the table. Keep ownership policies for both USING and WITH CHECK. Verify SELECT policy remains in place. Roll back if any integration test fails.
5. Re-run Supabase security advisors and confirm there are no unexpected grants (especially PUBLIC or anon RPC EXECUTE, or TRUNCATE/DELETE privileges on snapshots).
6. Enable leaked-password protection where supported in Auth settings; test sign-in flows.
7. Configure production Render VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY only after the production project is ready and approved. These are public browser build values; never use service_role/secret keys.
8. Deploy final build only after cross-parent isolation and cloud recovery are demonstrated on staging.

**No migration is applied by this document.** This is a release gate, not proof of security. Existing cloud saves remain untouched.

Reference: https://supabase.com/docs/guides/database/postgres/row-level-security
