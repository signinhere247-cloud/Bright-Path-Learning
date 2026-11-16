# Step 94/250 — Authenticated progress gateway interface

This adds a **dependency-injected contract**, not a connected production database or authentication service.

- Every read and write invokes a trusted, supplied `authorize(context, childProfileId)` callback.
- Writes require a matching child ID and next revision.
- Storage must provide a truly atomic `compareAndSwap` implementation; conflicts are returned rather than overwritten.
- Unit tests use an in-memory fake for demonstration only; this fake is not a deployable database.
- The module does not expose child progress in the pupil UI or award BrightCoins.

**Security requirements before production:** Authorization must execute on a trusted server, derive the family account from a verified session, and check child ownership. Never trust user-supplied child IDs or permissions. The database must enforce row-level ownership and atomic revision constraints, with backups, privacy controls, conflict reconciliation, retries and multi-device tests.

Next: Step 95 — offline conflict reconciliation rules and idempotent completion design.
