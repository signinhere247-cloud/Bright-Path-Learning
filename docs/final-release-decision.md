# BrightPath consolidated release decision — Milestone 11

**Decision: HOLD — do not merge to main or deploy.**

## Confirmed by CI
- Candidate branch: `milestone-cloud-production-isolation-guard` (PR #154).
- GitHub Actions preview validation: https://github.com/signinhere247-cloud/Bright-Path-Learning/actions/runs/43992824977 — success.
- Source-level cloud safeguards, migration contract checks, unit tests and production build have been exercised by preview validation.
- These are offline checks and do not prove that the staging database and production browser behave correctly.

## Release blockers (must be independently verified)
1. **Separate BrightPath production Supabase project.** Connected project list currently shows BrightPath Testing `kvsmoxyemuimmlivcevn` and a project belonging to a different business. Do not reuse either for production.
2. **Production build-time configuration.** Production Render must use the new production project's `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, without service-role/secret keys. Rebuild only at approved final release.
3. **Two real parent-account RLS tests on staging.** Each parent creates and reads their own child snapshots; cross-parent reads, writes, and RPC updates must be denied. Test same profile key across parents, revision conflict, sign-out, and expired session. No real children's data in test fixtures.
4. **Cross-device recovery.** Confirm device A upload, device B sign-in and restore, device B update, stale device A sync rejection, recovery copy restoration, and no sibling changes.
5. **Database schema deployment.** Apply the reviewed snapshot/revision/secure RPC migrations to the new production project only after independent staging acceptance; verify effective privileges and run security advisors. Do not directly grant unrestricted table UPDATE to clients.
6. **Final browser and launch checks.** Desktop/mobile flows, onboarding, curriculum, coins, avatars, pets, shop, lessons and recovery. Confirm production backend isolation and prepare rollback.

## Approval gate
- A new Supabase project may incur a cost; confirm organization and quoted cost before creation.
- Do not change production Render environment variables, merge PRs or deploy until all blockers are resolved and the user approves the final release.

## Existing safeguards
- Testing backend restricted to the known testing host or local development.
- Parent ownership checked in cloud sync.
- Revision-checked RPC rejects stale updates.
- Cloud recovery retains a local rollback snapshot and blocks changes to siblings.
- Testing authenticated role's unnecessary TRUNCATE/DELETE/REFERENCES/TRIGGER privileges were revoked and checked.

**Status is not a launch certification.** This file is a traceable hold decision and checklist for the final milestone.
