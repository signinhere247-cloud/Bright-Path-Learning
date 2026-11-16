# Step 110/250 — Safe deployed backend evidence workflow

**Status: still unverified; no live website changes and no database writes.**

The BrightPath main and testing Render services exist separately, but their effective build-time `VITE_SUPABASE_URL` values remain unknown. The Render connector provides service metadata but no read-only environment variable values. The available runtime cannot fetch the Render website assets (DNS resolution failed). This is not evidence that either site is offline.

## Credential-safe verification

1. On the **testing** deployment only, a future opt-in build may emit a small deployment evidence JSON with the Supabase project reference and source commit, but **no publishable key, secret key, token, or database credentials**.
2. Obtain the **main** site's Supabase project ref through a separately verified read-only build manifest or secure inspection. Do not enable a new diagnostic endpoint on the main site just for this check.
3. Match both records to the actual deployed commit and service, not merely a branch name or configuration file. Confirm testing ref is `kvsmoxyemuimmlivcevn` and main ref is different.
4. If either cannot be verified, stop. Do not create staging users, apply migrations or import data.

The pure helper in `src/deploymentBackendEvidence.js` formats and compares *caller-supplied* evidence. It does not retrieve, authenticate or publish manifests, and cannot establish isolation on its own. Its comparison result **never** authorizes writes. No test site deployment was triggered.

Next: Step 111 — staging-only, opt-in build evidence artifact with explicit deployment provenance, pending verified configuration and review.
