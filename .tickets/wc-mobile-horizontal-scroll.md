---
id: wc-mobile-horizontal-scroll
status: open
deps: []
links: []
created: 2026-07-04T18:06:28Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, mobile, ui]
---
# World Cup page: horizontal scroll on mobile viewport (bracket overflow)

**URL:** https://rankings123.com/world-cup

**Repro steps:**
1. Open https://rankings123.com/world-cup on mobile viewport (375px width, e.g. iPhone SE)
2. Observe that the entire page scrolls horizontally

**Expected:**
- Page body should fit within the 375px mobile viewport
- If the knockout bracket needs to be wide, it should scroll within its own container, not cause page-level horizontal scroll
- Per wc-bracket-visual acceptance criteria: "never a broken/overflowing layout"

**Actual:**
- Page body.scrollWidth = 406px (31px overflow beyond 375px viewport)
- Root cause: Knockout bracket DIV with `inline-flex min-w-max` is 842px wide, forcing page-level horizontal scroll
- The bracket tree renders correctly on desktop but breaks mobile layout

**Severity:** P2 - Visual/mobile UX regression. The page is functional but the horizontal scroll creates a poor mobile experience and violates the responsive design requirement.

**Diagnosis:**
The bracket container uses `min-w-max` which forces it to expand to content width (842px for the full bracket tree). On mobile, this should either:
1. Be horizontally scrollable within a max-width container (overflow-x-auto on the bracket, not body)
2. Use a stacked/collapsible mobile layout
3. Scale down the bracket proportionally

The first option (contained scroll) is likely the quickest fix and matches the original ticket's "horizontal scroll" fallback option.

## Acceptance Criteria

- [ ] World Cup page has no page-level horizontal scroll on 375px mobile viewport (body.scrollWidth <= window.innerWidth)
- [ ] Knockout bracket is fully accessible on mobile via either: contained horizontal scroll within bracket container, OR responsive stacked layout
- [ ] Regression test added: new check in `scripts/check-core-features.mjs` or a dedicated mobile layout test that fails if body.scrollWidth > viewport width on /world-cup at 375px
- [ ] Tested on real mobile device (iOS Safari or Android Chrome) - no page bounce/scroll
- [ ] npm run build + eslint clean
- [ ] Live-verified on rankings123.com/world-cup on mobile
