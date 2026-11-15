# Step 36 of 250 — EYFS observation schema design

Added a **design-only SQL reference** under `docs/sql/`, deliberately **not** in the deployable `supabase/migrations/` folder. It proposes an `eyfs_observations` table keyed to the existing `family_snapshots(parent_id,profile_key)` composite primary key. Each record contains a child profile key, activity ID, non-attainment status, bounded note, timestamps and a mandatory review flag.

The draft includes parent-scoped RLS policies for create/read/update/delete and a composite foreign key that prevents orphaned child records. It does **not** establish production security: before any migration, restrict mutable ownership columns, validate activity IDs against the authoritative catalogue, review cascade deletion and retention, test real Supabase sessions across households, and complete privacy review.

No database migration was deployed and no observation data is collected by this change.

Next: Step 37 — harden immutable ownership and write permissions in a staging-only schema proposal.
