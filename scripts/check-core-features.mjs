#!/usr/bin/env node
/**
 * Core-features guard — renders the live site in a REAL browser (Playwright) and fails if a
 * must-have feature (see docs/CORE-FEATURES.md) is missing. This catches the class of
 * regression where a planner removes/guts a feature "to save space" — which curl/SSR checks
 * can't see (the bracket renders client-side).
 *
 * Runs in the inspector + as a post-deploy gate. Exit 1 if any core feature is missing.
 * Usage: node scripts/check-core-features.mjs            (checks https://rankings123.com)
 *        CORE_BASE=https://preview-url node scripts/check-core-features.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.CORE_BASE || "https://rankings123.com";
const fails = [];
const ok = [];

async function check(page, path, label, fn) {
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(3500); // allow client hydration (live data fetches)
    const problem = await fn(page);
    if (problem) fails.push(`${label}: ${problem}`);
    else ok.push(label);
  } catch (e) {
    fails.push(`${label}: page error — ${e.message}`);
  }
}

const text = (page, sel) =>
  page.evaluate((s) => (document.querySelector(s)?.innerText || ""), sel);

const browser = await chromium.launch();
const page = await browser.newPage();

// World Cup knockout bracket — the R32 column with real matchups (the deleted feature)
await check(page, "/world-cup", "WC knockout bracket (R32 matchups)", async (p) => {
  const t = await text(p, "#knockout-bracket");
  if (!/round of 32/i.test(t)) return "no Round of 32 column in the bracket tree";
  const codes = (t.match(/\b[A-Z]{3}\b/g) || []).filter((c) => !["TBD", "TOP"].includes(c));
  if (codes.length < 4) return `R32 shows no real team codes (all TBD?) — found ${codes.length}`;
  return null;
});

// World Cup group standings
await check(page, "/world-cup", "WC group standings", async (p) => {
  const t = await p.evaluate(() => document.body.innerText);
  return /group [a-l]/i.test(t) ? null : "no group standings";
});

// ATP live ranking + pagination
await check(page, "/atp-live", "ATP live ranking + pagination", async (p) => {
  const rows = await p.evaluate(() => document.querySelectorAll("table tr, [role=row]").length);
  const t = await p.evaluate(() => document.body.innerText);
  if (rows < 20) return `too few ranking rows (${rows})`;
  if (!/next|page|\b1\b.*\b2\b/i.test(t)) return "no pagination control";
  return null;
});

// WTA live ranking
await check(page, "/wta-live", "WTA live ranking", async (p) => {
  const rows = await p.evaluate(() => document.querySelectorAll("table tr, [role=row]").length);
  return rows < 20 ? `too few ranking rows (${rows})` : null;
});

// Home multi-sport sections
await check(page, "/", "Home multi-sport", async (p) => {
  const t = await p.evaluate(() => document.body.innerText);
  return /tennis/i.test(t) && /world cup/i.test(t) ? null : "missing sport sections";
});

await browser.close();

for (const o of ok) console.log(`  ✓ ${o}`);
if (fails.length) {
  console.error(`\n✗ check-core-features: ${fails.length} CORE FEATURE(S) MISSING (see docs/CORE-FEATURES.md):`);
  for (const f of fails) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n✓ check-core-features: all ${ok.length} core features present.`);
