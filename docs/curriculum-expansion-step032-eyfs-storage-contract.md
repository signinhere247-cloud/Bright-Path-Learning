# Step 32 of 250 — Child-specific observation storage contract

Adds `src/eyfsObservationStoreContract.js`, an **in-memory, non-persistent test model** for create, list, update and delete operations on EYFS observation notes. Every operation requires a caller-supplied household and child identifier and checks them against a parent access context. Tests cover sibling isolation, cross-household denial, update/delete authorisation, invalid observations and no automatic ELG mastery.

**Security limitation:** The actor object is supplied by the caller and is not independently authenticated. This module must **never** be used as a production authorisation boundary or exposed as an API. No database, network, child-profile integration or live observation storage has been added.

Before production use: derive actor identity from verified server-side authentication, enforce household/child ownership in database policies, validate input at the API, add audit trails, privacy notice, retention/deletion/export and end-to-end access tests.

Next: Step 33 — server-side authorisation policy design and adversarial access test cases.
