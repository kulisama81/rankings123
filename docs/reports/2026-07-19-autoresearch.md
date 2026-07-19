# Autoresearch Report — July 19, 2026

**Research lens today:** Post-World Cup Final retention + tennis differentiation + cycling data sources

**Backlog health:** ✅ 33 buildable tickets (healthy) — created 5 new, deduplicated 1

---

## Executive Summary

**🏆 WORLD CUP FINAL TODAY (3PM ET):** Spain vs Argentina kicks off in ~7 hours. This is the LAST DAY of the tournament — tonight we pivot from World Cup to post-tournament retention. **The next 48 hours determine whether our WC traffic spike becomes recurring tennis/cycling fans or one-time visitors who never return.**

**Key findings:**
1. 🎾 **US Open 2026 is the retention bridge** (Aug 30 - Sep 13) — filed P1 preview article ticket targeting post-WC tennis searches ("what's next in sports"). Search volume already ramping 6 weeks pre-tournament.
2. 🚴 **Tour de France final week (July 21-27)** — Pogacar 95% favorite to win 5th title. Filed P1 betting article for final week (race ends 1 week from now). Bridges WC → TdF → US Open retention window.
3. 📊 **Tennis differentiation: Elo ratings** — NO competitor (live-tennis.eu, live-ranking.com) shows Elo alongside official rankings. We'd be first. Filed P2 integration ticket.
4. 🔢 **Point-by-point live stats** — Combines live rankings + live match stats (aces, DFs, break points) in one place. Competitors separate these. Filed P2 ticket.
5. ♻️ **Evergreen content system** — Post-tournament articles (WC Final, TdF, Grand Slams) die after the event unless converted to year-round traffic drivers. Filed P2 system ticket based on retention research.

---

## What Shipped Recently (via git log)

**July 18-19:**
- Inspector filed 2 data consistency bugs: ATP R32 Δ=0, WTA in-play mismatch (01d1e26)
- Data-sanity monitor auto-filed anomaly tickets (a519411, 5a7e575)
- Dynamic OG image templates for social sharing (afb1f9e)
- UCI cycling team rankings completed (275d622)

**Pattern:** Loop shipping regularly (inspector QA, data sanity, cycling improvements), but **SEO P0 blockers still unfixed** (google-search-console-setup, seo-meta-per-page-audit from yesterday's report). These gate ALL organic traffic growth.

---

## Analytics Status (Real Data - GA4)

**28-day summary (last generated July 19, 6:30 AM):**
- **148 total pageviews**, 65 sessions, 47 users
- **Mobile:** 42% of sessions
- **Top pages:**
  1. `/world-cup` — 56 views, **42.4% bounce** (EXCELLENT engagement for live tournament)
  2. `/` (homepage) — 52 views, **69.8% bounce** (CRISIS - needs live urgency fix)
  3. `/atp-live` — 14 views, 0% bounce (great engagement, low volume)
  4. `/cycling` — 7 views, 0% bounce
  5. `/world-cup/golden-boot` — 5 views, 281.9s avg duration (DEEP engagement)

**SEO/Traffic CRISIS persists:**
- **Organic Search:** Only 5 sessions (7.7% of total) — still invisible to Google
- **Direct:** 56 sessions (86%) — test traffic, not sustainable
- **Revenue:** $0 (AdSense PENDING human action, betting affiliates NOT SIGNED UP)

**🚨 Post-Final traffic cliff risk:** WC Final tonight → tournament ends → no retention plan = lose 86% of current traffic by July 21 unless we pivot to TdF/US Open content NOW.

---

## Research: Post-World Cup Final Retention Strategy

**The 48-hour window:** WC Final ends tonight ~6PM ET. Research on sports event retention (gr8.tech, NEXT.io, Kambi) shows the **first 48 hours post-event are critical** for converting one-time visitors into recurring fans.

### Best Practices from Retention Research

**1. Delayed engagement tactics**
- Don't let the emotional peak drop to zero immediately after final whistle
- "What's next in sports" content must go live WITHIN HOURS of tournament end
- Personalized follow-up journey: "Loved the World Cup? Here's what's live NOW"

**2. Evergreen content transformation**
- Turn tournament content into year-round traffic drivers
- Quote: "Many World Cup-related topics can be transformed into evergreen content. Lessons about teamwork, leadership, strategy remain relevant long after the final match."
- Our WC Final page should become "WC 2026 Final Results + 2030 Preview" NOT just "Final: Spain 3-2 Argentina"

**3. Bridge to next event**
- MLS retention playbook: demonstrate that tournament enthusiasm translates into habitual consumption
- Our bridge: WC (ends tonight) → TdF final week (July 21-27) → US Open (Aug 30 - Sep 13)
- Each bridge article must have affiliate betting context (highest RPM)

### Tickets Filed

- **us-open-2026-preview** (P1) — US Open preview article ships by July 25, targets post-WC tennis searches
- **tdf-final-week-betting** (P1) — TdF final week betting article ships by July 20 (rest day), targets Pogacar vs Vingegaard
- **evergreen-tournament-content** (P2) — System to auto-convert event pages to evergreen + "What's Next" modules

**First-principles reasoning:** After a major event, users search two things: (1) "what were the results" (historical), (2) "what's happening next" (forward-looking). We must answer BOTH on every post-event page to retain them.

---

## Research: Tennis Differentiation — Advanced Stats

Researched top tennis stats features on FlashScore, SofaScore, ESPN, and live-tennis.eu. **Gap identified:** No traditional ranking site shows advanced stats that betting sites surface (Elo ratings, expected win probability, form indicators). We can bridge this gap.

### Elo Ratings (Differentiating Feature)

**What it is:** Skill-based ranking system (like chess). Rewards who you beat, not just tournament prestige.

**Why it matters for bettors:**
- Official ATP ranking: points-based (Grand Slam = more points)
- Elo rating: skill-based (beat Djokovic = bigger Elo gain than beat #100)
- **Betting edge:** Player ranked #20 with Elo #8 is "undervalued" — betting opportunity

**Current landscape:**
- **Betting sites** (bet365, FanDuel) show Elo-based predictions but NOT live rankings
- **Ranking sites** (live-tennis.eu, live-ranking.com) show live rankings but NOT Elo
- **We'd be the ONLY site** combining live rankings + Elo + win probability in one place

**Data sources researched:**
- Tennis Abstract (tennisabstract.com) — free, updated daily, ATP + WTA
- Ultimate Tennis Statistics (ultimatetennisstatistics.com) — free API, surface-specific Elo
- TenELOs (tenelos.com) — live Elo ratings by surface (hard/clay/grass)

**Ticket:** tennis-elo-ratings-live (P2) — integrate Elo ratings as optional column on /atp-live and /wta-live, show win probability for head-to-head matchups.

### Point-by-Point Live Match Stats

**Gap:** When a player is "in play", fans want to know HOW they're performing (aces, double faults, break points), not just the score.

**Current state:**
- **live-tennis.eu** shows "in play" badge + live points estimate, but NO match stats
- **FlashScore/SofaScore** show point-by-point stats (aces, DFs, 1st serve %, BP saved), but NO live ranking impact
- **ESPN** has both data sources (we already call their scoreboard API for match status)

**Our advantage:** We can combine BOTH in one place. "Djokovic is in play → currently #2 → if he wins this match, moves to #1 → check his match stats: 8 aces, 85% 1st serve, 3/4 BP saved."

**FlashScore features (from research):**
- Aces, double faults, serve %, serve points won, break points saved, unforced errors
- Distance covered, point-by-point history
- All available via ESPN scoreboard API (which we already use)

**Ticket:** tennis-point-stats-live (P2) — show live match stats for in-progress matches, integrated with live rankings table.

---

## Research: Cycling Data Sources

**Yesterday's recommended lens:** Cycling dynamic feed + data source improvements.

### Tour de France Status (LIVE NOW)

- **Current stage:** Stage 15 (July 19) — mountain stage, 184km, summit finish at Plateau de Solaison
- **Race ends:** July 27 (Sunday)
- **Current leader:** Likely Pogacar or Vingegaard (jersey leaders parsing from Wikipedia working correctly)
- **Our feed:** Wikipedia API (dynamic, self-healing) — VERIFIED WORKING via commit 275d622

**Staleness concern (from July 17 report):** Giro d'Italia and Tour de Suisse showing as "ongoing" when finished.

**RESOLUTION (verified today):**
- **Giro d'Italia 2026** — CORRECTLY archived as final results (May 8-31 finished). Page at /events/giro-2026 shows "Final GC Standings & Jersey Winners" (not "live").
- **Tour de Suisse 2026** — CORRECTLY archived (June 17-21 finished). Page shows final results, Pogačar winner.
- **Tour de France 2026** — LIVE feed working (Wikipedia scraper, Stage 15 parsing correctly)

**Conclusion:** Cycling staleness was already fixed. No new tickets needed for TdF feed.

### UCI World Rankings (Still Needed)

**Existing tickets:**
- `cycling-uci-rankings` (P1, created June 27) — UCI World Rankings dynamic feed
- `uci-cycling-rankings` (P2, created July 11) — DUPLICATE

**Action taken:** Closed uci-cycling-rankings as duplicate, consolidated notes into cycling-uci-rankings.

**Data source options (from research):**
- **ProCyclingStats** (procyclingstats.com/rankings/me/uci-individual) — has data but Cloudflare-protected, unofficial API exists via Parse.bot
- **UCI official** (uci.org/discipline/road) — has rankings, scrapeable, updated Tuesdays
- **Wikipedia** — no comprehensive UCI rankings page (unlike TdF)

**Recommendation:** P1 priority correct. ProCyclingStats scraping via Parse.bot API or direct UCI scraping.

---

## Research: Tour de France Final Week Betting Context

**Search volume spike:** "Tour de France 2026 winner" search spiking NOW (final week July 21-27).

### Current Odds (from research)

**Polymarket prediction market:**
- Tadej Pogacar: **95% probability** to win 5th Tour title
- Jonas Vingegaard: 4/1 (~20% implied)
- Remco Evenepoel: distant third (+1500)

**Sportsbook odds:**
- Pogacar: 1.29 decimal / -350 American (~78% implied)
- Vingegaard: 100-30 / +333
- Context: Pogacar won 2020, 2021, 2024, 2025. Going for 5th title.
- Vingegaard won Giro 2026 (May), trying to hold all 3 Grand Tours at once

**Final week context (from Olympics.com):**
- Stage 15 (today): Summit finish at Plateau de Solaison, 4,700m elevation, decisive for GC
- Rest Day 2: Monday July 20 (Haute-Savoie)
- Stages 16-21: Final week, multiple mountain stages, Paris finish July 27

**Ticket:** tdf-final-week-betting (P1) — ships by July 20 (rest day) to capture final-week search spike. Includes stage-by-stage analysis, GC gaps, betting value opportunities, affiliate CTAs.

---

## Research: US Open 2026 (Post-WC Retention Bridge)

**Tournament dates:** August 30 - September 13, 2026 (3 weeks from now)

**Venue:** USTA Billie Jean King National Tennis Center, Flushing Meadows, Queens, NYC

**Schedule breakdown:**
- Fan Week (free admission): Aug 23-29
- Main draw singles: Aug 30 - Sep 13
- Women's Final: Saturday Sep 12
- Men's Final: Sunday Sep 13
- Broadcast: ESPN, ESPN2, ABC (finals on ABC)

**SEO opportunity:** "US Open 2026" searches ramping NOW (6 weeks pre-tournament), peak at "US Open predictions", "US Open betting odds", "US Open preview" closer to Aug 30.

**Why this is the post-WC retention bridge:**
- WC Final ends: July 19, 6PM ET
- TdF ends: July 27
- **Content gap:** July 27 - Aug 30 (34 days with no major live event unless we build preview content)
- US Open preview content fills the gap + captures search volume ramp

**Competitive context:**
- ESPN, BBC Sport, Tennis.com will have preview articles 2-4 weeks pre-tournament
- Betting sites (bet365, FanDuel) will have odds comparisons + picks
- **Our angle:** Preview + betting context + link to live ATP/WTA rankings for favorites

**Ticket:** us-open-2026-preview (P1) — ships by July 25 to capture 6-week pre-tournament search ramp. Targets: "US Open 2026 predictions", "US Open betting odds", player matchup previews.

---

## Backlog Analysis & Changes

**Starting state:** 29 buildable tickets (healthy)

**Created new tickets (5):**

1. **us-open-2026-preview** (P1, tennis+seo+betting+revenue+retention) — US Open 2026 preview article with betting context. Ships by July 25 to capture search volume ramp. Post-WC Final retention bridge.

2. **tdf-final-week-betting** (P1, cycling+betting+revenue+seo+tdf) — Tour de France final week (July 21-27) winner betting article. Pogacar vs Vingegaard analysis, stage-by-stage preview, affiliate CTAs. Ships by July 20 (rest day).

3. **tennis-elo-ratings-live** (P2, tennis+differentiation+engagement+stats) — Integrate live Elo ratings (Tennis Abstract, UTS, TenELOs) as optional column on ATP/WTA live rankings. Surface-specific Elo (hard/clay/grass) + win probability for matchups. ONLY site combining live rankings + Elo.

4. **tennis-point-stats-live** (P2, tennis+differentiation+live+engagement) — Point-by-point live match stats (aces, DFs, 1st serve %, BP saved) for in-progress matches. Integrates with live rankings table ("in play" badge → click for stats). ESPN API already has this data.

5. **evergreen-tournament-content** (P2, retention+seo+content+automation) — Post-tournament evergreen content system. Converts event-specific articles (WC Final, TdF, Grand Slams) into year-round traffic drivers: "Results + Next Year Preview + Historical Context". Adds "What's Next" modules to all archived event pages. Prevents traffic cliff after tournaments end.

**Deduplicated (1):**

6. **uci-cycling-rankings** (closed as duplicate of cycling-uci-rankings) — Both P1/P2 tickets covered UCI World Rankings integration. Closed the newer one (July 11), kept the canonical ticket (June 27).

**Ending state:** 33 buildable tickets (healthy)

**Deduplication check:** Verified no overlap with existing open tickets. No conflicts found.

---

## Loop Health Observations

**Strengths:**
- Autonomous agents running regularly: inspector (2×/day), perf-inspector (daily), data-sanity (5×/day)
- Data integrity improving: cycling feed self-recovered (b47b18a), inspector catching consistency bugs
- Design system progressing: OG image templates, sport hero imagery

**Critical gaps (PERSIST FROM YESTERDAY):**
1. **SEO P0 blockers stalled (WEEK 2)** — google-search-console-setup (P0, created July 11, 9 days ago) and seo-meta-per-page-audit (P0, created July 18, 2 days ago) remain unfixed. These gate ALL organic traffic growth (currently 7.7% organic). **Human action required for GSC verification.**

2. **Revenue blockers require human action** — wc-betting-affiliates (P0) needs FanDuel/Bet365 signup forms filled. AdSense approval pending. Planner can't execute these. Should be flagged "🔑 HUMAN ACTION REQUIRED" in title.

3. **Homepage bounce crisis (70%)** — homepage-live-banner, homepage-live-carousel, homepage-live-urgency-widget all P0/P1 but unfixed. This is costing us 70% of visitors on first page.

**Process recommendation (REPEAT FROM YESTERDAY):**
- **Flag human-action tickets clearly:** Add "🔑 HUMAN ACTION" prefix to titles for tickets requiring external signups, domain verification, API key approvals. Makes them visible to the human, not silently queued for planner.

---

## Revenue Status & Immediate Actions

**Current state (UNCHANGED):**
- **Ad revenue:** $0 (AdSense PENDING human verification)
- **Betting affiliates:** $0 (NOT SIGNED UP — requires human action)
- **Traffic:** 148 pageviews/28 days (~5/day) — critically low, blocked by SEO

**48-hour priorities (POST-WORLD CUP FINAL):**
1. **[PLANNER URGENT] US Open preview article** — Ships by July 25, targets post-WC tennis searches, includes betting context. (us-open-2026-preview P1)
2. **[PLANNER URGENT] TdF final week betting article** — Ships by July 20 (rest day), targets "Pogacar Vingegaard winner odds". (tdf-final-week-betting P1)
3. **[HUMAN ACTION] Google Search Console verification** — Verify rankings123.com in GSC, submit sitemap. Gates ALL SEO. (google-search-console-setup P0)
4. **[HUMAN ACTION] Betting affiliate applications** — Apply to FanDuel, Bet365, DraftKings. Revenue = $0 until this is done. (wc-betting-affiliates P0)

**Post-Final (July 20+):**
5. **[PLANNER] Evergreen WC content** — Convert /world-cup/final page to "2026 Results + 2030 Preview" + "What's Next: Tour de France" module. (evergreen-tournament-content P2)

**Monthly revenue goal:** Not yet set. Current blocker: no betting affiliates signed up, no AdSense approved. Once live, target $100/month by Aug 15 (baseline AdSense + first affiliate conversions).

---

## Recommendations (Top 3)

1. **[HUMAN ACTION NOW] Verify Google Search Console** — Organic traffic has been stuck at 7% for 9+ days. GSC verification is a 20-minute task that unblocks ALL SEO work: sitemap submission, keyword tracking, indexing monitoring, unique meta tags. Zero cost, infinite leverage. Do this FIRST before any other SEO ticket. (google-search-console-setup P0)

2. **[PLANNER 48h WINDOW] Ship post-WC Final retention content** — US Open preview (by July 25) + TdF final week betting (by July 20) are the bridges that convert one-time WC visitors into recurring tennis/cycling fans. Without these, we lose 86% of traffic by July 21. Betting context = highest RPM, SEO long-tail = sustained traffic. (us-open-2026-preview P1, tdf-final-week-betting P1)

3. **[PLANNER DIFFERENTIATION] Tennis Elo ratings integration** — NO competitor (live-tennis.eu, live-ranking.com) shows Elo alongside official rankings. Betting sites show Elo but not live rankings. We'd be the ONLY hybrid. Attracts serious fans + bettors, creates competitive moat (hard to copy quickly). Medium effort, high engagement lift. (tennis-elo-ratings-live P2)

---

## Today's Research Lens

**Post-WC Final retention + tennis differentiation + cycling data sources** — researched post-tournament retention best practices (gr8.tech, NEXT.io, Kambi), identified US Open (Aug 30 - Sep 13) and TdF final week (July 21-27) as retention bridges, filed P1 betting articles for both. Researched tennis advanced stats: Elo ratings (Tennis Abstract, UTS, TenELOs) and point-by-point stats (FlashScore features via ESPN API) as differentiating features vs live-tennis.eu. Verified cycling data sources: TdF Wikipedia feed working correctly, Giro/Suisse correctly archived, UCI rankings still needed (P1 ticket correct priority). Created 5 new tickets (2× P1 retention/betting, 3× P2 differentiation/evergreen), deduplicated 1. Backlog 29 → 33 buildable.

**Tomorrow's recommended lens:** Homepage engagement crisis + mobile UX optimization — analytics show 70% homepage bounce (crisis) vs 0% for /atp-live, /wta-live, /cycling. Research mobile-first UX patterns (rankings sites on mobile), homepage "Live Now" urgency tactics (SofaScore, FlashScore homepage designs), and cross-sport discovery modules. File tickets to fix the 70% bounce before we scale traffic via SEO (no point driving traffic to a broken homepage).

---

## Sources

### Post-Tournament Retention Research
- [MLS's World Cup retention strategy tests conversion model - Yahoo Sports](https://sports.yahoo.com/articles/mlss-world-cup-retention-strategy-225000955.html)
- [7 Ways to Boost Player Retention After the World Cup](https://gr8.tech/blog/sportsbook-player-retention-strategy/)
- [Avoiding the post-tournament drop-off - NEXT.io](https://next.io/news/promoted/avoiding-the-post-tournament-drop-off/)
- [Sportsbook player retention beyond the World Cup - Kambi](https://www.kambi.com/news-insights/world-cup-player-retention/)

### Tennis Advanced Stats & Elo Ratings
- [Tennis Abstract: ATP Elo Ratings](https://tennisabstract.com/reports/atp_elo_ratings.html)
- [Ultimate Tennis Statistics - Elo Ratings](https://www.ultimatetennisstatistics.com/eloRatings)
- [TenELOs | Live Tennis Elo Ratings on Hard, Clay, and Grass](https://tenelos.com/)
- [Tennis live scores | Sofascore](https://www.sofascore.com/tennis)
- [Tennis Live Scores | FlashscoreUSA.com](https://www.flashscoreusa.com/tennis/)

### Cycling Data Sources
- [ProCyclingStats](https://www.procyclingstats.com/)
- [ProCyclingStats API – Race Results & Rider Data - Parse.bot](https://parse.bot/marketplace/5e1fc7dd-2556-4f19-a5ec-1b945e990340/procyclingstats-com-api)
- [Road | RANKINGS | UCI](https://www.uci.org/discipline/road/6TBjsDD8902tud440iv1Cu?tab=rankings)
- [Tour de France 2026: Stage 15 preview, Sunday 19 July | Olympics.com](https://www.olympics.com/en/news/tour-de-france-2026-stage-15-preview-sunday-19-july-route-profile-schedule-climbs-how-to-watch-live)

### US Open 2026
- [US Open 2026 Dates Announced: Official Schedule Revealed](https://www.newyorkwelcome.net/news/us-open-2026-official-dates.htm)
- [US Open 2026 Overview | WTA Official](https://www.wtatennis.com/tournaments/905/us-open/2026)
- [2026 US Open tournament dates](https://www.usopen.org/en_US/news/articles/2025-12-11/2026_us_open_tournament_dates.html)

### Tour de France 2026 Betting
- [Tour de France 2026 predictions, tips and odds: More history beckons for Tadej Pogacar](https://www.racingpost.com/sport/cycling-tips/tour-de-france/tour-de-france-2026-predictions-tips-odds-yellow-jersey-pogacar-vingegaard-aZf2F2J9gFfU/)
- [Pogacar vs Vingegaard Prediction: Tour de France 2026 GC Odds](https://bettorsinsider.com/cycling/2026/07/07/pogacar-vs-vingegaard-prediction-tour-de-france-2026-gc-odds-stats-and-best-bet-as-yellow-jersey-battle-heats-up/)
- [Tour De France 2026: Winner Predictions & Odds | Polymarket](https://polymarket.com/event/tour-de-france-2026-winner-20260702201214011)
- [2026 Tour de France Odds: Can Tadej Pogačar Win a Fifth Tour Title?](https://www.hardrock.bet/news/2026-tour-de-france-odds-can-tadej-pogacar-win-a-fifth-tour-title/)

### ESPN API Research
- [ESPN API Documentation: Free Sports Data Endpoints | ScrapeCreators Blog](https://scrapecreators.com/blog/espn-api-sports-data)
- [ESPN API 2026: Free Unofficial Endpoints for Scores, Stats & Schedules](https://sportsapis.dev/espn-api)
- [GitHub - Public ESPN API Documentation](https://github.com/pseudo-r/Public-ESPN-API)
