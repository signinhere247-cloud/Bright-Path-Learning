# Step 111/250 — Opt-in testing-only build report

**Prepared, not deployed.** This change does not modify Render environment variables, deploy a site, create user accounts, or touch a database.

A pure `createTestingBuildReport` function and `scripts/print-testing-build-report.mjs` allow a **future explicitly opted-in testing build** to print a minimal JSON report containing only service, environment, testing Supabase project ref, exact Render git SHA and schema version. No API keys or secrets are included. It refuses production service identity, non-testing environments, unexpected project refs and missing SHA. It does not automatically run in `npm run build` or produce public web assets.

## Preconditions for optional execution

Only the `brightpath-cloud-auth-testing` Render service may run the command, with `BRIGHTPATH_BUILD_REPORT=enabled`, `BRIGHTPATH_RENDER_SERVICE=brightpath-cloud-auth-testing`, `BRIGHTPATH_ENVIRONMENT=testing`, `VITE_SUPABASE_URL` configured for the dedicated testing project and a 40-character `RENDER_GIT_COMMIT`. No change is required for the main site.

Optional command: `node scripts/print-testing-build-report.mjs` in the **testing service only**. The report reflects supplied build environment values, not necessarily the already-deployed JS assets; match commit to deployed asset provenance separately. Do not paste full environment dumps into chat.

## Still blocked

The main site's effective Supabase project remains unverified, and the testing build report has not been executed. Therefore cross-account write tests are still blocked. No claims of production isolation or successful staging integration testing should be made.

Next: Step 112 — verify deployed build provenance and determine whether the live website uses a different backend before authorizing isolated fixture tests.
