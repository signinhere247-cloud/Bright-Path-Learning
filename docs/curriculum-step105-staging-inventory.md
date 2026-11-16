# Step 105/250 — Verified BrightPath testing Supabase inventory

**Read-only inspection completed on 2026-11-16. No database changes were made.**

Supabase connector listed two projects. The project specifically named **BrightPath Learning - Testing** is `kvsmoxyemuimmlivcevn` (London region, active). The unrelated Barakah & Blessings project was not inspected or changed.

## Verified inventory

- Public table: `public.family_snapshots`, with RLS enabled and composite primary key `(parent_id,profile_key)`.
- Relevant columns: `parent_id` UUID, `profile_key` text, `save_data` JSONB, `revision` bigint, `display_name`, `learning_age`, `created_at`.
- The table has a foreign key from `parent_id` to `auth.users.id`.
- Connector reported one row; no user content was read or disclosed.
- No `public.learning_legacy_imports` table was present at inspection time.
- Migration history showed three entries: `20261114201159`, `20261114201202`, `20261114201204`. These are not the same filename labels as repository migrations; verify their contents before rollout.

**Not yet verified:** Full effective table grants, RPC privileges, role-specific RLS behavior, staging project separation from any live website, auth test users, concurrent transaction behavior and rollback. A table's RLS flag alone does not prove secure ownership policies. No import tests have been run against this database.

The `assessStagingSchema` utility validates the expected project ID and required table shape from a supplied inventory. It performs no network calls or writes and explicitly refuses to authorize database writes.

## Next security gate

Inspect effective privileges and the deployed `update_family_snapshot` function without accessing user data. Confirm that the testing project is not the live website's configured backend before adding isolated fixture records or applying any schema. Then implement and test a restricted staging adapter. Do not change live balances.

Next: Step 106 — read-only staging permissions and function security audit.
