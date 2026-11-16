# Step 69 of 250 — KS1 foundation subject quality review

Adds `scripts/ks1-foundation-expansion-qa.mjs` and regression tests for nine supplementary subject modules introduced in Steps 60–68: science, history, geography, art and design, design and technology, computing, music, PE and RE.

The audit checks unique activity IDs, Year 1/Year 2 presence, titles and focus, four nonblank steps, at least two materials, adult question prompts and safety guidance. Expected structural inventory: **9 modules, 36 activities, 18 per year**. The script emits JSON and fails with nonzero exit status if structural checks fail.

**Limitations:** structural QA is not educator review, does not establish complete statutory objective coverage or subject accuracy, does not verify local RE syllabuses, and does not integrate these guides into the live website. The separate KS1 maths QA and literacy QA remain separate reviews; this report must not be described as certifying the entire KS1 curriculum.

Next: Step 70 — KS1 implementation handoff and remaining gaps.
