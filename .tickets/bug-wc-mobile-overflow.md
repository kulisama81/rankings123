---
id: bug-wc-mobile-overflow
status: open
deps: []
links: [mobile-first-optimization, mobile-ux-audit-findings]
created: 2026-08-21T05:08:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, mobile, ui]
---
# World Cup page: horizontal overflow on mobile viewport

The World Cup page (/world-cup) has horizontal scroll overflow on mobile viewport (375px width). Page content is wider than the viewport, forcing horizontal scrolling.

## Acceptance Criteria

1. World Cup page fits within 375px mobile viewport with no horizontal overflow
2. Test in both dark and light themes
3. Verify on real mobile devices (iPhone, Android)
4. Add regression test in tests/mobile-overflow.test.js that:
   - Navigates to /world-cup on 375px viewport
   - Asserts scrollWidth === clientWidth (no overflow)
   - Tests both themes
5. npm test passes
6. Verify on live site post-deploy

## Reproduction Steps

1. Visit https://rankings123.com/world-cup
2. Resize viewport to mobile width (375px × 667px) or view on mobile device
3. Observe horizontal scrollbar / ability to scroll horizontally
4. Occurs in both dark and light themes

## Expected Behavior

Page should fit within mobile viewport width with no horizontal overflow or scrolling.

## Actual Behavior

Content scrollWidth > clientWidth on mobile viewport, creating horizontal scroll.

## Severity Rationale

P2 — Visual/UX bug affecting mobile experience. Not blocking core functionality but degrades mobile UX. Important given that mobile traffic should be 50-60% of total traffic (currently only 16% per mobile-first-optimization ticket).

## Likely Cause

Fixed-width elements (likely knockout bracket table or group standings table) not responsive on mobile, or missing mobile-specific max-width/overflow CSS.

## Tested On

- Viewport: 375px × 667px (iPhone SE/8 size)
- Themes: Both dark and light
- Browser: Chromium headless via Playwright
- Inspection run: 2026-08-20

## Related Tickets

Links to mobile-first-optimization (P0) and mobile-ux-audit-findings (P1).
