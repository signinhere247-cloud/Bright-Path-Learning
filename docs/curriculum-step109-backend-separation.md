# Step 109/250 — Deployed Supabase backend separation verification

## Findings, 2026-11-16

Render service inspection confirms two independent BrightPath static sites in the same repository:

- Main: `Bright-Path-Learning`, branch `main`, `srv-dbrercbm8hqs73cr73sg`, https://bright-path-learning.onrender.com
- Testing: `brightpath-cloud-auth-testing`, branch `cloud-auth-testing`, `srv-dbsc47d6e07s739ebvig`, https://brightpath-cloud-auth-testing.onrender.com

Repository `render.yaml` does not specify Supabase environment values. The app reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` at build time in `src/cloudFamily.js`. Render service metadata does not disclose effective values, and attempts to retrieve deployed websites from the available HTTP clients were unsuccessful. Therefore **neither deployed backend project ID is verified**. Distinct service names and branches are insufficient proof.

## Verification procedure (no secrets required)

For each deployed site, inspect its current built JavaScript assets or a securely sourced deployment manifest to extract only the Supabase URL's 20-character project ref and deployed build SHA. Never record publishable keys, access tokens or full environment dumps. Confirm testing uses `kvsmoxyemuimmlivcevn` and main uses a **different** ref. If main uses the same project or cannot be verified, stop: no test-account writes or schema changes.

The pure `verifyDeployedBackendSeparation` function checks evidence labelled as deployed build assets and refuses equal or unknown project refs. Its caller-provided evidence labels are **not cryptographically authenticated**; manual independent verification remains mandatory. Even after a passing result, `stagingWritesPermitted` stays false until a separate explicit staging authorization gate.

## Status

**BLOCKED — backend separation not independently verified.** No accounts, data, Supabase settings or deployed websites changed. Continue non-writing tests and checks while awaiting evidence.

Next: Step 110 — secure deployed asset manifest collection or a read-only Render environment verification workflow.
