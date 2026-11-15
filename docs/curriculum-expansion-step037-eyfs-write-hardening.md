# Step 37 of 250 — Observation write security design

Adds a **design-only** SQL hardening proposal that revokes unrestricted UPDATE and grants changes only to `status`, `note` and `updated_at`. A proposed database trigger rejects modifications to the observation ID, parent ID, child profile key, activity ID, creation timestamp and review requirement.

This supplements, **not replaces**, Step 36's row-level security design. The SQL remains under `docs/sql/`, not `supabase/migrations/`; no production database is altered.

Before any deployment: test on staging with two independently authenticated parent accounts, verify UPDATE grants and RLS together, review trigger privileges and timestamp handling, confirm activity catalogue validation and retention/deletion policies.

Next: Step 38 — stage-ready RLS test matrix and database security acceptance criteria.
