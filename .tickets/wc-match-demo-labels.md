---
id: wc-match-demo-labels
status: open
deps: []
links: []
created: 2026-06-29T05:08:13Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, ui, cx]
---
# World Cup match pages show Demo data placeholder labels (CX violation)

**URL:** https://rankings123.com/world-cup/match/401635294 (and likely all match pages)

**Repro steps:**
1. Navigate to any World Cup match page (e.g. /world-cup/match/401635294)
2. Observe the page content

**Expected:**
- Match data displayed without placeholder/demo labels
- Clean user-facing presentation (per CLAUDE.md CX-first rule: never ship placeholder text)

**Actual:**
- Page contains "FTDemo data" and "Demo data" labels
- These placeholder indicators suggest development/test content rather than production-ready data

**Severity:** P1 - CX violation. While the match page functions and shows data, the "Demo data" labels undermine user trust and violate the CX-first principle (no placeholder text in production).

**Context:**
Per CLAUDE.md: "never ship placeholder, 'coming soon', empty, or fabricated UI to users." Mock fallback is acceptable only as a clearly-flagged degradation when a live feed is down, not as permanent demo labels.

## Acceptance Criteria

- [ ] All "Demo data" / "FTDemo data" labels removed from match pages
- [ ] Either: show real match data from a live source, OR hide these fields if not yet backed by real data
- [ ] Regression test added in `scripts/check-data-sanity.mjs` that fails if demo/placeholder labels are detected on public pages
