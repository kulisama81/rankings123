---
id: editorial-content-system
status: open
deps: []
links: [tennis-tournament-pipeline, seo-content-hub]
created: 2026-07-15T13:50:00Z
type: feature
priority: 1
parent: rankings123
tags: [content, seo, engagement, revenue]
---
# Editorial Content Infrastructure (Predictions, Analysis, News)

**Context:** All major sports sites (ESPN, SofaScore, FlashScore, BBC Sport) have editorial content (news, analysis, predictions, betting picks). We have ZERO editorial content — only live data tables. This limits SEO (no long-tail content), engagement (nothing to return for between events), and revenue (no betting content monetization).

**Problem (First Principles):**
- **User's root need beyond rankings:** "Who will win?", "What should I watch?", "Should I bet on this match?"
- **SEO gap:** Data tables alone don't rank for long-tail queries ("US Open predictions 2026", "ATP Finals favorites")
- **Engagement gap:** No reason to return between live events (rankings change slowly)
- **Revenue gap:** Betting affiliate content needs editorial picks/predictions context (not just odds tables)

**Proof:** Our analytics show 73% homepage bounce, 5 organic search sessions in 28 days. Competitors dominate search results for "[tournament] predictions" queries.

**ROI Justification:**
- **SEO multiplier:** Editorial content = 10-100× more indexable pages vs data tables alone
- **Long-tail traffic:** Each prediction/analysis article targets specific search queries
- **Engagement:** Articles give users reasons to return ("daily picks", "weekend preview")
- **Revenue:** Betting picks content = highest-intent traffic for affiliate conversions
- **Differentiation:** Sets us apart from pure data aggregators

## Solution

Build editorial content infrastructure:

1. **Content Types:**
   - **Predictions & Picks** (tournament winners, match predictions, betting picks)
   - **Analysis & Insights** (form analysis, H2H breakdowns, tactical previews)
   - **News Aggregation** (curated from ATP/WTA/Tennis.com RSS feeds)
   - **Weekly Previews** ("This Week in Tennis", upcoming tournaments)
   - **Results Recaps** (tournament wrap-ups, ranking impact analysis)

2. **Publishing System:**
   - `/articles/[slug]` route for all editorial content
   - Markdown-based authoring (simple, version-controlled)
   - Article metadata: title, excerpt, author, date, sport, tags
   - SEO-optimized (meta tags, structured data, sitemap)

3. **Content Calendar:**
   - Weekly tennis preview (publish Monday)
   - Pre-tournament predictions (2-3 weeks before major tournaments)
   - Daily betting picks (during Grand Slams)
   - Post-event recaps (within 24h of finals)

## Acceptance Criteria

1. **Articles Route:**
   - Create `src/app/articles/[slug]/page.tsx`
   - Support markdown content in `src/data/articles/`
   - Article schema: title, excerpt, content, author, date, sport, tags, hero image

2. **Pilot Content (US Open 2026):**
   - Publish **3 articles** by Aug 9:
     - "US Open 2026 Men's Preview: Favorites & Dark Horses"
     - "US Open 2026 Women's Predictions: Can Sabalenka Defend?"
     - "US Open 2026 Betting Picks: Value Bets in the Draw"
   - Each article: 500-800 words, SEO-optimized, betting affiliate links

3. **Articles Index:**
   - `/articles` page listing all articles (most recent first)
   - Filter by sport (Tennis, Football, Cycling)
   - Filter by type (Predictions, Analysis, News)

4. **Homepage Integration:**
   - "Latest Articles" section on homepage (below sport cards)
   - Shows 3 most recent articles with excerpts
   - Reduces homepage bounce by giving immediate content value

5. **SEO Requirements:**
   - Meta tags: title, description, OG tags
   - JSON-LD: Article structured data
   - Sitemap: include all articles
   - Internal linking: articles ↔ rankings pages ↔ tournament pages

6. **Verification:**
   - `npm run build` succeeds, `npx eslint` clean
   - Visit http://localhost:3000/articles/us-open-2026-mens-preview
   - Article renders with proper formatting, mobile-responsive
   - SEO validates (meta tags, structured data)
   - Live: articles indexed in Google Search Console within 7 days

## Content Sources (Ethical, Attributed)

**For automation/aggregation:**
- ATP Tour official news RSS
- WTA Tennis official news RSS
- ESPN Tennis RSS (with attribution)
- Always attribute source, add original reporting value

**For original predictions:**
- Data-driven analysis from our own ranking/form data
- Betting odds from free APIs (The Odds API, BetFair public data)
- Expert picks (initially: AI-generated with data backing, labeled as such)

## Related Tickets
- `tennis-tournament-pipeline` — content system serves tournament pages
- `seo-content-hub` (P2) — this implements it with specific content types
- `blog-infrastructure` (P2) — duplicate, close in favor of this

## ROI Summary
**High ROI:** Captures long-tail SEO traffic (predictions/analysis queries), reduces homepage bounce (73% → target 50%), enables betting affiliate monetization, gives users return-visit reasons, post-WC sustainability (evergreen content model).
