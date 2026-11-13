# BrightPath browser release test plan

Offline audit and Node unit tests do not verify rendered gameplay. Before release, install dependencies, run `npm run build`, then launch `npm run dev` and test in desktop and mobile browsers.

1. Load 3D world; confirm no browser console errors, movement and interaction controls work.
2. Open Academy; complete one passing and one failing lesson; verify correct BrightCoins and score history.
3. Add second explorer; earn coins, adopt pet, buy/place furniture; switch back and confirm no cross-profile changes.
4. Refresh after progress; confirm both profiles, achievements, quests, lesson history and pet care persist.
5. Complete each of the three village discoveries and claim daily quests; verify no repeated same-day rewards.
6. Open Parent learning report and Revision Studio; verify accurate scores, trends and empty-data messages.
7. Download backup, modify progress, restore backup with confirmation; check restoration and recovery path.
8. Check 390x844 mobile viewport for canvas visibility, usable touch controls, readable modals, no horizontal overflow.
9. Verify keyboard-only navigation where practical and test with reduced motion settings.
10. Separately test real Supabase authentication and row-level security before advertising cloud family accounts; they are not configured in this build.

Status: NOT RUN. Browser testing and production build remain release blockers until dependencies are available.
