---
id: wc-matches-layout
status: closed
deps: []
links: []
created: 2026-06-21T06:24:52Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, ux, layout]
---
# World Cup page layout: today's matches prominent, standings up, schedule behind tabs

Now that the full schedule (100 matches) is fetched, the long fixture list buries the group standings. Restructure the World Cup page like ESPN/major sports sites: keep TODAY'S matches prominent at the top, move Group Standings up so they're a hero (not below the match wall), and tuck PAST + UPCOMING matches behind a standard mechanism (Results / Upcoming tabs) so they're hidden from the main view but one click away. CX first: clean, tokens-themed, mobile-friendly.

## Acceptance Criteria

Today's matches stay prominent; group standings appear high (not buried under the schedule); past + upcoming matches are behind a standard tab/collapse control (default to upcoming), accessible in one click; tokens-themed dark+light; build/lint/readability green; live-verified.
