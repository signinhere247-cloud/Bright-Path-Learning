# Step 100/250 — Legacy progress and BrightCoins migration mapping

**Read-only planning. No SQL is executed, no profiles are uploaded, and no coins are granted.**

## Existing source-of-truth findings

- `src/backup.js` validates `save_data.coins` as a nonnegative safe integer (up to 10 million) and `save_data.completed` as an object of up to 1,000 true flags.
- `src/lessonProgress.js` uses keys formatted as **`subject:topic`**. Passing a lesson for the first time grants **25 BrightCoins**; repeating a previously passed lesson grants **5 BrightCoins**. The proposed Step 96 rule of 10 coins per first lesson is **not compatible** with this live policy.
- `src/familyProfiles.js` keeps up to eight profiles per family and retains the full saved state, including game possessions and pet state.
- Existing cloud `family_snapshots.save_data` stores the whole validated save, so it remains the source of truth until a controlled, tested cutover.

## Migration rules

1. Preserve the current balance exactly as a baseline; do not add previously earned coins again.
2. Preserve all existing `subject:topic` completion flags, and do not claim they are equivalent to the new curriculum lesson IDs until a reviewed mapping exists.
3. Do not manufacture answer-level attempt histories from completion flags.
4. Keep the old reward rules unchanged in production until the user approves a policy change and a migration plan is verified.
5. Define a migration ledger marker separate from reward-grant entries to prevent double import; verify idempotency and atomic rollback on a staging database.
6. Validate parent ownership using authenticated `parent_id` and existing `profile_key`; never trust browser-supplied owner IDs.
7. Preserve legacy `save_data`, family backups, pet/home data, and progress; test on anonymised staging data with real concurrency, then plan a reversible rollout.

The new preview utility reads and validates existing save objects and returns a proposed baseline and warnings. It **does not** write to storage, merge progress, modify BrightCoins or perform a real migration.

## Blockers before implementation

- Decide whether the 25/5 reward policy remains or changes, and how to handle new curriculum lesson IDs.
- Verify actual Supabase deployment and secure family-owned schema in staging.
- Implement server-side verified completion and atomic database transactions, with multi-device and rollback tests.

Next: Step 101 — align reward policy with existing game behaviour and draft idempotent import markers.
