# Step 35 of 250 — Existing parent authentication and child-profile architecture

Reviewed `src/cloudFamily.js`, `src/familyProfiles.js`, `supabase/migrations/202611130005_secure_sync_rpc.sql` and `docs/reviews/CLOUD-ACCOUNT-STATUS.md`.

**Findings:** BrightPath already has optional Supabase parent email-link sign-in, local family explorer profiles (up to eight), parent-owned cloud snapshot records and a revision-checked sync RPC using `auth.uid()`. Observation functionality should **reuse this existing login**, not introduce a second account system. Browser-selected profile IDs are not a substitute for server-side ownership verification.

The cloud status document explicitly says live Supabase auth/RLS and cross-parent isolation have **not been verified**. Existing snapshot policies do not secure any future observation table automatically.

The structured findings file records five architecture observations, integration decisions and four questions about production migration status, profile ID lifecycle, retention and lawful basis. No auth, profile, migration or live storage code is changed.

Next: Step 36 — design an observation schema tied to verified parent-owned profile keys and stage RLS checks.
