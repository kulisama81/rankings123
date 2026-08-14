---
id: search-intent-targeting-strategy
status: open
deps: []
links: [us-open-2026-coverage, cincinnati-open-2026-page, seo-foundation-critical]
created: 2026-08-14T14:00:00Z
type: task
priority: 1
parent: rankings123
tags: [seo, strategy, search-intent]
---
# Search Intent Targeting Strategy — Align Content with Real Search Demand

Research REAL search queries and align content roadmap with what people actually search. Current state: 476 indexed pages but only 4 search impressions, 0 clicks, position 32.3. Content doesn't match search intent.

## Problem (First Principles)

**We have content but no traffic because we're not targeting what people search:**
- 476 URLs indexed (sitemap live)
- 4 search impressions in 28 days (near-zero)
- Position 32.3 average (page 3, invisible)
- Only 2 queries tracked: "3v3 live rankings" (irrelevant), "ranking 123" (brand)

**Why ranking requires intent-match:**
- Indexing: ✓ (sitemap + structured data live)
- Relevance: ? (do our pages match queries?)
- Authority: ✗ (new site, no backlinks)
- **Intent-match: ? (are we targeting real queries?)**

**What we built vs what people search:**
- We built: EVERGREEN ranking pages (/atp-live, /wta-live)
- People search: TIMELY tournament content ("US Open draw 2026", "Cincinnati Open odds")
- Gap: Evergreen ranks slow (months), timely ranks fast (days)

## Research Tasks

### 1. Google Keyword Planner Research
Query patterns to analyze:
- Tournament-specific: "{Tournament} 2026 draw", "{Tournament} bracket", "{Tournament} live scores"
- Betting keywords: "{Tournament} betting odds", "{Tournament} predictions", "{Player} vs {Player} odds"
- Player keywords: "{Player} ranking", "{Player} vs {Player} head to head", "{Player} stats"
- Comparison: "ATP vs WTA", "{Player} vs {Player}"
- Long-tail: "who is #1 tennis player", "current tennis rankings", "live tennis scores today"

For each pattern:
- Search volume (monthly)
- Competition (low/medium/high)
- CPC (indicates commercial intent)
- Trend (rising/stable/declining)

### 2. Competitor Analysis (What Ranks)
For high-value queries ("US Open 2026", "tennis betting", "live tennis rankings"), identify:
- Who ranks in top 10? (ESPN, ATP/WTA official, FlashScore, betting sites, etc.)
- What content format? (draw, live scores, predictions, odds tables, articles)
- What's missing that we could provide? (multi-sport, better UX, faster updates)

### 3. Search Console Opportunities
When impressions grow, identify:
- High impressions, low clicks → CTR opportunity (improve title/description)
- High impressions, low position → ranking opportunity (improve content)
- Rising impressions → demand signal (double down)
- Zero impressions after weeks → not ranking (fix or remove)

### 4. Tournament Calendar + Search Demand Alignment
Map search demand to tournament calendar:
- **US Open (Aug 27-Sep 13):** 100K+ searches for "US Open draw", "US Open bracket", "US Open betting"
- **Australian Open (Jan):** 80K+ searches  
- **French Open (May):** 70K+ searches
- **Wimbledon (Jun-Jul):** 90K+ searches
- **Masters 1000 (9×/year):** 5-20K searches each

Create content calendar: publish tournament pages 1-2 weeks BEFORE event to capture pre-tournament search.

### 5. Betting Content Intent Research
Betting = highest commercial intent (high CPC):
- "{Tournament} betting odds"
- "{Player} to win {Tournament} odds"
- "{Player} vs {Player} betting picks"
- "best tennis betting sites"
- "{Tournament} betting guide"

All should link to approved affiliate programs (Bet365, FanDuel, DraftKings).

## Acceptance Criteria
1. Google Keyword Planner research for 20+ query patterns (volume, competition, CPC)
2. Competitor analysis for 10 high-value queries (who ranks, what format)
3. Tournament calendar mapped to search demand (when to publish what)
4. Betting keyword research (20+ queries, affiliate opportunity)
5. Document findings in this ticket or new `docs/seo-strategy.md`
6. Create prioritized content roadmap based on search demand (not feature parity)
7. Identify quick wins: low-competition, high-volume queries we can rank for NOW

## Expected Insights
- Which tournaments drive most search traffic (prioritize those)
- Which betting keywords have low competition (easy to rank)
- Which long-tail queries we can capture (player pages, H2H tools)
- When to publish content (X weeks before tournament)
- What content formats rank best (draws, live scores, predictions, odds)

## How This Changes Strategy
**Old approach:** Build features to match live-tennis.eu (competitor parity)  
**New approach:** Build content to match SEARCH DEMAND (traffic parity)

**Example:**
- Competitor parity: "live-tennis.eu has race rankings, so we should too"
- Search demand: "race rankings" = 500 searches/month, "US Open draw" = 100K searches in 2 weeks
- **ROI: Build US Open content first (200× more searches)**

## ROI
Effort: LOW-MEDIUM (research + strategy, 4-8 hours)
Impact: VERY HIGH (align entire content roadmap with real demand = organic traffic growth)
Longevity: Reusable insights for all future content decisions
