-- Step 97: proposed PostgreSQL schema, NOT executed or deployed.
-- Requires integration with existing authenticated family/child ownership tables.
-- child_profile_id is a placeholder external identifier; enforce ownership in server API/RLS.
BEGIN;
CREATE TABLE IF NOT EXISTS learning_child_progress (
 child_profile_id text PRIMARY KEY,
 revision bigint NOT NULL DEFAULT 0 CHECK (revision >= 0),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS learning_lesson_attempts (
 child_profile_id text NOT NULL REFERENCES learning_child_progress(child_profile_id) ON DELETE CASCADE,
 attempt_id text NOT NULL,
 lesson_id text NOT NULL,
 total_questions integer NOT NULL CHECK (total_questions BETWEEN 1 AND 50),
 answers jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(answers) = 'object'),
 started_at timestamptz NOT NULL,
 completed_at timestamptz,
 PRIMARY KEY (child_profile_id, attempt_id),
 CHECK (completed_at IS NULL OR completed_at >= started_at)
);
CREATE INDEX IF NOT EXISTS learning_attempts_by_lesson ON learning_lesson_attempts(child_profile_id,lesson_id);
CREATE TABLE IF NOT EXISTS learning_brightcoin_balances (
 child_profile_id text PRIMARY KEY REFERENCES learning_child_progress(child_profile_id) ON DELETE CASCADE,
 balance bigint NOT NULL DEFAULT 0 CHECK (balance >= 0)
);
CREATE TABLE IF NOT EXISTS learning_brightcoin_ledger (
 child_profile_id text NOT NULL REFERENCES learning_child_progress(child_profile_id) ON DELETE CASCADE,
 reward_key text NOT NULL,
 lesson_id text NOT NULL,
 attempt_id text NOT NULL,
 coins integer NOT NULL CHECK (coins > 0),
 granted_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (child_profile_id,reward_key),
 FOREIGN KEY (child_profile_id,attempt_id) REFERENCES learning_lesson_attempts(child_profile_id,attempt_id)
);
-- Enable RLS and intentionally grant NO client-facing policies. All access must
-- be routed via a trusted server with verified family-to-child ownership.
ALTER TABLE learning_child_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_lesson_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_brightcoin_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_brightcoin_ledger ENABLE ROW LEVEL SECURITY;
COMMIT;
