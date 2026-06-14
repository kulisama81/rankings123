---
id: daily-report
status: open
deps: [analytics]
links: []
created: 2026-06-14T22:53:14Z
type: feature
priority: 2
parent: tennis-site
tags: [reporting, revenue]
---
# Daily progress + revenue report to user

Scheduled routine that emails Loic a daily summary: unique visitors (24h/7d trend), ad revenue + RPM, what shipped (closed tickets), top recommendations, anomalies. Output of the improvement loop.

## Acceptance Criteria

Daily EMAIL to loic.deniel@gmail.com containing: (1) tkt activity since last report — tickets CREATED, status changes (open/in_progress/closed), and CLOSED with commit refs; (2) unique visitors 24h/7d + pageviews (once analytics live); (3) ad revenue + RPM (once AdSense live, flagged estimated until then); (4) 1-3 ROI recommendations from Loop B; (5) anomalies. Until deploy/analytics exist, the email still ships with build + ticket progress so the human can track from day one.
