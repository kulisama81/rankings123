---
id: player-pages-top-100-seo
status: closed
deps: []
links: []
created: 2026-08-10T14:05:00Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, seo, traffic]
---
# Player pages (ATP/WTA top 100) — SEO long-tail engine

Player pages are THE asymmetric SEO leverage for tennis sites. FlashScore, SofaScore, ESPN all have comprehensive player pages. Live-tennis.eu does NOT (major differentiation gap).

## Acceptance Criteria

1. **Player page route:** `/players/[player-slug]` (e.g., `/players/jannik-sinner`)
2. **ATP top 100 + WTA top 100:** 200 player pages total
3. **Content per page:**
   - Current ranking (live + official)
   - Rank history graph (last 52 weeks)
   - Current form (last 10 matches: W-L-W-W-L...)
   - Career-high ranking + date
   - Points breakdown (current, defending next 6 weeks)
   - Bio: age, country, height, playing style, turned pro
   - Link to ATP/WTA official profile
4. **SEO per page:** 
   - Title: "[Player Name] Ranking, Stats & Live Points 2026"
   - Meta description: "[Player Name] current ATP/WTA ranking, live points, form, and career stats. Updated daily."
   - Canonical URL, Open Graph tags
5. **Dynamic updates:** Player pages update whenever rankings update (~20s polling from client)
6. **Navigation:** Clickable player names on ATP Live / WTA Live tables → player page

## FIRST-PRINCIPLES ROI

**SEO multiplier:** 
- "ATP rankings" = 5K searches/month (1 page serves this)
- "Jannik Sinner ranking" = 2K/month, "Carlos Alcaraz ranking" = 1.5K/month, "Novak Djokovic stats" = 3K/month
- Top 100 ATP + top 100 WTA = 200 player pages × avg 500 searches/month = **100K searches/month vs 5K for main ranking**
- ONE player page system = 20× the SEO reach of the main rankings page

**Engagement driver:**
- User lands on ATP Live → sees Sinner #1 → clicks name → player page (rank history, stats, current form, H2H vs top rivals) → 3-5 additional pageviews
- Without player pages: user sees ranking, leaves. With player pages: user explores 3-5 players = 3-5× engagement

**Content moat:**
- 200 player pages = 200 indexable URLs with unique content
- Competitors have this (FlashScore, SofaScore, ESPN) — lacking it = credibility gap
- Live-tennis.eu does NOT have comprehensive player pages = differentiation opportunity

## Data Sources

- ATP/WTA ranking data (existing: ESPN + UTS + WTA API)
- Player bios: ATP/WTA APIs or scrape from official sites (or start minimal — just ranking + points)
- Form data: ESPN scoreboard recent results
- Mock fallback: basic player card with rank + points if bio unavailable

## Phased Approach (Ship Incrementally)

**Phase 1 (MVP, ~8 hours):**
- Player page route with rank, points, movement, country
- Top 10 ATP + top 10 WTA (20 pages) to validate
- Clickable names on ranking tables

**Phase 2 (Full, ~15 hours):**
- Expand to top 100 ATP + WTA (200 pages)
- Add rank history graph
- Add form indicator (last 10 matches)

**Phase 3 (Rich, ~20 hours):**
- Points breakdown (defending, next 6 weeks)
- Career-high rank
- Bio data (age, height, turned pro)

## Impact Estimate

- **SEO:** 200 pages × 500 searches/month = 100K searches/month (20× main ranking page)
- **Engagement:** 1 → 3-5 pageviews per user (player exploration)
- **Revenue:** More pageviews = more ad impressions = higher RPM
- **Brand:** Table-stakes feature for credibility (all major competitors have this)

**ROI:** 10/10 — HIGH effort (20-40 hours full build), VERY HIGH impact (20× SEO reach, engagement multiplier, revenue driver)

**Timeline:** Start Phase 1 (top 10) immediately, expand to top 100 within 2 weeks
