---
id: public-api-json
status: open
deps: []
links: []
created: 2026-06-27T13:49:59Z
type: feature
priority: 3
parent: rankings123
tags: []
---
# Public JSON API endpoints for developers

## Notes

**2026-06-27T13:50:05Z**

Public JSON API for developers to fetch rankings data. Endpoints: /api/atp/live.json, /api/wta/live.json, /api/world-cup/standings.json, etc. Rate-limited, documented, CORS-enabled. Use case: sports apps/sites can embed our data, drives backlinks + brand awareness.

Acceptance: ✓ Public JSON endpoints for key data ✓ Rate limiting (e.g., 100 req/min per IP) ✓ API docs page (/api/docs) ✓ CORS enabled ✓ Cache headers ✓ Attribution required in ToS

ROI: BACKLINKS + BRAND AWARENESS. Developers who use the API link to us (SEO benefit). Positions rankings123 as authoritative data source. FlashScore, SofaScore have public APIs. Effort: LOW (we already have /api routes, just document + rate-limit). Impact: MEDIUM (indirect SEO + brand).
