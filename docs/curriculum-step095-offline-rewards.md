# Step 95/250 — Offline progress conflict classification and reward idempotency

Pure utilities only; no live cloud sync, balance changes, account permissions or reward grants.

- Offline snapshots for the same child are combined when attempt IDs do not collide or records are identical.
- Divergent edits to the same attempt are returned for manual review rather than silently overwritten.
- The proposed merged snapshot increments the remote revision; an authenticated server must still perform an atomic compare-and-swap before committing.
- Completion reward keys include child ID, lesson ID and attempt ID; the eligibility helper checks completion and an existing key ledger without awarding coins.

**Critical release gate:** The eventual server must authenticate family ownership, use durable unique constraints and atomic transactions for reward grants, define whether repeat attempts should earn rewards, and prevent client-side modification of answer correctness or completion. This helper is not an anti-cheat or security boundary. Additional tests must cover device races and genuine conflict resolution.

Next: Step 96 — reward transaction policy and durable persistence integration.
