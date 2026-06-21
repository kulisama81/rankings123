---
id: wc-full-schedule
status: closed
deps: []
links: []
created: 2026-06-21T06:19:28Z
type: bug
priority: 1
parent: worldcup
tags: [worldcup, data, bug]
---
# World Cup schedule incomplete — fetch full tournament window (missing matches)

The World Cup feed fetched ESPN's default scoreboard, which returns only one matchday (~3 matches), so most fixtures were missing — e.g. Japan vs Tunisia (today in the user's tz) never appeared in Today's Matches/Full Schedule. Fix: query the scoreboard across the full tournament date range so all fixtures/results are present.

## Acceptance Criteria

World Cup feed returns the full schedule (all group + knockout fixtures across the tournament window); Today's Matches and Full Schedule show every match including Japan vs Tunisia; mock-fallback + source flag intact; build/lint/readability green; live-verified.
