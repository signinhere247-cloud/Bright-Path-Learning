-- Step 103: staging design ONLY. NOT an executable production migration.
-- Requires existing public.family_snapshots(parent_id,profile_key).
-- Do not run until staging schema, grants and auth ownership are reviewed.
BEGIN;
CREATE TABLE IF NOT EXISTS public.learning_legacy_imports (
 parent_id uuid NOT NULL,
 profile_key text NOT NULL,
 import_version text NOT NULL DEFAULT 'legacy-save-baseline-v1',
 baseline_coins bigint NOT NULL CHECK (baseline_coins BETWEEN 0 AND 10000000),
 completed_keys jsonb NOT NULL CHECK (jsonb_typeof(completed_keys)='array'),
 snapshot_revision bigint NOT NULL CHECK (snapshot_revision >= 0),
 imported_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(parent_id,profile_key,import_version),
 FOREIGN KEY(parent_id,profile_key) REFERENCES public.family_snapshots(parent_id,profile_key) ON DELETE CASCADE
);
ALTER TABLE public.learning_legacy_imports ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.learning_legacy_imports FROM anon,authenticated;
-- No client policies and no public RPCs: trusted backend transaction only.
-- The transaction must lock/read the verified parent-owned snapshot and revision,
-- then insert marker+baseline in the SAME transaction; on conflict do nothing.
COMMIT;
