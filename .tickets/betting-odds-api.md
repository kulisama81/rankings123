---
id: betting-odds-api
status: closed
deps: []
links: []
created: 2026-07-24T13:50:33Z
type: feature
priority: 1
parent: rankings123
tags: [revenue, monetization]
---
# Betting Odds API Integration (The Odds API)

Integrate The Odds API (theoddsapi.com) for tennis/soccer match odds. Free tier for eval, paid tier for production. Highest-RPM monetization for sports audience. Display odds + betting affiliate CTAs on match/tournament pages.

## Acceptance Criteria

- Sign up for The Odds API account
- Integrate odds endpoints for tennis (ATP/WTA matches) and soccer
- Build odds display component (3-way: home/draw/away for soccer, 2-way for tennis)
- Show odds from 3+ bookmakers with 'Best odds' highlight
- Affiliate CTA buttons (FanDuel, Bet365) — links only (no fabricated content)
- Only show odds UI when real API data available (hide if API fails)
- Cache odds (refresh every 30min during events)
- Page locations: tournament pages, match preview pages
- Builds green, ESLint clean, CX-first (no placeholder content)

## Notes

**2026-07-24T13:50:38Z**

ROI (First Principles - Revenue): Revenue = traffic × RPM. Sports betting affiliates have 10-50× higher RPM than display ads (industry standard). User need = odds comparison before betting (saves users money → trust). Traffic = odds pages rank well ('us open odds', 'tennis betting odds'). Engagement = odds change frequently → return visits. CX protection = only show when real API connected (no placeholder UI). Effort = Medium (API well-documented, free tier for testing). ROI = VERY HIGH (revenue multiplier, long-term monetization foundation).

## Closed in backlog triage 2026-08-10
dup: odds-api-integration
