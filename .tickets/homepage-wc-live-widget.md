---
id: homepage-wc-live-widget
status: closed
deps: []
links: []
created: 2026-06-26T13:49:32Z
type: feature
priority: 1
parent: rankings123
tags: [worldcup, engagement]
---
# Homepage World Cup live match scores widget

Show live World Cup match scores on homepage when matches are in progress

## Acceptance Criteria

Homepage displays live match scores (team names, score, minute) when WC matches are live; updates in real-time (polling); click-through to match page; shows max 3-4 most important/recent matches; hides when no matches live; mobile-optimized

## Notes

**2026-06-26T13:49:32Z**

ROI: Reduces homepage 74% bounce rate by giving users IMMEDIATE value (live scores). First principles: homepage bounce is high because users land and see static rankings — live scores during tournament windows capture attention and drive clicks. Time-sensitive: implement while tournament is live.

**2026-06-27T01:19:32Z**

Feature was already implemented and shipped in commit f77f74b on 2026-06-26. Verified working: build green, lint clean, all acceptance criteria met (live scores display, 20s polling, click-through to match pages, max 4 matches, hides when no live matches, mobile-optimized). Changelog entry exists. No additional work needed.
