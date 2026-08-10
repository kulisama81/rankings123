---
id: share-cards-infrastructure
status: closed
deps: []
links: []
created: 2026-07-26T22:18:23Z
type: enhancement
priority: 2
parent: shareable-data-cards-auto
tags: [design, infrastructure]
---
# Share cards: custom fonts + pre-generation + analytics

Complete the share cards infrastructure per original AC:
1. Custom fonts: Load Archivo Black + Geist Sans in Satori (requires working font URLs)
2. Pre-generation: Install @vercel/blob, create cron job to pre-generate top 10 ATP/WTA cards daily, cache in Blob
3. CDN optimization: Serve pre-generated cards from CDN, on-demand for others
4. Analytics: Add GA4 events for share button clicks, track social referral traffic lift

Acceptance: Fonts render correctly, top 10 cards pre-generate daily, analytics dashboard shows social referral metrics.

## Closed in backlog triage 2026-08-10
dup: social-sharing-og-dynamic
