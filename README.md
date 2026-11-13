# BrightPath Learning

BrightPath Learning is an **in-development** 3D educational adventure for children. This repository contains the Vite/Three.js application, village and cottage experiences, Academy lessons, child-profile and learning-progress modules, cloud-sync integration code, and automated checks. A complete production release has **not** yet been verified.

## Project layout

See [Repository structure and file placement](docs/repository-structure.md). Build and review documents are in [docs/reviews](docs/reviews).

- `src/main.js` — application entry point; `src/style.css` — application styles.
- `src/*.js` — game, learning, profiles, rewards and cloud modules.
- `tests/*.test.js` — regression tests.
- `public/` — static assets and models.
- `scripts/` — build-readiness, release and browser checks.
- `supabase/migrations/` — database migration scripts.
- `.github/workflows/` — GitHub Actions configuration.

## Local commands

```sh
npm install
npm test
npm run build
npm run dev
```

These commands require dependencies to install successfully. The outstanding npm registry DNS issue has prevented complete dependency installation and full build/browser verification in the current development workflow; **do not assume these checks have passed**.

## Deployment and security

Render configuration lives in `render.yaml` and `render.preview.yaml`. Keep production deployment separate from unverified preview checks. Never place private credentials or Supabase service-role keys in client-side code. Review authentication, data access policies, child-profile isolation and deployment settings before a public launch.

The project is being developed directly in GitHub with a single consolidated final ZIP planned **after** successful verification. Do not treat intermediate commits as a finished, tested release.
