---
id: wc-section-nav
status: closed
deps: []
links: []
created: 2026-06-21T06:17:03Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, ux, navigation]
---
# In-page section navigation (jump links) on the World Cup page

The World Cup page is long (Today's Matches, Full Schedule, Knockout Bracket, Group Standings, Tournament Leaders/stats). Add an in-page navigation — a row of jump links / anchor chips (ideally sticky on scroll) that lets users jump straight to each section. Each section gets an id; clicking a chip smooth-scrolls to it; the active section is highlighted as you scroll (scroll-spy) if cheap to do. Keep it subtle and tokens-themed, mobile-friendly (horizontally scrollable chip row on small screens), and don't push the content/data down much — CX first. Build it as a small reusable component so other long pages (e.g. /atp-live) can adopt it later.

## Acceptance Criteria

1) World Cup page shows a jump-nav (anchor chips) for its major sections; clicking smooth-scrolls to the right section (sections have stable ids). 2) Sticky-on-scroll and/or active-section highlight if low-effort; degrades gracefully. 3) Subtle, tokens-themed (dark+light), mobile horizontally-scrollable, doesn't dominate the layout. 4) Reusable component (not hardcoded one-off). 5) build + eslint + check:readability green; live-verified on rankings123.com.
