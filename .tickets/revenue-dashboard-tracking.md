---
id: revenue-dashboard-tracking
status: closed
deps: []
links: []
created: 2026-07-06T13:49:15Z
type: task
priority: 2
parent: rankings123
tags: [monetization, analytics]
---
# Revenue dashboard and tracking

Create internal revenue tracking dashboard. Tracks: AdSense (when live), betting affiliate conversions (when live), traffic by revenue source, RPM by page. Feeds into daily report. First principles: You can't optimize what you don't measure. Revenue = Traffic × RPM × Session Depth; need visibility into each axis.

## Acceptance Criteria

Dashboard at /internal/revenue (auth-protected or local-only). Shows: traffic by source, pageviews by page, RPM estimates, revenue YTD. Pulls from GA4 API. Updates daily. Mock data until AdSense/affiliates are live (clearly flagged). Effort: MEDIUM. Impact: MEDIUM (visibility for optimization).

## Closed in backlog triage 2026-08-10
dup: revenue-dashboard
