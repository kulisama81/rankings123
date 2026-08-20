---
id: gsc-indexing-crisis
status: open
deps: []
links: []
created: 2026-08-20T13:51:45Z
type: bug
priority: 0
parent: rankings123
tags: [seo, data-quality, traffic]
---
# GSC Indexing Crisis — Only 4 impressions total, 0 clicks (zero organic traffic)

CRITICAL TRAFFIC BLOCKER: Search Console data (Aug 20) shows only 4 total impressions in last 28 days, 0 clicks, position 32.3. This is a CRISIS — we have rich content (ATP/WTA rankings, World Cup, cycling, articles) but Google isn't finding it. FIRST PRINCIPLES: Traffic = indexable pages × search demand × UX. If pages aren't indexed, traffic = 0. ROOT CAUSE CANDIDATES: (1) Sitemap not submitted to GSC (human task per Aug 17 autoresearch), (2) robots.txt blocking crawlers, (3) noindex meta tags, (4) Pages not linked from homepage/sitemap, (5) Brand new domain (low trust). INVESTIGATION NEEDED: (1) Check if sitemap submitted, (2) Fetch+render test in GSC, (3) Verify robots.txt, (4) Check for indexing blockers. URGENCY: US Open in 7 days — if pages aren't indexed by Aug 27, we capture ZERO of the 150K+ search traffic. ROI: This is the #1 traffic blocker. Fix = unlock all SEO value.

## Acceptance Criteria

Diagnose why only 4 Google impressions total, Verify sitemap submitted and indexed, Check robots.txt not blocking key pages, Verify pages are indexable (no noindex tags), GSC coverage report shows pages indexed, Submit sitemap if not submitted, Fix any crawl errors, Document root cause, Re-verify 1 week later: impressions > 100

## Notes

**2026-08-20T13:52:10Z**

ROI Justification (First Principles): Traffic = indexable pages × search demand × UX. Current state: 4 impressions total, 0 clicks = ZERO organic traffic despite rich content. US Open in 7 days = 150K+ search opportunity. If pages not indexed by Aug 27, we capture ZERO of that traffic. ROOT CAUSE: Likely sitemap not submitted (human task blocked), or robots.txt/noindex blocking. FIRST FIX: Submit sitemap to GSC (P0 human task seo-sitemap-submit-gsc exists). EFFORT: 30 min audit + fixes. IMPACT: Unlocks ALL SEO value. This is the #1 traffic blocker. ROI: Infinite (from 0 → any traffic).
