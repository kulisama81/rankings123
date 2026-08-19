---
id: player-vs-player-comparison
status: open
deps: []
links: []
created: 2026-08-19T13:51:05Z
type: feature
priority: 1
parent: rankings123
tags: [seo, tennis, h2h]
---
# Player vs Player Comparison Pages — High-Volume Long-Tail SEO

Dynamic player vs player comparison pages targeting 'X vs Y' searches. Example: /compare/jannik-sinner-vs-carlos-alcaraz shows H2H record, current rankings, 2026 form, recent matches, betting odds, US Open prediction. Targets 100+ high-volume comparisons (top 20 × top 20 = 400 combinations, target top 100 pairs).

## Acceptance Criteria

- [ ] Route /compare/[player1-slug]-vs-[player2-slug] with dynamic player name parsing
- [ ] Comparison sections: Current ranking, Live points, 2026 W-L record, Recent form (last 5), H2H all-time record
- [ ] Side-by-side stats table (age, career titles, career high rank, prize money YTD)
- [ ] 'Recent Matches' section (last 3 encounters with score, date, tournament)
- [ ] 'Upcoming/Recent Tournament' context (e.g., 'Both competing at US Open 2026')
- [ ] Betting odds section (if odds available for upcoming match)
- [ ] SEO: Dynamic title '[Player1] vs [Player2] 2026: H2H, Rankings & Stats', optimized meta
- [ ] Schema.org Person + SportsEvent markup
- [ ] Generate sitemap entries for top 100 player pairs (based on ranking × search volume)
- [ ] Internal links from player pages ('Compare with...' section)
- [ ] Mobile-optimized layout
- [ ] Build + deploy, verify 5 comparison pages live (Sinner vs Alcaraz, etc)

## Notes

**2026-08-19T13:51:24Z**

**ROI (First Principles - Capture 'Intent-Rich' Comparison Searches):**

FUNDAMENTAL TRUTH: 'X vs Y' searches = HIGH INTENT users (researching matchups before betting, watching, or following tournaments). These users convert 3-5× higher than generic ranking searches.

SEARCH VOLUME (Conservative, Top Pairs):
- 'Sinner vs Alcaraz': 12K/month
- 'Djokovic vs Alcaraz': 8K/month  
- 'Swiatek vs Sabalenka': 6K/month
- 'Medvedev vs Alcaraz': 4K/month
- Top 20 pairs: 50K+/month combined
- Top 100 pairs: 100K+/month combined

CURRENT STATE: NO comparison pages = competitors (ESPN, ATP, FlashScore) capture 100% of this intent-rich traffic.

WHY INTENT-RICH = HIGH VALUE:
- Betting context: Users comparing players often researching bets (5-8% betting CTR vs 1-2% baseline)
- Tournament timing: Comparison searches spike during events when players might meet
- Session depth: Users click through to both player pages + rankings (3-5 pages/session vs 1.5 baseline)

COMPETITIVE EDGE:
- Dynamic: Auto-updates with live rankings + recent results (vs static ESPN articles)
- Comprehensive: H2H + rankings + form + betting odds in one page
- Long tail: 100+ comparison pages vs competitors' ~10-20 manual articles

EFFORT vs IMPACT:
- Effort: MEDIUM (8-10 hours — dynamic route + H2H data integration + layout)
- Impact: 100K impressions/month → 3K clicks/month → 150-240 betting conversions ($22-36K/year at $150 CPA)
- Scalable: One template = 400 possible pages (top 20 × top 20)

DEPENDS ON: h2h-records-phase1-parity (H2H data source). Can build UI first with mock H2H, wire real data when H2H ticket ships.
