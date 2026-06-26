---
id: wc-xg-stats
status: closed
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, engagement, data]
---
# World Cup advanced match stats (xG, possession, shot maps)

Show advanced match stats beyond goals/cards: **expected goals (xG)**, possession %, shots on target, pass accuracy where available. Elevates us from basic-stats sites to analytics-forward (like FotMob, SofaScore, FBref).

**Data sources (CX-FIRST — no fabricated xG):**
- **Free/public:** [Understat](https://understat.com/) (xG for top leagues, may cover WC), [FBref/StatsBomb](https://fbref.com/) (free xG + advanced stats), FotMob web scraping (they show xG publicly), ESPN advanced endpoints (probe for xG fields).
- **Paid (evaluate if free sources fail):** Opta/Stats Perform (see ticket `opta-soccer-stats`), TheStatsAPI.

Start with ESPN (probe match detail endpoints for xG/possession fields); if unavailable, fallback to scraping FotMob xG table or Understat. Gate on real source — show advanced stats ONLY when `xgSource === "espn" || "fotmob"` etc.; otherwise hide section (no mock xG).

**ROI:** Medium-high engagement (analytics crowd loves xG; "deserved to win" narratives). Medium build (new data source, but display is straightforward). Differentiation from competitors.

## Acceptance Criteria

1. Match pages show advanced stats when available: xG per team, possession %, shots/shots on target, pass accuracy.
2. Optional: xG table/standings (teams ranked by xG for/against across tournament) — nice-to-have.
3. Real source ONLY (ESPN probe, or FotMob/Understat/FBref fallback); NO fabricated xG.
4. Gated on `xgSource` flag; section hidden if no source available (graceful degradation).
5. Tokens-themed; build/lint/check:data-integrity green; live-verified.

## Notes

**2026-06-21**

Free xG sources researched:
- [FotMob xG table](https://www.fotmob.com/leagues/77/table/world-cup?filter=xg)
- [Understat](https://understat.com/) (last free xG for European leagues)
- [FBref](https://fbref.com/) (StatsBomb free tier)
- [xGscore.io WC 2026](https://xgscore.io/xg-statistics/world-cup/2026)

Paid: TheStatsAPI ($50/mo), Opta (enterprise). Sources: search results above.
