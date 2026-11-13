# BrightPath Learning — first working prototype

A responsive React + Vite website with 5 UK learning stages (ages 3–16), 10 complete sample Maths/English activities, interactive quizzes, a calm-colours option, and browser-local progress tracking.

## Status

Complete deployable Version 1 prototype source files. Not a finished commercial learning platform.

## Important limitations

This is a **public prototype**, not a production-ready service for children. There is no login, parent account, server, database, payment processing, or secure cross-device progress sync. Progress is saved only to localStorage on the current browser and can be lost if browser data is cleared. Do not enter or collect children's personal information. The sample questions have not undergone a full curriculum or accessibility review. Do not describe it as a complete curriculum or GCSE course.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open the local address Vite prints.

## Deploy on Render — separate from existing projects

1. Create a **new GitHub repository** called `brightpath-learning`. Do not use or change the repository for your Trading AI project.
2. Upload **all files and folders from this project** into the new repository. `package.json` and `index.html` must be at the repository root; `src` must be a folder.
3. In Render, select **New > Static Site** (not Web Service).
4. Connect the new `brightpath-learning` GitHub repository.
5. Set **Build Command** to `npm install && npm run build`.
6. Set **Publish Directory** to `dist`.
7. Deploy. Render will give the new site its own `onrender.com` URL.
8. Future pushes to this repository can automatically redeploy only this site.

No environment variables or database are required for this prototype. Render plans and pricing can change; check the current dashboard before selecting a paid option.

## Next production milestones

- Validate learning content and age-appropriate UX with educators and parents.
- Add parent-managed authentication and secure database-backed child profiles.
- Design and review UK GDPR / ICO Children's Code compliance, safeguarding, accessibility, privacy notice and retention policy **before** collecting child data.
- Add a content-management workflow, richer lessons and audio accessibility.
- Add billing only after a secure parent account system is ready.
