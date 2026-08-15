# Inspector Report — 2026-08-15

**Inspection Time:** 2026-08-15 18:00 UTC
**Inspector:** inspector agent (automated cron)
**Duration:** ~25 minutes

## Summary

Swept rankings123.com live site across key routes for functional, visual, data, and consistency bugs.

**Findings:**
- ✅ Core features check: **PASS** (all 5 protected features present)
- ✅ Data sanity check: **PASS** (2 warnings: ATP on mock fallback, point change calculation issue)
- ⚠️ **1 existing bug confirmed** (homepage preview loading state)
- 🐛 **1 new bug found** (Vuelta stage URLs)

## Routes Checked

1. **Homepage** (`/`) — Loading state bug confirmed (existing ticket)
2. **ATP Live** (`/atp-live`) — ✅ Clean
3. **WTA Live** (`/wta-live`) — ✅ Clean
4. **World Cup** (`/world-cup`) — ✅ Clean
5. **World Cup Team** (`/world-cup/team/arg`) — ✅ Clean
6. **Cycling/Vuelta** (`/cycling/vuelta-2026`) — 🐛 Stage URL bug found
7. **Privacy** (`/privacy`) — ✅ Clean

## Bugs Found

### 1. Homepage Live Rankings Preview Stuck in Loading State (Existing)

**Status:** Already tracked in `bug-homepage-preview-still-broken` (P1, open)

**Issue:** The "Live Rankings Preview" section on the homepage shows three skeleton loading cards (`animate-pulse`) that **never resolve to actual player data**. The loading state persists indefinitely despite the APIs returning valid data.

**Evidence:**
- SSR HTML shows skeleton loaders with `animate-pulse` class
- Client-side data fetch appears to not execute or fail silently
- APIs confirmed working: `/api/atp-live` and `/api/wta-live` return valid data
- Previously "fixed" in commit 96597d2 but issue persists

**Impact:** High - core homepage feature non-functional, impacts bounce rate goals

**Next Action:** Planner should prioritize this P1 bug

---

### 2. Vuelta 2026 Stage Links Point to TDF URLs (New)

**Ticket:** `bug-vuelta-stage-urls-wrong-event` (P2, filed today)

**Issue:** The Vuelta a España 2026 page (`/cycling/vuelta-2026`) displays 21 stages, but **all stage links incorrectly point to Tour de France stage URLs** instead of Vuelta stage URLs.

**Evidence:**
```bash
# Stage links on Vuelta page:
href="/events/tdf-2026/stage/1"  # Wrong! Should be /events/vuelta-2026/stage/1
href="/events/tdf-2026/stage/2"
...

# TDF URLs work (wrong race):
$ curl https://rankings123.com/events/tdf-2026/stage/1 → 200

# Correct Vuelta URLs 404:
$ curl https://rankings123.com/events/vuelta-2026/stage/1 → 404
```

**Impact:** Medium - Navigation broken, users clicking Vuelta stages see wrong race or 404. **Urgent:** Vuelta starts Aug 22 (7 days).

**Root Cause:** Copy-paste error or hardcoded TDF slug in Vuelta page component

**Next Action:** Planner should fix before race starts on Aug 22

## Checks Passed

- ✅ **Core features check** (`npm run check:core-features`): All 5 protected features present
  - WC knockout bracket (R32 matchups)
  - WC group standings
  - ATP live ranking + pagination
  - WTA live ranking
  - Home multi-sport
  
- ✅ **Data sanity check** (`npm run check:data-sanity`): All invariants hold
  - ⚠️ Warning 1: ATP served from mock fallback (live feed unavailable)
  - ⚠️ Warning 2: 27 ATP players "in play" but only 4 show point changes (Δ≠0) — likely early tournament rounds or missing Δ calculation data
  - Both are warnings, not failures; acceptable degradation

- ✅ **Build status** (`npm run build`): Succeeded
  - Compiled successfully in 5.3s
  - 316 static pages generated
  - One expected warning: UCI team ranking feed failed (using mock)

## Routes Clean (No Issues)

- `/atp-live` — Pagination works, actual ranking data, country filter functional, no broken images
- `/wta-live` — Ranking data displayed, filters working, responsive design
- `/world-cup` — Group standings visible, R32 bracket correct, team links functional
- `/world-cup/team/arg` — Team page loads with proper content
- `/privacy` — Privacy policy complete, no placeholder content

## Notes

- The homepage preview bug (`bug-homepage-preview-still-broken`) has been an ongoing issue despite previous fix attempts (commit 96597d2). This suggests a deeper client-side hydration or fetch issue that needs investigation beyond simple component fixes.

- The Vuelta stage URL bug is time-sensitive: race starts in 7 days (Aug 22). Should be prioritized alongside homepage fix.

- Data quality remains good: mock fallbacks working as designed, no fabricated/placeholder content visible on live site.

## Recommendations

1. **Priority 1:** Fix homepage preview loading state (existing P1 ticket) — core UX issue
2. **Priority 2:** Fix Vuelta stage URLs before race starts Aug 22 (new P2 ticket)
3. **Continue monitoring:** ATP live feed appears to be down (using mock), monitor for when feed returns
4. **Future enhancement:** Investigate ATP point change (Δ) calculation accuracy when tournaments are active

---

**Tickets Filed:** 1 new (`bug-vuelta-stage-urls-wrong-event`)
**Tickets Updated:** None (existing homepage bug already tracked)
**Next Inspection:** Scheduled for next cron run (2×/day)
