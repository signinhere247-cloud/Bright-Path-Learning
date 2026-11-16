# Step 106/250 — Live read-only permissions audit of BrightPath Testing Supabase

Inspection date: 2026-11-16. Project: **BrightPath Learning - Testing**, `kvsmoxyemuimmlivcevn`. **No database writes or user-row reads were performed.**

## Verified

- `public.family_snapshots` has RLS enabled.
- `anon`: SELECT and INSERT denied.
- `authenticated`: SELECT and INSERT permitted subject to RLS; direct UPDATE privilege denied.
- Parent SELECT, INSERT and UPDATE policies each reference `auth.uid()`; UPDATE has both USING and WITH CHECK.
- `public.update_family_snapshot` is executable by authenticated users, not anon; it is `SECURITY DEFINER` with empty fixed `search_path`.
- Function body checks `auth.uid()` is non-null, validates profile key and expected revision, updates only `parent_id = auth.uid()` and the matching profile key/revision, and raises `SYNC_CONFLICT` when no row matches.

## Security caveats

`SECURITY DEFINER` is privileged code that may bypass RLS. Its ownership/revision checks are positive findings, **not** proof of security. Full review should examine function owner, EXECUTE grants (including PUBLIC), input payload validation, concurrency, abuse limits and account-specific runtime tests. Table grants and policies alone cannot demonstrate actual client isolation.

The audit utility evaluates a supplied, sanitized permission inventory; it does not contact Supabase. Its unit tests are not live authorization tests.

## Before any staging writes

1. Verify that this testing project is not configured as the live website backend.
2. Inspect function owner and effective EXECUTE grants, check the database security advisors and test cross-parent access using dedicated staging accounts.
3. Keep existing save_data authoritative; do not apply Step 99/103 design SQL or import historical rewards yet.

Next: Step 107 — function-owner and effective privilege audit, plus a staging-only auth isolation test plan.
