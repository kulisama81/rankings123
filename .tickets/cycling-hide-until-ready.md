---
id: cycling-hide-until-ready
status: closed
deps: []
links: []
created: 2026-06-23T13:51:43Z
type: bug
priority: 1
parent: rankings123
tags: [cx, data]
---
# Hide broken cycling section until dynamic feed ships

Analytics show cycling event pages getting traffic but 0.0s avg duration + 100% bounce rate = broken UX. cycling-dynamic-feed is BLOCKED on Python scrapers. Until real cycling data ships, HIDE cycling from navigation and homepage (per CX FIRST - never show placeholder/broken features). Immediate UX protection. Remove cycling nav link, hide cycling section from homepage. Re-show when cycling-dynamic-feed closes.

**Evidence (GA4 analytics):**
- `/events/giro-2026` — 1 view, 0.0s duration, 100% bounce
- `/events/tdf-2026` — 1 view, 0.0s duration, 100% bounce  
- `/events/vuelta-2026` — 2 views, 0.1s duration, 100% bounce
- 7 other cycling event pages: all 0.0s duration, 100% bounce

Users ARE finding these pages (likely via nav or homepage) but immediately leaving = bad UX hurting site trust.

**ROI:**
- **Impact:** MEDIUM (protects CX, stops bad UX from hurting overall site perception)
- **Effort:** VERY LOW (remove nav link, conditionally hide homepage section)
- **Urgency:** HIGH (every day cycling is visible = more users hitting broken pages)

## Acceptance Criteria

**Updated based on actual codebase state:** Cycling was never in navigation or homepage. The bounce traffic is likely from SEO/search engines finding cycling mentions in metadata. Real fix:

1. Remove cycling from site metadata (layout.tsx, manifest.ts) so search engines stop indexing it as a promised feature
2. Remove cycling from CLAUDE.md expansion plans (clarify as "future" not "current")
3. Add TODO comments: "Re-add cycling when cycling-dynamic-feed ships"
4. Build/lint green
5. Verify no cycling promises in user-facing metadata or navigation
