---
id: seo-meta-per-page-audit
status: closed
deps: []
links: []
created: 2026-07-18T13:49:17Z
type: feature
priority: 0
parent: rankings123
tags: [seo, traffic, blocker]
---
# SEO meta tags audit & per-page unique descriptions

## Notes

**2026-07-18T13:49:47Z**

**FIRST-PRINCIPLES ROI (SEO foundation - organic search DEAD at 7%):**

**Fundamental truth:** Search engines show YOUR snippet vs competitors. Generic meta = competitors win the click.

**Current crisis:** Only 5 organic search sessions out of 69 (7%). We're invisible in search results.

**Root cause diagnosis:** Checked live homepage source - meta description is generic: 'Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings. Updated in real time.' This SAME description probably appears on EVERY page (homepage, /atp-live, /wta-live, /world-cup, etc.).

**Why this kills SEO:**
1. Google penalizes duplicate meta descriptions (treats as low-quality)
2. Search snippets don't match user intent ('world cup final 2026' search shows generic 'Live rankings' description)
3. Click-through rate tanks vs competitors with targeted snippets

**Competitor advantage:** ESPN, BBC Sport, FlashScore all have unique, keyword-rich meta per page:
- /world-cup/final → 'Spain vs Argentina World Cup Final 2026: Live score, predictions, betting odds'
- /atp-live → 'ATP Live Rankings July 2026: Sinner #1, Alcaraz #2, Djokovic #3'

**Implementation (tactical breakdown of seo-fundamentals):**
1. AUDIT: List every route + current meta title/description
2. TEMPLATE: Dynamic meta per page type:
   - Homepage: 'Rankings123 - Live Tennis, World Cup & Cycling Rankings | Real-time Sports Standings'
   - ATP Live: 'ATP Live Rankings {month} {year}: Top 100 Players | Rankings123'
   - WTA Live: 'WTA Live Rankings {month} {year}: Top 100 Players | Rankings123'
   - World Cup: 'FIFA World Cup 2026 Standings: Live Group Tables & Knockout Bracket | Rankings123'
   - Player pages (future): '{Player Name} ATP Ranking, Stats & Results {year} | Rankings123'
3. STRUCTURED DATA: Add JSON-LD per page (SportsEvent for WC, Person for players, Organization for homepage)
4. OG TAGS: Unique og:title, og:description, og:image per page
5. VERIFY: Google Search Console (see google-search-console-live ticket) + Lighthouse SEO audit ≥90

**Impact vs Effort:**
- Impact: CRITICAL - gates ALL organic traffic growth (we're at 7%, target 30%+)
- Effort: MEDIUM - template work, one route at a time
- ROI: EXCEPTIONAL - organic search is FREE and COMPOUNDS over time

**Time-sensitive:** World Cup Final is TOMORROW. Search volume for 'world cup final 2026' is MASSIVE today/tomorrow. Without proper meta, we lose 100% of that traffic to ESPN/BBC.

**ACCEPTANCE CRITERIA:**
1. Every route has unique meta title + description (NO duplicates)
2. Meta titles ≤60 chars, descriptions ≤160 chars (Google cutoff)
3. Keywords match search intent per page:
   - /world-cup → 'world cup 2026', 'fifa standings', 'knockout bracket'
   - /atp-live → 'atp live rankings', 'tennis rankings today', player names
4. JSON-LD structured data per page type (SportsEvent, Person, Organization)
5. Open Graph tags (og:title, og:description, og:image, og:type) on all pages
6. Lighthouse SEO audit ≥90 on all key pages
7. Google Search Console shows no 'duplicate meta description' warnings

**BLOCKING seo-fundamentals:** This ticket is the TACTICAL implementation of the broad seo-fundamentals (P0) ticket. Break down the work into auditable steps.

## Closed in backlog triage 2026-08-10
dup: seo-dynamic-meta-per-page
