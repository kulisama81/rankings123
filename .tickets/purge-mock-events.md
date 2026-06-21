---
id: purge-mock-events
status: closed
deps: []
links: []
created: 2026-06-21T22:02:48Z
type: bug
priority: 0
parent: rankings123
tags: [bug, data, cx]
---
# Remove ALL fabricated mock event/archive data (tennis players shown in cycling races)

CREDIBILITY-DESTROYING fabricated data is live: src/data/index.ts (38KB of hand-made fake datasets — 'Paris 2024 Olympics', fabricated cycling like Paris-Nice 2026 listing TENNIS player Carlos Alcaraz as a Lidl-Trek cyclist, rugby, etc.) is rendered by the landing 'Events & Archives' section + the /events/[eventId] pages + /api/rankings/[eventId]. None of it is real. User saw 'Alcaraz in Paris-Nice cycling' — nonsense. Per the CX-first rule, REMOVE all of it; we only show data backed by a REAL source.

REMOVE: the fabricated datasets in src/data/index.ts (allEvents, getRankings, the Olympics/cycling/rugby mock), the landing 'Events & Archives' section + the hardcoded cyclingLinks (src/app/page.tsx), the /events/[eventId] route, the /api/rankings/[eventId] route, and any sitemap/nav/internal links pointing at them. Sports without a real dynamic feed (cycling, olympics, rugby) must be HIDDEN until a real feed exists (cycling feed is tracked in cycling-dynamic-feed/cycling-page) — never shown with mock. KEEP the real live sections (ATP/WTA tennis, World Cup) untouched. The live-feed mock FALLBACKS (atpLive.ts etc.) are a separate flagged safety net — leave those, but verify nothing fabricated/cross-sport renders to users.

## Acceptance Criteria

1) No fabricated/mock event data renders anywhere on the live site — no tennis player in a cycling race, no made-up Olympics/rugby/cycling results; /events fabricated pages and the landing 'Events & Archives' section are gone. 2) src/data/index.ts fabricated datasets + allEvents/getRankings + /events/[eventId] + /api/rankings/[eventId] removed; all imports/links/sitemap entries cleaned (no dead links / 404s in nav). 3) Only real-sourced sports remain (ATP/WTA/World Cup); cycling hidden until its real feed ships. 4) REGRESSION GUARD: a node --test (or check-data-integrity rule) asserting the fabricated event datasets are gone and not re-imported. 5) build + eslint + check:readability green; live-verified on rankings123.com (no fabricated content, no broken links).
