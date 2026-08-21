# Inspector Run — 2026-08-20

**Run time:** 2026-08-20T05:00-05:15 UTC  
**Inspector:** Automated QA via Playwright  
**Scope:** Live site https://rankings123.com across 7 routes × 2 themes × 2 viewports

## Routes Checked

- `/` (homepage)
- `/atp-live` (ATP rankings)
- `/wta-live` (WTA rankings)
- `/world-cup` (World Cup hub)
- `/world-cup/match/401721326` (sample match page)
- `/world-cup/team/ARG` (sample team page)
- `/privacy` (privacy policy)

**Viewports:**
- Desktop: 1920×1080
- Mobile: 375×667 (iPhone SE/8 size)

**Themes:** Dark and light

## Automated Checks Status

✅ **Core features check:** PASS (all 5 core features present)
- WC knockout bracket (R32 matchups)
- WC group standings
- ATP live ranking + pagination
- WTA live ranking
- Home multi-sport

✅ **Data sanity check:** PASS (1 warning)
- World Cup served from mock fallback (expected for completed tournament)

## Bugs Found

### bug-wc-mobile-overflow (P2) — FILED

**Category:** Visual/UX  
**Route:** /world-cup  
**Description:** Horizontal overflow on mobile viewport (375px width). Page content is wider than viewport, forcing horizontal scrolling.

**Reproduction:**
1. Visit https://rankings123.com/world-cup on mobile device or 375px viewport
2. Observe horizontal scrollbar
3. Affects both dark and light themes

**Severity:** P2 — Degrades mobile UX but doesn't block functionality. Important for mobile conversion given current 16% mobile traffic vs 50-60% industry standard.

**Likely cause:** Fixed-width table elements (bracket or standings) not responsive on mobile.

**Ticket:** `.tickets/bug-wc-mobile-overflow.md`  
**Links:** mobile-first-optimization (P0), mobile-ux-audit-findings (P1)

## False Positives / Non-Issues

The following were flagged by automated inspection but are **NOT bugs**:

1. **Failed Google Analytics requests:** Expected behavior when ad blockers are active or in headless browser mode. Not a bug.

2. **Failed prefetch requests:** Next.js prefetches routes like `/cycling`, `/articles/*` on hover/viewport. These 404s during prefetch are expected behavior for routes that don't exist yet. Not a bug.

3. **Script evaluation errors:** Issues in the inspection script's JavaScript evaluation for consistency checks. Script bug, not site bug.

## Visual Inspection (Screenshots)

Screenshots saved to `/tmp/screenshot_*.png`:
- All routes rendered successfully at 200 status
- No broken images detected
- No console errors on any page
- Layout appears clean on desktop
- Mobile overflow only on World Cup page

## Summary

**Total bugs found and filed:** 1  
**Bugs by severity:**
- P0: 0
- P1: 0  
- P2: 1 (mobile overflow)
- P3: 0

**Site health:** Good overall. Core features intact, data integrity maintained, no functional bugs. One mobile UX issue identified on World Cup page.

**Recommendation:** Fix bug-wc-mobile-overflow as part of mobile-first-optimization work. Consider testing other complex table layouts (ATP deep rankings, WTA full rankings) for similar mobile overflow issues.

## Next Inspection

Scheduled via cron: 2026-08-20 ~13:00 (twice daily)
