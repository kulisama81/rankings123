# Inspector Report — 2026-08-15 (Late Run)

**Inspector:** @inspector (automated QA agent)
**Inspection Time:** 2026-08-15 ~05:00 UTC
**Routes Checked:** /, /atp-live, /wta-live, /world-cup
**Automated Checks:** check:core-features ✓, check:data-sanity ✓

## Summary

**3 bugs found and filed:**
- 2 × P0 (World Cup TBD regression, ATP demo data CX violation)
- 1 × P1 (Homepage console errors)

**Clean pages:** WTA Live

## Bugs Filed

### P0: bug-wc-knockout-tbd-still-broken
- **URL:** https://rankings123.com/world-cup
- **Issue:** Knockout bracket (R16/QF/SF) shows multiple 'TBD' placeholders even though tournament is completed (final: Argentina 3-1 Switzerland)
- **Regression:** Commit ba4fdb9 claimed to fix this but bug still exists
- **Impact:** Makes site look broken and unreliable
- **Ticket:** `.tickets/bug-wc-knockout-tbd-still-broken.md`

### P0: bug-atp-demo-data-visible
- **URL:** https://rankings123.com/atp-live
- **Issue:** Page explicitly shows 'Demo data' and 'Grass season (demo)' labels to end users
- **CX Violation:** CLAUDE.md states "never ship placeholder, coming soon, empty, or fabricated UI to users"
- **Additional:** Date mismatch (title says August 2026, content says June 8, 2026)
- **Impact:** Unprofessional, violates core CX-first principle
- **Ticket:** `.tickets/bug-atp-demo-data-visible.md`

### P1: bug-homepage-console-errors
- **URL:** https://rankings123.com
- **Issue:** 17 JavaScript console errors on page load
- **Errors include:**
  - CORS policy violations when fetching ESPN API
  - "Failed to fetch Cincinnati scores: TypeError: Failed to fetch"
- **Impact:** Site functions (mock fallback works) but indicates broken data fetching
- **Ticket:** `.tickets/bug-homepage-console-errors.md`

## What Worked Well

- **WTA Live page:** Clean, no issues found. Real data, proper pagination, no placeholder text.
- **Core features check:** All 5 protected features present (WC bracket, WC groups, ATP live+pagination, WTA live, home multi-sport)
- **Data sanity:** Passing (ATP on expected mock fallback)
- **Homepage:** All navigation links functional, Live Now widgets present (2 instances)

## Recent Deployments Checked

Based on git log, inspected recent changes:
- ❌ ba4fdb9 "Fix World Cup bracket showing TBD" — **FAILED**, bug still present
- ✓ 116fd62 "Add unified Live Now widget to homepage" — widget found working
- ⚠️ e6a971a "Add Cincinnati Open live scores widget" — widget present but console errors on data fetch
- ✓ fcc1f9c "Fix mobile navigation overflow" — no mobile overflow detected

## Methodology

1. Playwright headless browser inspection of live site
2. Captured console errors and network failures
3. WebFetch analysis of page content for placeholder/TBD/demo text
4. Ran automated check:core-features and check:data-sanity
5. Verified navigation links and core UI elements

## Notes

- The World Cup TBD bug is a confirmed **regression** — the fix in commit ba4fdb9 did not work or has been undone
- The ATP demo data issue is a **critical CX violation** per CLAUDE.md guidance
- Homepage console errors indicate data fetch failures but graceful degradation is working (users see mock data, not broken UI)

## Next Steps

All bugs filed with regression test requirements in acceptance criteria. The planner will pick these up in priority order (two P0s first).
