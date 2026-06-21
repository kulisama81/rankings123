#!/usr/bin/env node
/**
 * Performance tester — measures load timing for the live site's key routes and flags
 * anything over budget. Lightweight (uses curl, no deps), meant to run on a schedule
 * and as the @perf-inspector agent's measurement step.
 *
 * Budgets (server-side, the part we control): TTFB ≤ 0.8s good / ≤ 1.5s ok / >1.5s slow;
 * total ≤ 2.0s. These are deliberately strict for a live-data product — the data tables
 * are the hero and must feel instant.
 *
 * Usage: node scripts/check-performance.mjs            (checks https://rankings123.com)
 *        PERF_BASE=http://localhost:3000 node scripts/check-performance.mjs
 * Exit code 1 if any route is over the SLOW threshold (so it can gate / alert); the agent
 * turns findings into tickets.
 */
import { execSync } from "child_process";

const BASE = process.env.PERF_BASE || "https://rankings123.com";
const ROUTES = ["/", "/atp-live", "/wta-live", "/world-cup"];
const TTFB_OK = 0.8;
const TTFB_SLOW = 1.5;
const TOTAL_SLOW = 2.0;

function measure(route, runs = 2) {
  // Take the best of N runs to reduce noise (cold-start / network jitter).
  let best = null;
  for (let i = 0; i < runs; i++) {
    try {
      const out = execSync(
        `curl -s -m 30 -o /dev/null -w "%{time_starttransfer} %{time_total} %{size_download} %{http_code}" "${BASE}${route}"`,
        { encoding: "utf8" }
      ).trim();
      const [ttfb, total, size, code] = out.split(" ").map(Number);
      if (!best || ttfb < best.ttfb) best = { ttfb, total, size, code };
    } catch {
      return { route, ttfb: 99, total: 99, size: 0, code: 0, status: "ERROR" };
    }
  }
  const status = best.ttfb > TTFB_SLOW || best.total > TOTAL_SLOW ? "SLOW" : best.ttfb > TTFB_OK ? "OK-ish" : "FAST";
  return { route, ...best, status };
}

const results = ROUTES.map((r) => measure(r));
console.log(`Performance — ${BASE}  (best of 2 runs)\n`);
console.log("  route          TTFB    total   size     status");
for (const r of results) {
  console.log(
    `  ${r.route.padEnd(13)} ${r.ttfb.toFixed(2)}s  ${r.total.toFixed(2)}s  ${(r.size / 1024).toFixed(0).padStart(4)}KB  ${r.status}`
  );
}
const slow = results.filter((r) => r.status === "SLOW" || r.status === "ERROR");
if (slow.length) {
  console.error(`\n✗ performance: ${slow.length} route(s) over budget: ${slow.map((r) => `${r.route} (${r.ttfb.toFixed(2)}s)`).join(", ")}`);
  process.exit(1);
}
console.log(`\n✓ performance: all routes within budget.`);
