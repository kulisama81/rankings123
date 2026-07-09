---
id: wc-qf-live-tracker
title: World Cup QF live match tracker with momentum indicators
status: open
deps: []
links: []
created: 2026-07-09T13:48:00Z
type: feature
priority: 0
parent: rankings123
tags: [worldcup, live, engagement]
---

# World Cup QF live match tracker with momentum indicators

**TIME-SENSITIVE**: Quarterfinals start TODAY (July 9, 4pm ET). Build an engaging live match tracker that goes beyond basic score updates.

## The Opportunity
QF matches are peak engagement window (semifinals July 14-15, final July 19). Users search for:
- Live scores (commodity — everyone has this)
- **Match momentum** (differentiator — who's dominating RIGHT NOW)
- **Key events timeline** (goals, cards, subs — scannability)
- **What's at stake** (winner plays X in semifinal)

## Solution: Live Match Tracker with Momentum

### Core Features
1. **Live Score + Clock** (ESPN API already provides this)
2. **Momentum Indicator** (visual): possession %, shots on target, dangerous attacks
3. **Key Events Timeline**: goals, yellow/red cards, substitutions (reverse chrono)
4. **Match Impact**: "Winner faces [team] in SF on July 14"
5. **Betting Context**: pre-match odds + live odds (if available from ESPN)

### Visual Design
```
┌─────────────────────────────────────────┐
│ QUARTERFINAL • LIVE 67'                 │
│ France 🇫🇷 2 - 1 🇲🇦 Morocco             │
│                                         │
│ Momentum: [████████░░] 80% France       │
│ Possession: 64% - 36% | Shots: 15-7    │
│                                         │
│ 🟢 67' GOAL - Mbappé (France)          │
│ 🟡 52' Yellow card - Ziyech (Morocco)  │
│ 🟢 34' GOAL - En-Nesyri (Morocco)      │
│ 🟢 12' GOAL - Griezmann (France)       │
│                                         │
│ Winner plays Spain/Belgium in SF       │
└─────────────────────────────────────────┘
```

### Data Source
ESPN `/soccer/fifa.world/scoreboard` provides:
- Live score, clock, match status
- Events timeline (goals, cards, subs)
- Team stats (possession, shots, fouls)

## First Principles Reasoning
- **Root need**: "What's happening RIGHT NOW and who's winning?"
- **Engagement truth**: Live = users refresh constantly = session depth spike
- **Differentiation**: Momentum visual + "what's at stake" context vs basic scoreboards
- **Monetization**: Live match pages = prime betting affiliate placement (user intent = HIGH)

## Success Metrics
- Session duration on QF match pages >3 min (vs 65s baseline)
- Pageviews spike during live matches (track QF match URLs)
- Low bounce rate on match pages during live action

## Acceptance Criteria
- [ ] Live score + clock updates every 30-60s (ESPN API)
- [ ] Momentum indicator based on possession + shots
- [ ] Key events timeline (goals, cards, subs) reverse chronological
- [ ] Match impact context ("Winner faces X in SF")
- [ ] Works for all 4 QF matches (July 9-11)
- [ ] Mobile-optimized (38% of traffic)
- [ ] Graceful degradation if ESPN API fails (show static bracket)

## ROI Justification
**Impact**: HIGH — QF is peak 11-day tournament window; live content = highest engagement  
**Effort**: MEDIUM — ESPN API already integrated, need momentum calc + event timeline UI  
**ROI**: VERY HIGH — Time-sensitive (starts TODAY), drives betting affiliate opportunity
