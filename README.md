# BrightPath Learning — Playable 3D guest-mode build

This package is a **playable 3D foundation**, NOT the complete final game. It replaces the V3 illustrated landing page with a procedural 3D world, walking controls, interactive subject buildings, lessons and questions, BrightCoins, a shop, a basic 3D furniture preview/placement scene, avatar colour options, and local device save data.

## Deployment
- Upload all project files to your GitHub repository preserving `src/` and `public/` folders.
- Render static site: build command `npm install && npm run build`, publish directory `dist`.
- Dependencies include Three.js and Vite; Render must be able to install them.
- Keep the existing live website until the new build has been tested in a separate preview service or branch.

## What is not finished
- No secure family login or cloud syncing. Guest progress is saved only in the browser's localStorage.
- No production database; Supabase is not configured.
- Character models are simple procedural 3D shapes, not production-quality rigged animated game characters.
- The home is a basic 3D furniture display, not an enterable multi-room furnished house.
- Pets can be purchased but are not yet animated or interactive.
- The lessons are starter practice material, not a complete reviewed curriculum for ages 3–16. Some questions repeat; no formal age differentiation or complete assessment.
- This package has passed JavaScript syntax checking and ZIP integrity checking, but not a browser or production deployment test.

## Security
Do not treat guest profiles as secure accounts. Never put service-role keys or passwords in client-side code. A secure family login requires an authentication provider and database access policies.
