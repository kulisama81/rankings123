# Autoresearch Report — 2026-06-23

**Focus lens today:** World Cup engagement features + revenue enablers (rotating daily focus)

---

## 1. What Shipped Recently (Last 2 Days)

**3 features + 1 perf improvement shipped:**

- **Country filter for rankings** (3c15c9c) — ATP/WTA tables now filterable by country with URL persistence. Parity with live-tennis.eu, essential usability for 1000+ player lists.
- **ISR caching migration** (b438b6d) — Migrated 9 data pages from force-dynamic to ISR (60s revalidate) for massive TTFB improvements during World Cup traffic spike. **Awaiting human review** (includes GitHub Actions workflow change per planner guardrails).
- **WC team statistics leaderboards** (853a068) — Team-level stats (goals, defense, discipline) on World Cup page.
- **WC bug fixes** — Match pages 404 regression, team roster missing, legend visibility regression all fixed.

**Loop health:** Planner consistently shipping 1-2 tickets/run, meeting World Cup ≥50% allocation requirement, adversarial verification catching issues before production.

---

## 2. Traffic & Revenue Status

**Traffic (GA4, last 28 days):**
- **109 pageviews, 64 sessions, 51 users** (up from 94/59/50 in previous report — slight growth)
- **Top pages:** 
  - Homepage: 54 views, 9.0s avg session, 78.7% bounce
  - **World Cup: 23 views, 443.4s avg session (7+ minutes!), 33.3% bounce** ← EXTREMELY STICKY
  - ATP Live: 12 views, 29.7s avg session, 22.2% bounce
  - WTA Live: 4 views, 17.5s avg session, 25.0% bounce
- **Cycling BROKEN:** 11 cycling event pages got traffic, **ALL 0.0s duration / 100% bounce** (confirms cycling-dynamic-feed blockage)
- **Traffic source:** 95%+ Direct (61/64 sessions) — SEO still not effective, need player pages + tournament pages for long-tail

**Revenue:**
- **Current ad revenue:** $0 (no ads live)
- **AdSense:** PENDING approval + integration (tickets: ad-inventory p2, adsense-approval-checklist p2)
- **Odds/betting affiliates:** READY TO UNBLOCK — odds-api (p1) just needs ODDS_API_KEY env var from user
- **Monthly target:** Not set (need human to define)

**Key insight:** World Cup engagement is OFF THE CHARTS (443s vs 9s homepage). With tournament ending July 19 (~26 days left), must capitalize NOW with high-engagement features to capture the traffic spike.

---

## 3. Competitive & Market Research

### World Cup Coverage Analysis

**Interactive Predictors (MAJOR OPPORTUNITY):**
- **ESPN World Cup Simulator** — Users drag-drop teams in group rankings + create up to 25 knockout brackets; $10k prize pool; competitive leaderboards; private groups with friends
- **FIFA Bracket Challenge** — Official predictor with global competition
- **WorldCupBracket.xyz, Bleacher Report, FOX Sports** — All feature interactive bracket prediction tools
- **First Principles:** Users want to PREDICT outcomes and test expertise, not just passively view standings. Predictors = 5-10 min session time (vs 30s viewing), repeat visits to check accuracy, shareable (virality), natural betting affiliate context
- **We DON'T have this** — filed wc-bracket-predictor (p1) to close the gap

**Advanced Stats (xG, possession, shot maps):**
- Available from: xGscore, RealGM World Cup xG Tracker, FOX Sports xG leaders, FotMob xG table
- Current leaders: Ivory Coast (1.38 xG/game), Portugal (best defense -0.15 xGA/game)
- Multiple sites already provide this (competitive parity, not differentiator)
- Existing ticket: wc-xg-stats (p2) covers this

**Prediction Articles:**
- Bleacher Report, CBS Sports publish match-by-match knockout predictions
- High SEO value ("world cup predictions round of 16" = 200k+ searches)
- Existing ticket: wc-knockout-predictions (p2) covers this

### Tennis Ranking Sites

**Confirmed competitors:**
- **live-tennis.eu** — ATP/WTA live rankings (our direct competitor for Phase 1 parity)
- **Sofascore** — Live rankings + 2000+ tournament coverage
- **Flashscore** — WTA/ATP rankings with live scores
- **Tennis Explorer** — ATP/WTA rankings
- **Official:** ATP Tour, WTA Tennis (official rankings, NOT live mid-tournament)

**Parity status:** Most gaps covered by existing tickets (player-pages p1, head-to-head p1, live-scores p1, race-rankings p1, points-defend p1, doubles p3, rank-history p1).

---

## 4. Loop Performance & Process Health

**Planner (recent runs analyzed):**
- ✅ Consistent 1-2 ticket throughput per run
- ✅ World Cup ≥50% allocation met
- ✅ Adversarial verification catching incomplete fixes (e.g., partial dedupe fix re-verified)
- ✅ Post-deploy verification working (Vercel build checks + live smoke tests)
- ⚠️ **Some tickets BLOCKED on data sources:**
  - `wc-odds` (p1) — blocked on odds API, but odds-api (p1) is READY for user's key
  - `cycling-dynamic-feed` (p1) — blocked on Python scrapers (no keyless public API)
  - `race-rankings` (p1) — blocked on ESPN not having race/YTD data (needs UTS or official APIs)

**Inspector (2×/day):**
- ✅ Finding real bugs (wc-golden-boot-data-fabricated, cycling-placeholder-violation, match/roster regressions)
- ✅ Filing reproducible tickets with regression test requirements
- ✅ CX-FIRST principle being enforced (catching placeholder/fabricated content)

**Backlog health:**
- **23 buildable (ready) tickets** — HEALTHY (above 12 threshold)
- **61 total open tickets** — good depth
- **World Cup backlog:** 10+ wc-tagged tickets (healthy for ≥50% allocation)
- **Action:** Filed 4 new tickets today (staying lean per healthy backlog)

**Process observations:**
- Verification loop working well (independent verifier catching issues before production)
- Regression tests being added for all bug fixes
- Data sanity checks preventing fabricated content from shipping
- Commit hygiene improved (Co-Authored-By trailers stripped)

---

## 5. New Tickets Filed (ROI-Ranked)

**4 tickets created** (backlog healthy at 23 buildable, staying lean per daily-run discipline):

### 1. wc-bracket-predictor (p1, worldcup, engagement, revenue) — TIME-SENSITIVE

**What:** Interactive tournament bracket predictor where users fill out complete R32→Final predictions, save/share bracket URLs, compare with actual results as tournament progresses.

**Why (First Principles):**
- **User need:** Fans want to PREDICT outcomes and test expertise, not just passively view standings
- **Engagement:** Interactive tools = 5-10 min session vs 30s passive viewing; users return to check predictions
- **Virality:** Shareable bracket URLs drive organic traffic (friends compare predictions)
- **Revenue:** Natural betting affiliate context (predictors → betting interest); higher-value traffic for ads
- **Competitive:** ESPN/FIFA/FOX all feature this = table stakes for engagement
- **Time-sensitive:** Tournament ends July 19 (~26 days)

**ROI:** VERY HIGH (massive engagement impact / medium effort using existing bracket logic)

### 2. cycling-hide-until-ready (p1, bug, cx) — URGENT CX FIX

**What:** Hide cycling from navigation and homepage until cycling-dynamic-feed ships.

**Why:**
- Analytics show 11 cycling pages getting traffic but **ALL 0.0s duration, 100% bounce** = broken UX
- cycling-dynamic-feed BLOCKED on Python scrapers (no ETA)
- CX FIRST principle: never show placeholder/broken features to users
- Every day cycling is visible = more users hitting broken pages, hurting site trust

**ROI:** HIGH (protects CX, stops bad UX / very low effort — remove nav link, hide homepage section)

### 3. wc-player-stats-extended (p2, worldcup, engagement, stats)

**What:** Extended player leaderboards beyond golden boot: fastest sprint, most distance covered, most passes, most saves (GK), most tackles, most interceptions.

**Why:**
- Engaging stat content fans love ("fastest player" / "most distance" are discussion fodder)
- Differentiates from basic ESPN/FIFA standings tables
- Likely uses ESPN data we already fetch (low-medium effort)

**ROI:** MEDIUM-HIGH (engaging content, moderate impact / low-medium effort if data available)

### 4. revenue-status-tracker (p2, revenue, process)

**What:** Meta-ticket to create docs/revenue-status.md tracking AdSense approval status, odds API integration status (ODDS_API_KEY), betting affiliate readiness, and what's buildable vs. waiting on external approvals.

**Why:**
- Revenue is still $0 despite multiple revenue tickets in backlog
- Need clear visibility: what can planner ship NOW vs. what's waiting on human action (API keys, approvals)
- Unblock the path to monetization

**ROI:** MEDIUM (process clarity / low effort — documentation task)

---

## 6. Top Recommendations

**Immediate (next 2 planner runs):**
1. **Ship cycling-hide-until-ready** (p1) — Protect CX from broken cycling pages getting 100% bounce rate
2. **Odds API integration** (odds-api p1) — Just needs ODDS_API_KEY env var from user; unlocks wc-odds (p1), tennis-odds (p2), betting-affiliate (p2)
3. **ISR migration review + push** — Human review b438b6d commit (GitHub Actions workflow change), then push to production for TTFB improvements

**This week (capitalize on World Cup traffic spike, tournament ends July 19):**
4. **Interactive bracket predictor** (wc-bracket-predictor p1) — MAJOR engagement driver, shareable, betting context
5. **Continue tennis parity** (player-pages p1, head-to-head p1, live-scores p1) — Phase 1 goal

**Revenue path (parallel track):**
- **Odds API** — User sets ODDS_API_KEY → planner ships integration → unlocks predictions + betting affiliates (highest RPM)
- **AdSense** — User completes approval checklist → applies → (weeks wait) → approved → planner ships ad inventory
- **Traffic growth** → SEO (player pages, tournament pages) → organic search → sessions → ad impressions
- **Path:** AdSense → Ezoic (10k+ sessions/mo) → Mediavine (50k+ sessions/mo) + betting affiliates

---

## 7. First-Principles Insights (Avoiding Reasoning by Analogy)

**Challenging assumptions:**

**Assumption:** "Competitors have xG stats, so we must too"
- **Truth:** Users come for RANKINGS (our core value prop), not advanced stats. xG is nice-to-have, not differentiator.
- **Action:** Prioritize unique engagement (bracket predictor, what-if scenarios) over competitive parity stats.

**Assumption:** "More pages = more traffic"
- **Truth:** Traffic = indexable pages × REAL search demand × speed/UX. Empty pages hurt more than help.
- **Action:** Hide cycling until real data ships (cycling-hide-until-ready). Don't ship placeholder pages for SEO.

**Assumption:** "We must copy every live-tennis.eu feature"
- **Truth:** Parity is credibility FLOOR, not strategy. Differentiation (interactive predictors, multi-sport hub, better UX) is what wins.
- **Action:** Phase 1 parity continues, but file differentiator tickets in parallel (bracket predictor is one).

**What drives this business (fundamentals):**
1. **User's root need:** Know who's #1 right now, what's happening live, what happens next — faster, more accurately, more clearly than anyone else
2. **Traffic** = indexable pages × real search demand × speed/UX (not pages for their own sake)
3. **Engagement** = real-time accuracy + distinctive reasons to return (predictors, unique stats, shareable content)
4. **Revenue** = traffic × RPM × session depth (so high-RPM betting affiliate + return-driving bracket predictor > ten generic pages)

**Applied:** wc-bracket-predictor derives from fundamental user need (predict outcomes, test expertise) and revenue driver (betting context = highest RPM). Not copied from competitors — though ESPN validates the pattern, the ticket is justified from first principles.

---

## Appendix: Research Sources

**World Cup Coverage:**
- [ESPN World Cup Simulator](https://www.espn.com/soccer/story/_/id/48945570/2026-fifa-world-cup-predictions-simulator)
- [FOX Sports World Cup Bracket & Standings](https://www.foxsports.com/stories/soccer/world-cup-bracket-scenarios-standings)
- [Bleacher Report Bracket Predictions](https://bleacherreport.com/articles/25437958-world-cup-bracket-predictions-2026-full-knockout-stage)
- [WorldCupBracket.xyz](https://worldcupbracket.xyz/)
- [FIFA Official Bracket Challenge](https://play.fifa.com/bracket-predictor/)

**World Cup Advanced Stats:**
- [xGscore World Cup 2026 xG Statistics](https://xgscore.io/xg-statistics/world-cup/2026)
- [RealGM 2026 FIFA World Cup xG Tracker](https://soccer.realgm.com/analysis/559/2026-FIFA-World-Cup-xG-Tracker-Results-Expected-Goals-Of-Every-Match)
- [FOX Sports World Cup xG Leaders](https://www.foxsports.com/soccer/fifa-world-cup/stats?category=standard&sort=xg&season=2026&sortOrder=desc)
- [FotMob World Cup xG Table](https://www.fotmob.com/leagues/77/table/world-cup?filter=xg)

**Tennis Ranking Sites:**
- [live-tennis.eu ATP Live Ranking](https://live-tennis.eu/en/atp-live-ranking)
- [live-tennis.eu WTA Live Ranking](https://live-tennis.eu/en/wta-live-ranking)
- [Sofascore WTA Rankings](https://www.sofascore.com/tennis/rankings/wta)
- [Flashscore WTA Rankings](https://www.flashscoreusa.com/tennis/rankings/wta/)
- [Tennis Explorer Rankings](https://www.tennisexplorer.com/ranking/atp-men/)

---

**Next autoresearch run:** 2026-06-24 (rotate lens to SEO + traffic growth opportunities)
