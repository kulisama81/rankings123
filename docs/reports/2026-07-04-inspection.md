# Inspector Report — 2026-07-04

## Summary

Comprehensive QA sweep of live rankings123.com. Automated checks pass cleanly. Manual inspection across 5 main routes found 1 confirmed bug (mobile horizontal scroll on World Cup page).

## Routes Inspected

- `/` (homepage)
- `/atp-live` 
- `/wta-live`
- `/world-cup`
- `/privacy`
- Sample: `/world-cup/match/401635294`, `/world-cup/team/usa`

## Automated Checks

✅ **Core features check** (`npm run check:core-features`): All 5 core features present
- WC knockout bracket (R32 matchups)
- WC group standings
- ATP live ranking + pagination
- WTA live ranking
- Home multi-sport sections

✅ **Data sanity check** (`npm run check:data-sanity`): All per-sport invariants hold

## Bugs Found

### 1. World Cup page: horizontal scroll on mobile viewport — **NEW TICKET: wc-mobile-horizontal-scroll**

**Severity:** P2  
**Type:** Visual/mobile UX regression  
**Route:** https://rankings123.com/world-cup

**Issue:** Page has 31px horizontal overflow on 375px mobile viewport (body.scrollWidth = 406px). Root cause: knockout bracket tree DIV is 842px wide with `min-w-max`, causing page-level horizontal scroll instead of contained scroll.

**Diagnosis:** The bracket container's `inline-flex min-w-max` forces expansion to full content width. On mobile, this breaks the page layout instead of scrolling within its own container.

**Ticket:** Created `wc-mobile-horizontal-scroll` with regression test requirement (mobile viewport check in core-features or dedicated test).

## Issues Already Tracked

- **Match page demo labels** (`wc-match-demo-labels`): Confirmed still present on /world-cup/match/401635294 — match pages show "Demo data" labels. Already has open P1 ticket.

## False Positives / Not Bugs

- **TBD in knockout bracket:** 14 occurrences of "TBD" text detected by placeholder checker, but all are legitimate sports terminology for "To Be Determined" future knockout matches. Not placeholder UI for missing features. ✓ NOT A BUG
- **Google Analytics request failures:** Network errors in headless browser are expected (ERR_ABORTED from GA). Not a production issue.
- **Missing theme toggle detection:** Theme toggle exists but wasn't detected by initial selector. Not a functional issue.

## Clean Routes

- `/atp-live` — functional, data sane, mobile layout OK
- `/wta-live` — functional, data sane, mobile layout OK
- `/privacy` — loads correctly
- `/` — homepage clean except GA network warnings (expected in headless)
- `/world-cup/team/usa` — no mobile scroll, no placeholder labels

## Metrics

- Routes checked: 7
- Bugs filed: 1 (wc-mobile-horizontal-scroll)
- Bugs already tracked: 1 (wc-match-demo-labels)
- False positives: 3 (TBD text, GA failures, theme toggle selector)

## Next Run Focus

- Verify wc-mobile-horizontal-scroll fix once shipped
- Spot-check additional World Cup match pages for demo labels consistency
- Test theme toggle functionality with updated selectors
