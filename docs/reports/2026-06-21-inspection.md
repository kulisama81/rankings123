# Live Site Inspection — 2026-06-21

**Inspector:** inspector agent (cron run)  
**Duration:** ~25 minutes  
**Scope:** Systematic inspection of https://rankings123.com for functional, visual, data, and consistency bugs

## Routes Checked

✅ **All primary routes responded with HTTP 200:**
- `/` (Homepage)
- `/atp-live` (ATP Live Rankings)
- `/wta-live` (WTA Live Rankings)
- `/world-cup` (World Cup main page)
- `/world-cup/golden-boot` (Golden Boot page — recently deployed)
- `/privacy` (Privacy Policy)

## Recent Deployments Reviewed

Focused inspection on recently deployed features (most likely source of fresh bugs):
- World Cup Golden Boot dedicated page (commit 3f462c8)
- World Cup legend fix (commit 7f8cb6f)
- World Cup bracket visual feature

## Bugs Found

### Critical (P0) — 1 bug

**`wc-golden-boot-data-fabricated`** — Golden Boot page shows fabricated/test data
- **URL:** https://rankings123.com/world-cup/golden-boot
- **Issue:** Page displays what appears to be test/fabricated data (players with only 1-2 appearances, unclear player names like "J. David") presented as live tournament statistics
- **CX-FIRST violation:** Presenting fabricated data as real destroys user trust
- **Ticket:** wc-golden-boot-data-fabricated.md

### High Severity (P1) — 0 bugs

None found.

### Medium Severity (P2) — 2 bugs

**`wc-legend-missing-regression`** — World Cup legend missing entirely
- **URL:** https://rankings123.com/world-cup
- **Issue:** Regression from wc-legend-mismatch fix — the entire legend component is now missing instead of being conditionally shown. Users have no visual guide for team status indicators.
- **Ticket:** wc-legend-missing-regression.md

**`cycling-placeholder-violation`** — Homepage cycling section shows placeholder content
- **URL:** https://rankings123.com
- **Issue:** 8 major cycling events display "Results not yet available" and "TBD" text, violating the CX-FIRST rule that requires hiding incomplete features rather than showing placeholders
- **Ticket:** cycling-placeholder-violation.md
- **Note:** cycling-dynamic-feed ticket (P1, open) will provide the real fix; this is a stopgap to hide placeholders

### Low Severity (P3) — 1 bug

**`privacy-url-incomplete`** — Privacy policy Google Analytics opt-out URL missing protocol
- **URL:** https://rankings123.com/privacy
- **Issue:** Google Analytics opt-out link shows `tools.google.com/dlpage/gaoptout` without `https://` protocol prefix
- **Ticket:** privacy-url-incomplete.md

## Data Integrity Check

✅ **`npm run check:data-sanity` — PASSED**
- All per-sport invariants hold
- No Math.random/Math.sin generators detected in data layer
- Mock fallback pattern working correctly

**Note:** The fabricated Golden Boot data was not caught by the current data-sanity checks. The bug ticket includes acceptance criteria to add a new invariant that will catch this type of issue.

## Functional Testing

✅ **Navigation:** All primary nav links working (ATP, WTA, World Cup sections)  
✅ **Page Load:** All routes loaded successfully with no fatal errors  
✅ **Console Errors:** No critical console errors detected  
✅ **Failed Requests:** No major failed HTTP requests observed  
✅ **Mobile Responsive:** Pages checked on mobile viewport (375×667) — no major overflow issues

## Visual/Layout Testing

✅ **Dark Theme:** Checked all routes — layout intact  
✅ **Light Theme:** Toggle tested — theme switching works  
✅ **Broken Images:** No broken flag/icon images detected on tennis pages  
⚠️ **World Cup:** Legend missing (covered by bug ticket)

## Consistency Checks

⚠️ **World Cup Legend:** Legend completely missing (regression)  
⚠️ **Golden Boot Data:** Player statistics don't match expected tournament progression  
⚠️ **Cycling Events:** Placeholder content where real data or no content is expected

## Summary

**Total Bugs Filed:** 4
- P0 (Critical): 1 — Golden Boot fabricated data
- P1 (High): 0
- P2 (Medium): 2 — World Cup legend regression, cycling placeholders
- P3 (Low): 1 — Privacy URL

**Clean Areas:**
- ATP/WTA Live rankings pages functioning correctly with proper source indicators
- Navigation and routing working across all sections
- Privacy policy content complete and well-formatted (minus one URL issue)
- Data sanity checks passing
- Mobile responsive layout holding up

**Focus for Next Inspection:**
- Verify Golden Boot data fix shows real tournament statistics or honest mock fallback
- Confirm World Cup legend restoration with proper conditional display
- Check that cycling placeholder content is removed/hidden
- Test any newly deployed features

**Deduplication Check:** Searched existing open tickets before filing — no duplicates found. All 4 bugs are new findings.

---

## Follow-up Inspection — Late Afternoon Run

**Focus:** World Cup feature completeness verification (checking closed tickets against live functionality)

### Additional Critical Bugs Found

**`wc-match-pages-404-regression`** — World Cup match pages completely non-functional (P0)
- **Routes:** `/world-cup/match/*` (all match IDs return 404)
- **Issue:** Ticket `wc-match-pages` is marked as closed/shipped, but ALL match detail pages return HTTP 404 in production
- **Impact:** Core user-facing feature completely broken — clicking any match link results in 404 error
- **Tested:** Multiple match IDs (401631445, 401631500) — confirmed all fail
- **Root cause:** Either feature was never deployed, or deployment broke after ticket closure
- **Severity:** P0 — Critical regression, complete feature failure

**`wc-team-roster-missing-regression`** — World Cup team pages missing player rosters (P1)
- **Routes:** `/world-cup/team/USA`, `/world-cup/team/BRA`, etc.
- **Issue:** Ticket `wc-team-pages` is marked closed claiming pages render "squad, group, fixtures/results, form", but live pages have NO player roster section at all
- **Impact:** Major missing content — team pages exist but lack their primary feature (squad list)
- **Additional issues:** Upcoming fixtures show "Scheduled" with no dates, missing team headers
- **Severity:** P1 — Partial implementation / regression

### Updated Bug Count

**Total Bugs Filed Today:** 6
- P0 (Critical): 2 — Golden Boot fabricated data, Match pages 404
- P1 (High): 1 — Team rosters missing
- P2 (Medium): 2 — World Cup legend regression, cycling placeholders
- P3 (Low): 1 — Privacy URL

### Process Observation

Two World Cup tickets (`wc-match-pages`, `wc-team-pages`) were marked as closed/completed but their features are either completely broken (404s) or significantly incomplete (missing rosters) in production. This indicates a gap between ticket closure and actual production verification.

**Recommendation:** Add automated route smoke tests to CI pipeline to catch 404 regressions, and strengthen the post-deploy verification step in the build loop before closing tickets.
