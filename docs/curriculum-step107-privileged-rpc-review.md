# Step 107/250 — Supabase privileged cloud-sync function audit

**Read-only inspection on 2026-11-16. No database changes.** BrightPath Learning - Testing, project `kvsmoxyemuimmlivcevn`.

## Verified function privileges

- `public.update_family_snapshot` owner: `postgres`.
- `SECURITY DEFINER`: true; fixed empty `search_path`.
- EXECUTE: authenticated true; anon false.
- Explicit ACL: `postgres`, `service_role`, `authenticated`; no `PUBLIC` grant shown.
- Function body checks `auth.uid()`, matches the current parent ID and profile key, checks expected revision, and raises `SYNC_CONFLICT` for failed updates.

## Supabase security advisor warnings

1. **Signed-In Users Can Execute SECURITY DEFINER Function** — `authenticated_security_definer_function_executable`. The function is reachable as `/rest/v1/rpc/update_family_snapshot`. This is an intentional sync entry point but a privileged surface requiring further testing. Remediation reference: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable
2. **Leaked Password Protection Disabled** — `auth_leaked_password_protection`. Reference: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

## Safe next actions

Do not revoke the sync RPC or change it to SECURITY INVOKER without staging tests; the current browser relies on it and direct authenticated UPDATE is revoked. Before a security change, verify two distinct parent test accounts cannot update each other's snapshots, reject missing sessions and stale revisions, and confirm valid saves continue working. Verify whether the Testing project is also used by any live deployment. Enable leaked-password protection only after reviewing the Auth configuration and potential account impacts; no settings were changed.

**This is an audit, not proof of security.** No cross-account runtime tests have been executed.

Next: Step 108 — isolated parent-account sync authorization test design and staging environment separation check.
