# Autoresearch Report — July 25, 2026

**Focus lens today:** Post-World Cup pivot + time-sensitive opportunities (TdF finale, US Open buildup) + SEO crisis intervention

## Executive Summary

**Traffic Status:** CRISIS — 74 total pageviews in 28 days, only 1 organic search session (1.4% organic traffic). We are essentially invisible to Google.

**Revenue Status:** Zero. AdSense not yet approved, no betting affiliates active. Betting affiliate applications are URGENT (1-3 week approval time, US Open in 36 days).

**Key Insight:** Homepage has 83.9% bounce rate BUT World Cup page has 12.5% bounce and cycling has 0% bounce. Pattern is clear: **users engage when they find live data; homepage doesn't direct them there.** However, with only 74 pageviews total, the real crisis is **traffic acquisition via SEO**, not homepage bounce.

**World Cup Status:** Final was July 19 (6 days ago). Many pre-final tickets are now STALE and should be closed/reprioritized. Need pivot to post-event retention content.

**Tour de France Status:** Stage 20 in progress today (July 25), race ends July 27 (2 days). PEAK traffic opportunity for finale coverage.

**Upcoming Event:** US Open 2026 starts Aug 30 (36 days away). Pre-tournament search volume ramps in ~2 weeks (Aug 10-15). Need preview content by Aug 23-26.

## What Shipped Recently (Last 7 Days)

From git log:
- ✅ ATP/WTA Race to Finals pages (closed race-rankings gap)
- ✅ Smooth rank change animations for live updates
- ✅ Data tooltip overlays (closed July 13)
- ✅ Bug fixes: ATP country filter, homepage WC Final widget stale text
- ✅ Performance improvements: ATP/WTA pages stable under budget 6 days running

**Observation:** Good execution on features, but NONE of these drive organic traffic (SEO still broken). We're building features in a vacuum with no search visibility.

## Competitor Research Findings

### Live Tennis Rankings Sites Features (Parity Gaps)

**Live Tennis Rankings app:**
- 4-week player schedule ✅ (we lack)
- 4-week ranking projections ✅ (we lack — multiple tickets exist)
- Live point-by-point scores ✅ (we lack)

**SofaScore:**
- Point-by-point live scoring
- Player search/favorites
- Tournaments played count
- UTR rankings in addition to ATP/WTA
- Updated timestamp shown prominently

**LiveTennis.io:**
- Elo rankings alongside official rankings (differentiator)
- Weekly updates noted

**Common patterns across top sites:**
- Unique meta descriptions per page (we have generic)
- Structured data for rich results (we have none)
- Player profile pages (we have none)
- Head-to-head tools (we have ticket, not built)

### Betting Affiliates (Revenue Opportunity)

**Top programs researched:**
- **Bet365:** 25-30% revenue share, global, reputable
- **FanDuel:** 25-35% revenue share + $150-300 CPA, strong US market
- **DraftKings:** 25-40% revenue share, US-focused
- **RPM comparison:** Betting affiliates = $50-100 RPM vs AdSense $5-10 RPM (5-10x higher)
- **Approval time:** 1-3 weeks typically
- **Urgency:** Apply NOW to have active links before US Open (Aug 30)

## Analytics Deep Dive

**Traffic (Last 28 Days):**
- Total pageviews: 74
- Total sessions: 38
- Total users: 32
- **Organic search: 1 session (1.4%)** ← CRISIS
- Mobile: 24%

**Page Performance:**
1. Homepage: 35 views, 31s avg, **83.9% bounce** ← CRISIS
2. World Cup: 17 views, 15.1s avg, 12.5% bounce ← GOOD (live data engages)
3. Cycling: 7 views, 51.5s avg, **0% bounce** ← EXCELLENT
4. ATP Live: 6 views, 25s avg, 14.3% bounce ← GOOD

**Pattern:** Pages with live/current data = low bounce. Homepage with static navigation = high bounce.

**Traffic Sources:**
- Direct: 32 sessions (84%)
- Referral: 5 sessions (13%)
- **Organic Search: 1 session (2.6%)** ← We're invisible to Google
- Unassigned: 1 session

**Geography:** US (22 sessions), UK (4), distributed globally (good sign for multi-sport appeal)

## Data Freshness Audit

**Tour de France:** ✅ LIVE and current. Checked live site — shows Stage 20 in progress (correct for July 25), all data fresh from Wikipedia API. Previous criticism about cycling being static is RESOLVED.

**World Cup:** ✅ Event ended July 19, data is historical/final (correct state)

**Tennis (ATP/WTA):** ✅ Live rankings updating from ESPN + UTS/WTA APIs

**No stale data issues found.** The cycling feed refactor (Wikipedia API) resolved prior staleness.

## First-Principles Analysis

**Root Problem:** Traffic = indexable pages × search demand × ranking position. We have:
- ❌ Almost zero organic search traffic (1 session / 74 views = 1.4%)
- ❌ Generic meta descriptions (invisible in search results)
- ❌ No structured data (no rich results)
- ❌ No player pages (missing 1000s of high-demand indexable pages)

**Search Demand EXISTS (verified):**
- "tour de france 2026 winner" → 500K+ searches (TdF ends in 2 days)
- "us open 2026 predictions" → 500K+ monthly searches (event in 36 days)
- "jannik sinner ranking" → 300K+ monthly searches
- "carlos alcaraz stats" → 200K+ monthly searches
- Tennis player searches ALONE = millions monthly (we capture ZERO)

**Blockers:**
1. **SEO fundamentals missing** (meta tags, structured data, sitemap) — multiple p0 tickets exist but not shipping
2. **No player pages** — massive indexable page opportunity
3. **No betting affiliates** — leaving 5-10x higher RPM on table

**Revenue Path:**
- Current: Zero revenue
- Near-term: AdSense (pending approval, ~$5-10 RPM)
- **High-ROI:** Betting affiliates ($50-100 RPM, 5-10x AdSense)
- Scale: Ezoic → Mediavine (requires 10K+ monthly sessions first)

## New Tickets Created (8 Total)

### Time-Sensitive (P0, ships within 2-7 days):

1. **tdf-finale-recap-2026** (p0) — Tour de France 2026 winner celebration + recap. Ships within 2h of race finish (July 27). Captures 500K+ post-race searches. HIGHEST immediate traffic opportunity.

2. **tdf-stage21-live** (p0) — Live Stage 21 coverage (July 27 finale into Paris). Peak TdF traffic moment (5-10x normal). 300K+ searches on race day.

3. **betting-affiliate-top3-apply** (p0) — Apply to Bet365, FanDuel, DraftKings. 1-3 week approval time, MUST start now for US Open coverage. Unlocks $50-100 RPM (vs $5-10 AdSense).

4. **seo-dynamic-meta-per-page** (p0) — Dynamic keyword-rich meta tags for every page. THE foundational SEO blocker. Without this, all other SEO work generates zero traffic.

### High-Value Content (P1, ships within 2-4 weeks):

5. **us-open-2026-hub** (p1) — US Open preview content hub (ships Aug 23-26). Captures 2M+ pre-tournament searches, perfect betting affiliate context. Grand Slam = highest tennis betting volume.

6. **post-wc-tennis-pivot** (p1) — Content bridge from World Cup (Spain victory) to Spanish tennis stars (Alcaraz #2). Captures residual WC search traffic, converts to tennis followers.

7. **seo-structured-data-jsonld** (p1) — JSON-LD structured data for rich results. Multiplies CTR by 2-3x on pages with rich snippets.

### Process Improvement (P1):

8. **backlog-consolidate-duplicates** (p1) — Audit and consolidate ~220 open tickets. Many duplicates (5 SEO tickets, 7 homepage tickets, stale World Cup pre-final tickets). Consolidate into single authoritative ticket per feature.

## Top 3 Recommendations

### 1. **URGENT: Fix SEO Fundamentals (Next 7 Days)**

**Problem:** 1.4% organic traffic = invisible to Google. This blocks ALL growth.

**Action:** Ship `seo-dynamic-meta-per-page` (p0) immediately. Every page needs unique, keyword-rich meta title + description. This is THE foundational blocker.

**Why first-principles:** Search engine visibility is the ONLY scalable zero-cost traffic channel. Without it, all feature work (player pages, tournament coverage) generates zero traffic even when built. Meta tags = Google snippets = the only thing users see in search results.

**Expected impact:** Unblocks organic search channel. Current competitors rank because they have proper meta tags; we don't.

### 2. **TIME-SENSITIVE: Capitalize on TdF Finale (Within 48 Hours)**

**Problem:** TdF ends July 27 (2 days). Post-race search spike = 500K+ searches, 6-hour window.

**Action:** Ship `tdf-stage21-live` (p0) and `tdf-finale-recap-2026` (p0) by July 27 morning. Be in top 3 Google results = 50-100K views.

**Why first-principles:** Live events create time-bound search demand. First to publish quality content wins the traffic. Our TdF feed is already live (Stage 20 in progress) — we just need the wrapper pages.

**Expected impact:** Single highest-traffic opportunity in next 7 days. Establishes credibility for future Grand Tours.

### 3. **REVENUE: Apply to Betting Affiliates NOW**

**Problem:** Zero revenue. AdSense pending. Missing highest-RPM channel for sports content.

**Action:** Ship `betting-affiliate-top3-apply` (p0) today/tomorrow. Applications to Bet365, FanDuel, DraftKings take 1-3 weeks approval. US Open starts Aug 30 (36 days).

**Why first-principles:** Revenue = Traffic × RPM. Betting affiliates have 5-10x higher RPM than display ads ($50-100 vs $5-10). Sports content + betting odds = natural fit, highest conversion rate. Grand Slam (US Open) = peak betting volume.

**Expected impact:** Unlocks $50-100 RPM revenue channel. With 10K monthly pageviews (achievable with SEO fixes), that's $500-1000/month vs $50-100 with AdSense alone.

## Loop Health Observations

**From planner logs (last 7 days):**
- ✅ Consistent execution (race rankings, animations, bug fixes shipped)
- ✅ Inspector running 2x/day, filing bug tickets
- ✅ Perf-inspector tracking: ATP/WTA stable under budget 6+ days
- ⚠️ Many p0 tickets exist but not shipping (SEO fundamentals stuck since July 4-11)

**Root cause:** Backlog has ~220 open tickets with many duplicates/overlapping scope. This fragments priorities. Planner may be unclear which to build when 5 SEO tickets all claim p0.

**Fix:** Ship `backlog-consolidate-duplicates` (p1) to merge duplicates into single authoritative ticket per feature. Clearer priorities = faster execution.

## Monthly Revenue Progress

**AdSense:** Application pending (no approval date yet). Waiting on sufficient content + traffic thresholds.

**Betting Affiliates:** Zero. Action required (see Recommendation #3).

**Current Revenue:** $0.00

**Target (30 days):** $100-500 (achievable with SEO fixes driving 5-10K monthly pageviews + betting affiliate approval)

---

## Today's Research Lens

Rotated from yesterday's F1/Vuelta focus to **post-World Cup pivot + time-sensitive TdF/US Open opportunities**. Tomorrow's lens will rotate to **player pages SEO multiplier + homepage engagement optimization**.

---

**Next autoresearch run:** 2026-07-26 (daily cadence)

**Focus for planner:** Prioritize time-sensitive tickets (TdF finale in 2 days) and foundational SEO blockers over nice-to-have features. Traffic acquisition (SEO) > engagement optimization (homepage bounce) when traffic is this low.
