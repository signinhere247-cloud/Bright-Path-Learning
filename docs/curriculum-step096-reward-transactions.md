# Step 96/250 — BrightCoins reward transaction policy

Introduces pure reward planning and a dependency-injected transaction interface, **not a live coins award system**.

- Proposed lesson-completion award: **10 BrightCoins** (a draft policy, subject to product approval).
- Reward uniqueness is scoped to child + lesson, so repeating a lesson cannot earn the completion award twice.
- A trusted server must verify completion and child ownership before calling the transaction adapter.
- The supplied storage adapter must atomically insert a unique ledger key and increment the balance in one transaction; the unit tests use a fake, not a production database.
- No current pupil balances, wallets, accounts or lessons are changed.

**Production prerequisites:** durable unique key constraint, transactional ledger and balance updates, verified lesson submissions, family authorization, audit trails, idempotent retries, rollback tests, offline/device race testing and approved BrightCoins earning policy.

Next: Step 97 — durable reward ledger schema and cloud persistence integration.
