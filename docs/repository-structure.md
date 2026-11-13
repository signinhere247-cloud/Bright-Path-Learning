# BrightPath Learning repository structure

Keep files in their functional locations as features are developed:

- `src/` — application entry point, styles and JavaScript modules. Existing flat modules remain here until imports and tests can be migrated safely together.
- `tests/` — Node regression tests matching source modules.
- `public/` — static assets and 3D models copied into production builds.
- `scripts/` — release, deployment and browser-check utilities.
- `supabase/migrations/` — database migration SQL, in version order.
- `.github/workflows/` — CI workflows.
- `docs/reviews/` — build status, validation notes and review records.
- `docs/` — project documentation and integration guidance.
- Repository root — `package.json`, `index.html`, `render.yaml`, `render.preview.yaml`, `.env.example`, `README.md`, and other deployment entry-point files.

## Change policy
1. Create new code in the appropriate existing directory, with its regression tests in `tests/`.
2. When moving a source file, update **all** imports and test references in the same atomic change; avoid moves that could break the live build.
3. Do not claim a build, browser test or deployment passed until it has actually run successfully.
4. Preserve independent saves for each child and existing BrightCoins reward limits.
5. Keep final ZIP packaging for the completed, verified release; GitHub is the working project source.
