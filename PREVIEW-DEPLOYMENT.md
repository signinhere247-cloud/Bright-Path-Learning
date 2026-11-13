# BrightPath Learning — isolated preview deployment

This is a **plan and configuration**, not evidence of a deployed preview. The existing live V3 must remain unchanged.

1. On a trusted computer with internet access, run `npm install` to create `package-lock.json`, then `npm ci`, `npm test`, `npm run check:preview`, and `npm run build`. Stop if any command fails.
2. In Render, create a **new** static service named `brightpath-learning-preview` using the settings in `render.preview.yaml`. Do **not** apply it to the existing service or overwrite `render.yaml`. If Render does not accept a second blueprint file directly, enter these settings manually for the new service.
3. Disable automatic deploys. Set no Supabase environment variables for this first local-only gameplay preview. Do not add service-role keys to browser environment variables.
4. Deploy the new preview service manually, open its **new preview URL**, and run the checks in `BROWSER-TEST-PLAN.md` on desktop, phone and tablet. Verify family profiles, lesson rewards, pets, shop, reload persistence, backup and recovery.
5. Test cloud backup **separately** against a staging Supabase project with two unrelated accounts. Never connect the preview to production family data for these tests.
6. Record actual browser/cloud outcomes before approving release. Do not replace live V3 without explicit approval.

`npm run check:preview` only validates the preview blueprint text; it does not deploy or verify hosting behavior. A successful build, browser test, and staging cloud test are still required. No interim ZIP should be created.

## Source files versus deployed files

Run `npm run check:package` for an **offline inventory**. It deliberately excludes `node_modules/`, `dist/`, Git metadata and `.env*` files from the source inventory. This command does **not** create a ZIP or deploy anything. It reports a missing lockfile or `dist/index.html` as a blocker rather than silently treating source files as a finished website.

The eventual **source release** needs the project files and a generated `package-lock.json`; install it with `npm ci`. The **deployable website** is the `dist/` directory created by `npm run build`, not `src/` or `index.html` alone. Keep the production website separate from the source archive. Neither package should include `.env` secrets or `node_modules`.
