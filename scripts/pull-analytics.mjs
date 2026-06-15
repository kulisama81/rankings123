#!/usr/bin/env node

/**
 * Pull GA4 analytics for rankings123 -> src/data/analytics-report.json.
 * Read by @autoresearch (strategy) and the daily digest so the loop is traffic-driven.
 * Requires .ga-credentials.json (service account key, gitignored) whose service account
 * has Viewer access on the GA4 property below.
 *
 * Usage: node scripts/pull-analytics.mjs [--days 28]
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const CREDS = join(ROOT, ".ga-credentials.json");
const OUT = join(ROOT, "src", "data", "analytics-report.json");
const PROPERTY_ID = process.env.GA_PROPERTY_ID || "541668716"; // rankings123.com GA4 property

const args = process.argv.slice(2);
let days = 28;
const di = args.indexOf("--days");
if (di >= 0 && args[di + 1]) days = parseInt(args[di + 1], 10);

async function main() {
  let credentials;
  try {
    credentials = JSON.parse(await readFile(CREDS, "utf-8"));
  } catch {
    console.error("pull-analytics: no .ga-credentials.json — skipping (loop runs without traffic data).");
    process.exit(0);
  }

  const client = new BetaAnalyticsDataClient({ credentials });
  const property = `properties/${PROPERTY_ID}`;
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];

  const [totals] = await client.runReport({
    property,
    dateRanges,
    metrics: [{ name: "screenPageViews" }, { name: "sessions" }, { name: "totalUsers" }],
  });
  const [pages] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "averageSessionDuration" }, { name: "bounceRate" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 50,
  });
  const [devices] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "sessions" }],
  });
  const [searches] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: "searchTerm" }],
    metrics: [{ name: "eventCount" }],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: 30,
  });
  const [sources] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }, { name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });
  const [geo] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: "country" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 15,
  });

  const m = (r, i) => (r?.rows?.[0] ? parseInt(r.rows[0].metricValues[i].value, 10) : 0);
  const totalPageViews = m(totals, 0);
  const totalSessions = m(totals, 1);
  const totalUsers = m(totals, 2);
  const deviceRows = (devices.rows || []).map((r) => ({
    device: r.dimensionValues[0].value,
    sessions: parseInt(r.metricValues[0].value, 10),
  }));
  const mobile = deviceRows.find((d) => d.device === "mobile")?.sessions || 0;
  const mobileShare = totalSessions ? `${Math.round((mobile / totalSessions) * 100)}%` : "—";

  const report = {
    generated: new Date().toISOString(),
    period: `last ${days} days`,
    propertyId: PROPERTY_ID,
    summary: { totalPageViews, totalSessions, totalUsers, mobileShare },
    pageViews: (pages.rows || []).map((r) => ({
      page: r.dimensionValues[0].value,
      views: parseInt(r.metricValues[0].value, 10),
      avgSessionDuration: parseFloat(r.metricValues[1].value).toFixed(1),
      bounceRate: `${(parseFloat(r.metricValues[2].value) * 100).toFixed(1)}%`,
    })),
    devices: deviceRows,
    searchTerms: (searches.rows || []).map((r) => ({
      term: r.dimensionValues[0].value,
      count: parseInt(r.metricValues[0].value, 10),
    })),
    trafficSources: (sources.rows || []).map((r) => ({
      channel: r.dimensionValues[0].value,
      sessions: parseInt(r.metricValues[0].value, 10),
      pageViews: parseInt(r.metricValues[1].value, 10),
    })),
    geography: (geo.rows || []).map((r) => ({
      country: r.dimensionValues[0].value,
      sessions: parseInt(r.metricValues[0].value, 10),
    })),
  };

  await mkdir(join(ROOT, "src", "data"), { recursive: true });
  await writeFile(OUT, JSON.stringify(report, null, 2));
  console.log(
    `pull-analytics: wrote analytics-report.json — ${totalPageViews} views, ${totalSessions} sessions, ${totalUsers} users (last ${days}d) for property ${PROPERTY_ID}`
  );
}

main().catch((e) => {
  console.error("pull-analytics: failed:", e.message);
  process.exit(1);
});
