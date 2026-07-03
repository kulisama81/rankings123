---
id: homepage-live-race-hero
status: open
deps: []
links: []
created: 2026-07-03T13:54:32Z
type: feature
priority: 1
parent: rankings123
tags: [worldcup, engagement]
---
# Homepage: Live race hero widget (reduce 67.9% bounce)

Add above-the-fold live race widget showing the most compelling race happening now (ATP #1 battle during Slams, Golden Boot during World Cup, GC during TdF). Research shows 'live stakes' content drives 6-10× better engagement than static cards.

FIRST PRINCIPLES: Sports fans arrive with 'what's happening NOW?' — answer it instantly above fold. Golden Boot page (274.8s session) proves the pattern works; homepage (25.3s) proves we're not doing it.

Implementation:
- Top 3-5 players/leaders from active race
- Rank movement arrows, live points/goals, stakes ('X pts behind')
- Updates every 20s (like LiveWorldCupWidget pattern)
- Auto-select most compelling race: ATP #1 during Slams > Golden Boot during WC > GC during TdF

Data sources: liveFeed.ts (ATP/WTA), worldCupFeed.ts (Golden Boot), cyclingFeed.ts (GC)

## Acceptance Criteria

- Live race widget renders above fold on homepage
- Shows top 3-5 leaders with current points/goals
- Displays rank movement arrows and gap to leader
- Auto-updates every 20s
- Click-through to full leaderboard page
- Falls back gracefully when no major race active
- Verified in dark + light themes
- Homepage bounce rate measured before/after (target: 67.9% → ~45%)

## Notes

**2026-07-03T13:55:36Z**

ROI JUSTIFICATION (First Principles):

Revenue = Traffic × RPM × Session Depth × Conversion

Homepage currently: 67.9% bounce, 25.3s avg session = minimal engagement
Golden Boot page: 20% bounce, 274.8s avg session = 10× better

WHY? Golden Boot shows LIVE RACE with stakes. Homepage shows static cards.

Impact of live race hero:
1. REDUCES BOUNCE: Target 67.9% → ~45% (sports avg) = 34% more engaged sessions
2. INCREASES SESSION: Target 25.3s → 90-120s (4× improvement) = deeper ad exposure
3. DRIVES RETENTION: Daily stakes changes create check-in behavior (like Golden Boot)

Estimated impact:
- +34% engaged sessions × 4× session depth = ~5× homepage value
- Compounds: better bounce/session = better SEO ranking = more organic traffic
- Zero API cost (data already fetched)

This is THE highest-leverage homepage improvement.
