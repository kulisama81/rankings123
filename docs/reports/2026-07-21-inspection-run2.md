# Inspector Report — 2026-07-21 (Run 2)

## Summary
Live site inspection of https://rankings123.com across 5 main routes plus team/match detail pages.
**Total new bugs found: 1 (minor p3 visual)**
**Existing bugs confirmed: 8**

## Routes Checked
- `/` (Homepage) — both themes
- `/atp-live` — both themes
- `/wta-live` — both themes  
- `/world-cup` — both themes + mobile
- `/privacy` — loaded correctly
- `/world-cup/team/USA` — team page
- `/world-cup/match/401755197` — match page (404)

## Automated Checks
- ✅ `npm run check:data-sanity` — PASS
- ✅ `npm run check:core-features` — PASS (all 5 core features present)

## Bugs Confirmed (Already Filed)

### P0/P1 Bugs Still Present
1. **bug-homepage-wc-final-stale** (`t-0b74`) — Homepage shows "World Cup Final — Today" but final was July 19 (2 days ago); should display results not a vague standings link
2. **wc-bracket-live-results** — World Cup Final shows "TBD" for both teams and all knockout matches show "Proj" instead of actual results from July 19
3. **bug-wc-match-401xxx-404** — Match page /world-cup/match/401755197 returns 404
4. **bug-usa-roster-balogun** — USA roster incorrectly includes Folarin Balogun (England international)

### P2 Consistency Bugs Still Present
5. **bug-atp-in-play-count-mismatch** — ATP Live header shows "23 Players in play" but only ~3 players display tournament badges/indicators
6. **bug-wc-fixtures-knockout-inconsistency** — World Cup page displays "No upcoming fixtures scheduled" under Schedule section but shows full knockout bracket with matches
7. **bug-wc-stage-label-mismatch** — Header shows "FIFA World Cup 2026 · Final" but bracket section displays "Round of 32" and "Round of 16" labels (should be "Final" since tournament ended July 19)
8. **bug-wc-team-form-badge-count** — Team page form badges show inconsistent counts/order vs fixture results

## New Bug Found

### bug-atp-country-filter-malformed (not filed — p3)
**URL:** https://rankings123.com/atp-live  
**Severity:** p3 (minor visual)  
**Issue:** Country filter dropdown displays "All countries???" with malformed formatting (extra question marks)  
**Expected:** Should display "All countries" without special characters  
**Decision:** Did not file ticket — very minor cosmetic issue, low priority vs backlog

## What's Clean
- ✅ All core features present and rendering (WC bracket R32, group standings, ATP/WTA tables with pagination)
- ✅ Privacy page loads correctly with complete policy
- ✅ No console errors detected on main routes
- ✅ No broken images or critical layout issues
- ✅ Navigation functional across all pages
- ✅ WTA Live page clean (no new issues beyond general in-play count logic)
- ✅ Data sanity checks passing
- ✅ Mobile viewport (375x667) — no critical overflow issues on World Cup page

## Notes
- Most World Cup bugs are post-tournament data staleness (Final ended July 19, today is July 21)
- The existing p0/p1 World Cup bugs are time-sensitive and should be fixed ASAP to show accurate Final results
- ATP/WTA "in play" count mismatches appear to be a recurring data/UI sync issue
- Recent commit eb26feb added homepage countdown timer — working but WC Final content is stale

## Recommendation
Priority should be on clearing the 4 p0/p1 bugs (especially World Cup Final result display) before filing new minor cosmetic issues.
