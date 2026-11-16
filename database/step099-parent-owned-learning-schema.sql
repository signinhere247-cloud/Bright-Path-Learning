-- Step 99: DESIGN-ONLY SQL. DO NOT APPLY TO PRODUCTION.
-- Requires existing public.family_snapshots(parent_id, profile_key) migration 003.
-- Must be reviewed with actual database permissions before any migration.
BEGIN;
CREATE TABLE IF NOT EXISTS public.learning_progress_revisions (
 parent_id uuid NOT NULL,
 profile_key text NOT NULL,
 revision bigint NOT NULL DEFAULT 0 CHECK (revision >= 0),
 PRIMARY KEY (parent_id, profile_key),
 FOREIGN KEY (parent_id, profile_key) REFERENCES public.family_snapshots(parent_id, profile_key) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS public.learning_attempt_records (
 parent_id uuid NOT NULL,
 profile_key text NOT NULL,
 attempt_id text NOT NULL CHECK (length(attempt_id) BETWEEN 1 AND 100),
 lesson_id text NOT NULL CHECK (length(lesson_id) BETWEEN 1 AND 100),
 answers jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(answers)='object'),
 started_at timestamptz NOT NULL,
 completed_at timestamptz,
 PRIMARY KEY (parent_id, profile_key, attempt_id),
 FOREIGN KEY (parent_id, profile_key) REFERENCES public.family_snapshots(parent_id, profile_key) ON DELETE CASCADE,
 CHECK (completed_at IS NULL OR completed_at >= started_at)
);
CREATE TABLE IF NOT EXISTS public.learning_coin_balances (
 parent_id uuid NOT NULL,
 profile_key text NOT NULL,
 balance bigint NOT NULL DEFAULT 0 CHECK (balance >= 0),
 PRIMARY KEY (parent_id, profile_key),
 FOREIGN KEY (parent_id, profile_key) REFERENCES public.family_snapshots(parent_id, profile_key) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS public.learning_coin_ledger (
 parent_id uuid NOT NULL,
 profile_key text NOT NULL,
 reward_key text NOT NULL,
 attempt_id text NOT NULL,
 lesson_id text NOT NULL,
 coins integer NOT NULL CHECK (coins > 0),
 granted_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (parent_id, profile_key, reward_key),
 FOREIGN KEY (parent_id, profile_key, attempt_id) REFERENCES public.learning_attempt_records(parent_id, profile_key, attempt_id) ON DELETE CASCADE
);
-- Defense in depth: do not grant client CRUD privileges or add policies here.
ALTER TABLE public.learning_progress_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_attempt_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_coin_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_coin_ledger ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.learning_progress_revisions, public.learning_attempt_records, public.learning_coin_balances, public.learning_coin_ledger FROM anon, authenticated;
COMMIT;
