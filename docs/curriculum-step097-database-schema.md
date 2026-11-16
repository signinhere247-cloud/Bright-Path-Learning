# Step 97/250 — Proposed durable progress and BrightCoins database schema

**Review-only SQL. Do not run against production.** The SQL file is committed to GitHub but is **not** a migration and has not been executed on any database.

The proposal introduces four PostgreSQL tables: per-child progress revision, lesson attempts, BrightCoins balances, and an idempotent reward ledger. It includes composite child-bound attempt keys, positive coin constraints, foreign keys, and RLS enabled without any client policies. The reward ledger unique key is designed to prevent repeat grants **when used in a single server-side transaction**.

## Integration prerequisites

1. Identify the existing BrightPath authentication provider and child-profile primary keys, then replace placeholder text IDs with actual foreign keys to the family-owned profile table.
2. Define trusted, authenticated server endpoints or narrowly scoped RLS policies that verify family ownership on every request. Merely enabling RLS is not sufficient if privileged server roles bypass it.
3. Implement atomic compare-and-swap for progress revisions, and an atomic reward ledger insertion plus balance increment.
4. Ensure only server-verified lesson completions can be inserted; never trust client-reported correctness or coin amounts.
5. Plan migrations, backup/rollback, retention/deletion, privacy and load testing before applying schema.
6. Test concurrent submissions from two devices, stale revisions, account isolation and retry idempotency against a real PostgreSQL instance.

No production account data, BrightCoins balances, or live database configuration is changed by Step 97.

Next: Step 98 — inspect existing cloud auth/storage and implement an integration-safe migration plan.
