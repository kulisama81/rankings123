#!/usr/bin/env node
/**
 * Pull Google Search Console data → src/data/search-console-report.json
 * so the loop (autoresearch + digest) can target content at what people ACTUALLY search.
 *
 * Reuses the GA service-account key (.ga-credentials.json, gitignored). ONE-TIME HANDOFF:
 * add that service account as a user in Search Console (Settings → Users and permissions →
 * Add user → analytics-reader@gen-lang-client-0002915773.iam.gserviceaccount.com → Full or
 * Restricted). Until then this logs + skips gracefully (no crash).
 *
 * Usage: node scripts/pull-search-console.mjs
 * Env: GSC_SITE_URL (default https://rankings123.com/ — the URL-prefix property)
 */
import { JWT } from "google-auth-library";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const CREDS = join(ROOT, ".ga-credentials.json");
const OUT = join(ROOT, "src", "data", "search-console-report.json");
const SITE = process.env.GSC_SITE_URL || "https://rankings123.com/";
const API = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;

function dateStr(daysAgo) {
  const d = new Date(Date.now() - daysAgo * 864e5);
  return d.toISOString().slice(0, 10);
}

async function main() {
  let creds;
  try {
    creds = JSON.parse(await readFile(CREDS, "utf-8"));
  } catch {
    console.error("pull-search-console: no .ga-credentials.json — skipping.");
    return;
  }
  const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  let token;
  try {
    ({ access_token: token } = await jwt.authorize());
  } catch (e) {
    console.error("pull-search-console: auth failed —", e.message);
    return;
  }

  const startDate = dateStr(28), endDate = dateStr(1);
  const q = async (body) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate, endDate, ...body }),
    });
    if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
    return (await res.json()).rows || [];
  };

  try {
    const [totalRows, queryRows, pageRows] = await Promise.all([
      q({}),
      q({ dimensions: ["query"], rowLimit: 25 }),
      q({ dimensions: ["page"], rowLimit: 25 }),
    ]);
    const t = totalRows[0] || {};
    const report = {
      generatedAt: new Date().toISOString(),
      range: { startDate, endDate },
      site: SITE,
      totals: {
        clicks: t.clicks || 0,
        impressions: t.impressions || 0,
        ctr: +((t.ctr || 0) * 100).toFixed(2),
        position: +(t.position || 0).toFixed(1),
      },
      topQueries: queryRows.map((r) => ({
        query: r.keys[0], clicks: r.clicks, impressions: r.impressions,
        ctr: +(r.ctr * 100).toFixed(1), position: +r.position.toFixed(1),
      })),
      topPages: pageRows.map((r) => ({
        page: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1),
      })),
    };
    await mkdir(join(ROOT, "src", "data"), { recursive: true });
    await writeFile(OUT, JSON.stringify(report, null, 2));
    console.log(`pull-search-console: wrote ${OUT} — ${report.totals.impressions} impressions, ${report.totals.clicks} clicks, ${report.topQueries.length} queries.`);
  } catch (e) {
    // Most likely: service account not yet added to the GSC property (403), or no data yet.
    console.error(`pull-search-console: query failed — ${e.message}\n  (If 403: add ${creds.client_email} as a user in Search Console. If 'no data': the site was just indexed — data appears in a few days.)`);
  }
}

main().catch((e) => console.error("pull-search-console: fatal", e.message));
