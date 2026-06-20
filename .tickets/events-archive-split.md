---
id: events-archive-split
status: open
deps: []
links: []
created: 2026-06-20T23:11:11Z
type: feature
priority: 2
parent: rankings123
tags: [ui, ux, navigation]
---
# Events & Archives: clearly separate past vs upcoming events

The 'Events & archives' section currently mixes past (completed) and upcoming events together, which is confusing. Clearly separate them: e.g. an 'Upcoming / Live' group and a 'Past / Archive' group (or tabs/sections with headers), sorted sensibly (upcoming by soonest start; past by most-recent first). Use the existing event status field (status: 'completed' | 'upcoming') + dates to bucket them. Keep it tokens-themed and consistent with the Apple-Sports look; protect CX (clear, scannable, no clutter).

## Acceptance Criteria

Events & archives renders past and upcoming events in clearly distinct, labelled groups (not intermixed); each correctly bucketed by status/date and sorted sensibly; responsive + tokens-themed (dark+light); build + eslint + check:readability green; live-verified on rankings123.com.
