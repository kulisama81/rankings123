---
id: wc-player-comparison
status: open
deps: []
links: []
created: 2026-06-25T13:51:35Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, engagement, differentiation]
---
# World Cup player comparison tool: head-to-head stats

Interactive player comparison tool at /world-cup/compare allowing users to select 2 World Cup players and see side-by-side stats: goals, assists, shots, pass accuracy, minutes played, cards. Visual comparison bars showing who's ahead in each category. Shareable comparison URLs (/world-cup/compare/mbappe-vs-haaland). High engagement (3-5 min session time), social sharing potential ("Who's better: Mbappe or Ronaldo?"), and differentiation (most sites only show individual player stats, not comparisons).

## Acceptance Criteria

✓ Route exists: /world-cup/compare with player selection dropdowns
✓ Shareable URLs: /world-cup/compare/[player1-slug]-vs-[player2-slug]
✓ Side-by-side comparison shows:
  - Goals, assists, shots, shots on target
  - Pass accuracy, key passes
  - Minutes played, matches started
  - Cards (yellow/red)
  - Tournament rating/form (if available)
✓ Visual comparison bars (green = ahead, red = behind, gray = tied)
✓ Player photos/headshots in comparison view
✓ "Winner" highlight for overall better performer (based on weighted metrics)
✓ Social share buttons: "Share this comparison" (Twitter, Facebook)
✓ Mobile responsive, design system
✓ SEO optimized: meta tags for "mbappe vs haaland world cup", "player comparison"
✓ Test: verify stats are accurate (match official FIFA/ESPN stats per player)

## Notes

**2026-06-25 — ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Sports fans love debates. "Who's better: X or Y?" is a fundamental question that drives endless discussion, social sharing, and repeat visits. Comparisons are inherently engaging because they settle arguments with data.

WHAT IT SERVES:
- Debate-settling: "Mbappe vs Haaland — who's having a better World Cup?"
- Fantasy/betting: "Which forward should I pick for my fantasy team?"
- Social sharing: Fans share comparison screenshots on Twitter/Instagram to make their case
- Return-driver: Users check back after each match to see how the comparison changes

SEARCH DEMAND:
- "mbappe vs haaland" - 100K+/mo (spikes during tournaments)
- "ronaldo vs messi world cup stats" - 50K+/mo
- "player comparison tool" - 10K/mo

DIFFERENTIATION: Most sites show individual player stats in separate pages. Side-by-side comparison tools are RARE (ESPN has one, but most ranking/stats sites don't). This is a distinctive feature that sets us apart.

ENGAGEMENT: Comparison tools generate HIGH session time (3-5 min) because users explore multiple comparisons, not just one. Social sharing extends reach.

IMPACT vs EFFORT:
- Impact: MEDIUM-HIGH - high engagement (3-5 min sessions), social sharing potential, differentiation
- Effort: MEDIUM - uses existing World Cup player stats data, comparison UI component, shareable URL logic
- ROI: GOOD - high engagement per visit, shareable (viral potential), distinctive feature

DEPENDENCIES: Requires World Cup player stats (we already have this from golden-boot page).

BLOCKING NONE: Standalone feature.
