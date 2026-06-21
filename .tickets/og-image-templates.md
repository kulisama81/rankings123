---
id: og-image-templates
status: open
deps: [logo-wordmark]
links: []
created: 2026-06-21T12:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, seo, social]
---
# Dynamic OG image templates for social sharing

Create templated Open Graph images that auto-generate from page data: player rankings, World Cup standings, tournament results. Each OG image should feature logo/wordmark, per-sport accent gradient wash, key data point (e.g., "#1 ATP: Carlos Alcaraz"), and rankings123.com branding. Boosts social engagement and brand recognition when shared.

## Acceptance Criteria

- OG image generation system (Next.js @vercel/og or similar)
- Templates for: ATP/WTA player pages, World Cup standings, tournament results
- Each template includes: logo, accent gradient (per-sport), 1-2 key data points, URL
- Images render at 1200×630px (OG standard), optimized file size (<100KB)
- Dark-mode aesthetic (matches site default)
- Per-sport accent colors applied (ATP lime, WTA magenta, World Cup green)
- Metadata in layout.tsx/generateMetadata for each page type
- Verified with Twitter Card Validator + Facebook Debugger

## References

- Vercel OG Image generation: vercel.com/docs/functions/og-image-generation
- Per-sport accent system (DESIGN-IDENTITY.md)
- Logo-wordmark ticket (dependency — use once designed)
