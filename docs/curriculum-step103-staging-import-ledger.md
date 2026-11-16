# Step 103/250 — Staging-only import ledger and concurrency verification plan

**Design only. No database SQL has been executed.** The proposed `learning_legacy_imports` table binds every import to `(parent_id,profile_key)`, the existing family snapshot key. The unique primary key `(parent_id,profile_key,import_version)` is intended to reject repeated baseline imports. Each marker retains the original coin balance, completed keys and cloud snapshot revision for audit.

## Transaction requirements

A trusted backend must verify the authenticated parent, read and lock that parent's child snapshot, check the expected revision, and insert the import marker and baseline in one database transaction. If another request inserts the same marker concurrently, the second request must return an already-imported outcome without altering the baseline. The client must never choose its own parent ID, coin balance, or completion status. No historical reward coins are added. The legacy `save_data` remains authoritative until a tested cutover.

## Staging test matrix (not yet executed)

| Scenario | Expected result |
| --- | --- |
| Two simultaneous imports for same parent and child | Exactly one baseline row; one duplicate outcome |
| Repeated import after success | No balance or progress changes |
| Parent A requests parent B's child | Denied, no database mutation |
| Import interrupted before commit | Entire transaction rolls back |
| Snapshot revision changes during import | Conflict; retry only after reloading current snapshot |
| Same profile key under different parents | Independent rows, no cross-account access |
| Invalid completed keys or balance | Validation error, no marker |
| Existing pet, furniture and cloud save | Remains intact |

## Release blockers

- Verify actual Supabase migrations, schema, function privileges, RLS and auth on a staging project.
- Implement an authenticated server adapter and transactional SQL; this design file alone is not atomic execution.
- Run actual PostgreSQL concurrency and rollback tests and review security before any production rollout.
- Resolve current 25/5 BrightCoins rule versus the proposed 10-coin rule before integrating rewards.

Next: Step 104 — verified staging adapter specification and test harness.
