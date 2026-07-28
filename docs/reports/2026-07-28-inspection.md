# Inspector Report — 2026-07-28

**Inspector:** Automated QA agent  
**Date:** July 28, 2026  
**Duration:** ~25 minutes  
**Scope:** Live site inspection across 7 routes, both themes, mobile viewport

## Routes Checked

- ✓ `/` (homepage)
- ✓ `/atp-live`
- ✓ `/wta-live`
- ✓ `/world-cup`
- ✓ `/world-cup/match/401752264` (404 expected)
- ✓ `/world-cup/match/733361` (working match page)
- ✓ `/world-cup/team/ARG`
- ✓ `/privacy`
- ✓ `/cycling`

## Mechanical Checks

- ✅ `npm run check:core-features` — PASSED (all 5 core features present)
- ✅ `npm run check:data-sanity` — PASSED (1 expected warning: cycling mock fallback)

## Findings

**NO NEW BUGS FOUND** — All detected issues have already been filed in the backlog.

### Confirmed Existing Bugs (Still Present)

The following open bug tickets were **verified as still reproducible** on the live site:

#### P0 (Critical)
- `bug-wc-tournament-status-stale` — World Cup shows "Live" status when tournament ended July 19
- `bug-wc-match-401xxx-404` — Match pages with 401xxx ID format return 404 (tested 401752263, 401752264)

#### P1 (High)
- `bug-tdf-race-status-stale` — Tour de France shows "preview data / will update once race begins" when race finished July 26
- `bug-wc-match-count-mismatch` — World Cup header shows "100 Matches" but schedule shows "No upcoming fixtures"

#### P2 (Medium)
- `bug-atp-country-filter-malformed` — ATP country filter contains "???" codes
- `bug-atp-inplay-count-regression` — ATP "In play" badge shows 16 but only 6 players visible in top 50
- `bug-wc-stage-label-mismatch` — World Cup knockout bracket labeling inconsistencies
- `bug-wc-team-form-badge-count` — Argentina team page shows 5 W badges for 6 wins
- `bug-privacy-branding-typo` — Privacy page header shows "RANKINGS23R23" instead of "Rankings123"

#### P3 (Low)
- `bug-wta-pagination-spacing` — WTA pagination displays "← PrevPage 1 / 2Next →" (missing spaces between words)

### Additional Observations

1. **Match pages work for non-401xxx IDs** — Match ID 733361 loads successfully with complete data, confirming the bug is specific to the 401xxx format range.

2. **Homepage clean** — No placeholder content, broken links, or data inconsistencies detected on landing page.

3. **WTA flag display** — Some players show neutral flag (🏳️) which appears intentional (possibly for Romanian players per existing ticket).

4. **Cycling page** — Shows mock data warning (expected) but has stale race status messaging.

## Summary

The live site is **functionally stable** with no new critical bugs introduced since the last inspection. All detected issues are already tracked in the backlog. The core features check passed, confirming no regressions to protected features.

The existing P0 bugs (World Cup tournament status, 401xxx match 404s) remain the highest priority for fixing.

## Next Actions

No new tickets filed. The planner should continue working through the existing bug backlog, prioritizing the P0/P1 items confirmed in this inspection.
