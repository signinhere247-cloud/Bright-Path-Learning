# Step 34 of 250 — EYFS observation API and database integration plan

Design-only contract for six authenticated observation API operations: list, create, read, update, delete and export. Proposed observation records are child-scoped and tied to a household and author identity derived from **verified server-side authentication**, never from the browser's ownership claims.

Database requirements include foreign keys to child profiles, row-level security, ownership checks and no inferred ELG mastery. API requirements include CSRF protections where appropriate, payload limits, safe errors, transactional writes, deletion/export and rate limits.

**No API endpoints, database migrations, RLS policies, live storage or user data collection have been deployed.** The existing authentication and child profile implementation must be inspected before choosing concrete migrations or production integration.

Next: Step 35 — inspect current auth/profile architecture and draft implementation-specific integration checkpoints.
