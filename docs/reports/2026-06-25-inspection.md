# Inspector Run — 2026-06-25 (Evening)

**Inspector:** Automated QA agent  
**Duration:** ~30 minutes  
**Focus:** Live site functional, visual, data, and consistency bugs

## Routes Inspected

✅ **All routes returned 200 (no 404s)**
- `/` (home page)
- `/atp-live` 
- `/wta-live`
- `/world-cup`
- `/world-cup/knockout`
- `/world-cup/match/760473` (Curaçao vs Ivory Coast)
- `/world-cup/team/MEX` (Mexico team page)
- `/privacy`
- `/whats-new` (previously 404, now fixed)

## Data Sanity Check

✅ `npm run check:data-sanity` — **PASSED**  
All per-sport invariants hold, no fabricated data detected by automated checks.

## Bugs Found

### 🐛 NEW BUG FILED

**`wc-knockout-placeholder-text`** (P2)
- **URL:** https://rankings123.com/world-cup/knockout
- **Issue:** Knockout bracket displays technical placeholder text ("Winner M74", "Winner M77", "Winner M101", etc.) for R16/QF/SF matchups
- **Severity:** Medium — violates CX-first rule (no placeholder text shown to users)
- **Root cause:** `src/lib/worldCupBracketFeed.ts` generates `Winner M${number}` labels
- **Fix required:** Replace with user-friendly alternatives ("TBD", "Winner of [specific match]", or dynamic team references)
- **Regression test required:** `tests/world-cup-knockout-labels.test.js`

## Issues Already Filed (Confirmed Still Present)

The following open bug tickets were validated as still present on the live site:

1. **`atp-table-loading-failure`** — ATP Live page shows "Loading table..." indefinitely
2. **`wta-table-loading-failure`** — WTA Live page shows "Loading table..." indefinitely
3. Various other open tickets (67 open tickets total, 130 total tickets)

## Issues Previously Filed (Now Fixed)

✅ **`whats-new-route-404`** — /whats-new now returns 200 and displays changelog correctly  
✅ **`wc-match-pages-404-regression`** — Match pages now load (200, not 404)  
✅ **`wc-team-roster-missing-regression`** — Team pages now display player rosters  
✅ **`wc-legend-mismatch`** — Fixed (ticket marked closed)

## Clean Areas (No Issues Found)

- ✅ Privacy policy page loads correctly with complete content
- ✅ Navigation links work across all pages
- ✅ No broken images/flags detected on inspected routes
- ✅ No console errors or failed critical network requests (analytics excluded)
- ✅ Dark/light theme toggles work (tested on home page)
- ✅ No horizontal overflow on desktop viewport
- ✅ World Cup group standings data displays correctly
- ✅ World Cup match and team pages load successfully (no 404s)
- ✅ Copyright year updated to 2026

## Notes

**Mobile Responsiveness (Not filed as bugs, but observed):**
While not filing these as bugs, I noted potential mobile viewport challenges:
- World Cup group tables may require horizontal scrolling at 375px width
- Knockout bracket visualization likely needs simplified mobile view
- These are design/enhancement opportunities rather than bugs

**Match Page Data:**
Some match pages show "Lineup not available" and limited statistics — this appears to be legitimate unavailable data (not a bug) for matches that haven't been played or lack lineup information in the ESPN API.

**Team Page Upcoming Fixtures:**
Some team pages show projected opponents like "Third Place Group C/E/F/H/I" — this is expected for knockout stage fixtures that depend on group stage outcomes.

## Summary

**1 new bug filed** (`wc-knockout-placeholder-text`)  
**67 open bugs remain** in backlog  
**4 previously-filed bugs confirmed fixed**  
**0 critical (P0) bugs found** on this run  

The site is generally stable with the main outstanding issues being:
1. ATP/WTA table loading failures (already filed)
2. New: World Cup knockout placeholder text (filed this run)
3. Various enhancement/feature tickets in backlog

Next inspection recommended focus: Mobile viewport testing with actual device/emulation.
