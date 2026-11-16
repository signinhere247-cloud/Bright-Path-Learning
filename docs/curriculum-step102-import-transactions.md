# Step 102/250 — Atomic legacy import transaction contract

**Not connected to Supabase or production.** This is a dependency-injected contract with unit tests, not a deployed database migration.

A trusted server must authenticate the parent, check ownership of the requested child profile, and read the existing cloud snapshot from the database rather than accept coins or completed lessons supplied by the browser. The contract then calls an `insertBaselineOnce` adapter with a stable parent+child import marker, exact historical coin balance, legacy completed keys and **zero additional coins**.

The adapter must implement **one atomic database transaction**: insert a unique marker and the baseline or do nothing if the marker exists. On errors, roll back all changes. No partial baseline, marker or balance writes. A unique constraint on the marker and composite parent+profile ownership foreign key are required.

Staging release tests: two parents cannot import one another's profiles; concurrent duplicate calls create one marker/baseline; failures roll back completely; existing wallet and completed flags remain unchanged; all retries are idempotent. Never switch the source of truth from `family_snapshots.save_data` until a separately reviewed cutover is complete.

The mock tests verify the adapter contract only; they do **not** prove database atomicity or security. No migration has run.

Next: Step 103 — staging-only import ledger schema proposal and race-condition test plan.
