---
id: favicon-distinctive
status: open
deps: []
links: []
created: 2026-06-27T22:01:24Z
type: feature
priority: 1
parent: rankings123
tags: [design, branding, ui]
---
# Distinctive, on-brand favicon + app icon (designer-quality)

Create a COOL, distinctive favicon + app-icon set that reflects the rankings123 identity (per docs/DESIGN-IDENTITY.md) — not a generic letter/default. Use the frontend-design + brand-guidelines skills. Should read clearly at 16px (browser tab), 32px, and as a 180px Apple touch icon + 512px PWA/manifest icon + a maskable variant. On-brand: bold, premium, sport/rank-forward, works on light + dark tabs. Provide src/app/icon.svg (scalable) + favicon.ico + apple-icon + manifest icons, plus an OG-friendly mark. Ladder it up to DESIGN-IDENTITY (consider tying into the logo-wordmark work). Supersede/dedupe the older 'favicon' ticket.

## Acceptance Criteria

1) Distinctive, on-brand favicon renders crisply in a real browser tab at 16/32px (verify with webapp-testing) + apple-touch-icon (180) + manifest icons (192/512 + maskable). 2) Works on light AND dark browser chrome; not a generic default/letter. 3) Wired via Next.js metadata/icons (src/app/icon.*, apple-icon, manifest). 4) On-brand per DESIGN-IDENTITY.md. 5) build/lint green; live-verified (favicon shows on rankings123.com tab).
