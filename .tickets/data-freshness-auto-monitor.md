---
id: data-freshness-auto-monitor
status: open
deps: []
links: []
created: 2026-08-11T13:49:31Z
type: feature
priority: 1
parent: rankings123
tags: [data-quality, monitoring, process]
---
# All-sports data-freshness auto-monitor — catch stale 'Live' badges before users do

RECURRING BUG PATTERN: World Cup showed 'Live' 22 days after ending (July 19), Tour de France shows 'in progress' 16 days after finish (July 26), Tour de Poland tickets still open 2 days after race ended (Aug 9). ROOT CAUSE: No automated staleness detection across sports. We only catch these when inspector finds them or users complain. FIRST-PRINCIPLES: Data freshness is BINARY — a race is live or it's not. Computers can detect this; humans shouldn't have to. COST OF STALENESS: Every day with stale 'Live' badge = credibility damage. User lands on 'World Cup Live' in August → sees it ended July 19 → site appears abandoned → never returns. ONE stale badge can lose a user forever.

## Acceptance Criteria

1. Automated freshness check: npm run check:data-freshness scans all sports for stale status (event ended >24h ago but still shows 'Live', tournament status='active' when current date > end date). 2. Per-sport checks: World Cup (compare current date to tournament end), Cycling (compare to race end date from Wikipedia), Tennis (upcoming tournaments shown as 'Live' when start date hasn't arrived). 3. Exit code 1 on ANY staleness detected, prints specific violations. 4. CI integration: Run in pre-commit hook + GitHub Actions. 5. Inspector integration: Run check:data-freshness every inspector run, auto-file data-staleness ticket if violations found. 6. Coverage: All sports with time-bound events (World Cup, cycling races, tennis tournaments). TEST: Simulate stale World Cup status, verify check fails. Simulate TdF end date passed, verify detects staleness. ROI: 4-6 hours effort, PREVENTS all future staleness bugs. Catches violations in seconds vs days/weeks. Credibility insurance.
