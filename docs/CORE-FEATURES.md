# Core Features — DO NOT REMOVE without explicit human (Loïc) approval

These are must-have, user-facing features. A planner must **never remove, hide, or gut** any of
them — not even "to save space" or "to simplify" (make it scroll/collapse/paginate instead). Any diff
that removes or hides one is a **regression** and the verifier must FAIL it unless the ticket
explicitly asks for the change AND it's human-approved.

`scripts/check-core-features.mjs` (`npm run check:core-features`) renders these in a real browser and
fails if any are missing. It runs in the inspector + as a post-deploy gate.

## Protected features
- **Home:** multi-sport landing with Tennis, World Cup (and Cycling once live) sections + nav.
- **ATP Live (`/atp-live`):** live ranking table, deep depth (~1000 players) with **pagination** (50/page).
- **WTA Live (`/wta-live`):** live ranking table.
- **World Cup (`/world-cup`):**
  - Group standings (12 groups) with advancing/eliminated treatment (confirmed-only).
  - **Knockout Bracket Tree** showing the **Round of 32 matchups** (real/projected teams, not all TBD)
    → R16 → QF → SF → Final, with confirmed-vs-projected labelling. *(This is the one a planner
    deleted "to save space" — it is the heart of the knockout view; never drop the R32 column.)*
  - Today's matches + full schedule (Upcoming/Results tabs).
  - Golden Boot / top scorers.
- **Data integrity:** real-sourced data only (mock = flagged fallback); no fabricated/placeholder UI.
- **Footer:** Privacy / Cookies / Terms / What's New (changelog).

## Rule for planners
When a change would crowd the layout, the answer is **scroll, collapse, paginate, or restructure** —
**never delete a protected feature.** If you believe a core feature genuinely should be removed,
STOP and leave a note for human approval; do not ship it.
