# Step 39 of 250 — Staging RLS probe

Run `node scripts/eyfs-staging-rls-probe.mjs` **only** against a separately verified nonproduction Supabase project after applying and reviewing the observation schema. The script requires `EYFS_STAGING_URL`, `EYFS_STAGING_ANON_KEY`, `EYFS_STAGING_PARENT_A_JWT`, `EYFS_STAGING_PARENT_B_JWT`, `EYFS_STAGING_PARENT_A_ID`, `EYFS_STAGING_CHILD_A_KEY`, and `EYFS_STAGING_PROJECT_LABEL=staging`. Never commit tokens or use service-role keys.

The harness refuses to run when configuration is absent, parent JWTs match, or the project does not have a nonproduction label. It performs **read-only** queries to verify that parent A can query their child and parent B sees no records in that same scope. Populate at least one synthetic observation first and independently verify both JWT identities; an empty owner result alone cannot prove full isolation.

The repository's automated tests only verify fail-closed behaviour and read-only structure. **No live Supabase staging probe has been executed**, and the other Step 38 acceptance cases (writes, revoked access, export, etc.) remain untested. A project label is not a cryptographic guarantee of staging: independently confirm the project identity before running.

Next: Step 40 — EYFS security and learning-activity handoff review.
