# Step 4 of 250 — EYFS lesson-by-lesson gap analysis

## Automated inventory
Run `node scripts/eyfs-lesson-gap-audit.mjs`. The script imports the **actual lesson generators**, enumerates every topic and checks its age-4 questions for correct-answer membership, explanations and distinct prompts. It links each of the **28 Step 3 teaching strands** to its candidate module's real lesson titles, but deliberately leaves all strand coverage **unverified**.

## What this does and does not establish
- A generated question can be structurally valid without being educationally accurate, suitable for a child or sufficient to meet the framework.
- Candidate lesson titles are **review queues**, not verified curriculum matches.
- A quiz cannot by itself demonstrate motor development, real conversation, artistic expression, handwriting or scientific observation.
- Further audit must inspect questions, explanations, lesson pedagogy, practical activities, inclusion and SEND accessibility.

## Prioritised EYFS build backlog
1. **High:** physical movement and fine-motor play with parent-guided observation and accessible adaptations.
2. **High:** authentic back-and-forth conversation, storytelling, listening and vocabulary development.
3. **High:** child-made artwork, imaginative play, singing, music and performance.
4. **High:** actual mark-making, writing and phonics practice; distinguish decoding from selecting answers.
5. **High:** practical mathematics using objects, shapes, patterns and spatial play.
6. **High:** real-world nature, places, people and community exploration with family involvement.
7. **Medium:** self-regulation, self-care and friendship activities with gentle, inclusive support.
8. **High:** evidence-linked objective mapping, independent educational review and age-appropriate screen-use checks.

## Step 5 hand-off
Review candidate lesson content against the actual programme wording and build evidence-linked missing-activity tickets, starting with the highest-risk strands. No statutory coverage is certified by this automated inventory.
