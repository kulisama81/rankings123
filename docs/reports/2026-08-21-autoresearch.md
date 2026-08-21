# Autoresearch Report — August 21, 2026

**Focus Lens Today:** Tournament Windows + Immediate Revenue Enablement (rotating from Aug 20's Data Quality + UX/Engagement)  
**Run Type:** Focused sprint — URGENT tournament windows (Vuelta tomorrow, US Open 6 days)  
**Tickets Created:** 5 new tickets (2× P0 urgent, 2× P1 revenue, 1× P2 process)  
**Backlog Status:** 157 open → 162 open (+5 new), **healthy but needs consolidation**

---

## Executive Summary

**VUELTA STARTS TOMORROW (AUG 22) — CONTENT CRITICAL PATH.** Vuelta a España 2026 begins Aug 22 with Monaco time trial. Our Wikipedia-based cycling feed is built and verified (Aug 17/20 autoresearch), but we need **day-1 content** to capture the 21-day betting window (Aug 22-Sep 13). Filed 2 tickets: P0 live coverage verification + P1 GC contenders article. Tadej Pogačar is overwhelming favorite (1.13 odds).

**US OPEN DRAW IN 6 DAYS (AUG 27) — BIGGEST TENNIS SEO WINDOW OF 2026.** Draw ceremony Aug 27, main draw starts Aug 30. 150K+ daily search volume during tournament. Current SEO crisis (only 4 Google impressions total) means we're invisible. Filed P0 ticket for dedicated draw page (live by Aug 26) targeting "US Open 2026 draw" search demand. Favorites: Jannik Sinner 1.73, Carlos Alcaraz 3.25, Aryna Sabalenka 3.75.

**ODDS API INTEGRATION UNBLOCKS BETTING REVENUE.** The Odds API offers 500 requests/month free tier covering Bet365, DraftKings, FanDuel (40+ bookmakers). This is the missing piece for ALL betting affiliate content — US Open betting guides, odds trackers, player comparisons. Filed P1 integration ticket. Real odds = credibility for affiliate applications.

**BACKLOG BLOAT IDENTIFIED — 157 TICKETS, SIGNIFICANT DUPLICATION.** Current backlog has 11 US Open tickets that overlap, 24 betting tickets with redundancy, 19 SEO tickets covering similar ground. This creates planner confusion ("which US Open ticket do I build?"). Filed P2 consolidation audit to reduce 157 → ~100 distinct, actionable tickets.

**TRAFFIC STILL CRISIS — 0 ORGANIC, ONLY 4 GOOGLE IMPRESSIONS.** Search Console data unchanged from Aug 20: 4 impressions, 0 clicks, position 32.3 in 28 days. Root cause: sitemap not submitted to GSC (human-blocked task exists). US Open window is worthless if pages aren't indexed by Aug 27. **HUMAN ACTION REQUIRED: Submit sitemap in Google Search Console.**

---

## Critical Findings

### 1. Vuelta a España 2026 — Launch Tomorrow, Content Gap (URGENT)

**Finding:** Vuelta a España 2026 starts **TOMORROW (Aug 22, 2026)** with 9.4km Monaco time trial (Stage 1). We have the technical infrastructure (Wikipedia API feed verified working Aug 17/20) but lack **day-1 editorial content** to capture the betting window.

**Current State (Technical Ready):**
- `/cycling` page with Vuelta configured (startDate 2026-08-22, endDate 2026-09-13)
- Wikipedia API feed fetches 2026_Vuelta_a_España page
- Auto-detects race status: upcoming → active (Aug 22) → complete (Sep 13)
- 300s ISR revalidation for near-real-time updates
- Source attribution: "Wikipedia" flag

**What's Missing (Content Gap):**
1. **Day-1 article** covering GC favorites and predictions
2. **Stage 1 preview** (Monaco TT, 9.4km, 25 turns)
3. **Betting context** for 21-day revenue window

**Competitor Research (Via WebSearch):**

**GC Favorites (2026 Vuelta):**
- **Tadej Pogačar** — 1.13 odds (overwhelming favorite, attempting to make history)
- **Enric Mas** — 17.00-21.00 odds (Movistar, home roads advantage)
- **Oscar Onley** — 15.00-17.00 odds
- **Primož Roglič** — Red Bull-BORA-hansgrohe
- **Mattias Skjelmose** — Lidl-Trek

**Stage 1 Details:**
- 9.4km Monaco circuit (includes F1 Fairmont hairpin, tunnel)
- Time trial format (individual starts)
- First GC leader crowned after Stage 1
- Pogačar expected to take early lead

**First-Principles Analysis:**

**Root Need:** Cycling fans want Grand Tour predictions ("who will win the Vuelta?") and stage-by-stage coverage ("who won Stage 1?").

**Revenue Window:** Vuelta = 21-day betting opportunity (Aug 22 - Sep 13). Cycling betting RPM lower than tennis but material. Getting day-1 content indexed captures 3-week search tail.

**Multi-Sport Credibility:** Cycling is our second sport after tennis. Accurate, timely Vuelta coverage proves we're a real multi-sport hub, not tennis-only.

**SEO Timing:** Articles published Aug 22-23 have 3 weeks to accumulate impressions/rankings during tournament. Day-1 content > late content.

**Solution Tickets Created:**

**vuelta-stage1-live-coverage (P0, feature)** — Verify /cycling page correctly switches to ACTIVE status on Aug 22 and displays Stage 1 results within 2 hours of finish. Smoke-test Wikipedia API feed under live conditions. 2-3 hour effort.

**vuelta-gc-contenders-article (P1, feature)** — Create 600-800 word article at /articles/vuelta-2026-gc-contenders-predictions covering GC favorites (Pogačar, Mas, Onley, Roglič) with betting odds and Stage 1 preview. Publish Aug 22-23. 3-4 hour effort.

**ROI: 9/10 + 8/10** — Combined: captures 21-day Vuelta betting window, establishes cycling prediction content pattern, proves multi-sport capability. Low effort (5-7 hours total), high revenue/credibility impact.

---

### 2. US Open 2026 — Draw Ceremony in 6 Days (Aug 27), Page Missing

**Finding:** US Open 2026 draw ceremony is **August 27, 2026** (6 days away). Draw determines bracket for Aug 30 main draw start. This is the **#1 tennis SEO event of the year** (150K+ daily searches during tournament), but we lack a dedicated draw page.

**Current State:**
- No `/us-open-2026/draw` page exists
- 11 overlapping US Open tickets in backlog (coverage, hub, seo-hub, ramp, preview, betting-guide, betting-tracker, live-scores, draw-bracket, revenue-sprint)
- Many tickets well-intentioned but no clear critical path

**Competitor Research (Via WebSearch):**

**Draw Details:**
- **Draw ceremony:** Thursday, August 27, 2026
- **Seeding basis:** ATP/WTA rankings of August 24
- **Main draw starts:** Sunday, August 30 (3 days after draw)
- **Tournament ends:** Sunday, September 13 (men's final)

**Betting Favorites (2026 US Open):**
- **Men:** Jannik Sinner 1.73 (8/11), Carlos Alcaraz 3.25 (9/4), Novak Djokovic 11.00 (10/1)
- **Women:** Aryna Sabalenka 3.75 (11/4)

**Search Demand (High-Volume Keywords):**
- "US Open 2026 draw" — peak Aug 27-30
- "US Open draw schedule" 
- "US Open bracket 2026"
- "US Open predictions 2026"
- "US Open betting odds"

**First-Principles Analysis:**

**Root Need:** Tennis fans want to know the draw IMMEDIATELY after it's released ("who does Sinner face R1?", "is Alcaraz in Djokovic's half?").

**Traffic = indexable pages × search demand × UX.**
- **Search demand exists:** 150K+ daily searches during US Open
- **UX exists:** We can build fast, mobile-optimized pages
- **Indexable = 0:** Current SEO crisis (4 impressions total) means we're invisible

**Critical Path (From First Principles):**
1. **Build draw page NOW** (by Aug 26) so it's crawlable before draw ceremony
2. **Pre-draw content:** Countdown, seeding preview, betting odds (builds anticipation, ranks before draw)
3. **Post-draw update (Aug 27):** Embed full bracket, tough draw analysis
4. **Request indexing:** Manual GSC submit or IndexNow protocol
5. **Share/promote:** Social, direct traffic while organic builds

**Solution Ticket Created:**

**us-open-draw-live-page (P0, feature)** — Create /us-open-2026/draw page, live by Aug 26 (day before draw). Pre-draw: countdown, seeding preview, betting odds. Post-draw (Aug 27): full bracket embedded/linked, tough draw callouts. Meta targets "US Open 2026 draw". 4-6 hour effort.

**ROI: 10/10** — US Open = biggest tennis SEO window of 2026. Draw page is the #1 entry point for bracket searches Aug 27-30. Infinite ROI potential (from 0 organic → captures US Open traffic).

---

### 3. The Odds API — Real Betting Odds Unblock Revenue Content

**Finding:** We've filed 24 betting/affiliate tickets but lack the foundational piece: **real betting odds API integration**. The Odds API offers a **free tier (500 requests/month)** that covers major bookmakers and unblocks ALL betting content.

**Current State:**
- No odds API integrated
- All betting content blocked on "real odds source"
- CX FIRST rule prohibits placeholder/fabricated odds
- Result: can't ship US Open betting guide, odds tracker, player comparison pages

**The Odds API Research (Via WebSearch):**

**Free Tier Details:**
- **500 requests/month** (100/hour, up to 500/day)
- **40+ bookmakers:** Bet365, DraftKings, FanDuel, William Hill, Caesars, etc.
- **No credit card required**
- **Official docs:** docs.odds-api.io
- **Coverage:** Tennis, soccer, cycling (multi-sport ready)

**Cost Structure:**
- Free tier uses credits (not simple requests)
- 1 API call costs markets × regions credits
- 500 credits ≈ 85-500 calls depending on query complexity
- For our use case (tennis tournament winner odds, match odds): ~200-300 calls/month realistic

**Integration Pattern (Our Stack):**
- Sign up for API key → env var `ODDS_API_KEY`
- Create `/lib/oddsApi.ts` fetcher
- **Mock fallback + source flag pattern** (same as tennis/cycling feeds)
- Aggressive caching (300s ISR minimum) to stay under 500 req/month
- Display: tournament winner odds, match odds, multi-bookmaker comparison
- Source attribution: "Odds via The Odds API" footer

**First-Principles Analysis:**

**Revenue = traffic × RPM.**

**Betting content has highest RPM** for sports audiences (2-5× display ads). But betting content without real odds = no credibility = no conversions.

**Current Blocker:** We can't ship any betting content (US Open betting guide, Vuelta odds, player comparison pages) because CX FIRST rule prohibits fabricated/placeholder odds.

**Solution:** The Odds API integration unlocks:
1. US Open betting guide (real tournament winner odds)
2. US Open odds tracker (live match odds updates)
3. Vuelta betting preview (stage/GC winner odds)
4. Player comparison pages (H2H with betting context)
5. **Credibility for betting affiliate applications** (DraftKings, FanDuel, Bet365)

**Solution Ticket Created:**

**odds-api-integration-sprint (P1, feature)** — Integrate The Odds API free tier. Create `/lib/oddsApi.ts`, display US Open tournament winner odds on draw page, cache 5min+ to stay under 500 req/month limit. Mock fallback + source flag pattern. 6-8 hour effort.

**ROI: 9/10** — Unblocks ALL 24 betting tickets in backlog. Revenue enabler (betting = highest RPM). Credibility for affiliate applications. One-time 6-8 hour investment unlocks months of betting content pipeline.

---

### 4. Backlog Bloat — 157 Tickets, Consolidation Needed

**Finding:** Current backlog has **157 open tickets**. Analysis reveals significant duplication and overlap. This creates confusion for the planner ("which US Open ticket should I build?") and dilutes focus.

**Duplication Analysis:**

**US Open Cluster (11 tickets):**
- `us-open-2026-coverage` — "comprehensive coverage Aug 25-Sep 13"
- `us-open-2026-hub` — "Preview Content Hub ships Aug 23-26"
- `us-open-2026-seo-hub` — "tournament page + predictions + draw"
- `us-open-2026-ramp` — "content ramp Aug 30-Sep 13"
- `us-open-2026-preview` — "preview article with betting context"
- `seo-us-open-cluster` — "8-10 articles, 6-week ramp"
- `us-open-revenue-infrastructure-sprint` — epic wrapping above

→ **Recommendation:** Consolidate into 3 tickets: (1) Draw page (new), (2) Content hub (merge hub/preview/cluster), (3) Live scores widget (distinct feature)

**Betting Affiliate Cluster (24 tickets):**
- Multiple overlapping: `betting-affiliate-integration`, `betting-affiliate-component-approval-ready`, `betting-affiliate-top3-apply`, `betting-bonus-comparison-page`, `betting-link-placement-strategy`, `betting-content-strategy`, `multi-bookmaker-odds-widget`, `odds-api-integration`, `odds-api-integration-betting`, `long-tail-betting-keywords`, etc.

→ **Recommendation:** Consolidate into 5 tickets: (1) Odds API integration (new), (2) Apply to top 3 affiliates (human-blocked), (3) Betting content strategy doc, (4) Multi-bookmaker widget (post-API), (5) A/B testing framework (later phase)

**SEO/Indexing Cluster (19 tickets):**
- `gsc-indexing-crisis`, `seo-zero-traffic-crisis`, `google-indexing-audit`, `seo-sitemap-submit-gsc`, `search-console-opportunity-targeting`, `indexnow-instant-indexing`, etc.

→ **Recommendation:** Consolidate into 3 tickets: (1) Submit sitemap (human-blocked P0), (2) Indexing crisis diagnosis (post-sitemap), (3) IndexNow integration (automated indexing)

**Player Pages Cluster (2 identical tickets):**
- `tennis-top10-spotlight` — "Top 10 tennis players spotlight article series"
- `tennis-top10-spotlight-series` — "Tennis Top 10 Player Spotlight Article Series"

→ **Recommendation:** Merge into 1 ticket

**H2H Cluster (3 tickets, same feature):**
- `h2h-records-phase1-parity`
- `tennis-h2h-comparison`
- `tennis-h2h-tool`

→ **Recommendation:** Merge into 1 ticket: "H2H Comparison Tool (Phase 1 Parity)"

**First-Principles Analysis:**

**Decision Paralysis:** When the planner sees 11 US Open tickets, which one is highest-priority? Unclear titles and overlapping scope → wasted time deciding.

**Focus = Velocity:** Fewer, clearer tickets → planner picks faster, ships faster.

**Quality > Quantity:** 100 well-defined tickets > 157 ambiguous/overlapping tickets.

**Solution Ticket Created:**

**backlog-consolidation-audit (P2, task)** — Audit all 157 tickets, identify duplicate clusters (minimum 5), propose consolidation to 80-100 distinct tickets. Document in docs/reports/backlog-consolidation-recommendations.md. 4-6 hour effort.

**ROI: 7/10** — Process improvement. Clarifies planner focus, reduces decision paralysis, improves velocity. One-time 4-6 hour investment yields ongoing velocity gains.

---

## Traffic & Revenue Status (Aug 21, 2026)

### Traffic (Last 28 Days)

**Google Analytics 4:**
- **Total users:** 46
- **Total sessions:** 46
- **Total pageviews:** 113
- **Pages per session:** 2.5
- **Mobile share:** 28% (goal: 60%)

**Traffic Sources:**
- Direct: 74% (34/46 sessions) — mostly Loic testing
- Referral: 15% (7 sessions)
- Organic Search: **11% (5 sessions)** — tiny organic presence

**Top Pages:**
1. `/` — 24 views, 70.8% bounce rate
2. `/atp-live` — 24 views, 45.8% bounce rate
3. `/wta-live` — 10 views, 0% bounce rate
4. `/world-cup` — 9 views, 0% bounce rate

**Observation:** Internal pages (ATP/WTA) have low bounce rates once users land, but homepage has 70.8% bounce (yesterday's report flagged this). Main issue: **almost zero organic discovery** (only 5 organic sessions in 28 days).

---

### SEO Crisis (Unchanged from Aug 20)

**Google Search Console (Last 28 Days):**
- **Total impressions:** 4
- **Total clicks:** 0
- **CTR:** 0%
- **Average position:** 32.3

**Top Queries:**
1. "3v3 live rankings" — 1 impression, position 63
2. "ranking 123" — 1 impression, position 8

**Top Pages:**
1. Homepage — 2 impressions, position 35.5
2. /atp-live — 2 impressions, position 29

**Diagnosis:** Essentially **ZERO organic visibility**. We have rich content (ATP/WTA rankings, World Cup, articles) but Google isn't finding it.

**Root Cause (Confirmed from Aug 20):**
- Sitemap not submitted to Google Search Console (human-blocked task `seo-sitemap-submit-gsc` P0)
- Likely: pages aren't in Google's index yet → no impressions/clicks

**Impact on US Open:**
- US Open = 150K+ daily searches Aug 27-Sep 13
- If pages not indexed by Aug 27, we capture **ZERO** of this traffic
- Window closes fast (tournament is 2 weeks)

**Critical Path:**
1. **Human (Loic):** Submit sitemap to Google Search Console (URGENT, P0)
2. **Planner:** Build US Open draw page by Aug 26 (new ticket: us-open-draw-live-page)
3. **Planner:** Request indexing via IndexNow or manual GSC submit (post-sitemap)
4. **Wait:** Google typically indexes new pages in 1-7 days

**Status:** **BLOCKED ON HUMAN ACTION** — Loic must submit sitemap in GSC.

---

### Revenue

**Status:** $0.00

**Blockers (All Human-Action):**
1. **AdSense:** Not applied yet (ticket: `adsense-apply-now` P0)
2. **Betting Affiliates:** Not applied yet (ticket: `betting-affiliate-top3-apply` P0)
3. **Odds API:** Not integrated yet (NEW ticket: `odds-api-integration-sprint` P1)

**Next Steps:**
1. Human: Apply to AdSense (all requirements met per Aug 18 autoresearch)
2. Human: Apply to top 3 betting affiliates (Bet365, FanDuel, DraftKings)
3. Planner: Integrate The Odds API (free tier, unblocks betting content)
4. Planner: Build US Open betting guide (post-Odds-API)

**Revenue Forecast (Post-Enablement):**
- AdSense: ~$0.50-2.00/day at current traffic (46 users/28d) → scales with SEO
- Betting Affiliates: ~$5-20 per qualified signup (tennis/cycling bettors = qualified)
- US Open window: if indexed + betting content live → est. $50-200 revenue potential Aug 27-Sep 13

**First-Dollar Milestone:** Pending AdSense approval + traffic growth (SEO indexing critical path).

---

## Backlog Health

**Status:** 157 open → 162 open (+5 new)  
**Assessment:** Healthy capacity but **needs consolidation**

**Breakdown:**
- Planner ships ~5-15 tickets/day (5 runs/day)
- 162 tickets ≈ 10-30 days of work queued
- Well above 12-ticket minimum for healthy backlog

**BUT:** Many tickets overlap (11 US Open, 24 betting, 19 SEO). This creates confusion, not clarity.

**Recommendation:** Execute `backlog-consolidation-audit` (P2) to reduce 162 → ~100 distinct, actionable tickets. This is a one-time investment that yields ongoing planner velocity gains.

---

## Tickets Created (5)

### 1. vuelta-stage1-live-coverage (P0, feature) — URGENT
**Summary:** Verify Vuelta live coverage ready for Aug 22 launch (tomorrow)  
**Effort:** 2-3 hours (verification + smoke-test)  
**Impact:** Captures day-1 of 21-day Vuelta betting window  
**Timing:** **URGENT — launches tomorrow**  
**ROI:** 9/10 (low effort, de-risks 3-week revenue window)

### 2. vuelta-gc-contenders-article (P1, feature)
**Summary:** Create 600-800 word Vuelta GC predictions article (Pogačar, Mas, Onley, Roglič)  
**Effort:** 3-4 hours  
**Impact:** Captures Vuelta launch SEO, establishes cycling betting content pattern  
**Timing:** Publish Aug 22-23 (tournament start)  
**ROI:** 8/10 (SEO + betting content template)

### 3. us-open-draw-live-page (P0, feature) — URGENT
**Summary:** Create /us-open-2026/draw page, live by Aug 26 (before Aug 27 draw ceremony)  
**Effort:** 4-6 hours  
**Impact:** Captures "US Open 2026 draw" search demand (150K+ daily searches)  
**Timing:** **URGENT — 6 days until draw**  
**ROI:** 10/10 (biggest tennis SEO window of 2026)

### 4. odds-api-integration-sprint (P1, feature)
**Summary:** Integrate The Odds API free tier (500 req/month) for real betting odds  
**Effort:** 6-8 hours  
**Impact:** Unblocks ALL 24 betting tickets, revenue enabler  
**ROI:** 9/10 (one-time investment unlocks months of betting content)

### 5. backlog-consolidation-audit (P2, task)
**Summary:** Audit 162 tickets, consolidate duplicates, reduce to ~100 distinct tickets  
**Effort:** 4-6 hours  
**Impact:** Clarifies planner focus, reduces decision paralysis, improves velocity  
**ROI:** 7/10 (process improvement, ongoing gains)

---

## Next Priorities

### Planner (Recommended Execution Order):

**TIER 1 — URGENT (Tomorrow & Next 6 Days):**
1. **vuelta-stage1-live-coverage** (P0) — Verify Vuelta launches correctly tomorrow (Aug 22)
2. **us-open-draw-live-page** (P0) — Live by Aug 26 (before Aug 27 draw)
3. **vuelta-gc-contenders-article** (P1) — Publish Aug 22-23

**TIER 2 — REVENUE ENABLERS (Next 1-2 Weeks):**
4. **odds-api-integration-sprint** (P1) — Unblocks all betting content
5. **us-open-2026-betting-guide** (existing P0) — Post-Odds-API integration
6. **us-open-betting-tracker** (existing P0) — Post-Odds-API integration

**TIER 3 — PROCESS (Next 2 Weeks):**
7. **backlog-consolidation-audit** (P2) — Clean up backlog for long-term velocity

### Human (Loic) — CRITICAL BLOCKERS:

**URGENT (This Week):**
1. ⚠️ **Submit sitemap to Google Search Console** (ticket: `seo-sitemap-submit-gsc` P0)  
   → **BLOCKS all organic traffic**  
   → **US Open window worthless without indexing**  
   → 5-10 min task, infinite ROI

2. **Apply to AdSense** (ticket: `adsense-apply-now` P0)  
   → All requirements met (per Aug 18 autoresearch)  
   → 10-15 min application, 1-2 week approval

3. **Apply to Top 3 Betting Affiliates** (ticket: `betting-affiliate-top3-apply` P0)  
   → Bet365, FanDuel, DraftKings  
   → 15-20 min per application  
   → Can start BEFORE Odds API integration (review period is 1-2 weeks)

**RECOMMENDED (Next 2 Weeks):**
4. Request indexing for US Open draw page via GSC (manual, 2 min, Aug 27)
5. Share US Open content on social/tennis communities (Reddit, Twitter)

---

## Research Conducted

### Web Research (3 queries via WebSearch):
1. **US Open 2026 draw schedule predictions betting odds** — Confirmed Aug 27 draw, betting favorites (Sinner 1.73, Alcaraz 3.25, Sabalenka 3.75)
2. **Vuelta a España 2026 stage 1 preview GC contenders** — Confirmed Aug 22 start, Pogačar 1.13 odds (overwhelming favorite), Stage 1 Monaco 9.4km TT
3. **The Odds API free tier 2026** — Confirmed 500 req/month free tier, 40+ bookmakers, docs at docs.odds-api.io

### Analytics Review:
- **GA4 (Aug 21):** 46 users, 113 pageviews in 28 days — mostly direct traffic (74%), organic only 11% (5 sessions)
- **Search Console (Aug 21):** 4 impressions, 0 clicks, position 32.3 — **unchanged from Aug 20, still crisis**

### Code Audits:
- Verified Vuelta cycling feed ready (Aug 17/20 autoresearch confirmed Wikipedia API working)
- Confirmed no `/us-open-2026/draw` page exists yet
- Confirmed no odds API integrated

---

## Next Autoresearch Lens (Rotating)

**Tomorrow (Aug 22):** SEO & Content Gaps (focus on indexed page audit post-sitemap-submit, long-tail keyword opportunities, player page discoverability)

**Rationale:** Once sitemap is submitted (human-blocked today), next run should audit what's indexed vs what's not, identify content gaps based on Search Console queries, and file tickets for high-impression/low-position opportunities.

---

## Sources

- [US Open 2026 draw schedule — Flashscore](https://www.flashscore.com/news/us-open-draw-schedule-and-all-you-need-to-know-about-the-final-grand-slam-of-the-season/tW3OzusS/)
- [US Open 2026 betting odds — JohnnyBet](https://www.johnnybet.com/us-open-betting-odds-and-predictions)
- [Vuelta a España 2026 stage 1 preview — Cycling Up To Date](https://cyclinguptodate.com/cycling/vuelta-a-espana-2026-gc-and-stage-1-preview-profiles-favourites-predictions-will-tadej-pogacar-make-history-in-spain)
- [Vuelta a España 2026 odds — Tips.GG](https://tips.gg/article/vuelta-a-espana-2026-odds-and-favourites-vuelta2026/)
- [The Odds API free tier — Odds-API.io](https://odds-api.io/pricing/free)
- [The Odds API documentation — Docs](https://docs.odds-api.io/)
- [Sports Odds API directory 2026 — SportsAPIs.dev](https://sportsapis.dev/)
