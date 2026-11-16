# Step 98/250 — Existing BrightPath cloud integration audit

**Read-only repository review. No Supabase schema, accounts, balances or live backups were modified.**

## Existing architecture verified in source

- `src/cloudFamily.js`: optional Supabase email OTP parent sign-in via public publishable key, parent session check, parent-owned `family_snapshots` uploads/downloads, revision-checked RPC sync.
- `src/familyProfiles.js`: up to eight explorer profiles per local family; each profile ID matches `^[A-Za-z0-9_-]{8,80}$`; local saves include coins and completed lessons.
- `src/cloudSaves.js`: validates and serialises the whole existing explorer save to `save_data`.
- `src/cloudSync.js` and `src/autoCloudSync.js`: revision tracking and opt-in sync; conflicts pause automatic upload.
- `supabase/migrations/202611130003_family_snapshots.sql`: `parent_id uuid` references `auth.users(id)`; primary key is `(parent_id,profile_key)`; parent-scoped SELECT and INSERT RLS policies.
- `supabase/migrations/202611130005_secure_sync_rpc.sql`: security-definer `update_family_snapshot` with `auth.uid()` owner condition and expected revision check. This requires an actual database security review; static source review does not prove safe deployed permissions.

## Integration blocker discovered

Step 97's **review-only** schema uses `child_profile_id text` without a parent ownership foreign key. That is **not sufficient** for production family isolation. A production learning table must reference the existing composite key `(parent_id,profile_key)` from `public.family_snapshots`, or use a verified server-side mapping with equivalent ownership enforcement. Every lesson attempt, progress revision and BrightCoins transaction must enforce that binding. Do **not** apply the Step 97 SQL as-is.

Also, the existing `save_data` already stores `coins` and `completed` data. Introducing separate wallet/lesson tables without a single source of truth risks diverging balances and progress. Choose and test a controlled migration and compatibility strategy before enabling new writes.

## Next actions

1. Verify the connected Supabase project's actual schema, migrations, grants, RLS policies and RPC owner using a read-only staging inspection. Repository files alone cannot establish what is deployed.
2. Design child ownership as a composite parent+profile foreign key and enforce it on all new tables and trusted RPCs.
3. Define a one-time migration from `save_data` to structured lesson/reward records without double-awarding legacy coins; preserve legacy saves and rollback path.
4. Implement transactional and server-verified progress/reward writes, with parent-isolation, concurrency and two-device tests.
5. Keep new features gated until educator review and security testing are complete.

**Current status:** This is a documented architecture audit, not a live cloud integration. Existing cloud backup code remains unchanged.

Next: Step 99 — parent-owned schema design and migration compatibility checks.
