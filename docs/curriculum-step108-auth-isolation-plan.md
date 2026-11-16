# Step 108/250 — Parent-account isolation test preparation

**No test accounts were created and no database writes were performed.**

## Render service inventory (read-only)

- Main site: `Bright-Path-Learning`, branch `main`, https://bright-path-learning.onrender.com
- Auth testing site: `brightpath-cloud-auth-testing`, branch `cloud-auth-testing`, https://brightpath-cloud-auth-testing.onrender.com
- Both use the same GitHub repository but different Render services. **Separate services do not prove separate Supabase backends.**

Supabase testing project `kvsmoxyemuimmlivcevn` exists, but the main site's effective `VITE_SUPABASE_URL` and the testing site's effective `VITE_SUPABASE_URL` were **not** independently verified. Since Vite bundles these values at build time, compare deployed asset configuration or securely inspect Render build configuration without exposing publishable keys or any secrets. Do not run write tests before verifying distinct backend projects and confirming the live site isn't connected to the testing project.

## Required isolated staging test cases

1. Parent A can read only A's fixture child.
2. Parent B cannot read A's fixture child.
3. Parent B cannot update A's fixture child via the privileged sync RPC.
4. Anonymous client cannot read or sync a fixture child.
5. Stale revision returns a conflict without modifying the record.
6. Parent A valid sync increments A's revision once.
7. B's fixture remains unchanged after A's sync.
8. A denied operation does not change local saved progress.

The `planAuthIsolationTest` helper is a **planning gate**, not an authorization or live-environment detector. It only accepts caller-supplied verification evidence, which must be independently validated. Unit tests do not execute any network or database requests.

Next: Step 109 — verify deployed backend configuration and build an isolated authenticated integration harness, subject to a confirmed staging-only environment.
