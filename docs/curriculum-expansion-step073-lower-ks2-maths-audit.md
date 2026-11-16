# Step 73 of 250 — Lower KS2 mathematics audit

Adds `scripts/lower-ks2-maths-audit.mjs` and tests. The current `src/curriculum.js` generator supports eight broad topics: Counting, Addition, Subtraction, Multiplication, Division, Fractions, Percentages and Algebra. It generates 20 questions per topic for ages 8 and 9 (160 each), and all generated answer options pass basic uniqueness/correct-answer-presence checks.

**Important limitations:** ages 8 and 9 both use the same `primary` learning band; there is no separate Year 3/Year 4 statutory progression. The generic generator is not a dedicated Lower KS2 maths curriculum. `src/ks1Maths.js` contains 11 introductory topics explicitly for ages 5–7 and cannot be counted as Year 3/4 coverage.

The audit identifies missing dedicated Lower KS2 sequences for measurement, geometry, statistics and reasoning, and deeper statutory progression in number, written calculation, multiplication/division and fractions. Percentages and algebra in the broad generator do not establish Lower KS2 coverage.

Question totals and answer-option checks are technical inventory only, not evidence of curriculum completeness, mathematical accuracy in every context, learner mastery or educator approval. No live interface integration is made in this step.

Next: Step 74 — define Lower KS2 mathematics progression and objective map.
