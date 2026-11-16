# Step 113/250 — Read-only deployed asset inspection

## Actual inspection attempt

Tried fetching both public Render sites at https://bright-path-learning.onrender.com and https://brightpath-cloud-auth-testing.onrender.com using the available web retrieval tool. Both returned access errors. Therefore **no deployed JavaScript was retrieved**, and the effective Supabase project refs remain unknown. This does not imply either website is down.

## Prepared scanner

`src/deployedAssetRefScan.js` accepts already-retrieved JavaScript asset text, extracts only 20-character Supabase project refs, and refuses to treat missing, multiple, or identical refs as evidence of separation. It does **not** print asset text, publish keys or credentials. Unit tests cover secret non-disclosure, same-project failure and unknown status.

The scanner is not wired into the live website, does not make HTTP requests, and does not execute database queries. A missing URL in a bundle can mean runtime construction or minification, not absence of Supabase. Even different refs need verified deployment provenance and independent authorization before write tests.

## Blocker and next step

Neither Render connector nor web retrieval currently supplies actual built JS assets or effective environment values. A trusted operator can inspect both websites' JavaScript bundles using browser developer tools, then share **only** the two Supabase project refs (never the publishable keys or asset contents). Alternatively, obtain a secure read-only Render build environment attestation. Until then, cross-parent staging writes remain blocked.

Step 114: determine safe evidence collection route or proceed with non-writing tests while awaiting backend verification.
