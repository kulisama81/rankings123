---
id: xg-soccer-stats-free
title: xG (expected goals) soccer stats via free sources
status: open
deps: []
links: [opta-soccer-stats, wc-match-momentum-live]
created: 2026-07-12T13:52:00Z
type: feature
priority: 2
parent: rankings123
tags: [worldcup, stats, differentiation, engagement]
---

# xG (expected goals) soccer stats via free sources

Add expected goals (xG) stats to World Cup match pages for DIFFERENTIATION and deeper engagement. Research shows FlashScore, SofaScore, and advanced sites all surface xG — it's becoming table stakes for soccer stats.

## Why xG Matters (First Principles)

**Root user need:** "Who should have won?" / "Was the result fair?"

xG (expected goals) answers this by showing:
- **xG = 2.3, actual goals = 0** → Team was unlucky, created good chances
- **xG = 0.4, actual goals = 2** → Team was clinical/lucky, didn't dominate
- **xG 1.8 vs 1.9** → Close match, could have gone either way

**Why fans care:**
- Reveals the "real" story behind the score
- Predicts future performance (high xG, low goals = regression to mean likely)
- Adds depth to "eye test" debates

**Differentiation opportunity:**
- ESPN shows basic stats (possession, shots)
- FlashScore/SofaScore show xG
- Rankings123 currently: basic stats only
- **Adding xG = competitive parity + casual→hardcore fan bridge**

## Free xG Data Sources (Evaluated)

### 1. FBref / StatsBomb (FREE for major tournaments)

- **Coverage:** World Cup, Euros, top leagues
- **Data:** xG, xA (expected assists), shot maps, pass maps
- **Access:** Web scraping (StatsBomb sponsors FBref for free access)
- **Limitations:** May require attribution

### 2. Understat (FREE API endpoints)

- **Coverage:** EPL, La Liga, Serie A, Bundesliga, Ligue 1, Champions League
- **Data:** xG per match, player xG, shot locations
- **Access:** Unofficial API (used by many sites)
- **Limitations:** May not cover World Cup (focus on club soccer)

### 3. FotMob (FREE API - reverse-engineered)

- **Coverage:** All major tournaments including World Cup
- **Data:** xG, ratings, momentum, heat maps
- **Access:** Mobile app API endpoints (public, no auth)
- **Limitations:** Unofficial, could change

### 4. ESPN Advanced Stats Endpoints (EXPLORE)

- **Coverage:** ESPN already provides odds via DraftKings in our API
- **Potential:** May have advanced stats endpoints we haven't discovered
- **Access:** Same keyless ESPN API we use for scores/standings
- **Recommendation:** Check `/soccer/fifa.world/match/[id]/stats` or similar

### Recommended Approach

**Phase 1 (NOW - for World Cup finals):**
1. Explore ESPN advanced endpoints first (already integrated, keyless)
2. If ESPN lacks xG: FotMob API (covers World Cup, easy integration)
3. Mock fallback for when xG unavailable (like all our feeds)

**Phase 2 (post-WC):**
1. FBref/StatsBomb for historical data + attribution
2. Understat for club soccer (if we add Champions League, EPL)

## Implementation Scope

**Where to show xG:**

1. **Match pages:** Add xG row to match stats table
   ```
   Possession: 58% - 42%
   Shots: 12 - 8
   xG: 1.8 - 1.3 ← NEW
   ```

2. **Match summary cards:** Show xG next to final score
   ```
   France 2 - 1 Spain
   (xG: 1.4 - 1.9)
   ```

3. **Post-match analysis:** Use xG to auto-generate insights
   - "Spain outperformed their xG (1.9 xG, 1 goal) — unlucky result"
   - "France clinical finishing (1.4 xG, 2 goals) — took their chances"

## First Principles ROI Analysis

**Impact on engagement:**
- Casual fans: "Cool, more stats" (marginal value)
- Hardcore fans: "Finally, xG!" (HIGH value, competitive parity)
- Betting audience: xG is a key betting metric (revenue angle)

**Differentiation value:**
- Most ranking sites: basic stats only
- Advanced sites (SofaScore, FlashScore): have xG
- **We close the gap to advanced sites, stand out from ranking-only sites**

**Effort:**
- LOW if ESPN has it (add one field to existing feed)
- MEDIUM if FotMob API (new data source, same fallback pattern)

**Revenue:**
- Betting content uses xG for predictions (higher RPM content)
- Session depth: users who care about xG stay longer, explore more

**ROI:** MEDIUM-HIGH — Effort depends on source, but differentiation value is clear

## Acceptance Criteria

- [ ] xG data integrated from free source (ESPN, FotMob, or FBref)
- [ ] xG shown on World Cup match pages (match stats section)
- [ ] xG shown in match summary cards (optional: next to score)
- [ ] Mock fallback when xG unavailable (never show "0.0" as fake data)
- [ ] Source attribution if required (e.g., "xG via StatsBomb")
- [ ] Mobile-responsive display
- [ ] Independent verifier confirms: xG data is real, not fabricated

## Related Tickets

- `opta-soccer-stats` (p2) — Evaluating Opta (paid, comprehensive)
- `wc-match-momentum-live` (p1) — Live match momentum (xG is part of this)
- This ticket focuses on FREE xG sources for World Cup NOW
