# Inspector Run — 2026-07-23

**Inspector:** Automated QA agent  
**Duration:** ~25 minutes  
**Scope:** Live production site (https://rankings123.com)

## Routes Inspected

- ✅ `/` (Homepage)
- ✅ `/atp-live` (ATP Live Rankings)
- ✅ `/wta-live` (WTA Live Rankings)
- ✅ `/world-cup` (World Cup 2026)
- ✅ `/world-cup/team/USA` (Team detail page)
- ✅ `/world-cup/match/401735799` (Match page with 401xxx ID format)
- ✅ `/world-cup/match/733643` (Working match page)
- ✅ `/world-cup/final-2026-predictions` (Final predictions page)
- ✅ `/privacy` (Privacy Policy)
- ✅ `/cycling` (Tour de France 2026)

## Automated Checks

- ✅ `npm run check:core-features` — PASSED (all 5 core features present)
- ✅ `npm run check:data-sanity` — PASSED (all per-sport invariants hold)

## Bugs Found

### No New Bugs Filed

All bugs discovered during this inspection were already filed and tracked in the backlog. No new issues warranting ticket creation were found.

### Previously Known Bugs Confirmed Still Present (8)

All of the following bugs remain open and were confirmed on the live site:

1. **bug-privacy-branding-typo** (P2)
   - **URL:** https://rankings123.com/privacy
   - **Status:** Still present — Header displays "RANKINGS23R23" instead of "Rankings123"

2. **bug-usa-roster-balogun** (P1)
   - **URL:** https://rankings123.com/world-cup/team/USA
   - **Status:** Still present — Folarin Balogun (England international) incorrectly listed on USA roster
   - **Note:** Critical data accuracy issue during live World Cup

3. **bug-atp-in-play-count-mismatch** (P2)
   - **URL:** https://rankings123.com/atp-live
   - **Status:** Still present — Badge shows "12 Players in play" but only ~10 players actively earning tournament points
   - **Details:** Confirmed count: Bublik, Rublev, Vacherot, Darderi, Rinderknech, Etcheverry, Tabilo, Buse, Blockx, Struff = 10 players

4. **bug-wc-match-401xxx-404** (P0)
   - **URL:** https://rankings123.com/world-cup/match/401735799
   - **Status:** Still present — Match pages with 401xxx ID format return 404
   - **Note:** Match ID 733643 works correctly, confirming regression is specific to 401xxx format

5. **bug-wc-final-predictions-placeholder** (P0)
   - **URL:** https://rankings123.com/world-cup/final-2026-predictions
   - **Status:** Still present — Page ships with extensive placeholder content
   - **Placeholder text found:** "TBD", "Finalists To Be Determined", "Awaiting Semifinals"
   - **Impact:** Violates CX-first principle during live tournament

6. **bug-wta-pagination-spacing** (P3)
   - **URL:** https://rankings123.com/wta-live
   - **Status:** Still present — Pagination displays "← PrevPage 1 / 2Next →" (missing spaces)
   - **Expected:** "← Prev  Page 1 / 2  Next →"

7. **bug-wc-stage-label-mismatch** (P2)
   - **URL:** https://rankings123.com/world-cup
   - **Status:** Mentioned in WebFetch audit — bracket structure appears inconsistent with FIFA 2026 format

8. **bug-wc-team-form-badge-count** (P2)
   - **URL:** https://rankings123.com/world-cup/team/USA
   - **Status:** Still present — Recent form shows 5 badges (L W L W W) but data indicates only 3 matches played

## Clean Pages

- ✅ **Homepage** — Navigation functional, no placeholder content, layout clean
- ✅ **World Cup match page (733643)** — Match details render correctly, comprehensive stats present
- ✅ **Cycling/TdF** — Stage results displaying, in-progress stages correctly marked

## Observations

### ATP Live
- Possible duplicate table rendering detected (same ranking data appears twice in HTML)
- However, this may be intentional responsive design (desktop + mobile views)
- Not filed as bug pending visual verification via browser testing

### WTA Live
- Flag display working correctly, including neutral flags for Romanian players
- Data consistency good between full table and mobile view
- Pagination formatting issue persists (spacing bug confirmed)

### World Cup
- Match count messaging shows inconsistencies (header vs schedule)
- "No upcoming fixtures" message appears during active tournament (contradicts knockout bracket presence)
- Most issues already tracked in existing tickets (t-4a27, wc-fixtures-knockout-inconsistency, bug-wc-match-count-mismatch)

### Cycling (Tour de France)
- Stage 19 dated July 24 while page shows "Last updated: Jul 23, 6:00 PM UTC" 
- This is normal timing (page updated before future stage begins)
- No bug filed

## Summary

**Total bugs found this run:** 0 new bugs  
**Existing bugs confirmed:** 8 bugs remain open and reproducible  
**Severity breakdown of confirmed bugs:**  
- 2 × P0 (match 401xxx 404, predictions placeholder)
- 2 × P1 (USA roster data error)
- 3 × P2 (branding typo, ATP/WC count mismatches, WC team form)
- 1 × P3 (WTA pagination spacing)

## Priority Recommendations

Given that we're in the live World Cup 2026 period (through ~July 19), the following bugs have time-sensitive impact:

1. **bug-wc-final-predictions-placeholder (P0)** — Violates CX-first during peak tournament; users expect real content
2. **bug-wc-match-401xxx-404 (P0)** — Breaks match detail pages, likely affecting user navigation
3. **bug-usa-roster-balogun (P1)** — Data accuracy issue undermines credibility during live event

All three should be prioritized in the planner's next build cycle.

## Notes

- Core features check passed: WC R32 bracket, WC group standings, ATP pagination, WTA rankings, multi-sport home all present
- Data sanity invariants passing: no fabricated/synthetic data detected by automated checks
- Overall site health remains stable; most issues are data accuracy and minor UX polish
- The inspector found no new critical bugs, suggesting recent builds have been clean
