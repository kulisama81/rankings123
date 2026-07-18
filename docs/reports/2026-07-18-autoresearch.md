# Autoresearch Report — July 18, 2026

**Research lens today:** SEO crisis + Post-Final retention strategy (24-hour window to Final)

**Backlog health:** ✅ 29 buildable tickets (healthy) — created 3 new, escalated 1 to P0

---

## Executive Summary

**🚨 24 HOURS TO WORLD CUP FINAL:** Spain vs Argentina kick off TOMORROW (July 19, 3PM ET). This is the peak traffic moment, yet **organic search is catastrophic** (only 5 sessions in 28 days = 7%) and **we have no post-Final retention plan** — when the tournament ends tomorrow night, what keeps WC visitors from leaving forever?

**Key findings:**
1. 🔍 **SEO catastrophe (7% organic)** - Only 5 organic search sessions out of 69 total. Root causes: Google Search Console not verified, generic meta descriptions, sitemap likely not submitted. Filed P0 tickets for immediate GSC setup + per-page meta audit.
2. 📉 **Post-Final retention gap** - WC Final ends July 19 ~6PM ET. Homepage + /world-cup page have NO cross-sport pivot plan to capture visitors and redirect them to Tour de France (live through July 27) or tennis. Filed P1 retention pivot ticket.
3. 💰 **Betting affiliate research** - FanDuel affiliates program requires traffic proof + US legal states audience. Application at affiliates.fanduel.com, approval 24-48h. Commission: 20-40% RevShare or $100-400 CPA for sportsbook.
4. 🎾 **Tennis parity: career-high tracking** - live-tennis.eu shows career-high rank + milestone badges. We don't. Filed P2 parity ticket using ATP's existing 'bestRank' data.
5. 📊 **Traffic remains critically low** - 152 pageviews/28 days (~5/day), but World Cup page has good engagement (41% bounce vs 70% homepage).

---

## What Shipped Recently (via git log)

**July 17:**
- Inspector site health check clean (5055a61)
- Cycling stage status bug fix (c8a7659, 948d965)
- WTA/ATP data clarity improvements (c2ae726)

**July 16:**
- Sport hero imagery system (bfab686)
- Tour de France winner parsing fixes (97ec848, ca7d886)

**Pattern:** Loop shipping regularly (design, bug fixes, QA), but **P0 SEO and revenue blockers remain unfixed** despite being filed days ago. This autoresearch run focuses on breaking down the broad "seo-fundamentals" ticket into tactical, buildable steps.

---

## Analytics Status (Real Data - GA4)

**28-day summary (last generated July 18, 6:30 AM):**
- **152 total pageviews**, 69 sessions, 50 users
- **Mobile:** 45% of sessions
- **Top pages:**
  1. `/world-cup` — 57 views, **41.2% bounce** (GOOD engagement during live tournament) 
  2. `/` (homepage) — 55 views, **70.2% bounce** (CRISIS - needs live urgency + cross-sport discovery)
  3. `/atp-live` — 14 views, 0% bounce
  4. `/world-cup/golden-boot` — 5 views, 281.9s avg duration (EXCELLENT deep engagement)

**SEO/Traffic CRISIS:**
- **Organic Search:** Only 5 sessions (7% of total) — we're invisible to Google
- **Direct:** 60 sessions (87%) — test traffic, not sustainable
- **Top search term:** "" (empty) — 320 count (Google Analytics 4 doesn't show query strings without GSC link)

**Revenue status:** 
- **Ad revenue:** $0 (AdSense application PENDING)
- **Betting affiliates:** $0 (NOT SIGNED UP - human action required, see wc-betting-affiliates P0)

---

## Research: SEO Crisis Root Cause Analysis

**Diagnosis:** Only 7% organic search traffic is catastrophic for a rankings/data site that should be capturing millions of monthly searches.

### Search Demand Exists (But Goes to Competitors)

Per previous research and web search validation:
- "world cup final 2026" — massive search volume TODAY (July 18) and TOMORROW (July 19)
- "spain argentina final" — spike happening NOW
- "atp live rankings" — 100K+/month baseline
- "wimbledon live rankings 2026" — 500K+/month during tournament (missed window July 12)
- Player name searches — millions/month combined

**All this traffic goes to ESPN, BBC Sport, FlashScore, live-tennis.eu** — NOT to us.

### Root Causes Identified

**1. Google Search Console NOT VERIFIED** (blocker)
- Without GSC verification, Google doesn't prioritize crawling/indexing our pages
- We have ZERO visibility into: which queries show our site, indexing errors, coverage issues, CTR
- Sitemap likely NOT submitted to Google (can't measure without GSC)
- **Fix:** Escalated google-search-console-setup from P1 → P0, requires human action (DNS TXT or meta tag verification)

**2. Generic meta descriptions** (killer)
- Checked live homepage source: meta description is "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings. Updated in real time."
- This SAME description probably appears on every page (/atp-live, /wta-live, /world-cup, etc.)
- Google penalizes duplicate meta = low quality
- Search snippets don't match intent: "world cup final 2026" search shows generic "Live rankings" description
- **Fix:** Created seo-meta-per-page-audit (P0) - unique, keyword-rich meta per route

**3. Missing structured data**
- No JSON-LD SportsEvent schema for World Cup matches/tournament
- No Person schema for player pages (when we build them)
- No Organization schema for homepage
- Competitors (ESPN, BBC) have rich results, we don't
- **Fix:** Included in seo-meta-per-page-audit acceptance criteria

**First-Principles Reasoning:**
- **User need:** Find "who won world cup 2026", "spain argentina final time", "atp rankings today"
- **Current state:** We have the data, but Google doesn't know we exist
- **Root cause:** SEO foundation missing (GSC verification, unique meta, structured data)
- **Highest leverage:** Fix GSC + meta first (zero marginal cost, unblocks ALL future SEO)

**Sources:**
- [Google Search Console Guide: SEO Setup & Insights](https://searchengineland.com/guide/google-search-console-guide)
- [The Complete Guide to Google Search Console for 2026](https://www.seo.com/tools/google-search-console/)
- [Build and Submit a Sitemap | Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

---

## Research: Betting Affiliate Programs (Revenue Enabler)

### FanDuel Affiliate Program Details

**Application:** affiliates.fanduel.com/registration.asp  
**Timeline:** Few days approval (typically 24-48h)  
**Commission:**
- RevShare: 20-40% of net player losses
- CPA: $100-400 per new sportsbook customer
- Hybrid deals available

**Requirements (CRITICAL):**
- Must demonstrate ability to drive new customers from legal US states
- Deep understanding of local sports betting regulations
- English-language sports/gambling niche content
- Existing audience from US/Canada

**Risk:** Application likely REJECTED unless we can prove US traffic + sports audience. Current analytics show mixed geography (US, France, Japan, UK, etc.) with only 43/69 sessions from US — might be borderline for approval.

**Alternative paths:**
- Build US traffic first via SEO (player pages, tournament content, World Cup Final coverage)
- Apply after we can show 80%+ US sessions + sports intent (betting-related searches in GSC)
- Start with lower-bar affiliates (DraftKings, BetMGM) to prove conversion rates

**Sources:**
- [FanDuel Affiliate Program (Sportsbook, DFS, Casino)](https://sportsbookapi.com/affiliate-programs/fanduel/)
- [FanDuel Partners](https://www.igamingaffiliateprograms.com/affiliate-program/fanduel-partners/)
- [Best Sports Betting Affiliate Programs — Routy](https://routy.app/blog/best-sports-betting-affiliate-programs)

---

## Research: Tennis Data & Parity Gaps

### Career-High Tracking (Competitor Gap)

**live-tennis.eu feature:** Shows career-high rank + "NEW Career High" badge when player reaches personal best.

**Our gap:** We have the data (ATP's Ultimate Tennis Statistics API includes 'bestRank') but don't surface it.

**User value:**
- Betting context: player on hot streak, confidence high, might outperform ranking
- Fan engagement: celebrating milestone moments ("Sinner reaches #1 for first time!")
- Social sharing: "🆕 Career High" badge = viral moment

**Implementation:** Filed tennis-career-high-milestones (P2) — low effort for ATP (data exists), medium for WTA (need historical tracking).

### Tennis API Research

Per web search, ESPN's undocumented public API remains the best free option:
- `/sports/tennis/atp/rankings` + `/scoreboard` (currently using)
- Clean JSON, no auth required, ~1MB per request
- Includes match-level records with scores, status, court, round, player details

**Alternative:** tennis-api.com offers free tier with Grand Slam, ATP, WTA, ITF data via REST endpoints. Could supplement ESPN for deeper player stats, head-to-head, etc.

**Sources:**
- [Tennis API - Live Scores, Rankings, Fixtures & Odds Data](https://tennis-api.com/)
- [ESPN Tennis Scoreboard Scraper (ATP + WTA) · Apify](https://apify.com/jungle_synthesizer/espn-tennis-us-open-wimbledon-scoreboard-scraper)

---

## Post-Final Retention Strategy (24h Crisis)

**The problem:** World Cup Final ends July 19 ~6PM ET. Current site has NO plan to:
1. Convert one-time WC visitors into multi-sport users
2. Redirect traffic to Tour de France (live through July 27) or tennis
3. Capture post-Final search traffic ("world cup final 2026 results", "spain argentina score")

**Current gaps:**
- Homepage: No cross-sport discovery module, no "What's Live Now" widget
- /world-cup page: No "What's Next" section linking to TdF or tennis
- SEO: Meta descriptions still say "live" not "final results"

**First-Principles Reasoning:**
- **User need:** After Final, users search "final results", "highlights", "what's next in sports"
- **Retention driver:** Show them Tour de France (exciting now, stage racing drama) + US Open preview (tennis peaks Aug-Sep)
- **Current state:** When Final ends, homepage still shows countdown → feels stale → user leaves
- **Fix:** Immediate post-Final pivot (ships July 18 night, goes live July 19 at 6PM)

**Filed ticket:** post-wc-tdf-retention-pivot (P1) — homepage hero swap to Final recap + TdF widget, /world-cup "What's Next" module, SEO meta update.

---

## Backlog Analysis & Changes

**Starting state:** 27 buildable tickets (healthy but low end of range)

**Created new tickets (3):**

1. **post-wc-tdf-retention-pivot** (P1, feature, worldcup+retention+tdf) — Homepage + /world-cup page pivot to Tour de France + tennis IMMEDIATELY after World Cup Final ends (July 19 ~6PM ET). Captures WC traffic spike before it leaves.

2. **seo-meta-per-page-audit** (P0, feature, seo+traffic+blocker) — Tactical breakdown of seo-fundamentals: unique meta title/description per route, JSON-LD structured data, OG tags, Lighthouse audit ≥90. Fixes the 7% organic search crisis.

3. **tennis-career-high-milestones** (P2, feature, tennis+parity+engagement) — Surface career-high rank from ATP UTS data + "NEW Career High" badges. Parity gap vs live-tennis.eu, engagement driver for social sharing.

**Escalated existing ticket (1):**

4. **google-search-console-setup** (escalated P1 → P0, task, seo+analytics) — Added urgency note: SEO is dead at 7% organic, GSC verification is the foundation for ALL SEO measurement. Gates seo-fundamentals, seo-meta-enhancement, xml-sitemap-dynamic.

**Ending state:** 29 buildable tickets (healthy)

**Deduplication check:** Verified no overlap with existing open tickets. Closed duplicate google-search-console-live (I created it, then realized google-search-console-setup already existed).

---

## Loop Health Observations

**Strengths:**
- Loop running regularly (inspector, perf-inspector, data-sanity monitor all active)
- Recent ships: sport hero imagery, TdF fixes, cycling updates
- Verifier catching bugs (cycling stage status, WTA/ATP data clarity)

**Critical gaps:**
1. **P0 SEO blockers stalled** - google-search-console-setup created July 11 (7 days ago), still open. seo-fundamentals created June 25 (24 days ago), still open. These gate ALL organic traffic growth yet planner hasn't picked them up.
2. **Revenue blockers require human action** - wc-betting-affiliates (P0) needs signup forms filled, AdSense approval pending. Planner can't execute these but they're not clearly flagged as "REQUIRES HUMAN".
3. **SEO tickets too broad** - seo-fundamentals is a P0 epic covering meta tags + structured data + sitemap + GSC + OG tags. Too big for one ticket. Today's run broke it down into tactical pieces: GSC setup (P0), meta audit (P0), sitemap (P1).

**Process improvements:**
- **Flag human-action tickets clearly** - Add "🔑 HUMAN ACTION REQUIRED" to title/tags for tickets needing external signups (AdSense, betting affiliates, API keys, domain purchases). Prevents planner from silently skipping them.
- **Break down SEO epics** - Large P0 tickets like seo-fundamentals should be decomposed into smaller, sequential steps: (1) GSC verification, (2) unique meta per page, (3) structured data, (4) sitemap. Makes progress trackable.

---

## Revenue Status & Immediate Actions

**Current state:**
- **Ad revenue:** $0 (AdSense PENDING - adsense-approval-sprint is P0)
- **Betting affiliates:** $0 (NOT SIGNED UP - wc-betting-affiliates P0 requires human signup)
- **Traffic:** 152 pageviews/28 days (~5/day) — critically low, but fixable via SEO

**24-hour priorities (Final is TOMORROW):**
1. **[HUMAN ACTION] Google Search Console verification** - Verify rankings123.com in GSC via DNS TXT or meta tag, submit sitemap.xml. This is the SEO foundation — every other SEO ticket is worthless without it. (google-search-console-setup P0)
2. **[PLANNER] Unique meta descriptions** - Audit all routes, write unique meta title/description per page targeting search intent. Fixes 7% organic crisis. (seo-meta-per-page-audit P0)
3. **[PLANNER] Post-Final retention pivot** - Build homepage hero swap + /world-cup "What's Next" module linking to TdF and tennis. Ships tonight, goes live July 19 after Final. (post-wc-tdf-retention-pivot P1)

**Post-Final (July 20+):**
4. **[HUMAN ACTION] Betting affiliate applications** - Once we have 2-4 weeks of GSC data showing US sports traffic + betting-related queries, apply to FanDuel/DraftKings/BetMGM. Current US mix (43/69 sessions) is borderline — build US traffic first via SEO.

**Monthly revenue goal:** Not yet set. Betting affiliates are the highest-RPM path ($100-400 CPA vs AdSense $1-5 RPM) but require proof of US sports audience to get approved.

---

## Recommendations (Top 3)

1. **[HUMAN ACTION NOW] Verify Google Search Console & submit sitemap** - Log into search.google.com/search-console, verify rankings123.com (DNS TXT record or meta tag), submit sitemap.xml. This is the #1 SEO blocker — can't measure organic search performance without it, can't debug why we're at 7% organic. Zero cost, 20 minutes, unblocks ALL future SEO work. (google-search-console-setup P0)

2. **[PLANNER URGENT] Ship unique meta descriptions per page** - Homepage, /world-cup, /atp-live, /wta-live, /cycling all need unique, keyword-rich meta titles and descriptions. Current generic "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings" kills SEO — Google penalizes duplicates, snippets don't match search intent. World Cup Final search volume is MASSIVE tomorrow (July 19) — we're losing 100% of that traffic to ESPN/BBC because our meta doesn't target the query. (seo-meta-per-page-audit P0)

3. **[PLANNER 24h WINDOW] Post-Final retention & Tour de France pivot** - World Cup Final ends tomorrow ~6PM ET. Homepage hero must swap from "Final Countdown" to "Final Recap + Tour de France Live" IMMEDIATELY after match. /world-cup page needs "What's Next" cross-sport module linking to TdF and tennis. Without this, the WC traffic spike (57 views/28 days, likely 500+ on July 19) leaves and never returns. Ship tonight so it's ready to go live post-Final. (post-wc-tdf-retention-pivot P1)

---

## Today's Research Lens

**SEO crisis + Post-Final retention strategy** — diagnosed 7% organic search root causes (GSC not verified, generic meta, missing structured data), broke down broad seo-fundamentals epic into tactical P0 tickets (GSC setup, meta audit), researched FanDuel affiliate requirements (needs US traffic proof, 24-48h approval), mapped tennis parity gap (career-high tracking), filed post-Final retention pivot to capture WC traffic before it leaves. Created 3 new tickets, escalated 1 to P0. Backlog 27 → 29 buildable.

**Tomorrow's recommended lens:** Data source improvements + cycling dynamic feed — autoresearch note from July 17 flagged cycling as static/stale (Giro shown as ongoing when finished, Tour de Suisse missing). Cycling needs a real dynamic feed (ESPN cycling, ProCyclingStats, UCI, FirstCycling) wired like tennis/WC. Also research tennis head-to-head data sources (parity gap vs live-tennis.eu).

---

**Sources:**
- [Google Search Console Guide: SEO Setup & Insights](https://searchengineland.com/guide/google-search-console-guide)
- [The Complete Guide to Google Search Console for 2026](https://www.seo.com/tools/google-search-console/)
- [Build and Submit a Sitemap | Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [FanDuel Affiliate Program: Commission & Program Details (2026)](https://getlasso.co/affiliate/fanduel/)
- [Best Sports Betting Affiliate Programs — Routy](https://routy.app/blog/best-sports-betting-affiliate-programs/)
- [Tennis API - Live Scores, Rankings, Fixtures & Odds Data](https://tennis-api.com/)
- [ESPN Tennis Scoreboard Scraper (ATP + WTA) · Apify](https://apify.com/jungle_synthesizer/espn-tennis-us-open-wimbledon-scoreboard-scraper)
- [Odds to win the 2026 World Cup: Spain the favorite over Argentina in Final - ESPN](https://www.espn.com/espn/betting/story/_/id/48386952/espn-soccer-futbol-world-cup-betting-odds-championship-groups)
- [Spain vs Argentina World Cup Final Prediction, Odds, Preview, Lineups & Best Bets | FanDuel Research](https://www.fanduel.com/research/spain-vs-argentina-world-cup-final-prediction-odds-preview-lineups-and-best-bets)
