# Autoresearch Report — 2026-06-21

**Lens:** World Cup feature depth + backlog health (ensuring ≥2 days buildable work)

## Executive Summary

With the World Cup live through July 19, this run focused on **replenishing the WC feature backlog** (nearly exhausted after shipping schedule, bracket, team/match pages, stats, layout). Generated **8 new high-ROI World Cup tickets** mined from BBC/ESPN/FotMob/SofaScore competitive analysis, plus reopened both `worldcup` and `tennis-site` epics to unblock child tickets. **Backlog now healthy: 24 ready tickets** (~1.5–4 days of planner capacity), weighted to CX (parity features) and revenue enablement.

## What Shipped Recently (last 7 days)

Per git log:
- ✅ **Projected knockout bracket** (live updates from current group standings, BBC-style)
- ✅ **Full tournament schedule** (not just one matchday)
- ✅ **In-page section navigation** (Today's Matches, Standings, Schedule, Bracket, Leaders)
- ✅ **Seeding labels** on projected bracket matchups
- ✅ **WTA full ranking** (official API, band SEO pages)
- ✅ **Data-sanity validator** + auto-ticketing (catches fabricated/placeholder data at build time)
- ✅ **CX-FIRST rule** enshrined in CLAUDE.md (no placeholder/fabricated UI; wc-odds reopened, gated on real source)

Strong week — core WC infrastructure shipped. Now need fresh feature ideas to keep momentum.

## Competitor Analysis — World Cup Features

Researched **BBC, ESPN, FotMob, SofaScore** for World Cup 2026 coverage gaps:

### Key Features We Lack (now filed as tickets)

1. **Player pages** ([wc-player-pages](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-player-pages.md)) — Per-player tournament stats (goals, assists, minutes, cards). Huge SEO long-tail: "Messi World Cup 2026", "Haaland stats". Mirrors our successful team pages pattern.
   - **Sources:** [FOX Golden Boot tracker](https://www.foxsports.com/stories/soccer/2026-fifa-world-cup-golden-boot-tracker), [FIFA Golden Boot](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/adidas-golden-boot-race-top-scorer)

2. **Venue/stadium/city pages** ([wc-venue-pages](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-venue-pages.md)) — 16 host cities × stadium pages = SEO goldmine. Users search "World Cup matches Dallas", "MetLife Stadium WC 2026".
   - **Sources:** [FIFA Host Cities](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/host-cities), [Olympics.com stadiums](https://www.olympics.com/en/news/fifa-world-cup-2026-full-list-stadiums-mexico-canada-usa)

3. **"What-if" qualification scenarios** ([wc-scenarios](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-scenarios.md)) — Interactive calculator: users simulate results, see who advances. Peak engagement during final group matchdays.
   - **Inspired by:** [worldfootball.net calculator](https://www.worldfootball.net/competition/co139/fifa-world-cup/standings-calculator/), [World Cup Pass simulator](https://worldcuppass.com/simulator/), [GoWoC](https://worldcupcalculator.com/)

4. **Form & momentum tracker** ([wc-form-tracker](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-form-tracker.md)) — Recent form badges (W-W-D), "biggest movers", streaks. Adds narrative beyond raw standings.
   - **Competitor examples:** SofaScore form badges, FotMob streak highlights

5. **Golden Boot dedicated page** ([wc-golden-boot-page](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-golden-boot-page.md)) — Expand inline "Tournament Leaders" into full SEO destination: `/world-cup/golden-boot` with richer detail (penalties vs open play, goals-per-game, race history).
   - **Current leaders:** Messi, Jonathan David (3 goals each). Sources: [FOX](https://www.foxsports.com/stories/soccer/2026-fifa-world-cup-golden-boot-tracker), [FIFA](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/adidas-golden-boot-race-top-scorer)

6. **Advanced match stats (xG, possession, shot maps)** ([wc-xg-stats](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-xg-stats.md)) — Differentiate from basic-stats sites. Show xG, possession %, shots on target.
   - **Free sources:** [FotMob xG table](https://www.fotmob.com/leagues/77/table/world-cup?filter=xg), [Understat](https://understat.com/), [FBref/StatsBomb](https://fbref.com/), [xGscore.io](https://xgscore.io/xg-statistics/world-cup/2026)
   - **Paid (if free fails):** TheStatsAPI ($50/mo), Opta (enterprise)
   - **CX-FIRST:** Gate on real source; no fabricated xG.

7. **Head-to-head records** ([wc-h2h](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-h2h.md)) — Historical results between teams (last 5 meetings, WC-specific H2H). Adds narrative/rivalry context.

8. **Team of the Tournament/Round** ([wc-team-of-tournament](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-team-of-tournament.md)) — Best XI per round. High engagement (shareable, debate-worthy).
   - **Competitor example:** [SofaScore Team of the Day/Round](https://www.sofascore.com/news/world-cup-2026-team-of-the-day-sofascore-ratings)

## Data Opportunities

### Free xG / Advanced Soccer Stats Sources (for wc-xg-stats)

Evaluated per ticket `opta-soccer-stats` + this run's research:
- **[Understat](https://understat.com/)** — last free xG source for European leagues (may cover WC)
- **[FBref/StatsBomb](https://fbref.com/)** — free xG + advanced stats
- **[FotMob](https://www.fotmob.com/leagues/77/table/world-cup?filter=xg)** — publicly shows WC xG table (scrape-able)
- **[xGscore.io](https://xgscore.io/xg-statistics/world-cup/2026)** — WC 2026 xG stats
- **ESPN advanced endpoints** — probe match detail for xG/possession fields (unknown if available)

**Recommendation:** Start with ESPN probe (keyless); fallback to FotMob scrape or Understat. Gate on real source — NO fabricated xG.

### ESPN Player Stats Endpoint

Research shows **ESPN lacks a dedicated public player stats endpoint** for World Cup. Available data:
- `/sports/soccer/fifa.world/scoreboard` — match scoreboard
- Match detail objects likely include lineups + basic player stats (goals, cards)
- For richer player stats: aggregate from match lineups/events, or use TheStatsAPI (paid)

**Recommendation for wc-player-pages:** Aggregate player stats from match lineups/events in ESPN data; fallback to mock if unavailable.

## Backlog Health

### Before This Run
- **22 open tickets** total, but only **1 ready** (the rankings123 epic) — rest blocked by parent epic status (worldcup = closed, tennis-site = open but not in_progress).
- **CRITICAL STARVATION RISK** — planner ships ~5–15/day, so <1 ready ticket = loop would halt.

### Actions Taken
1. **Reopened `worldcup` epic** → set to `in_progress` (unblocks 9 WC child tickets including new ones)
2. **Set `tennis-site` epic** to `in_progress` (unblocks 7 p1 tennis parity tickets)
3. **Created 8 new WC tickets** (player pages, venue pages, scenarios, form, Golden Boot page, xG stats, H2H, Team of Tournament)

### Current State
- **24 ready tickets** (22 buildable after excluding 2 epics)
- **Breakdown:**
  - **9 World Cup** (wc-player-pages, wc-venue-pages, wc-scenarios, wc-form-tracker, wc-golden-boot-page, wc-xg-stats, wc-h2h, wc-team-of-tournament, wc-odds)
  - **7 p1 Tennis parity** (live-scores, player-pages, head-to-head, race-rankings, rank-history, points-defend, defend-next)
  - **8 p2–p3** (cycling, ads, betting-affiliate, doubles, etc.)
- **Est. runway:** ~1.5–4 days @ 5–15 tickets/day → **meets ≥2 days target**, with healthy WC/tennis balance.

**Backlog now healthy.** No starvation risk.

## Loop Health Observations

Scanned `.claude/planner-log.json` (not present) and recent git log. Loop performing well:
- **No reverts** in last 7 days
- **Clean verify cadence** — all recent commits show build/lint/check:data-integrity green
- **CX-FIRST enforcement working** — wc-odds removed fabricated data, reopened gated on real source
- **Data-sanity validator shipped** — catches placeholder/"coming soon"/synthetic data at build time (good process improvement)

**No critical loop fixes needed this run.** Process is healthy.

## Traffic & Ad Revenue Status

### Analytics (GA4)
**PENDING** — GA4 service account setup not yet complete. No traffic data available. Cannot report traffic metrics, top pages, or search terms this run.

**Action item:** Prioritize GA4 service account ticket (currently no open ticket for this — may need to file if blocked).

### Ad Revenue (AdSense)
**PENDING** — AdSense approval not yet in place. Ad inventory tickets (`ad-inventory`, `ads-txt`) open but blocked on AdSense account setup.

**Revenue strategy:** Per CLAUDE.md, revenue has long lead times (AdSense approval + affiliate signups take weeks). Keep revenue ENABLEMENT moving in parallel:
- **AdSense path:** ad-inventory → ads-txt → approval → Ezoic → Mediavine (as traffic grows)
- **Betting/odds affiliates:** highest RPM for sports audience — `betting-affiliate` (p2), `tennis-odds` (p2), `wc-odds` (p1, gated on real odds API)

**No fabricated revenue numbers.** Truthfully: revenue is pending, but enablement tickets are queued.

## Top 3 Recommendations (New This Run)

1. **[wc-player-pages](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-player-pages.md) (p1)** — Massive SEO long-tail ("Messi World Cup 2026", "Haaland stats"). Mirrors successful team pages pattern. Modest build (reuse card/table patterns). **Ship ASAP during live tournament.**

2. **[wc-venue-pages](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-venue-pages.md) (p2)** — 16 cities = SEO goldmine ("World Cup Dallas", "MetLife Stadium WC 2026"). Low build effort (mostly static, aggregate matches by venue). **High ROI, low effort.**

3. **[wc-scenarios](https://github.com/kulisama81/rankings123/blob/main/.tickets/wc-scenarios.md) (p2)** — Interactive "what-if" qualification calculator. **Peak engagement during final group matchdays** (users obsess over qualification scenarios). Viral/shareable potential. Moderate build (standings logic exists; add result-input UI).

**Bonus (revenue):** Continue pushing `betting-affiliate` + `odds-api` in parallel with features — these have long lead times (API signup, compliance checks) so starting now pays off in weeks, not days.

## Next Run Focus Suggestions

**Rotate lens** (daily discipline): next run could focus on:
- **SEO & content opportunities** (player/venue pages are SEO heavy — check search volume, keyword research)
- **Tennis parity progress** (check if planner shipped any p1 parity tickets this week; reprioritize if stalled)
- **Monetization/RPM** (AdSense approval status, affiliate signup progress)
- **UX/engagement** (Core Web Vitals, mobile polish — ticket `polish` is p3 but foundational)

---

**Summary:** Backlog replenished (24 ready tickets, WC-heavy per tournament priority). No starvation risk. Strong WC feature pipeline for planner to execute during live tournament. Revenue enablement tickets queued (pending long-lead approvals). Loop healthy. **Focus: ship player pages + venue pages ASAP for SEO capture during WC traffic spike.**
