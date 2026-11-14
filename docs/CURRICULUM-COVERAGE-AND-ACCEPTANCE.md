# BrightPath Learning — curriculum content acceptance plan

Status: CONTENT EXPANSION REQUIRED. This document is a coverage specification, not a claim that lessons exist.

## Current baseline (audited 2026-11-14)
- Six academy subjects: Maths (8 topics), English (5), Science (5), History (2), Geography (2), Computing (2).
- Maths: 20 generated questions per topic per learning age.
- Non-maths: curated age-banded questions, often only two per topic per band, plus a small legacy bank for younger ages.
- Age bands in code: 3–6, 7–10, 11–13, 14–16. These are not the same as school year or statutory key stage.
- Current UI does not expose a full year-by-year scheme of work.
- Existing tests passing is not evidence of complete national curriculum coverage.

## Release acceptance criteria
1. Every year/age group has an explicit learning pathway and curriculum map.
2. Each curriculum objective maps to at least one taught lesson, with examples and explanations.
3. Each topic has multiple distinct lessons, not a single repeated quiz.
4. Every lesson has a minimum of 10 meaningful, nonduplicate practice questions (or age-appropriate interactive tasks for EYFS), with answer rationale.
5. Each topic has a diagnostic, formative practice and end-of-topic check; record mastery separately per child.
6. Questions must be checked for age appropriateness, correct answers, uniqueness, accessibility and reading load.
7. UK-specific terminology, spelling and safeguarding; no unsupported claims of exam-board endorsement.
8. Progress migration must retain existing completed lessons, rewards, inventory and cloud saves.
9. Unit, audit, build, mobile/desktop browser and cloud-safety checks pass on the final commit.
10. No deployment to production until the complete release is approved.

## Coverage map by phase

### EYFS (ages 3–5)
Communication and language; personal, social and emotional development; physical development; literacy (phonological awareness, phonics, early reading and writing); mathematics (number, patterns, shapes and measures); understanding the world; expressive arts and design. Activities should use visual/audio-friendly prompts rather than lengthy text.

### KS1 (Years 1–2)
English: phonics, reading comprehension, spelling, handwriting, grammar, writing.
Maths: number and place value, addition/subtraction, multiplication/division, fractions, measurement, geometry, statistics (Year 2).
Science: plants, animals and humans, everyday materials, seasonal changes, living things/habitats.
History: chronology, significant people/events and local history.
Geography: places, maps, physical/human geography, weather.
Computing: algorithms, programming, digital literacy, online safety.
Also art/design, design and technology, music, PE and age-appropriate personal development.

### KS2 (Years 3–6)
English: reading, writing, vocabulary, spelling, grammar and punctuation.
Maths: place value, four operations, fractions/decimals/percentages, ratio (Year 6), algebra (Year 6), measurement, geometry, statistics.
Science: plants, animals/humans, living things, rocks, light, forces/magnets, states of matter, sound, electricity, Earth and space, evolution/inheritance.
History: Stone Age–Iron Age, Romans, Anglo-Saxons/Scots, Vikings, local and thematic studies, early civilisations and non-European societies.
Geography: maps, regions, rivers, mountains, climate, settlements, fieldwork.
Computing: coding, networks, data, online safety.
Also languages (KS2), art/design, design and technology, music, PE and personal development.

### KS3 (Years 7–9)
English: literature, language analysis, writing, grammar and spoken language.
Maths: number, algebra, ratio/proportion, geometry/measures, probability, statistics.
Biology: cells, organisation, reproduction, ecosystems, genetics.
Chemistry: particles, elements/compounds, reactions, periodic table, Earth science.
Physics: forces/motion, energy, waves, electricity/magnetism, space.
History: British and world history across medieval, early modern and modern periods; historical enquiry.
Geography: physical/human geography, global development, climate, resources and fieldwork.
Computing: algorithms, programming, data representation, systems, cyber security.
Also languages, citizenship, art, music, design/technology and PE.

### KS4 / GCSE preparation (Years 10–11)
English Language and Literature: reading analysis, creative/transactional writing, set-text skills, argument and examination practice.
Maths: foundation/higher pathways spanning number, algebra, ratio, geometry, probability and statistics.
Combined Science plus separate Biology/Chemistry/Physics progression, including practical-method knowledge.
History, Geography and Computing: optional GCSE-aligned pathways, with exam-board-specific content only after board selection.
Further optional subject pathways to be scoped; do not label all optional GCSE qualifications complete without evidence.

## Content authoring order
1. Year/subject/objective catalogue and stable identifiers.
2. Lessons and age-appropriate explanations.
3. Distinct question/task banks and worked solutions.
4. Topic assessments, mastery and revision scheduling.
5. UI integration and migration tests.
6. Curriculum audit report with counts by year, subject and objective.
7. Final package and release validation.

## Explicit deferred acceptance checks
- Real two-device cloud sync and restore test.
- Independent curriculum subject-matter review and GCSE exam-board mapping.
