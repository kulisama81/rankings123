---
id: rankings-country-filter
status: closed
deps: []
links: []
created: 2026-06-22T13:30:00Z
type: feature
priority: 2
parent: tennis-site
tags: [tennis, usability]
---
# Country/nationality filter on ATP/WTA ranking tables

Client-side filter to view rankings by country (e.g., show only USA players, only Spain players). live-tennis.eu has this as a basic usability feature for navigating 1000+ player lists.

## Acceptance Criteria

1. ATP/WTA ranking tables include country filter dropdown (or search)
2. Filter shows unique countries from current ranking data
3. Selecting a country filters table to show only players from that country
4. Filter state persists during session (URL param or local storage)
5. "Clear filter" returns to full rankings
6. Mobile-friendly filter UI
7. Build/lint/tests green
8. Live-verified on rankings123.com

## First-principles ROI

- **User need**: Fans want to track their country's players without scanning 1000+ rows
- **Effort**: Low (client-side filtering, no API changes)
- **Impact**: High usability win, especially for deep rankings (ATP 1000+, WTA 1500+)
- **Competitor parity**: live-tennis.eu has nationality filter
