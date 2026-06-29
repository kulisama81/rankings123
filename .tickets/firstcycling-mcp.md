---
id: firstcycling-mcp
status: closed
deps: []
links: []
created: 2026-06-24T13:49:39Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, data, unblocks]
---
# FirstCycling MCP server for dynamic cycling data

Evaluate and integrate FirstCycling MCP server (https://mcpmarket.com/server/firstcycling) as alternative to Python scraper for dynamic cycling data. MCP server provides access to UCI rankings, race results, rider data through Model Context Protocol. This could UNBLOCK cycling-dynamic-feed without requiring Python microservice infrastructure. Test: connect MCP server, fetch UCI rankings + Tour de France 2026 data, transform to our data model, wire with mock fallback + source flag pattern.

## Acceptance Criteria

✓ FirstCycling MCP server connected and tested
✓ Can fetch UCI individual rankings (top 50+)
✓ Can fetch race results (Tour de France 2026)
✓ Data transforms to our cycling data model
✓ Mock fallback + source flag pattern working
✓ Performance acceptable (< 2s fetch time)
✓ If viable: unblocks cycling-dynamic-feed, tdf-2026-page
✓ If not viable: document why + alternative recommendations

## Notes

**2026-06-24T13:49:47Z**

ROI Justification (First Principles):

FUNDAMENTAL TRUTH: Blockers compound. cycling-dynamic-feed blocks tdf-2026-page, which blocks Tour de France coverage (starts July 4, 10 days away).

CURRENT BLOCKER: cycling-dynamic-feed marked BLOCKED because it needs Python scrapers with Cloudflare bypass (out of scope for autonomous loop).

NEW SOLUTION: FirstCycling MCP server (https://mcpmarket.com/server/firstcycling) provides UCI rankings + race data through Model Context Protocol. This is ALREADY in our architecture (we use MCP tools). No Python microservice needed!

IMPACT vs EFFORT:
- Impact: VERY HIGH - UNBLOCKS all cycling work (tdf-2026-page, cycling-page, Giro updates), enables Tour de France coverage before July 4
- Effort: LOW-MEDIUM - MCP server integration (we already use MCP), test + transform data
- ROI: EXCEPTIONAL - unblocks 5+ cycling tickets, enables time-sensitive TdF coverage

FIRST PRINCIPLES: Don't build what already exists. MCP server solves the exact problem Python scraper would have solved, but using infrastructure we already have.

TIME-SENSITIVE: Tour de France starts July 4. If this MCP approach works, we can ship TdF coverage in time!
