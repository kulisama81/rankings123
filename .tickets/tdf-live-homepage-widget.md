---
id: tdf-live-homepage-widget
status: open
deps: []
links: []
created: 2026-07-06T13:48:24Z
type: feature
priority: 0
parent: rankings123
tags: [tdf, worldcup, engagement, urgent]
---
# Tour de France live GC widget on homepage

Add a live Tour de France GC standings widget to the homepage hero. Shows top 5 GC leaders with time gaps, updates every 5min. URGENT: TdF Stage 3+ happening NOW, race through July 26. Reduces 69.5% homepage bounce by showing what's live. RevShare: More homepage engagement = more pageviews = more ad revenue when AdSense is live.

## Acceptance Criteria

Live TdF widget on homepage showing top 5 GC + yellow jersey. Updates every 5min via ISR. Links to /cycling. Mobile responsive. Ships by July 7 (Stage 3). Verified: homepage bounce rate measured before/after.

## Notes

**2026-07-06T13:49:34Z**

**ROI ANALYSIS (First Principles):**

Homepage bounce rate = 69.5% (70 views, 48 bounces). World Cup page = 40% bounce (58 views). Difference? World Cup page shows LIVE data. Homepage is static navigation.

Revenue impact chain:
1. Homepage bounce 69.5% → 30.5% explore → ~21 users see ATP/WTA/WC pages
2. If homepage bounce drops to 40% (WC-level): 70 views → 60% explore → 42 users
3. **2× internal pageviews from homepage traffic**

With AdSense (once approved):
- 2× pageviews = 2× ad impressions = 2× revenue from same traffic
- At $5 RPM (conservative): 70 homepage visits → 42 internal pages × $0.005 = $0.21/day
- Scales linearly with traffic: 1K homepage visits/day = $30/day = $900/month

Time-sensitive multiplier:
- TdF runs through July 26 (20 days left)
- Search volume for 'tour de france standings' spikes 10× during race
- Capturing TdF traffic NOW with live widget = higher baseline traffic for rest of site

**Effort: LOW** (component + data exists)
**Impact: VERY HIGH** (2× homepage conversion + TdF traffic capture)
**DEADLINE: July 7** (Stage 3, maximize remaining 19 days of TdF)
