# Step 117/250 — Investigate missing main Supabase ref

## Evidence

The manually triggered GitHub Actions audit (run 43797790003) successfully retrieved public assets and reported:

- `main: project refs = unavailable`
- `testing: project refs = kvsmoxyemuimmlivcevn`
- `BLOCKED: project reference unknown or unexpected`

This is an expected fail-closed audit result, **not evidence of a broken website**.

The production source in `src/cloudFamily.js` only configures parent cloud accounts if both `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are present. The main build might have missing settings, or the scanner might have missed a split/dynamically constructed URL. **Neither explanation has been confirmed**. The available Render connector cannot read environment values.

## Safe follow-up

Check Render main service `Bright-Path-Learning` → Environment, and determine **whether** both Vite variables are configured. Do not copy keys or variable values into chat. A read-only inspection is sufficient. Do not change settings or redeploy yet.

A pure diagnostic helper captures unknown, disabled and ambiguous states without granting database writes. No database migration, test account or deployment was performed.

Next: Step 118 — confirm main build-time cloud configuration status and decide whether separate testing credentials or a new isolated project are required.
