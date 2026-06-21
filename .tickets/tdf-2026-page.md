---
id: tdf-2026-page
status: open
deps: [cycling-dynamic-feed]
links: []
created: 2026-06-21T07:55:36Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, worldcup-priority, traffic, parity]
---
# Tour de France 2026 event page (live GC standings + stage results)

Create /events/tdf-2026 dedicated event page for Tour de France 2026 (June 27 - July 19). Real-time GC standings, stage results, stage winner highlights. TdF is one of the world's biggest sporting events (millions of daily searches during the race). Depends on: cycling-dynamic-feed. Similar pattern to World Cup group/knockout pages but for cycling stage race. Show: general classification table (rank, rider, team, time/gap), stage-by-stage results, current stage info, yellow/green/polka-dot jersey leaders.

## Acceptance Criteria

✓ /events/tdf-2026 route exists
✓ General classification table: rank, rider, team, time, gap to leader
✓ Jersey leaders shown: yellow (GC), green (points), polka-dot (mountains), white (young rider)
✓ Stage-by-stage results (stage number, winner, distance, type)
✓ Current/upcoming stage info during race (June 27-July 19)
✓ Updates daily with new stage results (via cycling feed)
✓ Pre-race: shows startlist/favorites
✓ Post-race: shows final podium/winners
✓ SEO optimized (title, meta, OG tags for 'tour de france 2026 standings')
✓ Mobile responsive, design system
✓ Source flag visible

## Notes

**2026-06-21T07:55:52Z**

**ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Traffic = real search demand × timing. Tour de France is THE biggest cycling event globally (3.5B cumulative TV viewers, millions of daily Google searches during the race).

TIMING IS EVERYTHING: TdF 2026 starts in 6 DAYS (June 27). This is a massive, time-limited traffic opportunity - if we ship this BEFORE the race starts, we capture the entire 3-week search wave. Ship AFTER and we've missed it.

SEARCH DEMAND (peak during race):
- 'tour de france standings' - 500K+ searches/day during race
- 'tour de france results today' - 300K+ searches/day
- 'tour de france general classification' - 200K+ searches/day
- Total = millions of searches over 3 weeks (June 27 - July 19)

IMPACT vs EFFORT:
- Impact: VERY HIGH - captures massive TdF search traffic, establishes cycling authority, high-engagement (users return daily for updated standings)
- Effort: MEDIUM - follows event page pattern (World Cup groups/knockout), needs cycling-dynamic-feed
- ROI: EXCEPTIONAL - but ONLY if shipped before June 27! Every day we delay = lost traffic

COMPETITIVE ANALYSIS: EVERY major sports site has dedicated TdF standings page (ESPN, BBC Sport, FlashScore, Eurosport, CyclingNews). This is table-stakes for credibility as a cycling rankings site.

ACTION: Tag as worldcup-priority tier (high-ROI, time-sensitive). Should be built IMMEDIATELY after cycling-dynamic-feed is wired.
