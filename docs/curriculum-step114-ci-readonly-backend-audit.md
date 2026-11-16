# Step 114/250 — Read-only deployed backend audit via GitHub Actions

This workflow offers an alternate network environment for checking public Render assets, because the chat runtime cannot resolve Render hostnames. The workflow is **manual-only** (`workflow_dispatch`), has `contents:read` permissions, does not need secrets, and does not modify Render or Supabase.

It fetches each site's public index and same-origin JS files, prints only 20-character Supabase project refs, and fails closed if the sites are unreachable, the refs are missing/ambiguous, testing does not use `kvsmoxyemuimmlivcevn`, or both sites share a ref. A successful result is **observational**, not authorization for database writes. The scanner limits file size, requests and domains, but inspecting JS text does not prove runtime behavior or account isolation.

**Execution status:** workflow prepared on feature branch; not run. To run, merge the workflow to the repository's default branch, then choose GitHub Actions → BrightPath read-only deployed backend audit → Run workflow. A test result must be matched to actual Render deployed commit IDs from Step 112.

If the workflow cannot be executed or is inaccessible, request only the two project refs from a trusted user inspection; never ask for API keys or complete environment variables.

Next: Step 115 — evaluate actual audit result and authorize staging-only account fixture tests only after separate backend identity is established.
