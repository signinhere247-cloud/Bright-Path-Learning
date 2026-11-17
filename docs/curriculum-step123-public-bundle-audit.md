# Step 123 — Public bundle audit coverage

The original read-only audit only scanned JS files directly referenced by the HTML. BrightPath's Supabase client is dynamically imported, so its configuration may reside in a lazy-loaded chunk. An absent main ref in the old scan did **not** establish that cloud functionality was disabled.

This update traverses same-origin JS chunk references with bounded fetch size and count, records how many assets were scanned, and remains fail-closed if either project's identity cannot be established. It never fetches API data, authenticates, creates accounts, changes environment variables, or writes database rows.

Run `python3 -m unittest discover -s tests -p 'test_deployed_backend_audit.py'` locally or in CI. To inspect the actual published sites, manually dispatch the read-only GitHub Actions workflow after this change is reviewed and merged. The main site is auto-deployed from main, so merging is a separate deployment decision.
