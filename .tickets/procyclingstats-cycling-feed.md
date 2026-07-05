---
id: procyclingstats-cycling-feed
status: open
deps: []
links: []
created: 2026-06-28T13:48:12Z
type: task
priority: 0
parent: rankings123
tags: [cycling, data-veracity, worldcup-priority]
---
# ProCyclingStats dynamic cycling feed (fix 100% bounce)

**ESCALATED TO P0** - Analytics show 100% bounce rate on cycling event pages. Root cause: STALE DATA. Cycling page shows "Stage 1 in progress" but Stage 1 finished yesterday (Vingegaard won TTT, in yellow). Users see outdated data and leave immediately. This is a DATA VERACITY issue actively hurting the site.

Wire a dynamic feed for Tour de France 2026 live GC standings + stage results. Current source (Wikipedia) is not updating. Need ProCyclingStats, FirstCycling, or letour.fr scraping.

## Acceptance Criteria

✓ Dynamic feed for TdF 2026 GC standings (updates daily as stages complete)
✓ Stage results: winner, time, top-10 finishers per stage
✓ Current stage status: "Stage N in progress" vs "Stage N completed"
✓ Jersey leaders: yellow, green, polka-dot, white (real-time)
✓ Source: ProCyclingStats API/scrape, or FirstCycling, or letour.fr
✓ Mock fallback pattern maintained (never hard-fail)
✓ Source flag: `procyclingstats` | `firstcycling` | `letour` | `mock`
✓ Data freshness: updates within 1 hour of stage finish
✓ ISR: 5 min during race day
✓ Fix verified: cycling event pages show CURRENT data, bounce rate drops below 50%

## Notes

**2026-07-05 - ESCALATED TO P0**

**CRITICAL DATA VERACITY ISSUE:** WebFetch confirms cycling page shows "Stage 1 in progress" and "race begins July 4", but today is July 5 and Stage 1 finished yesterday. Analytics: cycling event pages have 100% bounce (7 events, all 100%). Users click, see stale data, leave.

**ROOT CAUSE:** Wikipedia feed is not updating or parsing is broken. TdF started June 29, but GC shows "Leader will be determined". This violates "never fabricate, never show stale data" principle.

**WHY P0:** This is actively hurting credibility. Every user who visits cycling pages sees WRONG data. TdF is a top-3 traffic opportunity (3.5B TV viewers, massive search volume) but we're showing stale data during the race. Each day with stale data = lost traffic + damaged trust.

**FIRST PRINCIPLES:** Data veracity > feature velocity. Stale data is worse than no data (that's why we have mock fallbacks with source flags). Fix this BEFORE building new cycling features.

**EFFORT:** Medium - need to wire new feed or fix Wikipedia parser. **IMPACT:** CRITICAL - stops bleeding traffic from cycling pages.
