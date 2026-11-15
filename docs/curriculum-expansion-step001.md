# Curriculum expansion — Step 1 of 250: Baseline inventory and gaps

**Status:** Baseline inventory implemented; statutory coverage not yet verified.

## What is currently present
The repository contains 18 age-stage curriculum modules in five groups: EYFS (4), KS1 (3), KS2 (4), KS3 (4) and GCSE (3). These are *software modules*, not 18 complete subjects or proof of full curriculum coverage. The app also has older generic subject question banks.

Run `node scripts/curriculum-inventory.mjs` to inspect module presence, academy imports, lesson wiring and a machine-readable gap register. The script intentionally reports **zero independently verified curriculum objectives** until mapping evidence is collected.

## Gap register (initial)
| ID | Priority | Gap |
|---|---|---|
| MAP-001 | Critical | Official EYFS and National Curriculum objectives are not mapped one-to-one to lessons |
| MAP-002 | Critical | GCSE exam board, specification versions and tiers are not mapped |
| CONTENT-001 | High | Introductory question banks do not prove topic depth or mastery |
| QUALITY-001 | High | Educational accuracy, age suitability and answer ambiguity need independent review |
| ASSESS-001 | High | Writing, oral and practical skills need assessment beyond multiple choice |
| ACCESS-001 | High | Real-device/mobile accessibility and browser smoke validation remain outstanding |

## Evidence and next actions
1. Identify authoritative current framework/specification documents and record source, publication date and applicable year.
2. Build a curriculum objective register, with IDs, stage, subject, statutory wording/summary, and a verified source reference.
3. Connect each objective to lesson IDs, question sets and practical activities; mark **unmapped** by default.
4. Review the content and mark each objective as *not started*, *partial*, *review needed* or *verified*, based on evidence.
5. Validate both software tests and the learning experience on mobile and desktop.

## Known browser regression
The standalone browser validation on the Step 19 production commit failed on both mobile and desktop. The mobile log reports a strict locator ambiguity for `[data-topic="Counting"]`: the new revision recommendation and the existing lesson card both have that selector. This is a browser test/application selector issue that must be resolved before declaring the final release fully validated.

## Completion of Step 1
This step establishes the **initial** inventory and prioritised gaps. The full authoritative objective-by-objective register belongs to the next curriculum mapping steps. No claim of comprehensive coverage is justified yet.
