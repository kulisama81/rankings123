---
id: entrance-animation-choreography
title: Page entrance animation choreography system
status: open
type: feature
priority: 2
tags:
  - design
parent: rankings123
created: 2026-07-05
---

## Problem
Current site is static and utilitarian (per 2026-07-05 audit) — no entrance motion, pages feel lifeless on load. 2026 sports viz trend (Beyond Sports) emphasizes "interactive over linear" experiences. Award-winning sports sites (day one® Run on Awwwards) use sophisticated animation choreography for emotional storytelling.

## Solution
Implement orchestrated entrance animations using Framer Motion or CSS transitions:
- **Hero**: fade-up + scale (0-150ms)
- **Cards**: stagger fade-up, 80ms delay between each (150-500ms)  
- **Tables**: fade-in from below (400-600ms)
- Orchestrated timing creates "choreographed" feel vs isolated effects

## Acceptance Criteria
- [ ] Hero animates in first (fade-up + subtle scale from 0.98 to 1)
- [ ] Sport cards stagger in with 80ms delays between each
- [ ] Tables fade in last
- [ ] Respects `prefers-reduced-motion` (instant display if set)
- [ ] GPU-cheap (transform/opacity only, no layout thrash)
- [ ] Total entrance choreography < 800ms (fast, not sluggish)
- [ ] Works on all routes (home, ATP/WTA live, World Cup, Cycling, etc.)
- [ ] No layout shift (elements reserve space before animating in)

## ROI
Quick win (~2-3h implementation) that makes site feel premium and alive vs commodity competitors. First impression is critical — this transforms "generic template" into "designed product." Aligns with 2026 trend toward dynamic, engaging sports experiences.
