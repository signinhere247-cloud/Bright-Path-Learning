# Step 101/250 — Preserve legacy reward rules and design idempotent import markers

**Read-only design. No database changes or BrightCoins grants.**

The existing game awards **25 BrightCoins on a first successful lesson** and **5 on later successful attempts**, at a **70% pass threshold**. Step 96 proposed a different 10-coin first-pass rule, so that proposal must not be wired into production. The policy comparison utility explicitly flags mismatches.

A stable `legacy-save-baseline-v1` marker is scoped to authenticated parent UUID and existing explorer profile key. The import preview preserves the existing coin balance exactly, enumerates completed lesson keys, and always awards **zero additional coins** for legacy data. If a marker already exists, it proposes skipping the import.

**Important:** A marker checked only in JavaScript is not race-safe. Production requires a durable unique constraint and a single authenticated database transaction that inserts the marker and baseline atomically, with rollback on failure. The server must derive parent ownership from the verified session; browser-provided parent IDs are never authority. Existing `save_data` remains the source of truth until a separately approved and tested cutover. Legacy completion flags do not prove new lesson attempts and must not be used to mint rewards.

Next: Step 102 — design transactional import ledger and staging verification, without touching live balances.
