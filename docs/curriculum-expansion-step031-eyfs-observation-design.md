# Step 31 of 250 — Parent EYFS observation interface and privacy design

Adds a machine-checkable **design specification**, not a live form or storage system. Proposed flow: authenticated parent dashboard → selected child → EYFS activity → optional observation note → confirmation. No observation should ever appear on another child's profile.

Eight requirements cover verified household/child access, profile confirmation, record structure, safeguarding, deletion/export, database isolation, accessibility and privacy notice. Launch gates include UK GDPR review, tested access controls, deletion/export, safeguarding and browser testing.

**No personal data collection, cloud persistence, UI activation or claims of legal compliance are introduced by this step.** Future implementation must enforce permissions on the server, not only hide UI controls.

Next: Step 32 — design and test child-scoped observation persistence and access contracts without exposing user data.
