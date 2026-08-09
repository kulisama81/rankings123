---
id: tournament-draw-bracket
status: open
deps: []
links: []
created: 2026-08-09T13:49:56Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# Tournament draw/bracket view — engagement + SEO multiplier

Build interactive tournament draw/bracket pages for active tournaments (Grand Slams, Masters 1000, WTA 1000). FlashScore shows live brackets with clickable matches, score updates, and bracket progression. This is a HIGH-ENGAGEMENT feature — users follow tournament brackets during events, checking multiple times per day. Also SEO gold: 'Wimbledon 2026 draw', 'US Open bracket' are high-volume search queries during tournaments.

## Acceptance Criteria

- Dynamic route /tournament/[slug]/draw or /[tournament-name]/bracket renders interactive bracket
- Shows full draw from R128/R64 down to finals with player names, seeds, scores
- Live score updates from ESPN scoreboard API (poll every 60s during active matches)
- Clickable matches → match detail modal or page
- Mobile-responsive bracket (horizontal scroll or collapsible rounds)
- SEO-optimized meta tags (title: 'Wimbledon 2026 Draw | Live Bracket', description with key matchups)
- Structured data (SportsEvent schema) for rich results
- Data sources: ESPN tournament draw endpoint or scrape from ATP/WTA official sites
- Mock fallback for past/unavailable tournaments (historical bracket from last known data)
- npm run build green, eslint clean, Core Web Vitals pass (LCP < 2.5s even with complex bracket SVG)

## Notes

**2026-08-09T13:50:15Z**

ROI JUSTIFICATION (First Principles):

ENGAGEMENT ASYMMETRY: Rankings = check once/week (updated Mondays). Tournament brackets = check 5-20× during 2-week event (see who's playing next, check scores, follow favorites). ONE tournament bracket page generates 10-50× more pageviews than one ranking page.

SEO MULTIPLIER: 'Wimbledon 2026 draw' = 50K+ searches during tournament (2 weeks). 'US Open bracket' = 100K+ searches. ONE well-ranking bracket page = months worth of baseline ranking traffic compressed into 2 weeks. This is ASYMMETRIC LEVERAGE.

REVENUE CATALYST: Betting affiliates earn MOST revenue during tournaments (live bets, match predictions). Bracket pages = natural affiliate placement (odds on upcoming matches, 'bet on this match' CTAs).

DIFFERENTIATION: Live-tennis.eu focuses on RANKINGS. We can own TOURNAMENT COVERAGE (brackets, draws, match-by-match) as our differentiation angle.

EFFORT: HIGH (10-15 hours) — complex UI (bracket tree), live score integration, responsive design challenges, SEO setup.

IMPACT: VERY HIGH — 10-50× engagement vs rankings, SEO traffic multiplier during tournaments, natural betting affiliate placement.

ROI: 10/10 — proven traffic + engagement driver, revenue enabler (betting affiliates), high search volume.

COMPETITORS WITH THIS:
- FlashScore ✅ (interactive brackets with live scores)
- SofaScore ✅ (tournament draws)
- ESPN ✅ (official brackets)
- Live-tennis.eu ❌ (DIFFERENTIATION OPPORTUNITY — they focus on rankings only)

TIMELY OPPORTUNITY:
- US Open 2026: Aug 30 - Sep 13 (22 days away) — if we ship this by Aug 25, we capture peak search traffic
- Cincinnati Open: Aug 11-23 (3 days away) — too tight for this ticket, but US Open is realistic
