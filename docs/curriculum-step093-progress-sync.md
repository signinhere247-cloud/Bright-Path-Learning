# Step 93/250 — Per-child progress snapshot and optimistic sync contract

Adds a pure data contract for preparing per-child lesson attempts for eventual cloud persistence. **This is not a live database integration.**

- Validates child IDs, attempt schema, timestamps, duplicate attempt IDs and revision numbers.
- Copies data defensively to avoid modifying existing local state.
- Stages attempts for one child profile only.
- Prepares optimistic writes using expected revision numbers and detects remote/local conflicts.
- Rejects mismatched child profiles and conflicting attempt edits; never silently overwrites remote progress.

**Required before production:** authenticated server-side family and child ownership checks; durable storage with atomic compare-and-swap on revision; unique attempt constraints; reconciliation of legitimate offline changes; secure backups, privacy retention and account deletion; robust retry handling; real end-to-end tests. The client-supplied profile ID is **not an authorization mechanism**. No BrightCoins or mastery state is updated by this contract.

Next: Step 94 — authenticated persistence interface and offline conflict resolution planning.
