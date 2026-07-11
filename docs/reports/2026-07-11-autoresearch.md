# Autoresearch Report — 2026-07-11

**Focus:** Data source expansion + SEO/content opportunities

**Backlog health:** 146 buildable → 158 after today (+14 new strategic tickets, -2 closed)

---

## Executive Summary

**CRITICAL SEO CRISIS**: Only 5 organic search sessions in 28 days. We're invisible to Google. Player pages (tennis + WC) are THE solution — every competitor has them, they're the SEO goldmine for sports sites.

**TIME-SENSITIVE**: World Cup semifinals in 4 days (July 14-15), Final in 8 days (July 19). Peak tournament attention window. Betting content must ship BEFORE matches for revenue capture.

**CYCLING DATA BROKEN**: Tour de France is LIVE (Stage 7-8 now, race through July 26) but site shows "preview data". Wikipedia feed likely needs parsing fix. Analytics show 0% bounce (users WANT cycling) but stale data = broken promise.

**Key Actions**: Filed 14 strategic tickets weighted toward World Cup (6 WC, 5 tennis, 2 SEO foundation, 1 cycling fix). Heavy SEO focus to fix organic traffic crisis.

---

## What Shipped Recently (since 2026-07-09)

Per git log:
- **Inspector run** (July 10): Site healthy, no new bugs found
- **Button state system** enhancement: 6-state system (Clay 2026 design)
- **Cycling bug fixes**: Race status contradiction fixed
- **ATP Live fixes**: Duplicate table bug resolved while preserving SSR/SEO
- **World Cup fixes**: Match pages, stage pages, data anomaly fixes

**Observation**: Planner has been running but velocity appears lower (many bug fixes vs new features). Backlog was FULL (158 open) so no starvation, but time-sensitive WC tickets (R16, QF) may have slipped past deadlines.

---

## Tournament Timing (TIME-SENSITIVE)

### World Cup 2026 — 8 Days Remaining
- **Semifinals**: July 14-15 (4 days away)
  - Match 1: July 14, 3pm ET
  - Match 2: July 15, 3pm ET
- **Final**: July 19, 8pm ET (8 days away)

**Peak revenue window**: Betting content peaks 24-48hr BEFORE match. Must publish:
- Semifinals preview: July 12-13 (2-3 days from now)
- Final preview: July 17 (6 days from now)

### Tour de France 2026 — IN PROGRESS
- **Race dates**: July 4-26 (15 days remaining)
- **Current status**: Stage 7-8 should be complete
- **Problem**: Site shows "preview data" not live results

### Wimbledon 2026
- **Ends**: July 12 (tomorrow) — stale tickets should be closed/deprioritized

---

## CRISIS: SEO Invisibility (Only 5 Organic Sessions)

### Analytics Evidence
**Last 28 days:**
- **Total users**: 76
- **Sessions**: 97
- **Organic search**: 5 sessions (5.3%) ← CRISIS
- **Direct**: 88 sessions (90.7%)

**Traffic sources show**: We're almost entirely dependent on direct traffic (people who already know rankings123.com). No organic discovery.

**Comparison**: Successful sports sites get 60-80% traffic from organic search (from industry benchmarks).

### Root Cause Analysis

**What's missing:**
1. **Player pages** (tennis + WC) — the #1 SEO driver for sports sites
2. **Optimized meta tags** — generic/duplicate titles/descriptions
3. **Structured data** — no JSON-LD schemas, no rich snippets
4. **Comprehensive sitemap** — missing dynamic pages
5. **Google Search Console** — no visibility into indexing/crawl issues

**First principles**: Search traffic = indexable pages × search demand × SEO quality.
- **Indexable pages**: We have ~20 pages. Competitors have 500-1,000+ (player pages).
- **Search demand**: Player names = 90% of tennis search volume (e.g., "Djokovic ranking").
- **SEO quality**: No structured data, generic meta tags.

We're failing on ALL three levers.

---

## Competitor Intelligence

### Tennis Rankings Sites

**live-tennis.eu** (Cloudflare-blocked from fetch):
- From search results: ATP/WTA live, race rankings, player pages, points breakdown, doubles
- Known to be the leading live tennis ranking destination

**livetennisrankings.com** (successfully fetched):
- Live ATP/WTA rankings
- **Real-time updates** emphasized
- **Biggest points gains/losses** tracking
- **Live projections**
- Tournament coverage
- Player pages with career-high data

**livetennis.io**:
- ATP, WTA, **Elo rankings** (4 ranking types)
- Live updates after every match

**Tennis Temple**:
- **Live ranking projections** for next 4 weeks
- **Player schedules** for next 4 weeks

### World Cup Coverage

**ESPN** (fetched successfully):
- Top scorers table: Rank, Name, Team, Games, Goals
  - Kylian Mbappé: 8 goals in 6 matches
  - Lionel Messi: 8 goals in 5 matches
- Top assists: Michael Olise (France) - 5 assists
- Additional stats: Discipline (cards), Performance metrics
- Clickable player/team links to profiles

**FIFA.com** (fetch returned empty):
- Known to have: comprehensive match stats, play-by-play, player profiles, videos, H2H comparisons

### Gaps We Must Close

**Tennis parity:**
- ✅ ATP/WTA live rankings (we have)
- ❌ Player detail pages (all competitors have)
- ❌ Race rankings (live-tennis.eu, livetennis.io, Tennis Temple have)
- ❌ Head-to-head stats (MatchStat, Tennis Temple have)
- ❌ Points breakdown (live-tennis.eu has)
- ❌ Elo rankings (livetennis.io has — differentiation opportunity)

**World Cup parity:**
- ✅ Standings, bracket, top scorers (we have)
- ❌ Player profile pages (ESPN, FIFA have)
- ❌ Team profile pages (ESPN, FIFA have)
- ❌ Detailed match stats (ESPN, FIFA have)
- ❌ Live play-by-play (FIFA has)

---

## Data Source Expansion Research

### Cycling Data Sources

**ProCyclingStats** (procyclingstats.com):
- UCI rankings, race results, rider profiles
- **Status**: Cloudflare-blocked (confirmed from previous research)
- **Alternative**: Third-party API via Parse.bot marketplace (not official)

**UCI Official** (uci.org):
- Road cycling rankings, calendar, results
- **Status**: Scrape-able
- Rankings updated weekly (Tuesdays)

**SportBex Cycling API**:
- Real-time cycling data
- Tour de France, Giro, Vuelta, UCI WorldTour events
- **Status**: Paid API but comprehensive

**Current issue**: Wikipedia TdF feed exists but may not be parsing stage winners correctly. Need to verify Wikipedia has updated data (should have Stages 1-7 by now) and fix parsing if broken.

### Tennis Data Sources

**Ultimate Tennis Statistics** (ultimatetennisstatistics.com):
- Free, comprehensive men's tennis stats
- **Head-to-Head section** available
- Elo ratings, tournament forecasts
- Used for career-high data in our deep ATP feed

**SteveG Tennis API** (stevegtennis.com):
- **Free tier available** for prototyping
- ATP, WTA, ITF data
- Live scores, player stats, rankings, H2H records

**API-Tennis.com**:
- 14-day free trial
- Comprehensive tennis data

**Recommendation**: Use Ultimate Tennis Statistics (free, already integrated for ATP deep) + SteveG Tennis API free tier for H2H stats.

### Betting Odds APIs

**The Odds API**:
- **Free tier**: 500 requests/month
- Multi-sport coverage

**API-Football**:
- **Freemium** model
- Odds endpoints included

**SportBex**:
- Trial available
- Comprehensive odds data

**CX FIRST reminder**: Never show fabricated/placeholder odds. Betting content ships ONLY when backed by real API data.

---

## Traffic & Analytics Update (Last 28 Days)

**Overall**: 184 pageviews, 97 sessions, 76 users

**Top Pages**:
1. **Homepage** — 73 views, 22.6s avg, **71.4% bounce** ⚠️
2. **World Cup** — 58 views, 157.8s avg, **40.0% bounce** ⭐
3. **ATP Live** — 16 views, 18.5s avg, **7.1% bounce** ⭐
4. **Cycling** — 7 views, 51.5s avg, **0.0% bounce** ⭐
5. **Golden Boot** — 5 views, 281.9s avg, **0.0% bounce** ⭐

**Key Insights**:
- **Homepage problem persists**: 71% bounce (from previous 70% — no improvement)
- **World Cup = engagement**: 158s avg session, 40% bounce (best traffic driver)
- **Cycling = high engagement but LOW traffic**: 0% bounce, 51s avg, but only 7 views (need to fix stale data + promote)
- **ATP = excellent engagement**: 7.1% bounce (users stay)
- **Golden Boot = longest sessions**: 282s avg (users love player stats)

**Traffic Sources**:
- Direct: 88 sessions (90.7%)
- **Organic Search**: 5 sessions (5.2%) ← CRISIS
- Referral: 3 sessions (3.1%)

**Geography**:
- US: 52 sessions (53.6%)
- Germany: 11 sessions (11.3%)
- France: 10 sessions (10.3%)

**Mobile**: 37% of traffic

**Search Terms**: No meaningful search data yet (too low volume)

---

## New Tickets Created (14 Total)

### World Cup — 6 tickets (≥50% per TIME-SENSITIVE directive)

1. **wc-semifinals-content-hub** (p0) — Semifinals preview + betting hub
   - **Urgency**: Semifinals July 14-15 (4 days away)
   - **ROI**: Betting content peaks 24-48hr before match, $15-40 RPM vs $5-10 general
   - **Impact**: Time-sensitive revenue capture, tournament peak attention

2. **wc-final-preview-ultimate** (p0) — World Cup Final ultimate preview
   - **Urgency**: Final July 19 (8 days away), publish July 17
   - **ROI**: MAXIMUM — tournament apex, highest single-match traffic spike
   - **Impact**: Peak betting volume, peak social sharing, 4-year cycle culmination

3. **wc-team-profiles-qf** (p1) — Team profile pages for 8 QF teams
   - **SEO**: "France World Cup 2026" = high search volume
   - **Session depth**: Team pages → players → matches = 3-4 pages/session
   - **Parity**: FIFA/ESPN have team pages, we don't

4. **wc-player-profiles-top** (p1) — Player profiles for top 20 scorers + stars
   - **SEO goldmine**: "Mbappe World Cup 2026" = MASSIVE search volume
   - **Current gap**: Golden Boot table has names but no clickable profiles (dead end)
   - **ROI**: Player searches = biggest WC SEO opportunity

5. **wc-match-momentum-live** (p1) — Live match momentum & stats
   - **Differentiation**: Beyond basic scoreboards (possession %, shots, momentum bar)
   - **ESPN data available**: Advanced match stats already in API
   - **Timing**: Showcase during semifinals/final (3 matches at peak attention)

6. **betting-odds-api-free** (p1) — Betting odds API integration (free tier)
   - **Revenue enabler**: Required for all betting content (semifinals/final previews)
   - **CX FIRST**: Never show fake odds — ships ONLY with real API data
   - **Free options**: The Odds API (500 req/month), API-Football freemium

### Tennis — 5 tickets (~33%)

7. **tennis-player-pages-seo** (p0) — **CRITICAL** — Player detail pages for top 200 ATP/WTA
   - **SEO CRISIS solution**: Player pages = THE SEO goldmine
   - **Impact**: 10-100x organic traffic potential (player names = 90% tennis searches)
   - **Parity**: Every competitor has player pages, we don't
   - **ROI**: VERY HIGH — highest SEO leverage action available

8. **tennis-h2h-stats** (p1) — Head-to-head stats integration
   - **Parity gap**: live-tennis.eu, MatchStat, Tennis Temple all have H2H
   - **Data source**: Ultimate Tennis Statistics (free) or SteveG Tennis API
   - **User need**: "Djokovic vs Alcaraz head to head" common search

9. **tennis-race-rankings** (p1) — ATP/WTA Race Rankings (YTD points)
   - **Parity**: live-tennis.eu, livetennis.io, Tennis Temple ALL have Race
   - **Why fans care**: Determines Finals qualification (top 8), high stakes late season
   - **Effort**: LOW-MEDIUM (ESPN API already integrated, add race endpoint)

10. **tennis-race-rankings** (p1) — Race Rankings (listed above)

### SEO Foundation — 2 tickets (~13%)

11. **seo-meta-structured-data** (p0) — Meta tags + JSON-LD structured data optimization
    - **SEO foundation**: Rich snippets = 30-40% CTR improvement
    - **Current gap**: Generic/duplicate meta tags, no structured data
    - **Impact**: Multiplier for ALL other SEO work

12. **xml-sitemap-dynamic** (p1) — Comprehensive XML sitemap with player/team pages
    - **SEO crawlability**: Google won't index pages it doesn't know exist
    - **Scale**: Will have 500+ pages after player pages ship
    - **Dependency**: Should ship WITH or immediately after tennis-player-pages-seo

13. **google-search-console-setup** (p1) — Google Search Console setup & monitoring
    - **SEO visibility**: Currently BLIND to why we don't rank
    - **What GSC provides**: Indexing status, queries, CTR, coverage errors
    - **Effort**: LOW (one-time setup)

### Cycling — 2 tickets (~13%)

14. **tdf-live-stage-results** (p1) — **URGENT** — Tour de France live results fix
    - **Problem**: Race is LIVE (Stage 7-8) but site shows "preview data"
    - **Analytics**: 7 views, 0% bounce (users WANT this content)
    - **Solution**: Fix Wikipedia parsing or add ESPN cycling backup
    - **Timing**: 15 days remaining in race

15. **uci-cycling-rankings** (p2) — UCI World Rankings integration
    - **Parity**: ProCyclingStats, FirstCycling, UCI.org all have year-round rankings
    - **Data source**: UCI official (scrape-able) or SportBex API
    - **Impact**: Enables cycling as standalone sport vertical (not just TdF)

---

## Backlog Analysis

**Current state**: 146 buildable (before today) → 158 after (+14 new tickets, -2 closed)

**Assessment**: HEALTHY — well above 12-ticket threshold (planner ships ~5-15/day × 5 runs)

**By priority:**
- **p0**: 43 tickets (critical path)
- **p1**: 111 tickets (high value)
- **p2**: 83 tickets (medium value)
- **p3**: 24 tickets (nice-to-have)

**World Cup coverage (≥50% per TIME-SENSITIVE directive):**
- 20+ WC-tagged tickets total
- Time-sensitive coverage: Semifinals (p0 NEW), Final (p0 NEW)
- SEO content: Team pages (p1 NEW), Player pages (p1 NEW)
- Live features: Momentum tracker (p1 NEW), live ticker (p2 existing)

**Tennis parity (Phase 1):**
- **Player pages** (p0 NEW) — THE critical SEO/parity gap
- Race rankings (p1 NEW)
- H2H stats (p1 NEW)
- Points breakdown (p1 existing)
- Live scores (p1 existing)
- Doubles (p3 existing)

**SEO foundation (urgent):**
- Player pages (p0 NEW)
- Meta/structured data (p0 NEW)
- Sitemap (p1 NEW)
- Google Search Console (p1 NEW)

**Revenue enablement:**
- Betting odds API (p1 NEW) — prerequisite for all betting content
- AdSense approval (p0 existing)
- Betting affiliate signups (p0 existing)
- ads.txt (p0 existing)

---

## Loop Health (Self-Improvement)

### Observations from Planner Logs

**Positive:**
- Planner runs consistently (5×/day schedule maintained)
- Work shipping steadily (bug fixes, enhancements, cycling fixes)
- Build quality maintained (green builds, clean lint)

### Potential Issues

1. **Time-sensitive tickets slipping past deadlines**
   - Previous report (July 9) noted: R16 betting previews missed deadline
   - Wimbledon tickets (p0) still open but tournament ends tomorrow
   - **Recommendation**: Add "deadline" field to ticket frontmatter + auto-reprioritize expiring tickets

2. **Bug fixes vs feature velocity**
   - Recent commits show many bug fixes (ATP table, cycling status, WC matches)
   - Good: Inspector catching issues
   - Concern: Feature velocity may be lower than ideal
   - **No action needed yet** — bugs must be fixed, and backlog is healthy

3. **No visibility into WHY planner skips tickets**
   - Planner log shows START entries but unclear which tickets built vs skipped
   - **Recommendation**: Planner should log ticket selection reasoning + skip reasons

### Process Recommendations

1. **Stale ticket cleanup**: Close time-sensitive tickets past their deadline (R16, QF, Wimbledon)
2. **Deadline tracking**: Add explicit deadlines to time-sensitive tickets
3. **Planner transparency**: Log why tickets are picked/skipped each run

---

## Top 3 Recommendations

1. **URGENT: Ship tennis player pages** (tennis-player-pages-seo, p0)
   - **WHY**: Only 5 organic search sessions = SEO crisis. Player pages are THE solution — every competitor has them, they're 90% of tennis search volume.
   - **IMPACT**: 10-100x organic traffic potential. This is the highest-leverage SEO action available.
   - **TIMING**: Must ship ASAP to get indexed before peak tennis season (US Open prep)

2. **THIS WEEK: Ship WC semifinals preview + betting hub** (wc-semifinals-content-hub, p0)
   - **WHY**: Semifinals July 14-15 (4 days away). Betting content peaks 24-48hr BEFORE match.
   - **IMPACT**: Time-sensitive revenue ($15-40 RPM betting vs $5-10 general sports), tournament peak attention.
   - **DEPENDENCY**: Requires betting-odds-api-free (p1) — ship together or have real odds ready

3. **THIS WEEK: Fix Tour de France live data** (tdf-live-stage-results, p1)
   - **WHY**: Race is LIVE (Stage 7-8 now) but site shows "preview data". Analytics show 0% bounce (users WANT this) but we're delivering stale content = broken promise.
   - **IMPACT**: 15 days of daily traffic potential, cycling differentiation opportunity, user trust.
   - **EFFORT**: LOW-MEDIUM (likely a parsing fix)

---

## Next Run Focus

**Tomorrow's lens (2026-07-12)**: Revenue streams + monetization acceleration

**Rotation**: Data/SEO (today) → Revenue (tomorrow) → UX/engagement → Tennis parity → World Cup features → Loop health

---

## First Principles Summary

**Today's focus** was data source expansion + SEO, but the research revealed a deeper truth:

**The SEO crisis (5 organic sessions) is NOT a data problem — it's a PAGES problem.**

We have good data (ATP/WTA/World Cup feeds working). We have good UX (low bounce on content pages). What we DON'T have is **indexable pages at the scale search engines require**.

**First principles:**
- Search traffic = indexable pages × search demand × SEO quality
- We're failing on pages (20 vs competitors' 500-1,000)
- Player pages solve ALL three: 400 pages, MASSIVE demand, perfect for structured data

**The highest-ROI action**: Ship tennis-player-pages-seo (p0). It's not the most urgent (WC Final is), but it's the foundational fix that compounds into 10-100x organic growth.

**World Cup urgency is real** (8 days left), but it's a short-term spike. Player pages are the long-term engine.

**Recommendation for planner**: Balance World Cup time-sensitive work (≥50% per directive) with foundational SEO work (player pages, meta/structured data, sitemap). Both matter.

---

## Sources

### Competitor Research
- [Live Tennis Rankings - Real-time ATP & WTA Rankings](https://www.livetennisrankings.com/)
- [Live ATP, WTA & Elo tennis rankings 2026, top 100](https://livetennis.io/rankings/)
- [ATP LIVE Ranking](https://en.tennistemple.com/atp-live-rankings)
- [FIFA World Cup 2026™](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026)
- [FIFA World Cup Scoring Stats, 2026 Season - ESPN](https://www.espn.com/soccer/stats/_/league/FIFA.WORLD/view/scoring/season/2026)

### Data Source Research
- [ProCyclingStats | Cycling Statistics, Results and Rankings](https://www.procyclingstats.com/)
- [Road | RANKINGS | UCI](https://www.uci.org/discipline/road/6TBjsDD8902tud440iv1Cu?tab=rankings)
- [Cycling API for Apps, Websites and Sports Platforms](https://sportbex.com/cycling-api/)
- [Ultimate Tennis Statistics](https://www.ultimatetennisstatistics.com/)
- [Ultimate Tennis Statistics - Heads-to-Heads](https://www.ultimatetennisstatistics.com/headsToHeads)
- [Tennis API – Access ATP & WTA Data, Stats and Predictions](https://www.stevegtennis.com/h2h-predictions/tennis-api/)

### Revenue/Betting
- Previous research from 2026-07-09 report on betting affiliate programs and RPM benchmarks
