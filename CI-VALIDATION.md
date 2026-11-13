# Preview validation in GitHub Actions

This is a **validation-only** workflow. It has no deployment credentials, does not publish a site, and cannot replace the live V3 website. It runs on the `brightpath-preview` branch, matching pull requests, or manually with **Run workflow**.

## Dependency lockfile bootstrap

If `package-lock.json` is missing, the workflow generates a **real** lockfile from the npm registry on the GitHub runner, then uses `npm ci` for installation. It attempts to upload the resulting lockfile as a 14-day Actions artifact for review after installation, including when the lockfile was generated during the run. The generated lockfile is **not committed automatically**. Download and commit it to the `brightpath-preview` branch after a successful run to make subsequent installations reproducible without regeneration. A missing or inconsistent committed lockfile will still cause `npm ci` to fail, as intended.

## Run

1. Upload the working project to a **private** GitHub repository, preserving `.github/workflows/preview-validation.yml`. Never commit `.env` files or parent account credentials.
2. Push the `brightpath-preview` branch. If the lockfile is absent, the runner will generate one and attach it to the workflow run.
3. Open **Actions → BrightPath preview validation → Run workflow**, or push to the preview branch.
4. Inspect every step: unit tests, offline audit, preview/deployment checks, production build, generated assets, and Chromium smoke tests at desktop and mobile viewport sizes.
5. A passing workflow verifies this particular build and smoke scenario only. It does **not** verify complete gameplay, real mobile devices, staging Supabase security, or readiness to replace V3.

The workflow does not require Supabase environment variables; cloud functions remain unconfigured in these tests. Configure and test cloud features separately in a staging environment with two unrelated parent accounts before enabling them for families.

## Test the built production site (not just the development server)

The CI workflow now runs `npm run build`, validates the generated assets, and
starts `vite preview` for Chromium smoke tests using
`BRIGHTPATH_BROWSER_MODE=production npm run test:browser:production`.
This tests the generated `dist/` site at desktop and mobile viewport sizes.
The development test remains available as `npm run test:browser`.
These tests are not proof of complete gameplay or cloud security; run manual
lesson, rewards, family recovery and staged Supabase checks before release.

## Browser test evidence

Every browser run writes `test-artifacts/browser/results.json` with desktop/mobile results and the last checkpoint. On failure, a screenshot (`failure-desktop.png` or `failure-mobile.png`) and recent server output (`server.log`) are saved in the same directory. The workflow uploads these files as the `brightpath-browser-diagnostics` artifact even if the browser step fails. This is diagnostic evidence, **not** a claim that Chromium tests have run successfully.
