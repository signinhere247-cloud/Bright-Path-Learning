# Step 112/250 — Verified Render deployment provenance

**Read-only Render inspection on 2026-11-16. No deploys triggered.**

| Site | Render service | Branch | Live commit | Live deploy |
|---|---|---|---|---|
| Main BrightPath | `srv-dbrercbm8hqs73cr73sg` | `main` | `344c82a2aa40086c613b025b2fb74224a5df9d37` | `dep-dbt77su8bjmc73falbs0` |
| Cloud-auth testing | `srv-dbsc47d6e07s739ebvig` | `cloud-auth-testing` | `e5a9f054a5cc5d225e36fddc660a0c12416feb79` | `dep-dbsdj7l6e07s739i3ubg` |

The testing service's most recent deployment was from November 14; the main service's was November 16. These are separate deployed builds, but **different Git commits do not establish different Supabase databases**. No effective `VITE_SUPABASE_URL` was available in Render service/deploy metadata. Do not infer a project ref from the branch name.

The pure `verifyRenderDeployProvenance` helper validates caller-provided service, branch, status and full commit IDs. It intentionally always returns `backendIsolationVerified:false` and `allowsDatabaseWrites:false`. Tests are offline, not live integration tests.

Next: Step 113 — obtain actual deployed JS backend refs by safe read-only artifact inspection, or obtain user-approved configuration evidence if tool access remains insufficient. Do not deploy the opt-in testing report until it is on the testing branch and deployment is explicitly intended.
