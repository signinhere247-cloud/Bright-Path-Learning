# BrightPath Learning — Consolidated Upgrade (development build)

This is an **intermediate functional upgrade**, NOT the complete final commercial platform. It preserves the V3 curriculum and activities and adds a family profile selector, per-child progress, optional real parent email/password authentication, and Supabase-backed profile storage.

## Secure account setup (required before public launch)
1. Create a Supabase project and run `supabase-schema.sql` in SQL Editor.
2. Enable Email authentication and configure email confirmation, password reset redirect URLs and production email sending.
3. In Render, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables from your Supabase project. These are publishable client credentials, **never use a service_role key**.
4. Build with `npm install && npm run build`, publish `dist`. Redeploy after configuring the environment.
5. Test registration, confirmation, sign-in, password reset, two different parent accounts, child switching, purchases and progress across devices.

If no Supabase variables are set, the app runs in **local preview mode** with multiple child profiles stored in that browser. This is NOT a secure login and does NOT sync devices.

## Important remaining work before describing the website as final
- Full authored and reviewed UK curriculum lessons and assessment content (the V3 curriculum map is only topic headings).
- Detailed interactive game environments, avatar clothing layers and furnished home rooms.
- Parent dashboard with reporting and lesson assignments; administrator content management.
- Children's privacy, UK GDPR/Children's Code review, age assurance, safeguarding, accessibility and security testing.
- Account recovery UX, family profile management, production email deliverability and independent QA.

## GitHub structure
`src/main.jsx`, `src/styles.css`, `public/world.jpg` must remain in their folders. Upload other root files to the repository root.
