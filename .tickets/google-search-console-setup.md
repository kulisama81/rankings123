---
id: google-search-console-setup
status: closed
deps: []
links: []
created: 2026-07-11T13:51:46Z
type: task
priority: 1
parent: rankings123
tags: [seo, analytics]
---
# Google Search Console setup & monitoring

Set up Google Search Console - SEO visibility and debugging

## Acceptance Criteria

GSC verified for rankings123.com, sitemap.xml submitted, initial crawl complete, monitoring for coverage/indexing issues, identify top queries + impressions + CTR, set up weekly email reports, document login credentials

## Notes

**2026-07-11T13:51:51Z**

**2026-07-18T13:50:22Z**

**PRIORITY ESCALATION TO P0 (2026-07-18 autoresearch):**

CRISIS: Only 5 organic search sessions out of 69 (7%). Without GSC verification + sitemap submission, we're invisible to Google.

**Time-sensitive:** World Cup Final is TOMORROW (July 19). Post-Final we need organic search to replace direct traffic spike. Without GSC, we're flying blind on SEO performance.

**BLOCKING:** This gates seo-fundamentals (P0), seo-meta-enhancement (P1), xml-sitemap-dynamic (P1). Can't measure if those SEO improvements work without GSC data.

**First action:** Verify rankings123.com in GSC (DNS TXT or meta tag), submit sitemap.xml, check Index Coverage for errors.

Escalating from P1 → P0 as SEO measurement foundation.

## SEO Visibility - Currently Blind

**Current state:** Only 5 organic search sessions/28 days but we have NO Search Console data to understand why.

**What GSC provides:**
- Which queries show our site (impressions)
- Which pages are indexed (coverage)
- Indexing errors/warnings
- CTR by query/page
- Rich results eligibility

**Critical for:** Debugging why player pages don't rank after ship, understanding search demand, fixing crawl errors.

**First Principles:** Can't optimize SEO without measurement. GSC = SEO measurement foundation.
**Effort:** LOW (one-time setup, ongoing monitoring)
**Impact:** HIGH (enables data-driven SEO decisions)
**ROI:** VERY HIGH (cheap visibility into $0→revenue blocker)

## DONE (2026-07-26)
GSC verified (HTML meta tag in layout.tsx, commit 0ca2973), sitemap.xml submitted, key pages
requested for indexing. Next: monitor Coverage/Performance over the coming days as Google crawls.
