---
id: live-rankings-next-max-points
status: open
deps: []
links: []
created: 2026-08-19T13:51:41Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity, atp, wta]
---
# Live Rankings Enhancement: Next Points & Max Points Columns — Phase 1 Parity

Add 'Next Points' (projected points next Monday) and 'Max Points' (if player wins current tournament) columns to ATP/WTA live rankings tables. Competitor feature (Perfect-tennis.com, LiveTennis) that shows ranking projection scenarios. Enhances live rankings from 'what is' to 'what could be' — key differentiator during tournament weeks.

## Acceptance Criteria

- [ ] Add 'Next Points' column to ATP Live table: Official points + current tournament points (even if eliminated)
- [ ] Add 'Max Points' column to ATP Live table: Official points + maximum possible points if win current tournament
- [ ] Add 'Projected Rank' column (optional): Where player would rank with Max Points
- [ ] Same columns for WTA Live table
- [ ] Calculation logic: Max Points = Official + (Tournament tier max - Current round points + Remaining rounds max)
- [ ] Show '—' for players not in tournaments
- [ ] Column headers with tooltips: 'Next Points (Mon)', 'Max Points (if win)'
- [ ] Mobile: Hide these columns by default, show in expandable row or horizontal scroll
- [ ] Desktop: Show all columns (Current Rank, Live Rank, Player, Live Pts, Official Pts, Δ, Next Pts, Max Pts, Tournament)
- [ ] Update liveFeed logic in src/lib/liveFeed.ts and atpDeepFeed.ts
- [ ] Verify calculations match tournament tier points tables
- [ ] Test with live data during Cincinnati Open (in progress now)

## Notes

**2026-08-19T13:51:57Z**

**ROI (First Principles - Turn Rankings Into Scenarios, Not Just Snapshots):**

FUNDAMENTAL TRUTH: Live rankings appeal is 'what if' speculation during tournaments ('can Alcaraz overtake Sinner if he wins Cincinnati?'). Current table shows 'what is' — competitors show 'what could be' (projection scenarios).

COMPETITIVE GAP (Phase 1 Parity):
- Perfect-tennis.com: Shows Next Points, Max Points, Projected Rank
- LiveTennis: Shows 4-week projection
- Rankings123: Only shows current Live Points (static)
- GAP: We show 'live now', competitors show 'live + future scenarios'

USER VALUE (Why This Matters):
- Engagement: 'What if' scenarios = reason to return daily during tournaments (retention)
- Discussion: Twitter/Reddit tennis fans debate projections ('Alcaraz can reach #1 if...') — our data becomes shareable
- Completeness: Without projections, we're 'live' but not 'predictive' (parity gap)

EFFORT vs IMPACT:
- Effort: MEDIUM (6-8 hours — calculation logic + 2 new columns + mobile layout)
- Impact: Closes Phase 1 parity gap + differentiation potential (most accurate projections via exact draw points)
- Engagement lift: 15-25% (users check daily to see 'max points' change as tournaments progress)

TIMING: Cincinnati Open happening NOW (ends Aug 23), US Open starts Aug 30. Build during Cincinnati, launch before US Open = 2 weeks of high-engagement testing.

This is PARITY (not optional) — competitors have this, so must we to be credible. But also DIFFERENTIATION potential if we add 'Projected Rank' column (they don't show rank impact, just points).
