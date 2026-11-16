# Step 104/250 — Read-only staging adapter preflight and test harness contract

**No real Supabase connection or database tests have been run.** This step introduces a fail-closed interface for a future trusted staging database adapter, and a read-only preflight that refuses production and write-enabled adapters.

The adapter contract requires methods for a database transaction, a locked and ownership-verified snapshot read, unique import insertion and import marker lookup. A separate `describe()` method must report `{environment:'staging',readOnly:true}` before read-only inspection is allowed. These checks are only a local interface contract; an adapter can lie, so real environment identity and permissions must also be independently verified before any connection.

The unit tests cover contract validation and preflight refusal. They **do not** run the eight required PostgreSQL/Supabase integration cases. Those include concurrent same-child imports, repeat idempotency, cross-parent denial, rollback, stale revisions, same profile key under two parents, invalid baselines, and preservation of existing saves.

Before staging execution: verify actual Supabase project ID, migrations, table grants, RLS, role privileges and function ownership; use isolated anonymised fixture data and a restricted staging role; run SQL transactions and confirm rollback and uniqueness; inspect security advisors. Never use a production connection string or service-role key in the browser or test logs.

Next: Step 105 — inspect available staging Supabase projects and implement an isolated, credential-safe integration test adapter only after staging identity is verified.
