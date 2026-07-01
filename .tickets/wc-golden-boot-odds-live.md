---
id: wc-golden-boot-odds-live
status: open
deps: []
links: []
created: 2026-07-01T13:49:56Z
type: feature
priority: 1
parent: rankings123
tags: [worldcup, betting, monetization]
---
# World Cup: Golden Boot live tracker with betting odds dashboard

Build a live Golden Boot leaderboard with current betting odds from affiliate sportsbooks. Golden Boot is the #2 most-bet World Cup market. Live race creates daily engagement. Currently: Messi 6 goals -115, Mbappé 4 goals +250, Haaland 5 goals +1200.

## Acceptance Criteria

✓ Live Golden Boot table on /world-cup/golden-boot with current goals + games played
✓ Betting odds column showing current odds to win (from ≥2 sportsbooks)
✓ Affiliate sportsbook CTAs
✓ Updates every ISR cycle (5 min)
✓ Mobile responsive
✓ Source flag for odds data (api vs mock fallback)
✓ No fabricated odds (hide odds column if source unavailable)
✓ Fast (<500ms LCP)

**Impact:** HIGH — betting content + daily engagement driver
**Effort:** MEDIUM — extend existing golden boot page
**ROI:** VERY HIGH — traffic × high-RPM betting affiliate commissions
**Time-sensitive:** Tournament through July 19 (18 days left)
