---
id: bug-atp-demo-data-visible
status: open
deps: []
links: []
created: 2026-08-16T05:04:17Z
type: bug
priority: 0
parent: rankings123
tags: [bug, atp, cx]
---
# ATP Live page shows 'Demo data' to users (CX violation)

The ATP Live rankings page explicitly displays 'Demo data' and 'Grass season (demo)' labels to end users, violating the CX-FIRST principle in CLAUDE.md which states: 'never ship placeholder, coming soon, empty, or fabricated UI to users'.

URL: https://rankings123.com/atp-live
Repro: Visit the ATP Live page
Expected: Either show real data with a real source indicator (e.g., 'Source: ESPN'), OR hide the page entirely if only demo data is available. Never show 'demo' labels to users.
Actual: Page prominently shows 'Demo data' and 'Grass season (demo)' text.
Additional issue: Title says 'August 2026' but content shows 'Week of June 8, 2026' (date mismatch).
Severity: P0 - CX violation, makes site look unprofessional and fabricated.

## Acceptance Criteria

1. The ATP Live page NEVER displays 'demo', 'placeholder', or 'coming soon' text to users
2. Either: (a) show real ATP data with a source indicator like 'Source: ESPN' or 'Source: UTS+ESPN', OR (b) hide/gate the page if only demo data is available
3. The page title date matches the data date (no August/June mismatch)
4. A regression test is added (node --test unit test in tests/ that checks the ATP page does not contain demo/placeholder text, OR a check:data-sanity invariant)
5. The test MUST fail on current code and pass after the fix
6. Verified on live production site (rankings123.com/atp-live)
