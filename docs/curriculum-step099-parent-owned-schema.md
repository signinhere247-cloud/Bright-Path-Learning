# Step 99/250 — Parent-owned learning database design and safe migration plan

**Design-only. This SQL is not a migration, is not executed, and must not be applied to production.**

The existing `public.family_snapshots` table identifies each child by **`(parent_id, profile_key)`**. Step 97's standalone `child_profile_id` schema is insufficient for family ownership. Step 99 replaces that proposed approach with a composite parent+child key on every progress, attempt, balance and reward-ledger record, including foreign keys to the existing family snapshots. RLS is enabled and client CRUD is revoked; there are no direct browser policies.

## Compatibility and migration safeguards

- **No double wallet:** Existing `save_data.coins` is already the live BrightCoins balance. Do not write both that field and a new balance table until a tested single-source-of-truth transition exists.
- **No duplicate rewards:** Existing `save_data.completed` is already used for lesson completion. A one-time import must establish legacy completion/reward status without awarding coins again.
- **Parent ownership:** Parent IDs must come from verified Supabase auth; never from browser input. Check parent+profile ownership within each trusted server transaction.
- **Preserve backups:** Do not rewrite `family_snapshots.save_data` or delete existing records during initial schema rollout. Use a staging clone with anonymised data and backup/rollback procedures.
- **Race safety:** A trusted transaction must compare progress revisions, insert a unique ledger entry and update balance atomically. RLS alone does not provide this.
- **Review real deployment:** Inspect actual Supabase schema, roles, RLS policies, function privileges, and migration history before attempting any changes.
- **Release gate:** Run account-isolation, concurrent-device, retry, rollback and migration tests against a real staging PostgreSQL/Supabase project before production.

## Outstanding issues

The Step 97 draft remains review-only and should **not** be applied as written. Step 99 is also a proposed design; its tests only inspect SQL structure, not live database behavior. A secure API, transaction implementation, migration toolchain and verified staging tests are still needed.

Next: Step 100 — legacy save migration mapping and staged rollout plan.
