---
id: wc-r16-betting-previews
status: open
deps: []
links: []
created: 2026-07-01T13:50:00Z
type: feature
priority: 0
parent: rankings123
tags: [worldcup, betting, monetization, urgent]
---
# World Cup: Round of 16 match betting previews (July 4-8)

Create match-by-match betting preview pages for all Round of 16 matches (July 4-8). TIME-SENSITIVE p0: R16 starts July 4 (IN 3 DAYS). Search traffic spikes 24-48hrs before each match. Betting affiliate revenue peaks during knockout stage. RevShare model = 40-60% lifetime commission per converted bettor.

## Acceptance Criteria

✓ R16 hub page with all 8 matches listed at /world-cup/betting/round-of-16
✓ Individual match preview pages (template-driven) at /world-cup/betting/match/[matchId]
✓ Betting odds from ≥2 sportsbooks (affiliate links)
✓ Form analysis (group stage stats)
✓ Best bet picks with reasoning
✓ Mobile responsive
✓ Ships by July 3 EOD (before first R16 match July 4)
✓ No fabricated odds (only real affiliate data)
✓ SEO: metadata, OpenGraph for social sharing

**Impact:** VERY HIGH — time-sensitive revenue opportunity
**Effort:** MEDIUM — template + content generation  
**ROI:** CRITICAL — betting content during peak tournament engagement
**DEADLINE:** MUST ship by July 3

## Notes

**2026-07-01T13:54:50Z**

TIME-SENSITIVE ANALYSIS:

Search traffic pattern for betting content:
- Spikes 24-48hrs BEFORE match kickoff (not during/after)
- R16 first match: July 4
- MUST SHIP: July 3 EOD to capture search traffic peak

Why R16 is highest ROI betting window (after groups):
- Knockout stage = higher stakes = higher bet volume
- 8 high-profile matches (vs 48 group matches with many low-interest games)
- RevShare model: One converted bettor = 40-60% lifetime commission (recurring monthly revenue, not one-time)

Revenue model comparison:
- Display ads: 1 pageview = 0.002-0.008 USD (one-time)
- Betting affiliate: 1 converted bettor = 50-500 USD lifetime value (40-60% of their betting losses, recurring)
- Conversion rate: Even 1% conversion on 1000 pageviews = 10 bettors = 500-5000 USD LTV

Template value:
- Build once for R16, reuse for QF/SF/Final
- Each tournament round = fresh content with same template
- Compounds: Better template = better conversion = higher LTV per event

Dependency: BLOCKED until betting-affiliate-kickstart (p0) is complete (1-2 week approval). Content can be drafted but should NOT ship with placeholder/coming soon affiliate links (CX-first rule).
