---
id: data-source-attribution
status: open
deps: []
links: []
created: 2026-08-15T13:51:32Z
type: feature
priority: 2
parent: rankings123
tags: [data, trust, quick-win]
---
# Data source attribution footer (transparency + trust)

TRANSPARENCY GAP: We show 'source' flags (espn/uts/mock) but don't explain what they mean or link to sources.

USER TRUST: Sports fans verify data accuracy. Transparent sourcing = credibility signal for AdSense review + user trust.

QUICK WIN: Add footer to data pages explaining sources:
- 'Data sources: ESPN (live scores), Ultimate Tennis Statistics (rankings), WTA Official API'
- Link to each source
- 'Last updated: [timestamp]'
- 'Mock fallback active' banner when source=mock

ROI: 6/10 — LOW effort (footer component), builds trust, AdSense reviewer sees transparency.

## Acceptance Criteria

✅ Create DataSourceFooter component
✅ Shows on: /atp-live, /wta-live, /atp-race, /wta-race, /world-cup, /cycling
✅ Lists sources with links (ESPN, UTS, WTA API, etc.)
✅ Timestamp: 'Last updated: X minutes ago'
✅ Warning banner if source=mock: 'Using fallback data (API unavailable)'
✅ Mobile responsive
✅ Build green
