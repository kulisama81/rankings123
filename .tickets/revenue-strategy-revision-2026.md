---
id: revenue-strategy-revision-2026
status: open
deps: []
links: [display-network-path]
created: 2026-07-30T06:00:00Z
type: task
priority: 2
parent: rankings123
tags: [revenue, documentation, strategy]
---
# Revenue strategy doc update: Ezoic path obsolete, betting-first approach

Update `docs/DESIGN.md` §5 (Monetization & measurement) to reflect 2026 market reality: Ezoic requires 250K users (no longer viable for new sites), and betting affiliates deliver 10-50x AdSense RPM for sports traffic.

## What Changed in 2026

**Ezoic policy shift (Feb 2026):**
- Old: "No minimum traffic" (grandfathered sites only)
- New: **250,000 monthly users required** for new sites
- Impact: The "AdSense → Ezoic → Mediavine" path in DESIGN.md is OBSOLETE

**Betting affiliate market growth:**
- Market size: $100B+ in 2026 (up from $83.65B in 2024)
- Commission standards: 25-40% RevShare + $100-500 CPA options
- RPM for sports traffic: $100-300+ (vs AdSense $9-18)

**Alternative networks emerged:**
- Raptive lowered minimum from 100K to 25K pageviews (Oct 2025)
- PropellerAds, Media.net viable for small publishers (no minimum)

## Revised Revenue Strategy (Priority Order)

**1. Betting Affiliates FIRST** (Bet365/FanDuel/DraftKings)
   - **Why:** 10-50x RPM multiplier vs display ads for sports traffic
   - **Timeline:** 3-7 day approval → immediate high-RPM revenue
   - **Requirements:** Site live ✓, sports content ✓, essential pages ✓

**2. AdSense** (parallel track, baseline revenue)
   - **Why:** Reliable baseline, no traffic minimum
   - **Timeline:** 7-14 day approval after 15-25 articles written
   - **RPM:** $9-18 for sports (low, but diversification)

**3. PropellerAds or Media.net** (if AdSense rejected or to diversify)
   - **Why:** No minimums, alternatives for non-US traffic
   - **Timeline:** Fast approval
   - **RPM:** Similar to AdSense or slightly better

**4. Raptive** (at 25K pageviews/month)
   - **Why:** Next tier up from AdSense (better RPM)
   - **Timeline:** Apply when traffic crosses 25K threshold
   - **RPM:** ~$15-25

**5. Mediavine** (at 50K sessions/month)
   - **Why:** Premium network, best RPM for display ads
   - **Timeline:** Apply when traffic crosses 50K threshold
   - **RPM:** ~$20-30

**Remove Ezoic entirely** — no longer accessible to new/small sites.

## First-Principles Reasoning

**Revenue = Traffic × RPM × Session Depth**

For sports content:
- Betting affiliate RPM: $100-300+
- Display ad RPM: $9-30

**Therefore:** Prioritizing betting affiliates is the highest-leverage revenue path, not an afterthought. A site with 10K monthly users earns:
- AdSense only: 10K × $0.015 = $150/month
- Betting affiliates (modest conversion): 10K × $0.10 = $1,000+/month
- Both: $1,150/month

Betting-first is 6-7x more valuable than display-only.

## Acceptance Criteria

1. `docs/DESIGN.md` §5 updated to remove all Ezoic references
2. New revenue priority clearly stated: betting affiliates → AdSense → alternatives → Raptive → Mediavine
3. Include 2026 RPM benchmarks: AdSense $9-18, betting $100-300+, Mediavine $20-30
4. Explain WHY betting-first for sports traffic (10-50x multiplier)
5. Update traffic thresholds: Raptive 25K (not 100K), Mediavine 50K
6. Build + lint green, no broken links

## ROI Justification

**Impact:** MEDIUM — prevents future work from being built on obsolete assumptions (e.g., "wait for Ezoic"). Keeps strategy aligned with 2026 market reality.

**Effort:** LOW (30-60 min doc update)

**Why it matters:** The current DESIGN.md misleads the planner into thinking Ezoic is viable. This wastes planning cycles and delays the betting-first approach that delivers 10-50x better ROI.

## Sources

- Ezoic 250K requirement: https://support.ezoic.com/kb/article/getting-started-ezoics-requirements
- Betting market size: https://affpapa.com/best-sports-betting-affiliate-programs/
- Sports RPM benchmarks: https://adstimate.com/blog/niche/sports-adsense-rpm.html
- Raptive minimum change: https://www.publift.com/blog/ezoic-vs-adsense-vs-publift
