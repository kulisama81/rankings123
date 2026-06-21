---
id: empty-state-design
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, ux]
---
# Designed empty states for off-season & no-data

Create friendly, on-brand empty state designs for when data isn't available: tournaments off-season, no search results, filters return zero matches, upcoming events with no schedule yet. Should use illustrations or clean messaging (not harsh "No results"), maintain per-sport accent theming, and guide users to next action.

## Acceptance Criteria

- Empty state component(s) for: no search results, no active tournaments, no matches in filter
- Design includes: icon/illustration, concise message, optional CTA ("Clear filters", "View archives")
- Uses per-sport accent colors (e.g., ATP lime illustration accent)
- Maintains premium aesthetic (not generic Bootstrap alert box)
- Applied to: LiveRankingTable search, WorldCupTable filters, events archive (when empty)
- Works in dark + light + all 3 design variants
- Messaging friendly, not technical ("No players match 'Federer'" not "Query returned 0 rows")

## References

- Empty states: Stripe dashboard, GitHub (friendly illustrations + action)
- Per-sport accent system (apply to illustration color)
- Current filter/search components (add empty state handling)
