# Inspector Run — 2026-06-22

**Status:** ✓ CLEAN — No new bugs filed

## Routes Checked
- ✓ Homepage (/)
- ✓ ATP Live (/atp-live)
- ✓ WTA Live (/wta-live)
- ✓ World Cup (/world-cup)
- ✓ World Cup Match (/world-cup/match/401746069)
- ✓ World Cup Team (/world-cup/team/ARG)
- ✓ Privacy (/privacy)

## Data Checks
- ✓ `npm run check:data-sanity` — PASS

## Findings

### 1. World Cup Legend (NOT A BUG — working as designed)
- **Status:** Legend IS present and renders correctly
- **Current behavior:** Shows "Standings & results via ESPN." attribution (line 329 in WorldCupTable.tsx)
- **Design:** Legend conditionally shows "Advancing" and "Eliminated" indicators ONLY when teams actually have those statuses (lines 319-328). Currently no teams are marked as advancing/eliminated (early tournament phase), so those specific indicators don't show — this is CORRECT per the conditional logic.
- **Open ticket `wc-legend-missing-regression`** appears to be a false positive — the legend system is working as intended.

### 2. "Demo Data" Labels (NOT A BUG — correct transparency)
- **Observed:** Match page (401746069) shows "Demo data" label
- **Code review:** All demo labels are conditional on `source === "mock"` (verified in match/[id]/page.tsx:62-66, WorldCupTable.tsx:272-274)
- **Per CLAUDE.md:** "Demo/mock fallback is only acceptable as an honest, clearly-flagged degradation when a live feed is temporarily down"
- **Verdict:** Working as designed — labels correctly warn users when viewing mock/fallback data

### 3. Privacy GA Opt-Out Link (Likely NOT A BUG)
- **Open ticket:** `privacy-url-incomplete` (p3)
- **Current implementation:** `<a href="https://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</a>`
- **Finding:** The href HAS the full protocol (https://). The display text omits it for brevity, which is a common UX pattern.
- **Verdict:** Link functions correctly. Ticket may be based on misunderstanding — display text ≠ href value.
- **Recommendation:** Planner should verify if this ticket is still valid or close it.

### 4. All Other Routes
- **ATP/WTA Live:** Tables load, pagination works, filters present, data complete ✓
- **World Cup pages:** Standings, matches, team rosters all present and working ✓
- **Match pages:** Load correctly, show full match detail ✓
- **Team pages:** Roster section present (ARG team verified) ✓
- **Homepage:** Navigation works, no broken images ✓

## Console/Network
- No failed requests observed
- No console errors detected in HTML
- All routes return 200 status

## Open Bug Tickets (from tkt ls)
1. `privacy-url-incomplete` (p3) — see finding #3 above, may be invalid
2. `wc-legend-missing-regression` (p2) — see finding #1 above, false positive

## Conclusion
**Zero new bugs filed.** All inspected routes are functional and working as designed. The two open bug tickets appear to be false positives or misunderstandings of intended behavior.

**Next actions:**
- Planner should review open bug tickets and consider closing if verified as invalid
- Continue monitoring for genuine functional/data/visual bugs in future runs
