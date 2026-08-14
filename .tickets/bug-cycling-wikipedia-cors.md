---
id: bug-cycling-wikipedia-cors
status: open
deps: []
links: []
created: 2026-08-13T22:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, cycling, cors, api, console-error]
---
# Cycling page makes client-side Wikipedia API calls causing CORS errors

## Bug Report

**URL:** https://rankings123.com/ (homepage) and https://rankings123.com/cycling

**Severity:** P2 (Medium) - Console errors, failed requests, Wikipedia data not loading

**Inspection Date:** 2026-08-13

## Description

The cycling feed in `src/lib/cyclingFeed.ts` makes **client-side fetch calls directly to the Wikipedia API**, which fail with CORS errors because Wikipedia doesn't allow cross-origin requests from browsers. This causes:

1. **Console errors** on every page load that includes cycling data (homepage, cycling page)
2. **Failed network requests** (3+ per page load for Vuelta, Tour de France, Giro d'Italia)
3. **Wikipedia data never loads** - cycling race data cannot be fetched from Wikipedia

## Reproduction Steps

1. Open browser developer console (Console + Network tabs)
2. Visit https://rankings123.com/ (homepage with cycling section)
3. Observe console errors:
   ```
   Access to fetch at 'https://en.wikipedia.org/w/api.php?action=parse&page=2026_Vuelta_a_Espa%C3%B1a&prop=text&format=json' 
   from origin 'https://rankings123.com' has been blocked by CORS policy: 
   No 'Access-Control-Allow-Origin' header is present on the requested resource.
   ```
4. Check Network tab: 3+ failed requests to `en.wikipedia.org/w/api.php` with CORS errors
5. **Expected:** Wikipedia API calls succeed and return race data
6. **Actual:** All Wikipedia API calls fail with CORS errors; data never loads

## Root Cause

**File:** `src/lib/cyclingFeed.ts:15`

```typescript
async function fetchWikipediaHtml(wikipediaPage: string, revalidateSeconds: number): Promise<string> {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(wikipediaPage)}&prop=text&format=json`;
  const res = await fetch(url, {  // ❌ Client-side fetch to Wikipedia API
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  // ...
}
```

The function is called **client-side** (in a Next.js component or client component), but Wikipedia's API doesn't set `Access-Control-Allow-Origin` headers, so browsers block the requests.

## Impact

- Console pollution with CORS errors on every page load
- Cycling race data from Wikipedia never loads (always falls back to mock)
- Unnecessary network traffic (failed requests)
- Users never see real Wikipedia-sourced race data (Vuelta, Tour de France, Giro stages/GC)
- Looks unprofessional to developers who check console

## Acceptance Criteria

1. **Move Wikipedia API calls server-side:**
   - Create a Next.js API route `/api/cycling/wikipedia` that proxies Wikipedia API requests
   - OR use `fetchWikipediaHtml` only in **server components** (no client-side calls)
   - The API route should:
     - Accept `page` parameter (Wikipedia article name)
     - Fetch from Wikipedia API server-side (no CORS restrictions)
     - Return parsed HTML or JSON to the client
     - Include ISR/revalidation (e.g., `revalidate: 300` for 5 min cache)

2. **Update cyclingFeed.ts to use the proxy:**
   - If using API route: change fetch URL from `https://en.wikipedia.org/...` to `/api/cycling/wikipedia?page=...`
   - If using server components: ensure `fetchWikipediaHtml` is only called server-side (in `page.tsx`, not client components)
   - Maintain existing fallback to mock data on fetch failure

3. **Zero CORS errors:**
   - Load https://rankings123.com/ in browser console
   - Load https://rankings123.com/cycling in browser console
   - Network tab shows NO failed requests to `en.wikipedia.org`
   - Console shows NO CORS policy errors
   - All Wikipedia API calls succeed (200) OR use server-side proxy

4. **Wikipedia data loads successfully:**
   - Visit https://rankings123.com/cycling (when a Grand Tour is active)
   - Verify race data loads from Wikipedia (not mock fallback)
   - Check `source` flag shows `wikipedia` (not `mock`)
   - Stage data, GC standings, jersey leaders populate from real Wikipedia data

5. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/cycling-wikipedia-cors.test.mjs` (run via `npm test`):
     - Test that cycling page loads without CORS errors
     - If API route exists: verify `/api/cycling/wikipedia?page=2026_Vuelta_a_España` returns 200
     - Verify response contains valid HTML or JSON data
     - Test should FAIL if Wikipedia calls are still client-side (CORS errors)
     - Test should PASS when proxied server-side or in server components
   - OR add invariant to `scripts/check-data-sanity.mjs`:
     - When cycling data source is `wikipedia`, verify no console CORS errors on page load
     - Can use headless browser check or API route test

6. **Verify locally:**
   - `npm run dev` → visit http://localhost:3000/
   - Open browser console + Network tab
   - Verify NO CORS errors appear
   - Verify Wikipedia API calls succeed (if racing is active)
   - `npm test` — all tests green including new regression test

7. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes

8. **Live verification after deploy:**
   - Visit https://rankings123.com/
   - Open browser console + Network tab
   - Confirm NO CORS errors for Wikipedia API
   - Cycling data loads from Wikipedia (when races are active)
   - `source` flag shows `wikipedia` not `mock`
