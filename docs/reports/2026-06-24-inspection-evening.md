# Inspector Run: 2026-06-24 Evening

## Routes Inspected

Comprehensive sweep of live production site https://rankings123.com:

- ✅ `/` (homepage)
- ✅ `/atp-live` 
- ✅ `/wta-live`
- ✅ `/world-cup`
- ✅ `/world-cup/match/716495` (demo fallback)
- ✅ `/world-cup/match/760473` (current match)
- ✅ `/world-cup/match/760468` (current match)
- ✅ `/world-cup/team/USA`
- ✅ `/privacy`
- ✅ `/whats-new` (changelog redirect)

## Bugs Found

### 1. Mock World Cup Match Data - Duplicate Jersey Numbers (NEW BUG - FILED)

**Ticket:** `wc-mock-match-duplicate-jerseys`
**Severity:** P2 - Data integrity violation in mock fallback
**Status:** Filed as new bug ticket

**Details:**
- Mock match detail fallback (src/data/worldCup.ts, getMockWorldCupMatchDetail function)
- Türkiye lineup has TWO players wearing jersey #17:
  - İ. Kahveci (MF, #17) - line 318
  - B. Yılmaz (FW, #17) - line 320
- Violates basic soccer roster rules (unique jersey numbers required)
- Affects any match page that falls back to mock data (e.g., match 716495, invalid IDs)
- Page correctly shows "Demo data" label, but the demo data itself contains integrity errors

### 2. Privacy Policy - Google Analytics Opt-Out Link (ALREADY TRACKED)

**Ticket:** `privacy-url-incomplete` (open, P3)
**Status:** Previously filed, still open

**Details:**
- Link missing `https://` protocol: `tools.google.com/dlpage/gaoptout`
- Should be: `https://tools.google.com/dlpage/gaoptout`

## Verified Fixed Issues

The following bugs from previous inspector runs are now CONFIRMED FIXED on production:

1. ✅ ATP Live table loading failure - RESOLVED (ticket `atp-table-loading-failure` closed)
2. ✅ WTA Live table loading failure - RESOLVED (ticket `wta-table-loading-failure` closed)  
3. ✅ /whats-new route 404 - RESOLVED (ticket `whats-new-route-404` closed, now redirects to /changelog)

## Clean Areas

- Homepage loads cleanly, navigation functional
- World Cup main page displays group standings, matches, player stats correctly
- Current match pages (760473, 760468) load properly with "Lineup not available" for upcoming matches
- Team pages (USA) display roster and fixtures correctly
- Privacy policy content is complete and well-structured
- No console errors detected in HTML
- No broken images or layout overflow issues
- No placeholder/"coming soon" text exposed to users (except properly-labeled demo fallback)

## Notes

- ATP/WTA pages successfully load full ranking tables (regression from yesterday now fixed)
- World Cup tournament is live (through ~July 19) - most match data comes from ESPN API
- Demo data fallback is properly labeled when shown, but contains the duplicate jersey bug noted above
- Site overall is healthy, primary features functional

## Next Actions

1. Planner will address `wc-mock-match-duplicate-jerseys` (P2)
2. Privacy URL fix remains in backlog (P3, low impact)
