# Production build and release status (2026-11-13)

## Verified in this working directory

- `npm test`: **112/112 passed** (offline unit tests).
- `npm run audit`: **43/43 passed** (offline source checks).
- `npm run check:build`: scanned **21 local JavaScript source files**; no missing relative imports reported, but **blocked** by missing `three` and `vite` dependencies.
- `npm run build`: **blocked** (`vite: not found`).
- `package-lock.json`: **absent**; reproducible dependency installation not established.
- `scripts/browser-smoke.mjs`: available and now includes a real reload/persistence assertion, but **not executed** against a running browser.

## Required before calling this production-ready

1. On a machine with working npm registry access, run `npm install` and retain the generated `package-lock.json`.
2. Run `npm run check:build`, `npm test`, `npm run audit`, and `npm run build` and resolve any failures.
3. Run `npx playwright install chromium` and `npm run test:browser`; manually test desktop and mobile gameplay, lessons, profile switching, save/restore, rewards, pet actions, and reports.
4. Configure a **separate staging** Supabase project and apply all migrations in order. Verify authentication, first upload, revision conflicts, restore, auto-sync and parent-to-parent isolation with two unrelated accounts.
5. Deploy only to a **separate preview**. Keep live V3 untouched until testing and approval.

Offline checks do **not** prove production build, browser behaviour, database permissions or multi-device cloud sync.

## Follow-up offline regression fix (2026-11-13)

- Retried `npm install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=12000`: blocked by DNS `EAI_AGAIN` for `registry.npmjs.org`. No production build or real-browser run is claimed.
- Fixed a real UI regression: the **cloud-restore recovery copy** button was absent when cloud credentials were not configured, but its click handler was registered unconditionally, which would throw when opening the parent cloud account. Recovery is now accessible even without cloud configuration.
- Added `tests/cloudRecoveryAccess.test.js` to guard offline recovery access.
- `node --check src/main.js`: passed; `npm test`: **113/113 passed**; `npm run audit`: **43/43 passed**.
- A source-level test is not a substitute for a browser test; release blockers listed above remain.
