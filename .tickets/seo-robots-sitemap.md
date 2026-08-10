---
id: seo-robots-sitemap
status: open
deps: []
links: []
created: 2026-08-06T13:50:00Z
type: feature
priority: 0
parent: rankings123
tags: [seo, technical, quick-win]
---
# SEO Technical Foundation: robots.txt + sitemap.xml

**QUICK WIN — Human-executable while planner down (12 days)**

Create robots.txt and sitemap.xml — basic SEO hygiene missing from site. Zero organic traffic (0 clicks, 2 impressions, pos 29) is partly due to missing technical foundation.

## Acceptance Criteria

### robots.txt
- Create `public/robots.txt` with:
  ```
  User-agent: *
  Allow: /
  
  Sitemap: https://rankings123.com/sitemap.xml
  ```
- Live at https://rankings123.com/robots.txt (returns 200, text/plain)

### sitemap.xml  
- Generate `public/sitemap.xml` or Next.js app router sitemap route
- Include all 39 pages:
  - `/` (homepage)
  - `/atp-live`, `/atp-race`, `/wta-live`, `/wta-rankings`
  - `/world-cup`, `/world-cup/*` (match pages, team pages)
  - `/cycling`, `/cycling/*` (race pages)
  - `/about`, `/contact`, `/privacy`, `/terms`, `/cookies`
  - `/changelog`, `/articles/*` (if any exist)
  - `/tournaments/*`, `/events/*` (if any exist)
- Proper `<lastmod>` dates (use git commit timestamps or current date)
- Priority: 1.0 for homepage, 0.8 for main sport pages, 0.5 for static pages
- Valid XML format per sitemaps.org protocol

### Post-Deploy
- Submit sitemap to Google Search Console
- Verify in Search Console that pages are being discovered
- Note submission date in this ticket

### Verification
- ✅ https://rankings123.com/robots.txt returns 200
- ✅ https://rankings123.com/sitemap.xml returns valid XML (200)
- ✅ Build green, lint clean
- ✅ Submitted to Google Search Console (screenshot/note)
- ✅ No broken links in sitemap (all URLs return 200)

## ROI Justification (First Principles)

**Why this matters:**
- **Crawlability:** Google Search Console needs sitemap to index pages efficiently
- **Discovery:** robots.txt signals proper SEO setup to crawlers
- **Current gap:** 39 pages exist, but no sitemap = Google may not discover all pages
- **Fundamentals:** Searchability = Indexable Pages × Crawlability × Content Quality

**Impact:**
- **MEDIUM** — Won't fix traffic alone, but required for SEO foundation
- Unblocks proper indexing of all 39 pages
- Standard practice for all production sites
- Prerequisite for Search Console optimization

**Effort:**
- **LOW** — 30-60 min (Next.js has built-in sitemap generation patterns)
- **Human-executable** (doesn't require planner, can ship manually)

**First-principles reasoning:**
Google can't send traffic to pages it hasn't indexed. The sitemap is how we tell Google "these 39 pages exist, please crawl them." Without it, we rely on Google discovering pages through links (slow) or guessing (incomplete). The robots.txt shows we know what we're doing and aren't blocking important pages by accident.
