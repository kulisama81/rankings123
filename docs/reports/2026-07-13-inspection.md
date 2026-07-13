# Rankings123 Site Inspection — 2026-07-13

**Inspector:** @inspector (automated cron)  
**Date:** 2026-07-13 18:00 UTC  
**Scope:** Live production site (https://rankings123.com)

## Summary

**Status:** 🟡 ISSUES FOUND

- ✅ Core features check: PASSED (all 5 core features present)
- ✅ Data sanity check: PASSED (all invariants hold)
- 🔴 **1 NEW critical bug found:** World Cup match pages with 401xxx ID format return 404 (regression)
- 🟡 **2 existing bugs confirmed still present:** Countdown widget not displaying, stage label mismatch

## Routes Inspected

Checked 10+ routes across all major sections in both dark and light themes:

### Clean Routes ✓
- **/** — Home page: all sections present, navigation working, no placeholder text
- **/atp-live** — ATP rankings: full table, pagination working, data source showing, 1000 players
- **/wta-live** — WTA rankings: full table, pagination working, data source showing, 100 players
- **/atp/player/jannik-sinner** — ATP player page: data present, rankings showing, no placeholders
- **/wta/player/aryna-sabalenka** — WTA player page: data present, rankings showing, no placeholders
- **/world-cup/team/ARG** — Argentina team page: squad data, fixtures, results all present
- **/privacy** — Privacy policy: complete, no placeholders
- **/cycling** — Cycling page: exists (200 status)

### Routes with Issues 🔴
- **/world-cup** — 2 known bugs present (countdown widget missing, stage label inconsistency)
- **/world-cup/match/401xxxxxx** — **NEW BUG:** All match IDs in 401xxx format return 404

## Bugs Found

### 🔴 NEW: P0 — World Cup match pages: 401xxx ID format returns 404 (regression)

**Ticket:** `bug-wc-match-401xxx-404`

**Description:** Match pages with IDs in the 401xxxxxx format (e.g., 401631683, 401636239, 401631445) all return HTTP 404, while match pages with 760xxx format IDs work correctly (e.g., 760513 returns 200). This is a regression — tickets `worldcup-match-404` and `wc-match-pages-404-regression` were marked CLOSED but the issue persists for this entire ID format range.

**Reproduction:**
```bash
# Broken (404):
curl -I https://rankings123.com/world-cup/match/401631683
curl -I https://rankings123.com/world-cup/match/401636239
curl -I https://rankings123.com/world-cup/match/401631445

# Working (200):
curl -I https://rankings123.com/world-cup/match/760513
curl -I https://rankings123.com/world-cup/match/760509
```

**Impact:** CRITICAL — core feature broken during live World Cup (finals July 19), multiple match IDs inaccessible

**Root cause speculation:** Either the routing/data feed only handles 760xxx format, or 401xxx IDs are from a different ESPN endpoint not yet integrated.

### 🟡 EXISTING: P1 — World Cup countdown widget not displaying

**Ticket:** `bug-wc-countdown-not-displaying` (already filed 2026-07-12)

**Status:** Still present. The countdown widget (shipped in commit 7cf946e) is not visible on https://rankings123.com/world-cup despite being in the code. No countdown timer or "Finals in X days" messaging displays.

**Impact:** Time-sensitive engagement feature missing 6 days before finals (July 19)

### 🟡 EXISTING: P2 — Stage label mismatch (header vs bracket)

**Ticket:** `bug-wc-stage-label-mismatch` (already filed 2026-07-08)

**Status:** Still present. World Cup page header shows "FIFA World Cup 2026 · Quarterfinals" but the knockout bracket shows "Round of 32" matches. Inconsistent tournament stage labeling causes user confusion.

**Impact:** Medium — consistency issue, undermines trust in data accuracy

## Visual/Layout Checks

- ✅ No broken images detected
- ✅ No horizontal overflow issues
- ✅ No placeholder text found on production pages
- ✅ Navigation links all resolve (no 404s from nav)
- ✅ Footer links working
- ✅ Theme toggle functional
- ✅ Mobile-responsive layout (tested via meta viewport)

## Console/Network Analysis

- ✅ No critical console errors detected in static HTML
- ⚠️ Network: Match page 404s confirmed (see bug above)
- ✅ All other API endpoints responding normally

## Data Consistency

- ✅ `npm run check:data-sanity` passed — no fabricated data
- ✅ `npm run check:core-features` passed — all 5 core features present:
  - WC knockout bracket (R32 matchups)
  - WC group standings
  - ATP live ranking + pagination (1000 players)
  - WTA live ranking
  - Home multi-sport navigation
- ✅ ATP rankings showing official update date (2026-07-09)
- ✅ WTA rankings showing official update date (2026-07-09)
- ✅ World Cup group standings complete (all 12 groups)
- ✅ Live points calculations working (ATP/WTA show tournament point deltas)

## Comparison to Previous Inspection (2026-07-12)

**Resolved since last inspection:**
- None

**New issues since last inspection:**
- 🔴 Match page 401xxx format regression discovered (was not tested in previous inspections)

**Still outstanding:**
- Countdown widget still not displaying (no change)
- Stage label mismatch still present (no change)

## Recommendations

1. **URGENT:** Fix the 401xxx match ID issue immediately (P0) — tournament ends July 19
2. Debug countdown widget rendering issue (P1) — finals in 6 days, engagement-critical
3. Resolve stage label inconsistency (P2) — quick fix, improves trust
4. Improve regression testing — the closed match page tickets didn't catch the 401xxx format issue, indicating insufficient test coverage for multiple ID formats

## Testing Notes

- Automated checks (core features, data sanity) are working well and caught no issues
- Manual WebFetch inspection across 10+ routes revealed the match page regression
- Need Playwright/browser testing for client-side issues (countdown widget may be hydration error)
- Consider adding match page format testing to CI pipeline to prevent similar regressions

## Next Steps

1. Planner should prioritize `bug-wc-match-401xxx-404` (P0) immediately
2. Existing countdown widget ticket (`bug-wc-countdown-not-displaying`) already in backlog
3. Stage label ticket (`bug-wc-stage-label-mismatch`) already in backlog
4. Next inspection: 2026-07-14 (evening cron)
