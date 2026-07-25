---
id: seo-dynamic-meta-per-page
status: open
deps: []
links: []
created: 2026-07-25T13:49:54Z
type: feature
priority: 0
parent: rankings123
tags: [seo, traffic, foundational]
---
# Dynamic Per-Page SEO Meta Tags (Unique Title + Description)

Implement dynamic, keyword-rich meta tags for every page type. Current state: generic meta descriptions on all pages = invisible to search engines. Each page needs UNIQUE title + description with target keywords. E.g. /atp-live: 'ATP Live Rankings July 2026 | Sinner, Alcaraz, Djokovic' vs current generic 'Rankings123'. Player pages: '[Name] Tennis Ranking & Stats 2026'. This is THE foundational blocker for ALL SEO work.

## Notes

**2026-07-25T13:50:08Z**

**ROI (First Principles - SEO Foundation):**

ANALYTICS CRISIS: Only 1 organic search session out of 74 total pageviews (1.4% organic). This is a CRISIS - we're invisible to Google.

ROOT CAUSE: Generic meta tags. Example:
- Current /atp-live: 'Rankings123 — Live Sports Rankings' (generic)
- Competitor /atp-live: 'ATP Live Rankings July 2026 | Sinner #1, Alcaraz #2' (keyword-rich)

SEARCH BEHAVIOR: Users search 'atp live rankings july 2026', 'jannik sinner ranking', 'wimbledon live standings'. Google shows competitors in snippets because THEIR meta descriptions match search intent. Ours are generic → invisible.

FUNDAMENTAL TRUTH: Meta description = Google snippet. If it doesn't match search query, you don't get clicked (even if you rank).

IMPACT:
- CRITICAL - Foundation for ALL organic traffic
- Without this: SEO-focused tickets (player pages, tournament pages) generate ZERO traffic even when built
- With this: Every page becomes discoverable

EFFORT: MEDIUM - Template per page type, dynamic interpolation
- /atp-live → 'ATP Live Rankings {month} {year} | {top3 names}'
- /wta-live → 'WTA Live Rankings {month} {year} | {top3 names}'  
- /world-cup → 'FIFA World Cup 2026 Standings & Live Results'
- /cycling → 'Tour de France 2026 Live Standings | Stage {N}'
- Player pages → '{Name} Tennis Ranking & Stats {year} | ATP/WTA'

ROI: EXCEPTIONAL - Unblocks organic traffic channel (currently 1.4% → target 30%+)

**ACCEPTANCE CRITERIA:**
✓ Every page type has dynamic meta title + description
✓ Meta descriptions include:
  - Target keyword (what users search)
  - Current data point (e.g. '#1 Sinner', 'Stage 20')
  - Month/year for freshness signal
✓ Open Graph tags (og:title, og:description, og:image)
✓ Twitter Card tags
✓ Canonical URLs
✓ Test pages in Google Search Console (no errors)
✓ Lighthouse SEO audit ≥90
✓ Builds green
