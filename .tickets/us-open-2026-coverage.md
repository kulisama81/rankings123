---
id: us-open-2026-coverage
status: open
deps: []
links: []
created: 2026-08-10T14:00:00Z
type: feature
priority: 0
parent: rankings123
tags: [tennis, timely, seo, revenue]
---
# US Open 2026 comprehensive coverage (Aug 25-Sep 13) — URGENT SEO WINDOW

US Open is THE biggest tennis event in North America. Draw Aug 27, main draw Aug 30 - Sep 13. Search volume spike expected 100K+ for "US Open draw", "US Open bracket", "US Open live scores".

## Acceptance Criteria

1. **US Open landing page:** `/us-open-2026` with draws, schedule, live scores, seeding
2. **Men's singles draw/bracket:** 128 players, interactive, round-by-round progression
3. **Women's singles draw/bracket:** 128 players, interactive, round-by-round progression
4. **Live score integration:** ESPN scoreboard API for in-progress matches
5. **Points implications:** Show ATP/WTA ranking impact for each round (R128 → Final points)
6. **SEO optimization:** Title "US Open 2026 Draw, Live Scores & Results | Rankings123", meta description optimized for "US Open 2026 draw" keyword
7. **Ship by Aug 27** (draw day) for SEO window — MUST rank before Aug 30 main draw start

## FIRST-PRINCIPLES ROI

**SEO asymmetry:** US Open = 100K+ searches over 2 weeks vs 5K/month baseline for "tennis rankings". ONE tournament = 20× an entire month of baseline ranking searches, compressed into 2 weeks.

**Engagement asymmetry:** Rankings = check once/week. Tournament bracket = check 5-20× during 2-week event = 10-40× engagement vs rankings.

**Revenue catalyst:** Betting affiliates earn MOST during tournaments. Peak conversion 5-8% vs 1-2% baseline. Tournament windows = revenue multiplier.

**SEO window:** Publish by Aug 27 (draw day) to rank for Aug 30+ searches. Publish Sep 1 = too late, won't rank.

## Data Sources

- ESPN tennis scoreboard API (existing integration)
- ATP/WTA ranking data (existing)
- Draw data: ESPN `/sports/tennis/usopen/` tournament API
- Mock fallback: static 128-player bracket template with TBD placeholders until draw announced

## Impact Estimate

- **Traffic:** 100K+ searches over 2 weeks = 20× entire month of baseline
- **Revenue:** Peak betting affiliate conversion (US Open = betting peak)
- **Brand:** Establish rankings123 as Grand Slam destination (opens path to Australian Open, French, Wimbledon)

**Timeline:** URGENT — 17 days until Aug 27 draw, must build and rank before main draw Aug 30

## Notes

**2026-08-21T15:00:00Z Planner SEO Lane**

Attempted implementation but failed independent verification after 2 rounds. Core issue: AC #2 and #3 require "interactive 128-player bracket with round-by-round progression" but:
1. Draw data doesn't exist until Aug 27  
2. Ticket suggests "mock fallback with TBD placeholders" which violates CX-first rule ("never ship placeholder/coming soon/empty UI")
3. Separate p0 tickets exist for same functionality (us-open-2026-draw-bracket, us-open-draw-live-page)

**Scope conflict:** This ticket's AC requires full bracket implementation, but separate dedicated bracket tickets exist targeting identical routes and functionality. Needs backlog consolidation.

**Recommendation:** Split into:
1. US Open tournament info page (schedule, seeding, points, format) — achievable now without violating CX-first
2. Interactive bracket component (when draw data available Aug 27+) — separate ticket with ESPN draw API integration

Reverted changes per planner protocol (>2 failed verifications → revert, document, move on). Moving to next buildable SEO ticket.
