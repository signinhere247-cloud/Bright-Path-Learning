# Step 120/250 — Two-parent isolation readiness gate

**Verified read-only on the BrightPath testing Supabase project:** `family_snapshots` has RLS enabled, anonymous SELECT/INSERT privileges denied, and parent-owned SELECT, INSERT and UPDATE policies checking `parent_id` against `auth.uid()`; UPDATE includes USING and WITH CHECK. Authenticated direct UPDATE is not granted; the existing revision-checked RPC must be separately tested.

**Not verified:** The main Render website's effective Supabase backend project ref. The GitHub Actions deployed-asset audit found no Supabase URL in the main published JS. The user confirmed the main Render service displays no environment variables. This suggests the main site may have cloud features disabled, but does not prove production/staging database isolation.

The pure readiness gate records blockers and never authorises fixture writes. Two separate test-parent identities do not yet exist for this test, and no test accounts or learning profiles were created. No live data was read.

Next: Confirm the main website's build-time cloud configuration with a safe non-secret check or establish a dedicated, verified isolated test backend. Only then seek approval before creating disposable test accounts and running integration tests.
