# Step 33 of 250 — Parent access policy and adversarial cases

Adds a **deny-by-default policy design** for EYFS observation create, list, read, update, delete and export operations, plus ten attack scenarios covering invalid sessions, cross-household and sibling access, ID tampering, role spoofing, revoked guardians and concurrent revocation.

Automated tests verify policy completeness and exercise sibling/cross-household denial in the **in-memory contract model**. These tests **do not** establish that the live app has verified server-side authorisation or row-level database security.

Production blockers: verified session identity, database-backed child ownership, per-request authorisation, database row-level security, revocation tests and safeguarding/privacy review. No new live data collection or persistence is introduced.

Next: Step 34 — authenticated API and database policy integration planning.
