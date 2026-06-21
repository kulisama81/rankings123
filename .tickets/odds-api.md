---
id: odds-api
status: open
deps: []
links: []
created: 2026-06-15T06:00:06Z
type: feature
priority: 1
parent: rankings123
tags: [data, revenue, engagement]
---
# Integrate The Odds API (odds data for predictions + affiliates)

Wire The Odds API (the-odds-api.com, free tier) for match odds / win-probabilities for tennis (ATP/WTA) + World Cup fixtures. Feeds wc-odds + tennis-odds prediction features and the betting-affiliate slots. Key via env (THE_ODDS_API_KEY), cached/revalidated, graceful fallback. HANDOFF: Loic creates a free The Odds API account + provides the key.

## Acceptance Criteria

Odds for upcoming/live matches fetched from The Odds API where available + cached; consumed by prediction/affiliate features; key via env, never committed; graceful placeholder until keyed.

## Wiring note (key being added now)
The user is setting `ODDS_API_KEY` in Vercel env vars. Build the integration to read
`process.env.ODDS_API_KEY`: `getOddsSource()` returns "api" when the key is present (else
"mock"); `getMatchOdds()` calls The Odds API (the-odds-api.com v4) for the relevant
sport/region, caches via `revalidate` (free tier = 500 req/mo, so cache aggressively),
maps to `WorldCupMatchOdds`/tennis odds, and degrades to no-odds on failure (never fabricate).
This automatically un-gates the predictions UI (already built, gated on `oddsSource === "api"`).
Also covers tennis-odds + feeds the betting-affiliate context.
