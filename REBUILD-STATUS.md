# BrightPath rebuild status — 2026-11-13

This is a working copy based on the user-supplied playable guest ZIP. The live V3 has not been modified.

## Verified in this working copy
- Added `src/backup.js` with versioned guest progress export, validation, import and previous-save preservation.
- Added in-game backup/import UI accessible through Profile > Backup & restore progress.
- Added six unit tests (`node --test tests/*.test.js`), all passing; `node --check src/main.js` passes.

## Not yet verified
- Browser UI interactions and full production build.
- Family profiles, cloud accounts, cloud deletion, curriculum expansions and other previously described enhancements are not present in this guest foundation.
- Older ZIPs exist outside this folder and should be reviewed for reusable features before declaring a consolidated release.

## Notes
- Backups contain personal progress information. Store them privately.
- Import replaces the single guest explorer's progress on this device; it does not merge multiple children.
- Supabase is not configured in this guest build.
