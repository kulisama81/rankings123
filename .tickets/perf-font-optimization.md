---
id: perf-font-optimization
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: enhancement
priority: 3
parent: rankings123
tags: [perf, design]
---
# Optimize font loading: reduce families and ensure display swap

## Context

The site currently loads **5 Google Fonts** in `src/app/layout.tsx`:
1. Geist (sans-serif, body text)
2. Geist Mono (monospace)
3. Archivo (display, headings)
4. Oswald (alternate display, "Broadcast" theme)
5. Source Serif 4 (serif, "Classic" theme)

**Impact:**
- Multiple font families = multiple render-blocking requests
- Each font file adds ~20-50KB compressed
- Can delay LCP if fonts are render-blocking
- Potential for FOUT (Flash of Unstyled Text) if `display: swap` not set

**Current implementation:**
```typescript
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["600", "700", "800", "900"] });
// ... etc
```

## Solution

### 1. Audit Font Usage
Determine which fonts are actually used on live pages:
- Are Oswald + Source Serif only for alternate themes that aren't yet implemented?
- Can we consolidate to 2-3 core families?

### 2. Ensure `display: 'swap'`
For all fonts, add `display: 'swap'` to prevent render-blocking:

```typescript
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: 'swap', // ← ADD THIS
});
```

This tells the browser to show fallback text immediately, then swap in the web font when loaded (no FOIT/invisible text).

### 3. Preload Critical Fonts
For above-the-fold fonts (e.g., Archivo for headings), add `<link rel="preload">` in the `<head>` to start loading ASAP.

**Reference:** [Next.js font optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts), [web.dev/font-best-practices](https://web.dev/font-best-practices)

## Why It Matters (ROI)

**LCP:** Fonts can block largest contentful paint if not optimized  
**UX:** Font swapping (FOUT) is better than invisible text (FOIT)  
**Bundle size:** Fewer fonts = smaller payload, faster mobile load  
**Core Web Vitals:** LCP is a ranking signal

## Acceptance Criteria

- [ ] Audit font usage across components — determine which fonts are actually needed
- [ ] Remove unused fonts (likely Oswald + Source Serif if alternate themes aren't live)
- [ ] Add `display: 'swap'` to all remaining font configurations
- [ ] Measure LCP before/after via Lighthouse — expect improvement if fonts were blocking
- [ ] Verify no visual regressions (text still renders correctly)
- [ ] Document final font stack in `docs/DESIGN-IDENTITY.md`

## Performance Budget

**Current:** 5 font families loaded  
**Target:** ≤ 3 font families  
**Expected LCP improvement:** ~100-300ms (if fonts were blocking initial paint)
