---
id: tennis-h2h-stats
status: closed
deps: []
links: []
created: 2026-07-11T13:50:37Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity, data]
---
# Tennis head-to-head stats integration

Head-to-head stats for tennis - competitor parity gap

## Acceptance Criteria

H2H data integrated from Ultimate Tennis Statistics or SteveG Tennis API (free tier), accessible from player pages or dedicated /h2h/[player-a]/[player-b] routes, shows overall record + surface breakdown + last 5 meetings, server-rendered for SEO

## Notes

**2026-07-11T13:50:41Z**

## Parity Gap + Differentiation

**Competitor parity:** live-tennis.eu, MatchStat, Tennis Temple all have H2H. We don't.

**Data sources researched:** 
- Ultimate Tennis Statistics (free, has H2H section)
- SteveG Tennis API (free tier available)
- Can scrape UTS if no API

**User need:** "Djokovic vs Alcaraz head to head" = common search during tournaments.

**First Principles:** H2H = context for upcoming matches. Fans want historical record before watching.
**Effort:** MEDIUM (API integration or scraping + UI)
**Impact:** MEDIUM-HIGH (parity + engagement)
**ROI:** HIGH

## Closed in backlog triage 2026-08-10
dup: tennis-h2h-tool
