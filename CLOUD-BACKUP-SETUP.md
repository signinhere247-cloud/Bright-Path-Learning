# Optional cloud backup setup (not yet live-tested)

1. Create a Supabase project. Run `supabase/migrations/202611130003_family_snapshots.sql` in its SQL Editor.
2. Add the project's URL and **publishable** key as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the deployment environment. Never use a service-role key in the website.
3. Configure the Supabase Auth redirect URL for the deployed website.
4. Sign in via Profile → Parent cloud account. Use **Upload current explorer** for each child to create their first cloud snapshot. Existing cloud snapshots cannot be overwritten; the database intentionally rejects duplicates.
5. To restore, use **Restore a cloud backup**, choose the destination local child, and type RESTORE. Download a local backup first.

**Limitations:** Cloud snapshots are manual and first-upload-only, not continuous synchronisation. The cloud feature has not been tested against a live Supabase project or in a real browser. SQL RLS protects records by authenticated parent ID, but must be tested with two separate accounts before production use. The older read-only 'Check my cloud profiles' button queries a separate legacy `child_profiles` table and may not work until its schema is configured; use the cloud restore list for snapshots. Do not claim production readiness until these tests pass.

## Security hardening (required before launch)
Apply migrations in numeric order through `202611130005_secure_sync_rpc.sql`.
Migration 005 revokes direct authenticated UPDATE access to family snapshots,
so callers cannot bypass revision conflict checks by updating the table directly.
The revised RPC runs with database-owner permissions but explicitly restricts
updates to `auth.uid()` and an exact expected revision. Never place the
Supabase service-role key in the website or a public environment variable.

Offline contract tests do not prove the database is configured correctly.
Before enabling cloud accounts for families, use two distinct authenticated
parent test accounts to verify each cannot read, insert, update, or delete
the other's snapshots; test a stale revision; verify direct table UPDATE is
denied; verify sign-in recovery, backup and restoration on separate browsers.
No live database verification has been performed here.

### Switching explorers during automatic sync
Automatic sync jobs are now tied to the explorer ID that generated the save. Switching or adding an explorer stops pending uploads on the departing page, so progress from one child cannot be uploaded under another child's identity. The local save remains intact, but a queued upload may not reach the cloud before navigation. To ensure the latest progress is backed up before switching, use **Sync linked explorer safely** and wait for confirmation. If a request is already in flight when switching, it retains the original explorer ID. These are offline-tested safeguards; multi-device browser tests remain outstanding.
