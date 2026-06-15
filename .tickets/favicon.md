---
id: favicon
status: open
deps: []
links: []
created: 2026-06-15T05:09:24Z
type: feature
priority: 2
parent: rankings123
tags: [ui, brand, seo]
---
# Branded favicon + app icons (desktop + mobile)

Replace the default Next favicon with a branded icon set matching the Rankings123 identity (the live-dot + accent motif). Cover desktop and mobile: favicon.ico (multi-size), icon.png/SVG (Next app icon), apple-touch-icon (180x180), and a web app manifest (manifest.webmanifest) with maskable PWA icons (192/512) + theme color, so it looks right on browser tabs, iOS/Android home screens, and when installed. Keep it legible at 16px.

## Acceptance Criteria

Branded favicon shows on desktop browser tabs; apple-touch-icon renders on iOS add-to-home; manifest + 192/512 maskable icons present and referenced; theme-color set; no 404s for icon assets; legible at small sizes.
