---
id: seo-fundamentals
status: open
deps: []
links: []
created: 2026-06-25T13:49:00Z
type: feature
priority: 1
parent: rankings123
tags: [seo, traffic, revenue]
---
# SEO fundamentals: meta tags, structured data, sitemap optimization

Implement SEO best practices across all pages. Current state: only 1 organic search session out of 69 total (1.5% organic traffic) = SEO crisis. Add proper meta descriptions, Open Graph tags, JSON-LD structured data (SportsEvent, Person, Organization), and optimize sitemap.xml for better indexing. Every page needs unique, keyword-rich meta descriptions (not generic). Tennis player searches ("Novak Djokovic ranking", "Iga Swiatek stats") = millions of monthly searches we're missing entirely.

## Acceptance Criteria

✓ Every route has unique meta title + description (not generic)
✓ Open Graph tags on all pages (og:title, og:description, og:image, og:type)
✓ Twitter Card tags where relevant
✓ JSON-LD structured data:
  - HomePage: Organization schema
  - Player pages: Person + Athlete schema
  - Tournament pages: SportsEvent schema
  - Match pages: SportsEvent schema
✓ sitemap.xml includes all dynamic routes (player pages, tournament pages, match pages)
✓ sitemap.xml properly prioritized (high-traffic pages = higher priority)
✓ robots.txt optimized (allow all crawlers except problematic bots)
✓ Canonical URLs set on all pages
✓ Google Search Console validation (no errors)
✓ Test with Lighthouse SEO audit (score ≥90)

## Notes

**2026-06-25 — ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Traffic = indexable pages × real search demand × ranking position. Organic search is FREE and COMPOUNDS (unlike ads). We currently have almost ZERO organic traffic (1 session out of 69 = 1.5%).

SEARCH DEMAND EXISTS: Tennis player searches alone = millions/month:
- "novak djokovic ranking" - 90K/mo
- "iga swiatek ranking" - 40K/mo  
- "carlos alcaraz stats" - 30K/mo
- "wimbledon live rankings" - 500K/mo (during tournament)
- EVERY one of these goes to competitors because we lack basic SEO

ROOT CAUSE: We're invisible to search engines because:
1. Missing/generic meta descriptions (Google shows snippets from competitors)
2. No structured data (competitors get rich results, we don't)
3. Incomplete sitemap (Google doesn't know our pages exist)

IMPACT vs EFFORT:
- Impact: CRITICAL - unlocks organic traffic channel (currently 1.5% → target 30%+), compounds over time, zero marginal cost
- Effort: LOW - mostly template work, one-time setup
- ROI: EXCEPTIONAL - foundation for ALL future SEO work (player pages, tournament pages worthless without this)

BLOCKING: Player pages, tournament pages, and rank history features all depend on this foundation. Without proper SEO markup, those features won't generate organic traffic even when built.

TIME-SENSITIVE: Wimbledon starts June 29 (4 days). If wimbledon-2026-live ships without proper SEO, we lose the entire 2-week traffic spike.
