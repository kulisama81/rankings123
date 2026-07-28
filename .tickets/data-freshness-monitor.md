---
id: data-freshness-monitor
status: open
deps: []
links: []
created: 2026-07-28T13:51:52Z
type: task
priority: 2
parent: rankings123
tags: []
---
# Data freshness monitor: automated stale content detection

Multiple incidents of stale data (WC showing live when ended, TdF showing in-progress when complete). Need automated detection. Check tournament/race status daily, flag when end date passed but UI shows 'live/in-progress'.

## Acceptance Criteria

Script that checks: World Cup (ended July 19), TdF (ended July 26), any tournament with endDate < today showing as 'Live'. Run via cron or post-build. Alert/fail if stale status detected. Add to check:data-sanity. ROI: Prevents credibility-killing staleness bugs (88.9% homepage bounce partly driven by stale WC promotion).
