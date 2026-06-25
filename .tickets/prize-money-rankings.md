---
id: prize-money-rankings
status: open
deps: []
links: []
created: 2026-06-25T13:50:30Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, parity, differentiation, engagement]
---
# YTD prize money rankings (ATP/WTA)

Add year-to-date prize money rankings separate from points rankings. Routes: /atp/prize-money and /wta/prize-money. Shows rank by total prize money earned YTD, player name, total USD earned, tournaments played. Live-tennis.eu has this (/atp-ytd-prize-money-ranking). Different from points ranking because prize money varies by tournament tier, draw depth, and doubles earnings. Appeals to finance/business angle, contract/sponsorship news, and "who's making the most money" curiosity.

## Acceptance Criteria

✓ Routes exist: /atp/prize-money and /wta/prize-money
✓ Table shows: rank (by prize money), player name, YTD prize money (USD), tournaments played, avg per tournament
✓ Sortable by prize money (default), name, tournaments played
✓ Prize money data source: ATP/WTA official prize money or ESPN prize money endpoint
✓ Updates as tournaments conclude and prize money is awarded
✓ Mobile responsive, design system
✓ SEO optimized: meta descriptions emphasizing financial angle
✓ Comparison insight: "Rank #1 by points vs rank #1 by money" (often different players)
✓ Test: verify prize money totals match official ATP/WTA career prize money stats

## Notes

**2026-06-25 — ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Not all users care about tennis rankings purely as a sports competition. Many care about the BUSINESS of tennis — "Who's making the most money?" This is a distinct audience: business/finance readers, contract/sponsorship analysts, casual fans interested in wealth.

WHAT IT SERVES:
- Business/finance angle: "Who are the highest-earning tennis players in 2026?"
- Contract news context: When media reports "[Player] signs $10M sponsorship", users want to see how much they're already earning on court
- Curiosity/engagement: Points rankings ≠ money rankings (lower-ranked players who play more tournaments, or win high-paying exhibitions, can out-earn top-10 players who skip events)

COMPETITIVE GAP: live-tennis.eu has this (/atp-ytd-prize-money-ranking). We don't.

SEARCH DEMAND (SEO):
- "highest paid tennis players" - 20K/mo
- "atp prize money rankings" - 3K/mo
- "wta prize money 2026" - 2K/mo

DIFFERENTIATION: Most basic ranking sites ONLY show points rankings. Prize money rankings = we're more comprehensive, business-angle coverage.

IMPACT vs EFFORT:
- Impact: MEDIUM - differentiation (not many sites have this), business/finance audience, media-friendly ("Top 10 Earners in Tennis 2026" headlines)
- Effort: MEDIUM - requires prize money data source (ATP/WTA official or ESPN)
- ROI: GOOD - unique content, low competition in search, appeals to distinct audience segment

DEPENDENCIES: Requires ATP/WTA prize money data (check if ESPN exposes this, or scrape official ATP/WTA career prize money pages).

BLOCKING NONE: Standalone feature.
