# Step 90/250 — Curriculum navigation and integration contract

This is the first **integration planning** step, not a release of the new lessons to pupils.

## Existing system
- `src/curriculum.js` generates general practice questions by age and topic.
- `src/lessonExperience.js` provides step progress and answer feedback.
- Separate Upper KS2 lesson-bank modules contain draft Year 5/6 lessons.

## This step
- Adds a pure `curriculumNavigationCatalog.js` to index seven Upper KS2 Maths draft lesson banks by year, topic, title, and ID.
- Lists metadata only: no question answers are exposed in catalog entries.
- Defaults to returning **no draft lessons** for pupil navigation.
- Provides an explicit `includeDrafts` switch for developer/educator review, not a pupil-facing UI.
- Rejects unsupported years and leaves all draft launch gates closed.
- Adds tests for filtering, unique IDs, defensive copies, and launch gating.

## Next integration milestones
1. Educator review and correction of mathematical content, accessible diagrams, and National Curriculum mapping.
2. Design a consistent adapter between reviewed lesson banks and existing lesson experience, with correct/incorrect feedback and accessible controls.
3. Connect approved lessons to age/year-specific navigation without displaying answers ahead of attempts.
4. Persist completion and mastery per child profile, with safe cloud-sync and restore semantics.
5. Award BrightCoins once per verified completion, with idempotent rewards and anti-repeat protections.
6. Test parent/child separation, keyboard and mobile access, offline behaviour, and deployment rollback.

No production UI is altered in this step; **merging the contract alone does not make draft lessons accessible**.
