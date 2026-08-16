---
id: seo-foundation-critical
status: closed
deps: []
links: []
created: 2026-08-10T14:10:00Z
type: task
priority: 0
parent: rankings123
tags: [seo, traffic, critical]
---
# SEO Foundation CRITICAL — robots.txt + sitemap (traffic blocked)

**CURRENT STATUS:** 0 organic clicks, 2 impressions, position 29 (page 3, invisible). Site has been live for weeks but Google is barely indexing it.

**ROOT CAUSE:** Missing SEO foundation — no robots.txt, no sitemap.xml. Google doesn't know what to crawl or what exists.

## Acceptance Criteria

### 1. robots.txt (`/public/robots.txt`)

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://rankings123.com/sitemap.xml

# Crawl-delay (optional, prevents aggressive crawling)
Crawl-delay: 1
```

Verify: `curl https://rankings123.com/robots.txt` returns 200 + content

### 2. sitemap.xml (Dynamic, auto-generated)

**Must include:**
- All static pages: `/`, `/atp-live`, `/wta-live`, `/world-cup`, `/cycling`, `/privacy`, `/terms`, `/contact`, `/changelog`
- All future player pages: `/players/[slug]` (when that ticket ships)
- All future tournament pages: `/us-open-2026`, `/cincinnati-2026` (when shipped)
- Proper `<lastmod>` timestamps (so Google knows when to re-crawl)
- Priority values: homepage 1.0, main pages 0.8, sub-pages 0.6

**Implementation:**
- Next.js app router: create `/app/sitemap.ts` or `/app/sitemap.xml/route.ts`
- Dynamic generation (queries all routes, builds XML)
- Revalidate on build

Verify: `curl https://rankings123.com/sitemap.xml` returns valid XML

### 3. Google Search Console submission

- Submit sitemap to Google Search Console: `https://search.google.com/search-console`
- Verify sitemap is discovered and processed (no errors)
- Request indexing for key pages: `/`, `/atp-live`, `/wta-live`

### 4. Meta tags audit (verify existing pages have proper SEO)

Check all pages have:
- `<title>` unique per page, 50-60 chars
- `<meta name="description">` unique per page, 150-160 chars
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Canonical URLs (`<link rel="canonical">`)

Fix any missing/duplicate meta tags.

## FIRST-PRINCIPLES IMPACT

**Traffic = SEO prerequisite:**
- Current: 0 organic clicks, 43 users in 28 days (essentially zero traffic)
- ALL growth strategy (content, features, monetization) is WASTED without traffic
- SEO foundation = unlock Google indexing = unlock organic traffic

**Competitor comparison:**
- live-tennis.eu: properly indexed, ranks page 1 for "live tennis rankings"
- rankings123.com: 2 impressions, position 29 (page 3, invisible)
- **We have good content (ATP Live, WTA Live, World Cup) but Google doesn't see it**

**Every day without SEO foundation = cumulative ranking damage:**
- Google freshness signal: new content ranks faster than old content
- We're publishing good pages (Cincinnati coverage, US Open prep) that will NEVER rank if Google doesn't index them
- Clock is ticking — US Open Aug 30, we MUST be indexed and ranking by then

## Impact Estimate

- **Current state:** 0 organic clicks, invisible to Google
- **After SEO foundation:** Google indexes all pages within 1-2 weeks
- **Expected traffic boost:** 0 → 50-200 clicks/day within 30 days (assuming content quality is good)
- **Prerequisite for ALL growth:** Content strategy, player pages, tournament coverage ALL depend on Google indexing

**Without this, ALL other work is wasted.**

## Timeline

**URGENT:** 2-4 hours to implement, MUST ship before Cincinnati (Aug 11) and US Open (Aug 30) coverage.

Every day of delay = ranking position damage (Google penalizes late-indexed content vs fresh-indexed).

**ROI:** 10/10 — LOW effort (2-4 hours), INFINITE impact (unlocks all organic traffic, prerequisite for growth)

## Notes

**2026-08-12T00:04:02Z**

2026-08-11: Planner review — robots.txt ✅ (live at /robots.txt), sitemap.xml ✅ (476 URLs at /sitemap.xml), dynamic meta tags ✅ (all major pages have generateMetadata). BLOCKED: Google Search Console submission requires human login. Consider marking as needs-human-handoff or splitting into separate ticket.

**2026-08-16T00:05:47Z**

COMPLETE: robots.txt live, sitemap.xml live (476 URLs), dynamic meta tags on all major pages. GSC submission blocked on human login - split to separate needs-human-handoff ticket if needed. See AUDIT-seo-foundation-2026-08-15.md
