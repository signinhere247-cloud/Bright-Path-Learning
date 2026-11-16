# Step 92/250 — Per-child lesson attempt and progress contract

This step adds a **pure, immutable data contract** for recording attempts against a specified child profile. It is not connected to the live pupil interface, authentication, database or cloud-sync service.

- Creates an attempt with a child-profile ID, lesson ID, unique attempt ID, question count and ISO timestamp.
- Records one boolean correctness result per question, without mutating the original attempt.
- Refuses duplicate answers, out-of-range indexes, malformed records, cross-profile calls, incomplete completion and repeat completion.
- Summarises answered count, correct count, completion and score percentage for the **specified** child.
- Does not persist data, display sensitive child details, award BrightCoins, or authorise access.

**Important security boundary:** Passing a `childProfileId` is not proof of identity or authorisation. The eventual server/storage integration must derive the active family and permitted child IDs from authenticated session data and enforce access policies. The client contract alone cannot prevent a malicious caller supplying another profile ID.

**Before pupil release:** educator approval, live lesson UI, server-enforced child-profile authorisation, durable per-child persistence, conflict handling for cloud sync, and idempotent reward grants.

Next: Step 93 — Safe progress persistence adapter design and tests.
