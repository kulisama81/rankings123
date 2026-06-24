---
id: player-pages-top-10
status: open
deps: []
links: []
created: 2026-06-24T13:49:57Z
type: feature
priority: 1
parent: player-pages
tags: [tennis, seo, traffic, parity]
---
# Player pages for top 10 ATP/WTA players (SEO long-tail)

Start player-pages with top 10 ATP + top 10 WTA players (20 pages total). Pattern: /atp/player/[id] and /wta/player/[id] with player profile, current ranking, ranking history graph, recent results, head-to-head vs top rivals, stats. Focus on high-search players: Sinner, Alcaraz, Djokovic, Zverev, Medvedev, Rune, Fritz, Ruud, de Minaur, Hurkacz (ATP); Sabalenka, Rybakina, Gauff, Swiatek, Pegula, Zheng, Paolini, Krejcikova, Kasatkina, Navarro (WTA). These capture major SEO traffic ('jannik sinner ranking', 'carlos alcaraz stats', etc.).

## Acceptance Criteria

✓ 20 player pages exist (top 10 ATP + top 10 WTA)
✓ Route: /[tour]/player/[id] or /[tour]/player/[slug]
✓ Player profile: name, country, age, current ranking, points
✓ Ranking history graph (last 52 weeks)
✓ Recent tournament results (last 5-10 events)
✓ Career stats (titles, win-loss, best ranking)
✓ Head-to-head vs top 5 rivals (links to head-to-head page when built)
✓ SEO optimized (player name in title, meta, OG tags)
✓ Mobile responsive, design system
✓ Data from ESPN + existing ranking feeds
✓ Source flag visible

## Notes

**2026-06-24T13:50:06Z**

ROI Justification (First Principles):

FUNDAMENTAL TRUTH: Traffic = indexable pages × real search demand × speed/UX. Player pages are THE #1 SEO lever for tennis sites.

SEARCH DEMAND (massive, year-round):
- 'jannik sinner ranking' - 50K+ searches/month
- 'carlos alcaraz stats' - 40K+ searches/month
- 'aryna sabalenka ranking' - 30K+ searches/month
- Top 20 players combined = 500K+ searches/month
- These are high-intent users (interested in rankings = our core value prop)

CURRENT STATE: We have ZERO player pages. Every search sends users to competitors (ATP.com, ESPN, Sofascore, FlashScore). Analytics show only 1 organic search session out of 66 = SEO is broken.

DIRECT SOLUTION: Start with top 10 ATP + top 10 WTA (20 pages) = captures 80% of player search volume. Build full player-pages after validating pattern.

IMPACT vs EFFORT:
- Impact: VERY HIGH - unlocks SEO long-tail, indexable content, year-round organic traffic (not time-limited like tournaments)
- Effort: MEDIUM - player profile page using existing ESPN data + ranking feeds
- ROI: EXCEPTIONAL - this is the #1 traffic driver for live-tennis.eu and all tennis ranking sites

COMPETITIVE ANALYSIS: EVERY tennis site has player pages (live-tennis.eu, ATP.com, Sofascore, FlashScore). This is table-stakes for Phase 1 parity.

FIRST PRINCIPLES: Why do users search for player pages? To know WHERE a player ranks NOW, their recent form, and trajectory. We have the data - we just need the page!
