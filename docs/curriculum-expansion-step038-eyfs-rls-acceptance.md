# Step 38 of 250 — EYFS observation database security acceptance

Adds a structured **15-case** acceptance matrix for staging Supabase RLS and field-permission verification. Cases include anonymous denial, cross-parent read/update/delete, sibling isolation, ownership tampering, activity ID tampering, permitted note edits, revoked sessions, export denial and invalid inputs.

**Important:** The automated repository test validates the matrix's completeness only. The 15 cases have **not** been executed against Supabase and must not be described as passed. Stage tests require two independent authenticated parents, synthetic child records and reviewed database migrations.

Production observation storage remains blocked until authenticated database tests, privacy/retention decisions and safeguarding review pass.

Next: Step 39 — implement a staging-only executable test harness without production credentials.
