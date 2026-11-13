# BrightPath Learning — release checklist

This is the **working rebuild**, not the live V3 deployment. Do not deploy over V3 without explicit approval.

## 1. Install and build on a computer with internet access

Use a current supported Node.js LTS release and npm. In this project's directory:

```sh
npm install
npm run check:build
npm test
npm run audit
npm run build
```

Commit or retain the generated `package-lock.json`. For subsequent installations use `npm ci` so the dependency versions are reproducible. If any command fails, stop and resolve the failure before deploying. Do not manually copy `node_modules` into the final source ZIP.

## 2. Verify actual gameplay in Chromium

```sh
npx playwright install chromium
npm run test:browser
```

The automated smoke test is **not** a full gameplay test. Work through `BROWSER-TEST-PLAN.md` manually on a phone, tablet and desktop, especially lesson rewards, pets, purchases, multi-child switching, backup import, recovery, and refreshing the page.

## 3. Verify cloud backup in staging only

Create a separate Supabase staging project; configure `.env` with public frontend values, never a service-role key. Apply `supabase/migrations/` in filename order. With two unrelated parent accounts, verify sign-in, upload, revision conflicts, automatic-sync pause, restore/recovery, and cross-parent isolation. Record the actual test results. Do not enable cloud accounts for families until these pass.

## 4. Final go/no-go

```sh
npm run release:gate
```

This gate reruns offline tests and, when dependencies are installed, the production build. **It intentionally reports browser gameplay and live cloud security as NOT VERIFIED** until independently tested; it cannot certify them automatically. A nonzero exit code means the release is not yet approved.

Deploy to a separate preview first. Keep live V3 unchanged until the preview is accepted. Produce one final consolidated ZIP only after the release checks are complete.


## Dependency installation recovery (verified blocker, not a successful build)

The current environment cannot resolve `registry.npmjs.org` (`EAI_AGAIN`). Its npm cache is empty, so `npm install --offline` cannot fix this. Do not download unverified third-party dependency archives or fabricate a lockfile.

On a trusted machine with npm registry access, in the project directory:

```bash
npm install --no-audit --no-fund
npm ci
npm run check:build
npm test
npm run audit
npm run build
npx playwright install chromium
npm run test:browser
npm run release:gate
```

Keep the generated `package-lock.json` alongside `package.json` in the final project. If `npm ci` fails, correct the lockfile/dependency mismatch before proceeding. Browser and cloud security checks require independent verification even when the build succeeds. Do not deploy over live V3.

## Isolated preview deployment

Run `npm run check:preview` and follow `PREVIEW-DEPLOYMENT.md` to create a **separate** cloud-disabled preview service. The check validates configuration only; it does not deploy anything. Keep the existing `render.yaml` and live V3 unchanged.

## Remote build validation

A non-deploying GitHub Actions workflow is available at `.github/workflows/preview-validation.yml`. See `CI-VALIDATION.md`. It requires a genuine `package-lock.json`, which has not yet been generated in this environment. Its results are not verified until it actually runs.

- [ ] Run `BRIGHTPATH_BROWSER_MODE=production npm run test:browser:production` after `npm run build` and `npm run check:output`; the CI workflow runs these steps automatically once installed.
