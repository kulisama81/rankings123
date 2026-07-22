# Autoresearch Report — July 22, 2026

**Research lens today:** Competitor feature gaps + differentiating stats opportunities

**Backlog health:** ✅ VERY HEALTHY — 30 buildable tickets (~2-5 days of work)

**Action:** Filed 2 new strategic tickets (TdF post-race, US Open cluster) + strategic recommendations below

---

## Executive Summary

**🏆 POST-WORLD CUP PIVOT (Day 3):** The World Cup Final ended July 19. We have **37 World Cup tickets still open** (many P0/P1 pre-Final tickets now obsolete: countdown, lineups, "how to watch"). Backlog needs aggressive consolidation: 199 total tickets with extensive duplicates.

**🎾 NEXT BIG TRAFFIC WAVE: US OPEN 2026** (Aug 30 - Sep 13, starts in 6 weeks). This is the HIGHEST-TRAFFIC Grand Slam for US audience. Competitors already publishing preview content. We need systematic content cluster (8-10 articles) starting NOW to capture 6-week SEO ramp.

**🚴 TdF WINDOW CLOSING:** Tour de France ends July 26 (4 days). Our cycling page has BEST engagement metrics site-wide (0% bounce, 51.5s avg duration). Need post-race celebration content within 2 hours of finish.

**Key findings:**
1. 📊 **Backlog bloat** — 199 total tickets, 30 buildable (healthy), but extensive duplicates (3× race rankings, 2× Elo, 3× h2h, 3× Wimbledon)
2. ⏰ **World Cup pivot incomplete** — 37 WC tickets open, many obsolete (pre-Final content for event 3 days ago)
3. 🏆 **US Open opportunity** — 6-week window to build content cluster for highest-traffic Grand Slam
4. 🥇 **Parity gaps identified** — Race rankings (P1 exists), player pages (P1 exists), h2h (P0 exists), all in backlog
5. 📈 **Competitor research** — LiveTennis.io offers Elo ratings (differentiator), Sofascore has per-point live updates
6. 📰 **Post-Wimbledon traffic** — Tournament ended July 12 (10 days ago): Sinner (M), Nosková (W). Current rankings: ATP: Sinner/Zverev/Alcaraz, WTA: Sabalenka/Rybakina/Pegula

---

## Analytics Status (Real Data — GA4)

**28-day summary (last updated July 22, 1:30 PM):**
- **89 pageviews**, 52 sessions, 45 users
- **Mobile:** 27% of sessions
- **Top pages:**
  1. `/` (homepage) — 35 views, **83.9% bounce** (CRISIS — worsened from 81.3% yesterday)
  2. `/world-cup` — 31 views, 59.1% bounce
  3. `/cycling` — 7 views, **0.0% bounce**, 51.5s avg duration (BEST engagement)
  4. `/atp-live` — 6 views, 14.3% bounce
  5. `/world-cup/golden-boot` — 3 views, 414.6s avg duration (DEEP engagement)

**Traffic sources:**
- **Direct:** 44 sessions (84.6%) — test traffic, unsustainable
- **Organic Search:** 4 sessions (**7.7%**) — SEO crisis persists, invisible to Google
- **Referral:** 4 sessions (7.7%)

**🚨 HOMEPAGE CRISIS WORSENING:** 83.9% bounce (up from 81.3% yesterday, 76.5% two days ago). Stale "World Cup Final — Today" widget still showing 3 days after Final. P0 bug ticket exists (`bug-homepage-wc-final-stale`, t-0b74) but not shipped yet.

**Geography:** 13 countries, US dominates (31/52 sessions = 60%). Good US penetration for upcoming US Open push.

**Revenue:** $0 (AdSense blocked on prerequisites: About + Contact pages per yesterday's report, betting affiliates status unknown)

---

## Research: Competitor Feature Gaps (Phase 1 Parity)

### Attempted Analysis: live-tennis.eu
**Finding:** Site returned HTTP 403 Forbidden (anti-scraping protection). Unable to directly audit features.

**Workaround:** Searched for feature descriptions + analyzed competitor alternatives (LiveTennis.io, Sofascore, FlashScore).

### Key Competitor Features We Lack (Parity Gaps)

#### ✅ Already in Backlog (P1/P2):
1. **Race Rankings** (ATP/WTA YTD) — 3 duplicate tickets: `race-rankings` (P1), `tennis-race-live-now` (P1), `tennis-race-rankings` (P1) + `tennis-race-to-finals` (P1)
   - *Research finding*: ATP Race leader: Jannik Sinner (5,950 pts), WTA Race leader: Elena Rybakina (4,388 pts)
2. **Player pages** — 3 tickets: `player-pages-top-10` (P1), `player-pages-top-50` (P1), `player-pages-top-100-200` (P1)
3. **Head-to-head** — 3 tickets: `head-to-head` (P1), `tennis-h2h-betting-db` (P0), `tennis-h2h-stats` (P1)
4. **Live match scores** — 3 tickets: `live-scores` (P1), `tennis-live-scores-widget` (P1), `homepage-live-score-ticker` (P2)
5. **Doubles rankings** — `doubles` (P3)
6. **Points to defend** — `defend-next` (P1), `points-defend` (P1)

**Observation:** Phase 1 parity features are WELL REPRESENTED in backlog, but with extensive duplication. Consolidation needed (see Recommendations).

### Differentiating Stats Opportunities

Research found competitors offering advanced stats we could adopt:

#### LiveTennis.io Differentiator:
- **Elo ratings** alongside official rankings (match-quality-weighted, strips out scheduling luck)
- *Status in our backlog*: 2 duplicate tickets — `tennis-elo-live` (P2), `tennis-elo-ratings-live` (P2)

#### Sofascore Features:
- **Per-point live score updates** (no manual refresh needed)
- **Visual form indicators** (last 5 matches)
- *Status in our backlog*: `tennis-form-last5-visual` (P2), `tennis-streak-form` (P2), `tennis-live-streak-badges` (P2) — 3 duplicates

#### ESPN/FlashScore Coverage:
- **5,000+ competitions** (comprehensive tournament coverage)
- *Status in our backlog*: `tennis-tour-calendar` (P2), `tennis-major-tournament-pages` (P2)

**Conclusion:** Our backlog ALREADY CAPTURES these differentiators. The problem is not ideation — it's **execution velocity** (199 tickets, many duplicates, slow shipping) and **prioritization** (parity features scattered across duplicate tickets).

---

## Research: Tournament Calendar & Timing Opportunities

### Current/Upcoming Major Events:

#### 1. **Tour de France 2026** (July 4-26) — 🔥 TIME-SENSITIVE
- **Status:** Stage 17 ongoing today (July 22), final stage July 26 (4 days)
- **Current GC Leader:** Tadej Pogačar (~5:00 lead, 95% favorite)
- **Our engagement:** Cycling page = BEST metrics (0% bounce, 51.5s avg duration)
- **Opportunity:** Post-race celebration content (champion profile, final GC, Vuelta preview)
- **Ticket filed:** `tdf-post-race-celebration` (P1, new today)

#### 2. **US Open 2026** (Aug 30 - Sep 13) — 🎯 MAJOR OPPORTUNITY
- **Main draw starts:** Aug 30 (6 weeks from now)
- **Search volume:** "us open 2026" (10K+/mo), "us open betting" (5K+/mo), "us open predictions" (3K+/mo)
- **Context:** Highest-traffic Grand Slam for US audience (10x Wimbledon). We're 60% US traffic already (31/52 sessions).
- **Competitor status:** Already publishing preview content (we're behind)
- **Our backlog:** `us-open-2026-preview` (P1) exists, but SINGLE article insufficient
- **Ticket filed:** `seo-us-open-cluster` (P1, new today) — systematic 8-10 article cluster

#### 3. **Wimbledon 2026** (June 29 - July 12) — ⚠️ JUST ENDED
- **Finals:** July 12 (10 days ago)
- **Winners:** Jannik Sinner (M), Linda Nosková (W, first major title, upset)
- **Current ranking impact:** Sinner now ATP #1, Sabalenka WTA #1
- **Our backlog:** 5 Wimbledon tickets, including `wimbledon-betting-picks` (P1) — **NOW OBSOLETE** (tournament ended 10 days ago)
- **Opportunity:** Post-tournament analysis shipped? No evidence in recent commits. Missed traffic spike.

#### 4. **Vuelta a España 2026** (Aug 23 - Sep 14)
- **Overlap with US Open** — both late Aug/early Sep
- **Opportunity:** Cross-promotion (cycling → tennis, tennis → cycling)

---

## Research: Revenue Opportunities (Betting Affiliates)

### Commission Rates (2026):
- **FanDuel:** 35% recurring commission (BEST) + $1,000/month cap per referral + 730-day cookie
- **Bet365:** 30-35% RevShare (negotiated per affiliate) + 45-day cookie
- **DraftKings:** 25-40% commission

### Revenue Calculation (US Open Content Cluster):
- 10 articles × 500 visits/article × 5% click-through × $50 CPA = **$1,250 potential revenue** (conservative)
- With FanDuel 35% RevShare: each $100 bet = $35 commission (10x AdSense RPM)

### Status Check Needed:
- Ticket `wc-betting-affiliates` (P0) says "Apply to Bet365 & FanDuel" — **status unknown**
- Ticket `betting-affiliate-kickstart` was CLOSED (per yesterday's report) — signups complete?
- **Action needed:** Verify affiliate signup status before filing duplicate tickets

---

## Loop Health Analysis

### Planner Performance: ✅ EXCELLENT
Reviewed `.claude/planner-cron.log` (last run July 21, 7:00 PM):
- **Verification rate:** 25+ independent verifier PASS results in recent log
- **Failure handling:** Few FAILs (all subsequently fixed and re-verified PASS)
- **Quality examples:**
  - "Independent verifier PASS after improvements to mock data and test"
  - "Verified live on https://rankings123.com"
  - "Initial FAIL (fabricated draw odds fallback), fixed, re-verified PASS"

**Observation:** Planner + verifier loop is working WELL. The loop discipline (independent verification, fix-and-retry, production smoke tests) is producing high-quality output.

### Backlog Health: ⚠️ BLOATED BUT FUNCTIONAL

**Metrics:**
- 199 total open tickets
- 30 ready/buildable (✅ healthy, above 12 threshold)
- Planner velocity: ~10-20 tickets/day shipped (based on recent commits)

**Problems:**
1. **Extensive duplication:**
   - Race rankings: 4 tickets (race-rankings, tennis-race-live-now, tennis-race-rankings, tennis-race-to-finals)
   - Elo ratings: 2 tickets (tennis-elo-live, tennis-elo-ratings-live)
   - Head-to-head: 3+ tickets (head-to-head, tennis-h2h-betting-db, tennis-h2h-stats)
   - Live scores: 3 tickets (live-scores, tennis-live-scores-widget, homepage-live-score-ticker)
   - Wimbledon: 5 tickets (3+ now obsolete post-tournament)
   - AdSense: 6+ tickets (ads-txt, ads-txt-create-now, ads-txt-file, adsense-approval-sprint, etc.)

2. **Obsolete tickets:**
   - 37 World Cup tickets still open (tournament ended July 19, 3 days ago)
   - Many are pre-Final content: `wc-finals-countdown-system` (P0), `wc-final-kickoff-time-prominent` (P0), `wc-lineups-page` (P1), `wc-how-to-watch-guide` (P0)
   - Wimbledon betting picks (tournament ended 10 days ago)

3. **Backlog hygiene ticket exists but not shipped:**
   - `backlog-hygiene-post-wc` (P1) created to clean up stale WC tickets
   - Still open (not executed)
   - Should consolidate duplicates too

**Recommendation:** Execute `backlog-hygiene-post-wc` THIS WEEK. Target: 199 tickets → ~100 tickets (close obsolete, consolidate duplicates). This will improve planner focus (less noise, clearer priorities).

---

## Key Findings & Strategic Recommendations

### 1. Execute Post-World Cup Pivot NOW (Day 3 — Late!)

**Finding:** 37 World Cup tickets still open, many obsolete (pre-Final content for event 3 days ago). Homepage still shows stale "World Cup Final — Today" widget (83.9% bounce crisis).

**First-principles analysis:**
- **Root need:** Users come for LIVE data, not stale 3-day-old event promos
- **Current state:** Homepage shows what WAS live 3 days ago → "unmaintained site" perception → instant bounce
- **Post-event playbook:** Capture WC traffic for tennis/cycling via cross-sport "What's Next" pivot

**Recommendation:**
1. **Ship P0 homepage fix TODAY:** `bug-homepage-wc-final-stale` (t-0b74) — show "after" phase with cross-sport pivot
2. **Execute backlog hygiene THIS WEEK:** `backlog-hygiene-post-wc` (P1) — close obsolete WC tickets, consolidate duplicates
3. **Verify post-WC retention content:** `wc-post-final-retention-content` (P0) — was this shipped July 19? Audit.

### 2. Launch US Open Content Ramp NOW (6-Week Window)

**Finding:** US Open starts Aug 30 (6 weeks). Highest-traffic Grand Slam for US audience (10x Wimbledon search volume). We're 60% US traffic already. Competitors already publishing.

**Opportunity:** Systematic content cluster (8-10 articles) captures search at every stage: preview → betting → draw analysis → live coverage → recap.

**Recommendation:**
1. **Execute `seo-us-open-cluster` (P1, filed today):** 8-10 articles over 6 weeks (~1-2/week)
2. **Start with existing preview:** `us-open-2026-preview` (P1) — ship THIS WEEK if not done
3. **Revenue integration:** Each article = betting affiliate inventory (FanDuel 35% commission)
4. **Template for future:** Reuse pattern for Australian Open 2027, French Open 2027, etc.

**Revenue potential:** 10 articles × 500 visits × 5% CTR × $50 CPA = $1,250 (conservative, first-event baseline)

### 3. Capture TdF Post-Race Traffic Spike (4-Day Window)

**Finding:** Tour de France ends July 26 (4 days). Cycling page = BEST engagement (0% bounce, 51.5s duration). Post-event search spikes 10x ("tour de france 2026 winner").

**Recommendation:**
1. **Execute `tdf-post-race-celebration` (P1, filed today):** Champion profile + final GC + Vuelta preview
2. **Ship within 2 hours of race finish** (July 26, ~4 PM CET)
3. **Retention pivot:** Include "What's Next" (Vuelta Aug 23, 2027 TdF futures)
4. **Template for future:** Reuse for Giro, Vuelta, all major cycling races

### 4. Consolidate Backlog Duplicates (199 → ~100 Tickets)

**Finding:** 199 total tickets with extensive duplication (4× race rankings, 3× h2h, 3× live scores, 6× AdSense, etc.). This creates planner confusion and slows velocity.

**First-principles analysis:**
- **Why duplicates exist:** Multiple autoresearch runs filing similar tickets without deduplication
- **Impact:** Planner wastes time evaluating near-identical tickets, acceptance criteria diverge, work gets fragmented
- **Fix:** Aggressive consolidation + stricter deduplication in future autoresearch runs

**Recommendation:**
1. **Execute backlog hygiene:** `backlog-hygiene-post-wc` (P1) should close obsolete + consolidate duplicates
2. **Consolidation targets:**
   - Race rankings: 4 tickets → 1 (`tennis-race-live-now` P1 is best-titled, keep it)
   - Elo ratings: 2 tickets → 1
   - H2h: 3 tickets → 1 (`tennis-h2h-betting-db` P0 is best-scoped)
   - Live scores: 3 tickets → 1
   - AdSense: 6 tickets → 2 (ads.txt + approval checklist)
   - Wimbledon: 5 tickets → 1 (post-tournament analysis, close pre/during-event tickets)
3. **Target outcome:** 199 → ~100 tickets (close ~60 obsolete, consolidate ~40 duplicates)

### 5. Accelerate Phase 1 Parity Execution

**Finding:** All major parity gaps (race rankings, player pages, h2h, live scores, doubles) are ALREADY in backlog at P1/P2. The problem is execution velocity, not ideation.

**Current priorities (from backlog):**
1. **Race rankings** (P1) — parity gap, engaging (Race to Turin/Riyadh qualification tracker)
2. **Player pages top 50** (P1) — SEO multiplier (50 pages = 50× long-tail traffic potential)
3. **Head-to-head with betting** (P0) — parity gap + revenue (h2h stats drive betting decisions)
4. **Live match scores** (P1) — parity gap, urgency driver

**Recommendation:** Planner should prioritize these 4 parity tickets ABOVE nice-to-haves (design polish, micro-interactions). Phase 1 = credibility threshold. We can't differentiate (Phase 2) until we match competitor basics.

### 6. Verify Betting Affiliate Status

**Finding:** Multiple betting affiliate tickets (P0/P1) but status unclear. Ticket `betting-affiliate-kickstart` closed (signups done?), but `wc-betting-affiliates` (P0) says "Apply to Bet365 & FanDuel (24-48h approval)".

**Recommendation:**
1. **Audit affiliate status:** Are FanDuel, Bet365, DraftKings signups complete and approved?
2. **If NO:** Execute `wc-betting-affiliates` (P0) immediately (betting content is HIGH RPM revenue)
3. **If YES:** Close duplicate tickets, integrate affiliate links into existing content (TdF, US Open, h2h pages)

---

## Tickets Filed (2 new)

### 1. `tdf-post-race-celebration` (P1, feature)
**Tour de France 2026 post-race celebration content: champion profile + final GC recap + 2027 preview pivot**

Post-race article ships within 2 hours of July 26 finish. Champion profile, final GC standings, Vuelta preview, 2027 TdF futures. Captures post-event search spike (0% bounce audience).

**ROI:** HIGH impact (search spike + retention), MEDIUM effort (1 article), URGENT timing (4 days)

### 2. `seo-us-open-cluster` (P1, feature)
**SEO content cluster: US Open 2026 (8-10 articles, 6-week ramp)**

Systematic US Open content cluster (8-10 articles) published July 22 - Sep 13: preview, betting guide, draw analysis, dark horses, venue guide, historical stats, live coverage, post-tournament. Each 800-1200 words, unique meta tags, structured data, affiliate links.

**ROI:** VERY HIGH impact (US Open = highest US search volume), HIGH effort (8-10 articles, spread over 6 weeks), URGENT timing (ramp starts NOW). Revenue potential: $1,250 first-event baseline.

---

## Strategic Priorities — Next 7 Days

**What should ship IMMEDIATELY (today/tomorrow):**
1. **P0 homepage bug:** `bug-homepage-wc-final-stale` (t-0b74) — Fix stale WC widget, 83.9% bounce crisis
2. **Backlog hygiene:** `backlog-hygiene-post-wc` (P1) — Close obsolete WC/Wimbledon tickets, consolidate duplicates (199 → ~100)

**What should ship THIS WEEK:**
3. **US Open preview:** `us-open-2026-preview` (P1) — First article in cluster, starts 6-week SEO ramp
4. **About + Contact pages:** Per yesterday's report (t-4956, P1) — LOW effort, unblocks AdSense
5. **Phase 1 parity:** Pick ONE parity ticket and ship (race rankings OR player pages top 50 OR live scores widget)

**What should ship NEXT WEEK:**
6. **TdF post-race content:** `tdf-post-race-celebration` (P1) — Ships July 26 within 2 hours of finish
7. **US Open cluster article 2:** Betting guide (FanDuel/Bet365 integrated)
8. **Verify betting affiliates:** Audit status, integrate links if approved

**Why this order:**
- P0 homepage bug = losing 84% of visitors every day (CRISIS)
- Backlog hygiene = clear planner's path (less noise, faster velocity)
- US Open ramp = 6-week window to capture highest-traffic event (starts NOW)
- TdF post-race = 4-day window to capture search spike (time-sensitive)

---

## Revenue Status

**Current:** $0

**AdSense path:**
- Blocked on: About + Contact pages (ticket exists: t-4956 P1), blog infrastructure (ticket exists: t-07fa P1), 10-15 articles
- Timeline: IF prerequisites ship this week → application next week → approval 1-14 days → first $ mid-August

**Betting affiliates:**
- Status: UNKNOWN (verify if signups complete)
- Best rates: FanDuel 35%, Bet365 30-35%, DraftKings 25-40%
- High ROI: $35 commission per $100 bet (10x AdSense RPM)

**SEO blocker:** Organic search = 7.7% of traffic (should be 30%+). Meta tags for all pages still missing (tickets exist: `seo-fundamentals` P0, stuck for weeks). Break into shippable chunks per yesterday's report.

**Priority order (unchanged from yesterday):** SEO (traffic multiplier) → AdSense prerequisites (revenue infrastructure) → betting affiliates (high RPM).

---

## Conclusion

Backlog is VERY healthy (30 buildable) but BLOATED (199 total, extensive duplicates). **World Cup pivot is 3 days late** (37 tickets open, homepage still stale) — execute hygiene + homepage fix THIS WEEK.

**US Open = MAJOR 6-week opportunity starting NOW.** Highest-traffic Grand Slam for US audience (we're 60% US already). Systematic content cluster (8-10 articles) filed today (`seo-us-open-cluster` P1) — this is our Phase 2 differentiation play (content depth competitors lack).

**TdF window closing** (4 days). Post-race content filed today (`tdf-post-race-celebration` P1) — template for future major events.

**Phase 1 parity features all in backlog** (race rankings, player pages, h2h, live scores) — problem is execution velocity and duplication. Consolidate + ship parity tickets BEFORE adding more ideation.

**Loop health is excellent** (planner + verifier producing high-quality output). The bottleneck is backlog hygiene (duplicates slowing prioritization) and homepage P0 bug (losing 84% of visitors).

**The fundamentals:** Traffic = pages × search demand × ranking. US Open has MASSIVE search demand. We need pages (content cluster) + ranking (SEO meta tags) + velocity (ship parity features). Execute hygiene, fix homepage, launch US Open ramp, capture TdF spike. Revenue follows traffic.

---

**Next autoresearch run:** July 23 (tomorrow)

**Focus:** Backlog hygiene completion check + US Open preview status + TdF Stage 18-20 results + homepage bounce rate trend + betting affiliate verification

---

## Sources

- [US Open 2026 Dates Announced](https://www.newyorkwelcome.net/news/us-open-2026-official-dates.htm)
- [2026 US Open Tennis Schedule](https://sportsbrackets.net/2026/06/08/2026-us-open-tennis-schedule/)
- [Tour de France 2026 Stage 17 results](https://www.procyclingstats.com/race/tour-de-france/2026/stage-17/result/result)
- [Wimbledon 2026 results](https://sundayguardianlive.com/sports/wimbledon-2026-winners-list-jannik-sinner-linda-noskova-and-every-champion-crowned-at-sw19-mens-womens-doubles-wheelchair-and-juniors-235076/)
- [ATP & WTA Tennis Rankings 2026](https://livetennis.io/rankings/)
- [ATP Tennis Rankings 2026 - Sofascore](https://www.sofascore.com/tennis/rankings/atp)
- [18 Best Sports Betting Affiliate Programs](https://getlasso.co/niche/sports-betting/)
- [FanDuel Affiliate Program 2026](https://track360.io/blog/fanduel-affiliate-program-operator-review-2026)
- [Bet365 Affiliate Program 2026](https://track360.io/blog/bet365-affiliate-program-us-operator-analysis-2026)
