---
id: tennis-major-tournament-pages
status: open
deps: []
links: []
created: 2026-06-22T13:30:00Z
type: feature
priority: 2
parent: tennis-site
tags: [tennis, seo]
---
# Major tennis tournament pages (Grand Slams + Masters 1000)

Dedicated pages for major tournaments: /australian-open, /wimbledon, /us-open, /french-open, plus ATP Masters 1000 events. Each page shows current/recent draws, results, points available. SEO long-tail: "Wimbledon 2026 draw", "US Open 2026 results", etc.

## First-principles ROI
- **SEO**: Huge search volume during/after Grand Slams ("Wimbledon 2026", "US Open draw")
- **Traffic driver**: Tournament pages = indexable SEO targets + internal linking hubs
- **User need**: Fans want tournament-specific views, not just overall rankings
- **Effort**: Medium (need tournament-aware data layer, templated pages)
- **Engagement**: Higher pages/session (rankings → tournament page → player page)

## Acceptance Criteria

1. Tournament pages exist for:
   - Grand Slams: Australian Open, French Open, Wimbledon, US Open
   - ATP Masters 1000: Indian Wells, Miami, Monte Carlo, Madrid, Rome, Canada, Cincinnati, Shanghai, Paris
   - (Start with Grand Slams, Masters can be follow-up)
2. Each page shows:
   - Tournament name, dates, surface, prize money
   - Current or most recent draw/bracket (if available from ESPN/UTS)
   - Recent results or ongoing matches
   - Points available (per round: winner, finalist, SF, QF, etc.)
3. Pages link to player pages when available
4. Included in sitemap with priority 0.8
5. Schema.org SportsEvent markup
6. Per-tournament accent theming (e.g., Wimbledon purple/green, US Open blue)
7. Graceful degradation if tournament data unavailable (show static info)
8. Build/lint/tests green
9. Live-verified: at least /wimbledon and /us-open return 200
