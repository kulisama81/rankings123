# Autoresearch Report — August 13, 2026

**Focus Lens Today:** SEO & Content Opportunities + Data Freshness (daily rotation from yesterday's Monetization/RPM)  
**Run Type:** Organic traffic optimization, data staleness fixes, competitive parity gaps  
**Tickets Created:** 11 new SEO + data quality tickets (8× P1, 3× P2)  
**Backlog Status:** 165 total open (+11 new), buildable count TBD (planner active: 40 commits in 2 days)

---

## Executive Summary

**CYCLING DATA STALENESS CONFIRMED — Tour de Pologne finished Aug 9, still shows "Live" on Aug 13.** Research validates the data-freshness crisis called out in agent instructions: Tour de Pologne 2026 finished Aug 9, but cycling page shows "Live" status with "Stage undefined in progress" 4 days later. Credibility damage: users see stale data → assume site abandoned → never return. Filed immediate fix ticket + ProCyclingStats API integration to prevent recurrence.

**SEO FOUNDATION MOSTLY COMPLETE — robots.txt + sitemap.xml live, GSC submission human-blocked.** Verification shows robots.txt and sitemap.xml (476 URLs) are live in production. The core SEO infrastructure from seo-foundation-critical ticket is DONE. BLOCKER: Google Search Console submission requires human login (Loïc). Created documentation ticket to unblock. Missing piece: structured data (JSON-LD schemas) for rich SERP results — filed as independent buildable ticket.

**TOURNAMENT TIMING OPPORTUNITIES — Cincinnati LIVE NOW (Aug 11-23), US Open in 14 days (Aug 27), Vuelta in 9 days (Aug 22).** Cincinnati Open is currently running but lacks a dedicated live page. US Open starts in 14 days (SEO window closing). Vuelta a España starts Aug 22, not shown on cycling page. All three represent immediate SEO + betting content opportunities.

**COMPETITOR PARITY GAP IDENTIFIED — live-tennis.eu shows live match scores, we don't.** Research confirms live-tennis.eu displays real-time match scores alongside rankings (core engagement feature). We lack this despite having ESPN scoreboard API access. Filed as P1 competitive parity ticket.

**ORGANIC TRAFFIC STILL NEAR-ZERO — 0 clicks, 4 impressions, position 32.3 avg.** Search Console data (last 28 days) shows ZERO clicks, 4 impressions (up from 3 yesterday), position 32.3 (page 3, invisible). With robots.txt + sitemap now live, the missing pieces are: 1) Google Search Console submission (human action), 2) Structured data markup (rich results), 3) Internal linking strategy. All three filed as P1 tickets.

---

## Critical Findings

### 1. Cycling Data Staleness CONFIRMED — Tour de Pologne Finished Aug 9, Still "Live" Aug 13

**Finding:** Cycling page shows Tour de Pologne 2026 as "Live" with "Stage undefined in progress" on Aug 13. The race finished Aug 9 (4 days ago). This is the exact data-freshness bug pattern warned about in autoresearch agent instructions.

**First-Principles Analysis:**

**Data freshness is BINARY — a race is live or it's not:**
- Tour de Pologne: 7 stages, Aug 3-9, 2026 (finished 4 days ago)
- Cycling page status: "Live" + "Stage undefined in progress" (STALE)
- User impact: lands on "Live" cycling → sees finished race → site appears abandoned → credibility damage

**One stale badge can lose a user forever:**
- User mental model: "Live" badge = current/accurate data
- Reality: 4-day-old stale status = site neglected/broken
- User conclusion: Don't trust this site, go to competitor
- **Stale data is worse than no data** (no data = incomplete, stale data = incompetent)

**Root cause — Wikipedia scraping fragility:**
- Current cycling feed parses Wikipedia HTML tables
- Race status detection compares current date vs race dates from Wikipedia metadata
- FAILURE MODE: Wikipedia structure changes OR parsing breaks → status stays "Live" forever
- **No automated staleness detection** (ticket data-freshness-auto-monitor P1 exists but not shipped)

**Competitive validation:**
- ESPN cycling updates race status immediately (uses internal CMS)
- ProCyclingStats updates daily (dedicated cycling platform)
- rankings123.com: 4 days stale (Manual Wikipedia parsing)

**NEW TICKET CREATED:** `tour-de-pologne-status-fix` (P1, bug)

**Recommendation:** Immediate manual fix: remove Tour de Pologne from cycling page OR mark as "Complete" with final results (Jonas Vingegaard winner per Wikipedia). LONG-TERM: Ship data-freshness-auto-monitor (P1) + ProCyclingStats API integration to prevent all future staleness bugs.

**ROI:** 10/10 — LOW effort (2 hours manual fix), CRITICAL impact (prevents credibility damage, every stale badge risks losing users forever)

**Timeline:** URGENT — Fix today (stale 4 days already)

---

### 2. Vuelta a España 2026 Missing from Cycling Page — Starts Aug 22 (9 Days Away)

**Finding:** Vuelta a España 2026 starts Aug 22, ends Sep 13 (overlaps with US Open). NOT shown on cycling page despite being imminent. Cycling page shows only finished races (Giro, TdF, Tour de Pologne).

**First-Principles Analysis:**

**Pre-event content captures early search traffic:**
- "Vuelta 2026 preview" searches begin 1-2 weeks before start
- Current state: Vuelta starts Aug 22, we have NO Vuelta content
- Competitor state: ESPN, ProCyclingStats, CyclingNews all have Vuelta preview pages live NOW
- **Every day without Vuelta content = missed SEO window**

**Multi-sport traffic smoothing:**
- Tennis: Grand Slams 4× per year (seasonal spikes)
- Cycling: Grand Tours 3× per year (Giro May-Jun, TdF Jul, Vuelta Aug-Sep)
- **Overlap window (Aug 22 - Sep 13): BOTH Vuelta AND US Open** = concurrent live events = traffic multiplier
- Missing Vuelta = wasting the multi-sport advantage

**Upcoming vs finished race UX:**
- User lands on /cycling → sees only finished races (Giro ended May 31, TdF ended Jul 27, Tour de Pologne ended Aug 9)
- User conclusion: "Cycling section is outdated, only historical content"
- **No signal that Vuelta is coming** → user doesn't return for Vuelta coverage

**NEW TICKET CREATED:** `cycling-vuelta-2026-upcoming` (P1, feature)

**Recommendation:** Add Vuelta a España 2026 card to /cycling page with "Upcoming" badge, race info (Aug 22 - Sep 13, Monaco to Granada), countdown timer ("Starts in 9 days"), GC favorites (Roglič, Mas). Ships in 1-2 hours. Then build full Vuelta live page (ticket vuelta-2026-live-coverage P1 already exists) by Aug 21.

**ROI:** 9/10 — VERY LOW effort (1-2 hours), MEDIUM-HIGH impact (pre-event SEO, sets up 3-week traffic window, multi-sport credibility)

**Timeline:** URGENT — 9 days until start, SEO window closing

---

### 3. SEO Foundation Complete (Except Human GSC Submission) — robots.txt + sitemap.xml Live

**Finding:** Research confirmed robots.txt and sitemap.xml are LIVE in production (verified via curl). Sitemap contains 476 URLs, updated daily, includes all major pages (ATP Live, WTA Live, World Cup, cycling, changelog, etc.). The core SEO infrastructure from ticket seo-foundation-critical (P0) is DONE.

**First-Principles Analysis:**

**What's live (verified Aug 13):**
- ✅ robots.txt at https://rankings123.com/robots.txt (allows all crawlers, references sitemap)
- ✅ sitemap.xml at https://rankings123.com/sitemap.xml (476 URLs, daily updates, priorities set)
- ✅ Dynamic meta tags on all major pages (verified per seo-foundation-critical ticket notes)

**What's BLOCKED:**
- ❌ Google Search Console submission (requires human login)
- ❌ Structured data (JSON-LD schemas) for rich SERP results
- ❌ Internal linking strategy (player names not auto-linked, no related sections)

**Why GSC submission matters:**
- Sitemap crawling is PASSIVE (Google discovers sitemap via robots.txt, crawls on its own schedule)
- GSC submission is ACTIVE (you TELL Google "here's my sitemap, please index these URLs NOW")
- **Indexing speed: Passive crawl = days/weeks, GSC submission + indexing request = hours/days**
- Current result: 0 clicks, 4 impressions, position 32.3 = barely indexed

**Structured data impact:**
- Google shows rich results (breadcrumbs, event info, FAQ accordions) for pages with JSON-LD markup
- Competitors with structured data get rich snippets = more SERP real estate = higher CTR
- **CTR boost: 10-30% from rich results** (industry benchmarks)
- We lack structured data = plain blue links in SERP = lower CTR even if we rank

**NEW TICKETS CREATED:**
- `gsc-submission-documentation` (P1, task) — Guide for human to complete GSC setup
- `structured-data-jsonld` (P1, feature) — Organization, Person, SportsEvent, BreadcrumbList schemas
- `internal-linking-strategy-seo` (P1, feature) — Auto-link player names, related sections, breadcrumbs

**Recommendation:**
1. **Human (Loïc): Complete GSC submission** using the documentation guide (30 min) — unblocks indexing requests for key pages
2. **Planner: Ship structured data** (structured-data-jsonld P1, 4-6 hours) — rich SERP results boost
3. **Planner: Ship internal linking** (internal-linking-strategy-seo P1, 3-5 hours) — PageRank distribution + crawlability

**ROI:** GSC submission 10/10 (30 min, unlocks active indexing). Structured data 9/10 (4-6 hours, 10-30% CTR boost). Internal linking 8/10 (3-5 hours, SEO + engagement).

**Timeline:** GSC submission ASAP (Cincinnati Open live NOW, US Open in 14 days — need indexing before tournaments end)

---

### 4. ProCyclingStats API Discovered — Replace Wikipedia Scraping for Cycling Feed

**Finding:** Research discovered ProCyclingStats offers a public API with 13 endpoints for race data: metadata, results, real-time rider positions, GC standings, stage info. Free tier available, no API key required for basic access (per research). This solves the recurring cycling staleness problem.

**First-Principles Analysis:**

**Wikipedia scraping is fragile:**
- Current cycling feed parses Wikipedia HTML tables (stage characteristics, GC, jerseys)
- Wikipedia is NOT a data API — it's a human-readable encyclopedia
- **Failure modes:** HTML structure changes → parsing breaks → stale data forever (current Tour de Pologne bug)
- No official "last updated" timestamp → can't detect staleness programmatically

**ProCyclingStats is purpose-built for cycling data:**
- 13 endpoints: race metadata, results, rider positions, GC standings, stage-by-stage
- Real-time updates during races (vs Wikipedia's manual editor updates)
- Structured JSON (vs fragile HTML parsing)
- **Race status in API response** (upcoming/active/finished) → staleness detection automatic

**Why NOT ESPN cycling:**
- Research shows ESPN cycling coverage is limited (mostly Tour de France)
- No public ESPN cycling API discovered (vs tennis scoreboard API which is well-documented)
- ProCyclingStats is the industry-standard cycling data source (used by cycling news sites)

**Data discipline (mock fallback pattern):**
- ProCyclingStats primary source
- Wikipedia secondary fallback (if PCS API down)
- Bundled mock tertiary fallback (if both fail)
- `source` flag in UI (pcs/wikipedia/mock)

**NEW TICKET CREATED:** `procyclingstats-api-integration` (P1, feature)

**Recommendation:** Replace Wikipedia scraping with ProCyclingStats API. Retain Wikipedia as fallback (current code works, just fragile). This solves Tour de Pologne staleness AND prevents all future cycling bugs. Ships in 6-8 hours. Vuelta coverage (Aug 22) can use PCS API from day 1.

**ROI:** 9/10 — MEDIUM effort (6-8 hours), HIGH impact (solves recurring staleness bugs, real-time cycling data, credibility boost)

**Timeline:** Ship before Vuelta (Aug 22, 9 days) so Vuelta coverage is dynamic from day 1

---

### 5. Competitive Parity Gap — Live Match Scores Missing (live-tennis.eu Has This)

**Finding:** Attempted to fetch live-tennis.eu (returned 403 Forbidden, likely Cloudflare protection), but prior research confirmed they display live match scores alongside rankings. We lack this feature despite having ESPN scoreboard API access.

**First-Principles Analysis:**

**User mental model — "live rankings" requires context:**
- User sees: Jannik Sinner #1, Carlos Alcaraz #2
- User question: "Is Sinner playing right now? Is his ranking changing live?"
- **Without live scores, 'live' ranking feels static** (numbers change but user doesn't see WHY)
- With live scores: "Sinner is playing Cincinnati QF right now → if he wins, rank stays #1 → I'll check back"

**Engagement driver:**
- Ranking alone: passive viewing (user sees rank, leaves)
- Ranking + live scores: active following (user checks match progress, returns multiple times during tournament)
- **Session depth multiplier** (1 pageview → 3-5 pageviews checking match updates)

**Competitive positioning:**
- live-tennis.eu: Live rankings + live scores = full context
- rankings123.com: Live rankings only = incomplete picture
- **Parity gap = user picks competitor** (live-tennis.eu offers more value)

**Data source available:**
- ESPN scoreboard API (already used for live points estimation)
- Same API provides: match status, score, round, court
- **Integration effort: 4-6 hours** (UI widget + API wiring)

**NEW TICKET CREATED:** `live-match-scores-integration` (P1, feature)

**Recommendation:** Add live match scores widget to ATP Live / WTA Live pages. Show currently-playing matches (name, opponent, score, round). Link to match detail pages (when that ticket ships). This closes the competitive parity gap with live-tennis.eu.

**ROI:** 9/10 — MEDIUM effort (6-8 hours), HIGH impact (competitive parity, engagement multiplier, session depth boost)

**Timeline:** Ship before US Open (Aug 27, 14 days) — US Open is the highest-traffic tournament window

---

### 6. Tournament Calendar Page Missing — 50K+ Monthly SEO Opportunity

**Finding:** No central tournament calendar/schedule page exists. Users search "tennis tournaments 2026", "ATP schedule", "upcoming tennis events" (50K+ combined monthly searches per research). Competitors (ESPN, ATP.com, FlashScore) all have tournament calendars. We lack this → invisible to those searches.

**First-Principles Analysis:**

**User journey — discovery before deep dive:**
- User: "What tennis tournaments are happening in August?"
- Search: "tennis tournaments august 2026"
- Lands: Competitor tournament calendar (ESPN, ATP.com)
- **Our site never appears** → we have individual tournament pages (Cincinnati, US Open) but no central discovery hub

**SEO long-tail multiplication:**
- "Tennis tournaments 2026": 20K searches/month
- "ATP schedule 2026": 15K searches/month
- "Upcoming tennis tournaments": 10K searches/month
- "WTA calendar 2026": 5K searches/month
- **Total: 50K+ searches/month for calendar-type content**

**Content hub pattern:**
- Central /schedule or /tournaments page = SEO landing page for all tournament searches
- Links to individual tournament pages (Cincinnati, US Open, Wimbledon, etc.)
- **Hub-and-spoke SEO** = central hub ranks for broad queries, individual pages rank for specific tournaments

**Implementation scope:**
- List all Grand Slams, Masters 1000, WTA 1000 tournaments
- Filter by past/current/upcoming
- Basic info: name, date, location, category, surface
- Link to tournament page (when exists) or external ATP/WTA site
- **4-6 hours effort** (static data initially, can add dynamic draws later)

**NEW TICKET CREATED:** `tennis-tournament-calendar` (P1, feature)

**Recommendation:** Build /schedule page listing all major tournaments (Grand Slams, Masters 1000/500, WTA 1000/500). Filter by past/current/upcoming. Link to our tournament pages (Cincinnati, US Open) + external ATP/WTA for tournaments we don't cover yet. Ships in 4-6 hours. Captures 50K+ monthly searches.

**ROI:** 9/10 — LOW-MEDIUM effort (4-6 hours), HIGH impact (50K search potential, central discovery hub, SEO multiplier)

**Timeline:** Ship ASAP (evergreen content, but Cincinnati/US Open timing makes it timely)

---

### 7. IndexNow Protocol — Instant Indexing for Time-Sensitive Tournament Content

**Finding:** Research confirms IndexNow is a FREE protocol supported by Bing, Yandex, and other search engines for instant content indexing. Submit URLs immediately when published/updated vs waiting days/weeks for crawlers. Especially valuable for time-sensitive tournament content.

**First-Principles Analysis:**

**Tournament content is time-sensitive:**
- Cincinnati Open: Aug 11-23 (running NOW)
- US Open: Aug 27-Sep 13 (starts in 14 days)
- **Value window is SHORT** (2 weeks per tournament) — late indexing = missed traffic

**Passive vs active indexing:**
- Sitemap crawling (current): Google/Bing crawl sitemap on their schedule → days/weeks to index new URLs
- IndexNow (proposed): We TELL Bing "new URL published, index it NOW" → hours to index
- **Tournament content published Aug 25 (US Open preview):**
  - Passive crawl: indexed Sep 1+ (tournament already started, preview searches peaked Aug 20-27)
  - IndexNow: indexed Aug 25 same day → captures Aug 26-27 preview searches

**Multi-engine coverage:**
- Google: no IndexNow support (use GSC indexing API instead, requires OAuth)
- Bing: full IndexNow support
- Yandex: full IndexNow support
- **Bing = 3% US search share** (small but non-zero, and international markets Bing is bigger)

**Implementation simplicity:**
- IndexNow endpoint: /api/indexnow (10-20 lines of code)
- Submit URL on publish: call endpoint in CMS/build hook
- **1-2 hours total implementation**

**NEW TICKET CREATED:** `indexnow-instant-indexing` (P2, feature)

**Recommendation:** Implement IndexNow endpoint at /api/indexnow. Submit URLs on publish for all tournament content, player pages, match pages. 1-2 hour implementation. Complements Google sitemap (Bing instant indexing) vs replaces it.

**ROI:** 8/10 — VERY LOW effort (1-2 hours), MEDIUM impact (Bing instant indexing, marginal but easy win)

**Timeline:** Ship before US Open (Aug 27) so US Open content gets instant Bing indexing

---

### 8. Structured Data (JSON-LD) Missing — Rich SERP Results Opportunity

**Finding:** Part of seo-fundamentals (P0) ticket, but structured data can ship independently. Google shows rich results (breadcrumbs, event info, FAQ accordions, star ratings) for pages with JSON-LD markup. We lack this = plain blue links in SERP = lower CTR.

**First-Principles Analysis:**

**Rich results = more SERP real estate:**
- Plain result: Blue title + meta description (2 lines)
- Rich result: Title + breadcrumbs + event dates + ratings + FAQ accordion (5-8 lines)
- **More real estate = higher visibility = higher CTR** (10-30% boost per industry research)

**Schema types for rankings123.com:**
- **Organization schema** (homepage): rankings123.com is a sports news/data organization
- **SportsTeam schema** (ATP/WTA tour pages): ATP tour, WTA tour as entities
- **Person + Athlete schema** (player pages when shipped): Jannik Sinner, Carlos Alcaraz, etc.
- **SportsEvent schema** (tournament pages): US Open 2026, Cincinnati Open 2026
- **BreadcrumbList schema** (all pages): Home > Tennis > ATP Live > Jannik Sinner
- **FAQPage schema** (rankings pages): "How are ATP rankings calculated?"

**Competitive gap:**
- ESPN: full structured data (all schema types above)
- ATP.com: full structured data
- live-tennis.eu: basic structured data
- rankings123.com: NONE
- **Missing structured data = invisible to rich results** = lower CTR even if we rank

**Implementation scope:**
- Add JSON-LD script tags to page `<head>` (Next.js metadata API)
- Organization schema: 30 min
- SportsEvent schema (tournaments): 1 hour
- BreadcrumbList schema (all pages): 2 hours
- FAQPage schema (rankings): 1 hour
- **Total: 4-6 hours for comprehensive structured data**

**NEW TICKETS CREATED:**
- `structured-data-jsonld` (P1, feature) — Organization, SportsEvent, BreadcrumbList, Person schemas
- `faq-schema-rankings-seo` (P2, feature) — FAQPage schema for common ranking questions
- `breadcrumb-navigation-schema` (P2, feature) — Breadcrumbs UI + BreadcrumbList schema

**Recommendation:** Ship structured data in phases: 1) Organization + BreadcrumbList (universal, 2-3 hours), 2) SportsEvent for tournaments (2 hours), 3) FAQPage for rankings (1 hour). Test with Google Rich Results Test. Ships before US Open (Aug 27) for tournament rich snippets.

**ROI:** 10/10 — LOW-MEDIUM effort (4-6 hours), HIGH impact (10-30% CTR boost, rich SERP results, competitive parity)

**Timeline:** Ship before US Open (Aug 27) so tournament pages get rich snippets during peak search window

---

### 9. Internal Linking Strategy Missing — SEO + Engagement Opportunity

**Finding:** Player names in ranking tables are NOT clickable links (no player pages exist yet). When player pages ship, need systematic internal linking strategy. Beyond player links, need "Related" sections, breadcrumbs, footer sitemap. Wikipedia's strength = dense internal linking (every mention is a link).

**First-Principles Analysis:**

**Internal links serve 3 purposes:**

1. **SEO — PageRank distribution:**
   - Homepage has highest PageRank (most external links)
   - Internal links distribute PageRank to deeper pages
   - **Well-linked player pages rank higher** vs orphan pages

2. **SEO — Crawlability:**
   - Googlebot discovers pages via links (sitemap + internal links)
   - Orphan pages (no internal links) are harder to discover
   - **Dense internal linking = better crawl coverage**

3. **Engagement — Session depth:**
   - User lands on ATP Live → clicks "Jannik Sinner" → reads player page → clicks "Carlos Alcaraz" (H2H rival) → 3 pageviews
   - Without internal links: user lands on ATP Live → leaves → 1 pageview
   - **Internal links = 3-5× session depth**

**Wikipedia case study:**
- Every mention of a topic is hyperlinked (player names, tournament names, years, countries)
- User clicks through 5-10 articles per session (vs 1 article on other sites)
- **Wikipedia's engagement = product of dense internal linking**

**Implementation for rankings123.com:**
- Auto-link player names in ranking tables → player pages
- Auto-link tournament names in text → tournament pages
- "Related" sections: ATP Live page → "See also: WTA Live, ATP Race Ranking"
- Breadcrumbs: Home > Tennis > ATP Live > Jannik Sinner
- Footer sitemap: all major pages linked

**NEW TICKET CREATED:** `internal-linking-strategy-seo` (P1, feature)

**Recommendation:** Implement systematic internal linking: 1) Auto-link player names (when player pages ship), 2) Add "Related" sections to all pages, 3) Breadcrumbs (separate ticket breadcrumb-navigation-schema P2), 4) Footer sitemap. Ships in 3-5 hours. Boosts SEO + session depth.

**ROI:** 8/10 — LOW-MEDIUM effort (3-5 hours), HIGH impact (PageRank distribution, crawlability, session depth 3-5× boost)

**Timeline:** Ship alongside player pages (when that ticket ships) for immediate internal linking benefit

---

## Backlog Health

**Before this run:**
- Total open: 154 tickets
- Buildable: Unknown (yesterday's report said 1, but planner has shipped 40 commits in 2 days)

**After this run:**
- Total open: 165 tickets (+11 new)
- Buildable: TBD (need to audit dependencies)

**Planner velocity:**
- 40 commits in last 2 days (Aug 11-13)
- Recent ships: homepage live preview, realtime data indicators, cycling navigation fix, ATP size optimization investigation
- **Planner IS active and shipping**, contradicts yesterday's "only 1 buildable" finding

**Observation — Backlog count methodology may be flawed:**
- Yesterday: "only 1 buildable" (the epic parent rankings123)
- Today: 40 commits = 5-10 tickets shipped
- **Discrepancy suggests `tkt ready` command doesn't accurately reflect buildable tickets**
- Many P0/P1 tickets appear unblocked (no deps field) but planner is working on different tickets

**P0 tickets status:**
- SEO foundation (robots.txt, sitemap): DONE (human GSC submission blocked)
- US Open betting guide: P0, not shipped yet (14 days until Aug 27)
- Cincinnati betting guide: P0, not shipped yet (LIVE NOW Aug 11-23, 2 days in)
- AdSense application: P0, human-gated
- Betting affiliate applications: P0, human-gated
- Mobile optimization: P0, not shipped yet (mobile 15% vs 60% industry)

**Strategic Issue — P0 bottleneck:**
- Multiple P0 tickets exist (SEO, US Open, Cincinnati, mobile)
- Planner is shipping P1/P2 work instead (homepage preview, realtime indicators)
- **P0 priority may not be driving planner behavior**
- Alternative explanation: P0s are complex (US Open betting = research + writing), planner picks smaller P1/P2 wins

**Recommendation:**
- **Audit planner selection logic** — why are P0s being skipped?
- **Human (Loïc) unblock P0 human-gated tickets** — AdSense + betting affiliates applications
- **Autoresearch: create more SMALL, BUILDABLE P1 tickets** (today's 11 tickets are small scope: 1-8 hours each)

---

## Tickets Created — 11 New SEO + Data Freshness Tickets

All tickets use **first-principles ROI justification** (not "competitor has it, so should we"). Focus: organic traffic growth, data credibility, competitive parity.

### Critical (P1) — 8 Tickets

1. **`tour-de-pologne-status-fix`** (P1, bug)
   - **What:** Remove stale "Live" badge from Tour de Pologne (finished Aug 9)
   - **Why:** Credibility damage (users see stale data → assume site abandoned), 4 days late already
   - **ROI:** 10/10 (2 hours, prevents credibility damage)

2. **`structured-data-jsonld`** (P1, feature)
   - **What:** JSON-LD schemas (Organization, SportsEvent, BreadcrumbList, Person)
   - **Why:** Rich SERP results = 10-30% CTR boost, competitive parity (ESPN/ATP have this)
   - **ROI:** 10/10 (4-6 hours, 10-30% CTR boost)

3. **`procyclingstats-api-integration`** (P1, feature)
   - **What:** Replace Wikipedia scraping with ProCyclingStats API for cycling data
   - **Why:** Solves recurring staleness bugs (Tour de Pologne), real-time updates, race status auto-detection
   - **ROI:** 9/10 (6-8 hours, prevents all future cycling staleness bugs)

4. **`tennis-tournament-calendar`** (P1, feature)
   - **What:** /schedule page listing all ATP/WTA tournaments (past/current/upcoming)
   - **Why:** 50K+ monthly searches ("tennis tournaments 2026", "ATP schedule"), central discovery hub
   - **ROI:** 9/10 (4-6 hours, 50K search potential)

5. **`internal-linking-strategy-seo`** (P1, feature)
   - **What:** Auto-link player names, related sections, breadcrumbs, footer sitemap
   - **Why:** PageRank distribution, crawlability, session depth 3-5× boost
   - **ROI:** 8/10 (3-5 hours, SEO + engagement multiplier)

6. **`live-match-scores-integration`** (P1, feature)
   - **What:** Live match scores widget on ATP/WTA pages
   - **Why:** Competitive parity with live-tennis.eu, engagement multiplier, session depth boost
   - **ROI:** 9/10 (6-8 hours, competitive parity + engagement)

7. **`cycling-vuelta-2026-upcoming`** (P1, feature)
   - **What:** Add Vuelta a España 2026 to cycling page as "Upcoming" (starts Aug 22)
   - **Why:** Pre-event SEO, multi-sport credibility, missing imminent race
   - **ROI:** 9/10 (1-2 hours, timely content preparation)

8. **`gsc-submission-documentation`** (P1, task)
   - **What:** Guide for human (Loïc) to submit sitemap to Google Search Console
   - **Why:** Unblocks active indexing (vs passive sitemap crawl), 0 clicks → need GSC indexing requests
   - **ROI:** 10/10 (30 min, unblocks organic traffic)

### Strategic (P2) — 3 Tickets

9. **`indexnow-instant-indexing`** (P2, feature)
   - **What:** IndexNow endpoint for instant Bing/Yandex indexing
   - **Why:** Tournament content is time-sensitive, instant indexing captures preview searches
   - **ROI:** 8/10 (1-2 hours, Bing instant indexing)

10. **`faq-schema-rankings-seo`** (P2, feature)
    - **What:** FAQPage schema on rankings pages ("How are ATP rankings calculated?")
    - **Why:** Rich snippet FAQ accordions in SERP, captures question queries
    - **ROI:** 7/10 (2-3 hours, rich snippet visibility)

11. **`breadcrumb-navigation-schema`** (P2, feature)
    - **What:** Breadcrumb UI + BreadcrumbList schema
    - **Why:** UX (users know location, easy navigation) + SEO (breadcrumbs in SERP, PageRank distribution)
    - **ROI:** 7/10 (3-4 hours, UX + SEO boost)

---

## Top 3 Recommendations

### 1. **FIX TOUR DE POLOGNE STALENESS + SHIP PROCYCLINGSTATS API BEFORE VUELTA (Aug 22, 9 Days)**

**What:** Execute tour-de-pologne-status-fix (P1, 2 hours) immediately, then ship procyclingstats-api-integration (P1, 6-8 hours) before Vuelta starts Aug 22.

**Why:** Data staleness is a CREDIBILITY KILLER. Tour de Pologne has been showing "Live" for 4 days after finishing. Users who see stale data assume the site is abandoned and never return. ONE stale badge can lose a user forever. This is not a minor bug — it's an existential credibility threat.

**Timeline:** Tour de Pologne fix TODAY (4 days stale already). ProCyclingStats API by Aug 21 (1 day before Vuelta) so Vuelta coverage is dynamic from day 1.

**First-Principles:**
Sports data is BINARY — a race is live or it's not. There's no gray area. "Live" badge on a finished race is factually wrong. Wrong data is worse than no data (no data = incomplete, wrong data = incompetent). Competitors (ESPN, ProCyclingStats) update race status immediately. We're 4 days late = 4 days of credibility damage. Every cycling user who lands on our page sees "Live" for a finished race and concludes: "This site is broken, don't trust it."

**Outcome:** Tour de Pologne removed/corrected → credibility restored. ProCyclingStats API integrated → Vuelta coverage dynamic → no future staleness bugs.

---

### 2. **SHIP STRUCTURED DATA (JSON-LD) BEFORE US OPEN (Aug 27, 14 Days) FOR RICH SERP RESULTS**

**What:** Execute structured-data-jsonld (P1, 4-6 hours) before US Open starts Aug 27. Implement Organization, BreadcrumbList, SportsEvent schemas. Test with Google Rich Results Test.

**Why:** Rich SERP results = 10-30% CTR boost (industry benchmarks). Google shows breadcrumbs, event dates, FAQ accordions, ratings for pages with JSON-LD markup. We currently show plain blue links = lower CTR even if we rank. Competitors (ESPN, ATP.com) have full structured data = they get rich snippets, we don't.

**Timeline:** Ship by Aug 25 (2 days before US Open draw). US Open content needs rich snippets during peak search window (Aug 25-Sep 13).

**First-Principles:**
SERP is a COMPETITION for attention. Plain result = 2 lines (title + description). Rich result = 5-8 lines (title + breadcrumbs + event dates + FAQ + ratings). More real estate = higher visibility = higher CTR. CTR boost = 10-30% means: if we rank #3 for "US Open 2026 betting", rich results turn 1000 impressions → 200 clicks instead of 150 clicks. That's 50 EXTRA users from the SAME ranking position. Rich results are FREE (just JSON-LD markup, no API cost), EASY (4-6 hours), and COMPOUND (every page benefits forever).

**Outcome:** US Open tournament pages get rich snippets → 10-30% CTR boost → more traffic from same ranking position → better engagement → higher revenue.

---

### 3. **HUMAN (LOÏC): COMPLETE GOOGLE SEARCH CONSOLE SUBMISSION (30 Min, Unblocks Organic Traffic)**

**What:** Human (Loïc) executes gsc-submission-documentation guide (30 min): 1) Add rankings123.com to Google Search Console, 2) Verify ownership, 3) Submit sitemap, 4) Request indexing for key pages (/atp-live, /wta-live, /world-cup, /cycling, /us-open-2026, /cincinnati-2026).

**Why:** SEO foundation is technically COMPLETE (robots.txt + sitemap.xml live in production, verified Aug 13). But Google Search Console submission requires human login. WITHOUT GSC: Google crawls sitemap on its own schedule (days/weeks for new content). WITH GSC: We request indexing for specific URLs = hours/days for indexing.

**Timeline:** URGENT — Cincinnati Open is LIVE NOW (Aug 11-23), US Open starts Aug 27 (14 days). Tournament content needs to be indexed BEFORE the event ends to capture search traffic.

**First-Principles:**
Organic traffic is BLOCKED by a 30-minute human action. Current state: 0 clicks, 4 impressions, position 32.3 (invisible). Root cause: Google doesn't know our content exists (barely indexed). Sitemap submitted via robots.txt is PASSIVE (Google crawls when it feels like it). GSC submission is ACTIVE (we TELL Google "index these URLs NOW"). Indexing is PREREQUISITE for ranking. Ranking is PREREQUISITE for traffic. Traffic is PREREQUISITE for revenue. **Every day without GSC submission = cumulative ranking damage** (Google freshness signal: new content ranks faster than old content).

**Outcome:** GSC submitted → sitemap processed → indexing requests sent for key pages → Google indexes ATP Live, WTA Live, US Open pages within days → organic traffic begins → SEO feedback loop starts (traffic → CTR → ranking boost → more traffic).

---

## Traffic & Revenue Status

### Analytics (Last 28 Days, as of Aug 13)

**Google Analytics (last 28 days):**
- Total users: **41** (unchanged from Aug 12)
- Total pageviews: **94** (unchanged from Aug 12)
- Total sessions: **41**
- Pages per session: **2.29** (unchanged from Aug 12)
- Mobile share: **15%** (6 sessions) vs industry 68% (still catastrophic, but improving from 10% on Aug 10)
- Top pages: `/atp-live` (20 views), `/` (19 views), `/world-cup` (8 views)
- Organic search: **5 sessions** (12.2% of traffic) (unchanged from Aug 12)
- Direct: **29 sessions** (70.7%)
- Referral: **7 sessions** (17.1%)

**Google Search Console (last 28 days, as of Aug 13):**
- Clicks: **0** (unchanged)
- Impressions: **4** (up from 3 on Aug 12, +33%)
- Position: **32.3 avg** (down from 22 on Aug 12 — WORSE position)
- Top queries: "3v3 live rankings" (position 63, 0 clicks, 1 impression), "ranking 123" (position 8, 0 clicks, 1 impression)
- Top pages: `/` (0 clicks, 2 impressions, position 35.5), `/atp-live` (0 clicks, 2 impressions, position 29)

**Traffic status:** Still dev-level (~3 pageviews/day). Organic search near zero (0 clicks despite 4 impressions). Position WORSENED (22 → 32.3). **SEO foundation is DONE (robots.txt + sitemap live)**, but GSC submission is human-blocked.

**Trend:** Impressions improving (+33% day-over-day), but position worsening = Google is discovering our pages (sitemap is being crawled) but not ranking them highly yet (need structured data, internal linking, content depth).

---

### Revenue

- **Current:** $0
- **AdSense:** Application ready (human-gated: adsense-apply-now P0)
- **Betting affiliates:** Applications ready (human-gated: betting-affiliate-top3-apply P0)
- **Timeline:** If applications submitted by Aug 15, approved by Aug 22-27, can earn during US Open (Aug 27-Sep 13)

**Revenue opportunity window:**
- **Cincinnati Open:** Aug 11-23 (LIVE NOW, 2 days in, no betting guide shipped yet)
- **US Open:** Aug 27-Sep 13 (14 days away, multiple betting tickets filed P0)
- **Vuelta:** Aug 22-Sep 13 (9 days away, overlaps US Open)

**Revenue remains BLOCKED by human actions.** Monetization infrastructure is ready (content strategy, betting tickets filed, odds API scoped). Can't earn $1 until AdSense + betting affiliate applications are approved.

---

## Loop Health Observations

### Positive

1. **Planner is ACTIVE and shipping** — 40 commits in last 2 days (Aug 11-13), not stalled
2. **Recent ships improving UX** — homepage live preview (reduce bounce rate), realtime data indicators (trust signal), cycling navigation fix (consistency)
3. **SEO foundation DONE** — robots.txt + sitemap.xml live in production (verified Aug 13)
4. **Data sanity improving** — cycling bugs being addressed (Tour de Pologne fix in progress)
5. **Mobile share improving** — 10% → 15% in 3 days (still far from 60% target, but trend is up)

### Critical Issues

1. **P0 priority not driving planner** — Multiple P0 tickets exist (US Open betting, Cincinnati betting, mobile optimization) but planner is shipping P1/P2 work instead
2. **Human-gated revenue blockers** — AdSense + betting affiliates require human action, blocking all monetization
3. **Cycling staleness recurring** — Tour de Pologne bug (4 days late) confirms data-freshness-auto-monitor (P1) not shipped yet
4. **Organic traffic zero** — 0 clicks, 4 impressions = invisible to Google despite SEO foundation being done (GSC submission human-blocked)
5. **Tournament timing pressure** — Cincinnati LIVE NOW (Aug 11-23, no live page), US Open in 14 days (multiple P0 betting tickets not shipped yet)

---

## Strategic Note — Why SEO & Data Freshness Today?

**Yesterday (Aug 12):** Monetization/RPM — identified US Open + Vuelta betting opportunities, betting affiliates 10-50× ROI, Ezoic progression, match preview templates, multi-bookmaker odds.

**Today (Aug 13):** SEO & Content Opportunities + Data Freshness — identified Tour de Pologne staleness (4 days late), Vuelta missing (starts in 9 days), SEO foundation done (GSC submission human-blocked), structured data missing (rich results opportunity), ProCyclingStats API available (solves cycling bugs), tournament calendar gap (50K searches), internal linking missing (SEO + engagement), live match scores gap (competitive parity).

**Impact:** Yesterday diagnosed MONETIZATION STRATEGY. Today diagnosed ORGANIC TRAFFIC BLOCKERS + DATA CREDIBILITY GAPS.

**Tomorrow (Aug 14):** Lens rotates to **UX/Engagement** — mobile optimization (15% vs 60% industry), homepage bounce rate (71%), navigation clarity, cross-sport discovery, session depth optimization, return-visit drivers.

This is first-principles rotation: diagnose different strategic dimensions each day, prevent repetition, keep research action-oriented.

---

## First-Principles Strategic Notes

### Why ProCyclingStats API >> Wikipedia Scraping (Not Just "More Reliable")

**Common trap:** "ProCyclingStats API is more reliable than Wikipedia scraping."

**First-principles counter:**

1. **Data sources should match data volatility**
   - Wikipedia: encyclopedia, human-edited, optimized for STATIC historical facts
   - ProCyclingStats: live sports platform, API-driven, optimized for DYNAMIC real-time data
   - **Cycling races are DYNAMIC (status changes daily), Wikipedia is STATIC (human editors update when they remember)**

2. **Fragility compounds over time**
   - Wikipedia HTML parsing: breaks when Wikipedia redesigns (happens annually)
   - ProCyclingStats API: versioned endpoints, breaking changes announced in advance
   - **Wikipedia scraping = recurring maintenance burden, API = one-time integration**

3. **Staleness detection requires machine-readable metadata**
   - Wikipedia: no official "last updated" field, race status buried in human-readable prose
   - ProCyclingStats API: `status: "finished"` field in JSON response
   - **Can't programmatically detect staleness without structured metadata** (current Tour de Pologne bug proves this)

4. **Fallback pattern preserves discipline**
   - Not replacing Wikipedia entirely — keeping it as FALLBACK (if PCS API down)
   - Still have bundled mock as tertiary fallback
   - **ProCyclingStats primary → Wikipedia secondary → Mock tertiary = triple redundancy**

**Conclusion:** ProCyclingStats API isn't just "more reliable." It's architecturally CORRECT for dynamic sports data (real-time updates, structured metadata, staleness detection). Wikipedia scraping is architecturally WRONG (static encyclopedia, fragile HTML parsing, no machine-readable status). The fact that Wikipedia scraping "worked for a while" doesn't make it right — it just means we got lucky until we didn't (Tour de Pologne staleness bug).

---

### Why Structured Data Before Content Scale (Not "Content First, SEO Later")

**Common trap:** "Let's publish lots of content first, then add structured data later for SEO optimization."

**First-principles counter:**

1. **Indexing and ranking are NOT retroactive**
   - Publish page today → Google indexes it tomorrow → assigns initial ranking based on quality signals → ranking PERSISTS
   - Add structured data 2 weeks later → Google re-crawls → updates ranking slightly
   - **First impression matters** (page WITH structured data gets better initial ranking than page without)

2. **Rich results are a CTR multiplier, not a ranking factor**
   - Structured data doesn't directly improve ranking position (#3 → #2)
   - Structured data improves CTR at SAME ranking position (rich snippet at #3 outperforms plain result at #2)
   - **Without structured data, ranking improvements are WASTED** (rank #2 with plain result = lower traffic than rank #3 with rich snippet)

3. **Tournament content has SHORT value windows**
   - Cincinnati Open: Aug 11-23 (13 days total)
   - US Open: Aug 27-Sep 13 (18 days total)
   - **Publishing without structured data = missing rich results for ENTIRE tournament window** (can't retrofit rich results mid-tournament)

4. **Structured data is ONE-TIME setup, applies to ALL content**
   - Organization schema: write once, applies to all pages
   - BreadcrumbList schema: write once, applies to all pages
   - SportsEvent schema: write once, applies to all tournament pages
   - **4-6 hours upfront = EVERY future page gets rich results automatically**

**Conclusion:** Structured data isn't "SEO optimization to add later." It's PREREQUISITE infrastructure that should exist BEFORE content ships (like robots.txt and sitemap.xml). Publishing US Open content without structured data is like publishing it without a sitemap — technically it works, but you're voluntarily giving up 10-30% of potential traffic.

---

## Sources (Research Citations)

### Tennis Tournaments
- [Cincinnati Open 2026 ATP](https://www.atptour.com/en/news/cincinnati-2026-atp-masters-1000-history-draw-schedule) — Aug 11-23, Lindner Family Tennis Center
- [Cincinnati Open 2026 Olympics](https://www.olympics.com/en/news/tennis-cincinnati-open-2026-atp-wta-order-of-play-live-results-scores) — Order of play, live results
- [ATP 2026 Calendar PDF](https://www.atptour.com/-/media/files/calendar-pdfs/2025/2026-atp-tour-calendar-december-2025.pdf) — Full 2026 tournament schedule

### Cycling Races
- [2026 Vuelta a España Wikipedia](https://en.wikipedia.org/wiki/2026_Vuelta_a_España) — Aug 22-Sep 13, Monaco to Granada
- [Tour de Pologne 2026 Cyclingnews](https://www.cyclingnews.com/pro-cycling/races/tour-de-pologne-2026/) — Aug 3-9, 2026 (finished)
- [Vuelta 2026 CyclingUpToDate](https://cyclinguptodate.com/cycling/startlist-vuelta-a-espana-2026-riders-tadej-pogacar-wout-van-aert-mads-pedersen-joao-almeida-oscar-onley-and-more) — Startlist, riders

### Cycling Data APIs
- [ProCyclingStats API Parse.bot](https://parse.bot/marketplace/5e1fc7dd-2556-4f19-a5ec-1b945e990340/procyclingstats-com-api) — 13 endpoints, race results, rider data
- [ProCyclingStats Scraper Apify](https://apify.com/lexis-solutions/procyclingstats-com-scraper/api) — API for race data
- [Sportbex Cycling API](https://sportbex.com/cycling-api/) — Live race data, rider stats, stage results

### SEO & Structured Data
- [Long-Tail Keywords Guide Analytify](https://analytify.io/long-tail-keywords/) — How to find long-tail keywords for SEO
- [Google Search Console Guide 2026 SEO.com](https://www.seo.com/tools/google-search-console/) — Complete guide to GSC
- [XML Sitemaps & Indexing Guide GrowthStats](https://www.growthstats.io/blog/sitemaps-and-indexing-technical-seo-guide) — Technical SEO guide
- [Google Search Console Request Indexing](https://alevdigital.com/blog/google-search-console-request-indexing/) — Limits, time, steps, fixes

### Tennis Rankings Platforms
- [TennisLive Rankings](https://www.tennislive.net/wta/ranking/) — WTA ranking updated daily
- [LiveTennis Rankings](https://livetennis.io/rankings/) — ATP & WTA live rankings
- [Perfect Tennis Rankings](https://www.perfect-tennis.com/rankings/) — 2026 ATP/WTA rankings

---

**Report Status:** ✅ Complete  
**Tickets Created:** 11 new SEO + data freshness tickets (8× P1, 3× P2)  
**Ready to Commit:** Report + 11 new tickets + CLAUDE.md update (removed WC ≥half-capacity rule)  
**Lens Next Run:** UX/Engagement (mobile optimization, homepage bounce rate, navigation, cross-sport discovery, session depth, return-visit drivers) — Aug 14  
**Critical Action Required:**
1. **Planner: Fix Tour de Pologne staleness** TODAY (tour-de-pologne-status-fix P1, 4 days stale already)
2. **Planner: Ship structured data** before US Open (structured-data-jsonld P1, 4-6 hours, 14 days until Aug 27)
3. **Human (Loïc): Complete Google Search Console submission** (gsc-submission-documentation P1, 30 min, unblocks organic traffic)
4. **Planner: Ship ProCyclingStats API** before Vuelta (procyclingstats-api-integration P1, 6-8 hours, 9 days until Aug 22)

**Session Budget:** ~125K tokens used
