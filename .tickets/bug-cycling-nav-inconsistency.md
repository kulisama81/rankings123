---
id: bug-cycling-nav-inconsistency
status: open
deps: []
links: []
created: 2026-08-06T00:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, ui, navigation, cycling]
---
# Cycling navigation inconsistency (header nav vs homepage)

**URL:** https://rankings123.com

**Severity:** P2 (Medium) — Navigation inconsistency, confusing UX

**Description:**
The cycling link appears in the header navigation on all pages but is missing from the homepage 'All Sports' section when the Tour de France is not active (outside June 27 - July 26). This creates navigation inconsistency where users see cycling in the header but cannot find it in the comprehensive sports directory.

**Root Cause:**
- Nav.tsx (line 14): Cycling is unconditionally included in header tabs
- page.tsx (lines 40, 47-50): Cycling is conditionally shown in 'All Sports' only when isTourDeFranceActive() returns true (June 27 - July 26)
- Currently August 6, so cycling is filtered out of 'All Sports' but still shown in header nav

**Reproduction Steps:**
1. Visit https://rankings123.com (today is Aug 6, outside TdF dates)
2. Observe header navigation includes 'Cycling' link
3. Scroll to 'All Sports' section
4. Note that cycling is NOT listed in the sports grid
5. Inconsistency: cycling is in header but not in homepage directory

**Expected Behavior:**
Navigation should be consistent. Either:
- Option A: Hide cycling from BOTH header nav AND homepage when TdF is not active
- Option B: Show cycling in BOTH header nav AND homepage year-round
- Option C: Conditionally show/hide cycling in header nav to match homepage logic

**Actual Behavior:**
Cycling shows in header nav but not in homepage 'All Sports' section (when TdF is not active).

**Impact:**
- Confusing navigation — users click cycling in header but see it missing from homepage
- Inconsistent mental model of what sports are available
- cycling-hide-until-ready ticket (closed) may have been incompletely resolved

**Related:**
- cycling-hide-until-ready (closed) — intended to hide cycling from nav/homepage but cycling still shows in Nav.tsx
- Possible regression or incomplete fix

## Acceptance Criteria

1. Decide on consistent cycling visibility strategy:
   - Recommended: Option A (hide from both when TdF not active) OR Option C (conditional header nav)
   - Align with cycling content availability — if /cycling page works year-round, show in both; if only during TdF, hide from both

2. Implement the fix:
   - If Option A: Add same isTourDeFranceActive() filter to Nav.tsx tabs array
   - If Option B: Remove the TdF filter from page.tsx allSportLinks
   - If Option C: Make Nav.tsx tabs conditional (more complex but allows seasonal sports)

3. REGRESSION TEST REQUIRED:
   - Add test in tests/navigation-consistency.test.mjs (run via npm test):
     - Render homepage and extract 'All Sports' links
     - Render Nav component and extract header nav links
     - Check sport consistency: if cycling is in header nav, it must be in 'All Sports' (and vice versa)
     - Test both TdF-active and TdF-inactive date scenarios
     - Test should FAIL with current code (finds inconsistency), PASS when fixed

4. Verify locally:
   - Run npm run dev
   - Visit http://localhost:3000
   - Check header nav cycling link visibility matches homepage 'All Sports' section
   - Mock date to July 10 (TdF active) — verify cycling shows in both or neither
   - Mock date to August 6 (TdF not active) — verify cycling shows in both or neither
   - npm run build — succeeds
   - npm test — regression test passes
   - npx eslint src --max-warnings=0 — clean

5. Verify live after deploy:
   - Visit https://rankings123.com
   - Check header nav and 'All Sports' section are consistent (cycling in both or neither)
   - Test with different dates if seasonal logic is implemented
   - Confirm Vercel build succeeded
