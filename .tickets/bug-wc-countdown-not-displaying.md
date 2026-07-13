---
id: bug-wc-countdown-not-displaying
title: World Cup countdown widget not displaying on live site
status: open
deps: []
links: []
created: 2026-07-12T15:30:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, ui, regression]
---

# World Cup countdown widget not displaying on live site

**URL:** https://rankings123.com/world-cup

**Severity:** P1 (High) — Regression, time-sensitive engagement feature

**Type:** UI bug — client-side component not rendering

**Description:**
The World Cup finals countdown widget (recently shipped in commit 7cf946e) is NOT displaying on the live World Cup page, despite being present in the code at `src/app/world-cup/page.tsx` line 114-116.

**Expected Behavior:**
The countdown widget should display prominently near the top of the World Cup page showing "Finals in 7 days" (today is July 12, finals are July 19, 2026) with dynamic urgency messaging per the component logic in `WorldCupCountdown.tsx`.

**Actual Behavior:**
The countdown widget is completely absent from the live page. WebFetch inspection shows only the HeroBanner and standard content, with no countdown timer or finals urgency messaging visible.

**Impact:**
- Time-sensitive: World Cup finals are in 7 days (July 19)
- Engagement-critical: widget designed to reduce 41.7% bounce rate on WC page
- Regression: just shipped but not working in production
- Traffic spike window: finals week is peak 4-year cycle moment

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup
2. Look for countdown widget near the top (below HeroBanner, above SectionNav)
3. Expected: "Finals in 7 days" or similar urgency messaging
4. Actual: Widget not visible at all

**Possible Root Causes:**
1. Client-side hydration error (component is "use client")
2. Date/timezone logic issue causing premature auto-hide
3. CSS/styling hiding the component (display: none, opacity: 0)
4. JavaScript error preventing component mount
5. Props not passing correctly (currentMatches array)
6. Build/deploy issue (old bundle served, new code not deployed)

## Acceptance Criteria

1. Investigate why WorldCupCountdown component is not rendering:
   - Check browser console for hydration/JS errors on /world-cup page
   - Verify component date logic: today (July 12) should NOT trigger `tournamentEnded` (ends July 20)
   - Confirm `currentMatches` prop is being passed correctly from page
   - Check if component is in the DOM but hidden via CSS
   - Verify production build includes the component (not a deploy issue)

2. Fix the root cause:
   - If date logic issue: fix the tournament end check or timezone handling
   - If hydration error: resolve SSR/client mismatch
   - If CSS issue: fix styling to ensure visibility
   - If props issue: ensure snapshot.matches is passed correctly

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add a Playwright test in `tests/world-cup-countdown.test.mjs`:
     - Visit https://rankings123.com/world-cup (or local dev server)
     - Verify countdown widget is visible in the DOM
     - Check that it shows "Finals in X days" text (where X ≤ 7 on July 12)
     - Verify urgency styling is applied (border-accent, text-accent classes)
   - Test should FAIL with current production (widget not visible)
   - Test should PASS after fix (widget renders correctly)
   - Run via `npm test`

   OR add to `scripts/check-core-features.mjs`:
   - Add countdown widget to core features check (since it's engagement-critical)
   - Verify it renders when tournament is active (before July 20)

4. Verify the fix locally:
   - `npm run build` — succeeds
   - `npm run dev` — visit http://localhost:3000/world-cup
   - Countdown widget visible showing "Finals in 7 days"
   - Dynamic messaging updates correctly
   - Mobile responsive (test at 375px width)
   - `npm test` — regression test passes
   - `npx eslint src --max-warnings=0` — clean

5. Live verification after deploy:
   - Visit https://rankings123.com/world-cup
   - Countdown widget visible and showing correct days count
   - Urgency messaging displays ("Finals in X days")
   - Widget auto-updates (check after 1 minute)
   - Check browser console: no errors
   - `npm run check:core-features` passes (if added to core features)
   - Regression test passes in production

6. Timeline check:
   - Widget should show different states as tournament progresses:
     - July 12: "Finals in 7 days" (normal urgency)
     - July 15-16: "SEMI-FINALS TODAY" (high urgency)
     - July 19: "FINALS TODAY" or "FINALS LIVE NOW" (critical urgency)
     - July 20+: Widget auto-hides (tournament ended)
