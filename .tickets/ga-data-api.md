---
id: ga-data-api
status: closed
deps: []
links: []
created: 2026-06-15T05:30:05Z
type: feature
priority: 0
parent: rankings123
tags: [analytics, loop, revenue]
---
# Connect GA4 Data API so the loop has traffic data

CRITICAL for autoresearch/strategy + daily digest: they must read real traffic. Build scripts/pull-analytics.mjs (mirror apibstudyguide): use a GA4 service account key (.ga-credentials.json, gitignored) + property id 541668716 to pull pageviews/sessions/top-pages/search-terms/device-split via @google-analytics/data, write src/data/analytics-report.json. Refresh it via cron before the digest + autoresearch runs. HANDOFF (Loic): create a GA4 service account, grant it Viewer on property 541668716, download the JSON key to .ga-credentials.json in the repo root, confirm the property id.

## Acceptance Criteria

pull-analytics.mjs writes a real analytics-report.json from GA4; cron refreshes it; digest + autoresearch consume it; key gitignored, never committed.

## Notes

**2026-06-15T05:31:07Z**

This is how the loop 'accesses the GA dashboards': agents can't browse the GA UI — the supported way to read the same metrics the dashboards show is the GA4 Data API. pull-analytics.mjs pulls them into src/data/analytics-report.json, which @autoresearch reads to prioritize by real traffic (exactly like apibstudyguide's planner does). Gating item for a data-driven strategy loop.
