---
id: seo-zero-traffic-crisis
status: open
deps: []
links: []
created: 2026-07-31T13:50:05Z
type: task
priority: 0
parent: rankings123
tags: [seo, traffic, urgent]
---
# Organic traffic crisis: 0 clicks in 28 days (SEO fundamentals critical path)

Search Console (July 3-30): 0 clicks, 2 impressions, position 29. Essentially ZERO organic traffic after 47 days live. Multiple P0 SEO tickets stalled (meta tags, structured data, indexing). Root cause: planner down 5 days + SEO fundamentals not shipped.

CURRENT STATE: 70 pageviews total in 28 days, only 2 from organic search. Homepage 92.6% bounce. Site essentially invisible to Google.

CRITICAL PATH: Ship seo-fundamentals + seo-meta-per-page-audit + google-indexing-audit to get indexed and ranking.

## Acceptance Criteria

✓ Ship ≥3 P0 SEO tickets (meta tags, structured data, sitemap)
✓ Verify pages indexed in Google Search Console
✓ Organic impressions >100/day within 2 weeks
✓ Position improving (currently 29)

## Notes

**2026-07-31T13:50:29Z**

**ROI (First Principles - User Acquisition Blocked):**

FUNDAMENTAL TRUTH: Revenue = Traffic × RPM. ZERO organic traffic = ZERO potential for revenue growth from the largest traffic channel (organic search).

CURRENT STATE:
- 0 clicks, 2 impressions in 28 days from organic (Search Console)
- 70 total pageviews = 100% direct/referral (test traffic)
- Competitors (live-tennis.eu) get majority traffic from organic search
- Site invisible to Google = invisible to users searching for live tennis rankings

CASCADE IMPACT:
- NO traffic growth path (can't scale on direct traffic alone)
- Betting affiliate revenue = ZERO without traffic (RPM × 0 users = 0)
- AdSense revenue = ZERO without traffic
- All monetization tickets irrelevant until traffic exists

BLOCKING:
- Planner down 5 days → SEO P0s not shipping
- Multiple duplicate SEO tickets (consolidation needed)
- Pages not indexed (google-indexing-audit p1)

EFFORT vs IMPACT:
- Effort: MEDIUM (ship 3-5 SEO fundamentals tickets)
- Impact: UNLOCKS USER ACQUISITION (0 → hundreds/thousands organic sessions)
- ROI: CRITICAL (without organic traffic, the business model doesn't work)

This is ticket #2 after planner-down — once planner runs again, SEO fundamentals should be the immediate focus.
