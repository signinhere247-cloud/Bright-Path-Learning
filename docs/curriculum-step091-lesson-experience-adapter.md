# Step 91/250 — Draft lesson experience adapter

Introduces a pure adapter connecting existing Upper KS2 Maths question banks to the existing lesson-step and answer-feedback helpers. It deliberately does **not** modify production navigation or award BrightCoins.

- `previewDraftQuestion` exposes prompt, choices and progress, but not the correct answer before submission.
- `evaluateDraftAnswer` validates a selected choice and returns correctness, correct answer, explanation and existing feedback labels.
- Both functions require an explicit `reviewMode: true` parameter and otherwise refuse access. This is **not authentication**: it is a draft-access guard for developer testing, not a security boundary or a route for children.
- No persistence, learner-profile writes or reward changes occur.
- Tests cover access gating, answer withholding, feedback, defensive copies, invalid years and invalid answers.

**Before pupil release:** educator approval and mathematical review, server-side publication authorization, accessible diagrams and interactions, integration with the parent/child profile model, progress persistence, idempotent reward granting and end-to-end mobile testing are required.

Next: Step 92 — Per-child lesson attempt and progress data contract.
