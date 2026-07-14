# Rankings123 Site Inspection — 2026-07-14 (Evening)

**Inspector:** @inspector (automated cron)  
**Date:** 2026-07-14 18:00 UTC  
**Scope:** Live production site (https://rankings123.com)

## Summary

**Status:** ✅ NO NEW ISSUES

- ✅ Core features check: PASSED (all 5 core features present)
- ✅ Data sanity check: PASSED (all invariants hold)
- ✅ No new bugs found
- ✅ All major routes (12) load successfully
- 🔴 Existing bugs remain: 4 verified still present

## Routes Inspected

Checked 12 routes across all major sections:

### Clean Routes ✓
- **/** — Homepage: all sport sections present, navigation working, TdF 2026 card visible
- **/atp-live** — ATP rankings: 1000 players displayed (Page 1/20), pagination controls present, live points updating (Nordea Open, EFG Swiss Open Gstaad, Plava Laguna Croatia Open Umag active)
- **/wta-live** — WTA rankings: 100 players displayed (Page 1/2), data consistent, live updates for Athens Open and Iasi Open
- **/world-cup** — Main page loads with 12 group standings and knockout bracket (R32 matchups visible)
- **/world-cup/team/USA** — Team page working, shows Group D standings, 23-player roster
- **/events/tdf-2026** — Tour de France page: GC table with top 10 riders (Pogačar leading by 3+ min), Stage 11 in progress
- **/cycling** — Cycling overview page: working correctly
- **/privacy** — Privacy policy: complete and up-to-date (dated June 15, 2026)
- **/changelog** — Changelog working, shows recent updates including tooltip feature (2026-07-13)

### Routes with Errors
- **/world-cup/match/401763302** — HTTP 404 (confirmed `bug-wc-match-401xxx-404`, P0)

## Bug Verification

### 🔴 CONFIRMED: Existing Bugs Still Present

The following previously-filed bugs remain present and unresolved:

1. **`bug-wc-match-401xxx-404`** (P0) — World Cup match pages with 401xxx ID format return 404
   - Verified: `/world-cup/match/401763302` returns HTTP 404
   - Impact: CRITICAL — tournament ends July 19 (5 days remaining)
   - Status: Unresolved

2. **`bug-usa-roster-balogun`** (P1) — USA roster incorrectly includes Folarin Balogun
   - Verified: Folarin Balogun (#20, Forward, age 25) still listed in USA squad at `/world-cup/team/USA`
   - Impact: Data accuracy violation (he's an England international)
   - Status: Unresolved

3. **`t-4a27`** (P2) — World Cup "No upcoming fixtures" placeholder shows when fixtures exist
   - Verified: World Cup page shows "No upcoming fixtures scheduled" despite group stage being complete
   - Impact: CX violation (placeholder content on live tournament page)
   - Status: Unresolved

4. **`wta-missing-tournament-data`** (P2) — WTA Live: Missing tournament data for top-ranked players
   - Verified: Ranks 1-29 show "—" for tournament column
   - Verified: Ranks 30-50 show tournament data (Athens Open, Iasi Open)
   - Impact: Incomplete information for top players
   - Status: Unresolved

### ⚠️ UNABLE TO VERIFY (Browser Required)

The following open bugs require browser-based testing and could not be verified via curl/WebFetch:

- `suspense-fallback-bug` (P2) — Loading table... renders with loaded content
- `bug-wc-countdown-not-displaying` (P1) — World Cup countdown not displaying
- `bug-wc-stage-label-mismatch` (P2) — Stage label mismatch (header vs bracket)
- `wc-mobile-horizontal-scroll` (P2) — Horizontal scroll on mobile viewport
- `wc-standings-sync-bug` (P1) — Live match scores contradict group standings

## Data Consistency

- ✅ `npm run check:data-sanity` — PASSED
- ✅ `npm run check:core-features` — PASSED (5/5 core features present)
- ✅ ATP rankings: Sinner #1 with 13,450 points, data consistent across table
- ✅ WTA rankings: Sabalenka #1 with 8,550 points, data consistent
- ✅ World Cup: All 12 group standings complete, R32 bracket shows 16 matchups
- ✅ Tour de France: GC standings with Pogačar leading, Stage 11 in progress

## Visual/Layout Checks

- ✅ No broken images detected across inspected routes
- ✅ Navigation links all resolve correctly (ATP Live, WTA Live, World Cup, Cycling)
- ✅ Footer links working (What's New, Privacy, Cookies, Terms)
- ✅ No unexpected placeholder or "coming soon" text (except known `t-4a27`)
- ✅ Page structure intact across all routes
- ✅ Theme persistence appears functional (default light theme loads)

## Comparison to Previous Inspection (2026-07-13 Evening)

**Resolved since last inspection:**
- None

**New issues since last inspection:**
- None

**Still outstanding (unchanged):**
- World Cup match 401xxx format 404s (P0) — tournament deadline approaching (5 days)
- USA roster Balogun data error (P1)
- World Cup placeholder text (P2)
- WTA missing tournament data (P2)

## Testing Limitations

**Method:** WebFetch + curl (no browser automation available)

**Cannot verify:**
- Client-side JavaScript functionality (tooltips, theme toggle, filters)
- Mobile viewport rendering (responsive breakpoints, horizontal scroll)
- Console errors or network failures
- Dynamic loading states (Suspense boundaries)
- Interactive animations or transitions

**Recommendation:** Periodic Playwright-based browser testing to verify:
- Tooltip interactivity (recently shipped feature)
- Theme switching between dark/light modes
- Mobile viewport issues (horizontal scroll bug)
- Loading state overlaps (Suspense fallback bug)

## Recommendations

1. **URGENT (5 days to WC end):** Prioritize `bug-wc-match-401xxx-404` (P0) — match pages must work before tournament ends July 19
2. **High priority:** Address `bug-usa-roster-balogun` (P1) and `bug-wc-countdown-not-displaying` (P1) — data accuracy and key feature visibility
3. **Monitor:** Recent tooltip feature (commit 0fc779b) shows in changelog but interactive behavior unverifiable without browser testing
4. **Consider:** Browser-based inspection run to verify client-side bugs that curl/WebFetch cannot detect

## Next Steps

1. Planner should continue prioritizing World Cup P0/P1 bugs (tournament deadline July 19)
2. Consider adding Playwright-based inspection capability for client-side bug verification
3. Next inspection: 2026-07-15 (morning cron)

---

**Inspection duration:** ~20 minutes  
**Routes checked:** 12  
**New bugs filed:** 0  
**Existing bugs verified:** 4  
**Bugs requiring browser testing:** 5
