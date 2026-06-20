#!/usr/bin/env node

/**
 * Rankings123 daily digest email — site health, growth signals, autonomy activity.
 * Sends via Resend (send-only API; no inbox access). Run from local cron.
 *
 * Usage: RESEND_API_KEY=re_... node scripts/daily-digest.mjs
 * Optional env: REPORT_TO (comma list), REPORT_FROM
 * Traffic section fills in once scripts/pull-analytics.mjs writes
 * src/data/analytics-report.json (needs GA4 .ga-credentials.json).
 */

import { execSync } from "child_process";
import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO = (process.env.REPORT_TO || "loic.deniel@gmail.com").split(",").map((s) => s.trim());
const FROM = process.env.REPORT_FROM || "Rankings123 <onboarding@resend.dev>";
const ANALYTICS_PATH = join(ROOT, "src", "data", "analytics-report.json");
const HISTORY_PATH = join(ROOT, "src", "data", "digest-history.json");
const SITE = "https://rankings123.com";
const ROUTES = ["/", "/atp-live", "/wta-live", "/world-cup"];
const REVENUE_GOAL = Number(process.env.REVENUE_GOAL_MONTHLY || 1000); // monthly $ target

if (!RESEND_API_KEY) {
  console.error("daily-digest: RESEND_API_KEY not set, skipping.");
  process.exit(0);
}

function run(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: "utf-8", timeout: 15000 }).trim();
  } catch {
    return "";
  }
}
async function loadJson(p) {
  try {
    return JSON.parse(await readFile(p, "utf-8"));
  } catch {
    return null;
  }
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Count tickets by reading .tickets/*.md frontmatter (no tkt CLI dependency).
async function ticketCounts() {
  const counts = { open: 0, in_progress: 0, closed: 0 };
  try {
    const files = await readdir(join(ROOT, ".tickets"));
    for (const f of files) {
      if (!f.endsWith(".md")) continue;
      const txt = await readFile(join(ROOT, ".tickets", f), "utf-8").catch(() => "");
      const m = txt.match(/^status:\s*(\w+)/m);
      if (m && counts[m[1]] !== undefined) counts[m[1]]++;
    }
  } catch {
    /* no tickets dir */
  }
  return counts;
}

async function siteHealth() {
  const out = [];
  for (const r of ROUTES) {
    const code = run(`curl -s -m 12 -o /dev/null -w "%{http_code}" "${SITE}${r}"`);
    // 2xx = OK, 3xx = healthy redirect (e.g. intentional 308s) — both fine.
    out.push({ route: r, code: code || "ERR", ok: /^[23]\d\d$/.test(code) });
  }
  return out;
}

function trend(cur, prev) {
  if (prev == null || prev === 0) return "";
  const diff = cur - prev;
  const pct = ((diff / prev) * 100).toFixed(0);
  const arrow = diff > 0 ? "&#9650;" : diff < 0 ? "&#9660;" : "&#9644;";
  const color = diff > 0 ? "#2E7D32" : diff < 0 ? "#C62828" : "#888";
  return `<span style="color:${color};font-size:11px;">${arrow} ${diff > 0 ? "+" : ""}${pct}%</span>`;
}
function box(value, label, bg, t = "") {
  return `<td style="padding:8px 12px;background:${bg};border-radius:6px;text-align:center;"><strong style="font-size:22px;color:#111;">${value}</strong> ${t}<br><span style="font-size:11px;color:#666;">${label}</span></td><td style="width:6px;"></td>`;
}

async function main() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const dateKey = today.toISOString().slice(0, 10);

  const recentCommits = run('git log --since="24 hours ago" --oneline --no-merges');
  const commitCount = recentCommits ? recentCommits.split("\n").filter(Boolean).length : 0;
  const unpushed = run("git log --oneline origin/main..HEAD");
  const unpushedCount = unpushed ? unpushed.split("\n").filter(Boolean).length : 0;
  const tickets = await ticketCounts();
  const analytics = await loadJson(ANALYTICS_PATH);
  const health = await siteHealth();
  const downCount = health.filter((h) => !h.ok).length;

  // history / trends
  let history = (await loadJson(HISTORY_PATH)) || [];
  const last = history.length ? history[history.length - 1] : null;
  const snapshot = {
    date: dateKey,
    pageViews: analytics?.summary?.totalPageViews || 0,
    sessions: analytics?.summary?.totalSessions || 0,
    closedTickets: tickets.closed,
    openTickets: tickets.open,
    commits: commitCount,
  };
  history.push(snapshot);
  if (history.length > 90) history.splice(0, history.length - 90);
  await mkdir(join(ROOT, "src", "data"), { recursive: true });
  await writeFile(HISTORY_PATH, JSON.stringify(history, null, 2));

  const s = [];
  s.push(`<h2 style="margin:0 0 16px;color:#0b1020;">Rankings123 — Daily Digest · ${dateStr}</h2>`);

  // Traffic
  s.push(`<h3 style="margin:16px 0 8px;color:#0b1020;">Traffic</h3>`);
  if (analytics) {
    const pv = analytics.summary?.totalPageViews || 0;
    const sess = analytics.summary?.totalSessions || 0;
    s.push(`<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><tr>`);
    s.push(box(pv, "page views", "#eef7f0", trend(pv, last?.pageViews)));
    s.push(box(sess, "sessions", "#eef0fa", trend(sess, last?.sessions)));
    s.push(`</tr></table>`);
    const top = (analytics.pageViews || []).slice(0, 5);
    if (top.length)
      s.push(`<div style="font-size:12px;color:#666;margin-bottom:12px;"><strong>Top pages:</strong> ${top.map((p) => `${p.page || p.pagePath} (${p.views || p.screenPageViews})`).join(" &middot; ")}</div>`);
  } else {
    s.push(`<p style="color:#999;font-style:italic;font-size:13px;">No analytics yet — add GA4 .ga-credentials.json and run scripts/pull-analytics.mjs.</p>`);
  }

  // Revenue — track progress toward the monthly goal + stream readiness.
  const revenue = analytics?.revenue?.total || 0; // wired once AdSense/affiliate APIs report
  const goalPct = REVENUE_GOAL > 0 ? Math.round((revenue / REVENUE_GOAL) * 100) : 0;
  s.push(`<h3 style="margin:16px 0 8px;color:#0b1020;">Revenue — goal $${REVENUE_GOAL.toLocaleString()}/mo</h3>`);
  s.push(`<table style="width:100%;border-collapse:collapse;margin-bottom:8px;"><tr>`);
  s.push(box(`$${revenue.toLocaleString()}`, "this month", "#eef7f0"));
  s.push(box(`${goalPct}%`, "of goal", "#eef0fa"));
  s.push(box(`$${REVENUE_GOAL.toLocaleString()}`, "monthly goal", "#fceef5"));
  s.push(`</tr></table>`);
  s.push(
    `<div style="font-size:12px;color:#666;margin-bottom:12px;"><strong>Streams:</strong> ` +
      `AdSense — not yet applied · Betting affiliate — not set up · Odds API — not connected. ` +
      `<em>Highest-ROI next step: apply to AdSense + a betting affiliate (sports = high CPA).</em></div>`
  );

  // Site health
  s.push(`<h3 style="margin:16px 0 8px;color:#0b1020;">Site Health</h3>`);
  if (downCount === 0) {
    s.push(`<div style="padding:10px 16px;background:#E8F5E9;border-left:4px solid #2E7D32;border-radius:0 6px 6px 0;margin-bottom:12px;font-size:13px;">All ${health.length} key routes 200 OK on ${SITE}</div>`);
  } else {
    s.push(`<div style="padding:10px 16px;background:#FFEBEE;border-left:4px solid #C62828;border-radius:0 6px 6px 0;margin-bottom:12px;font-size:13px;"><strong>${downCount} route(s) not OK:</strong> ${health.filter((h) => !h.ok).map((h) => `${h.route} (${h.code})`).join(", ")}</div>`);
  }

  // Pipeline
  s.push(`<h3 style="margin:16px 0 8px;color:#0b1020;">Pipeline</h3>`);
  s.push(`<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><tr>`);
  s.push(box(commitCount, "commits (24h)", "#eef7f0"));
  s.push(box(tickets.closed, "tickets closed", "#eef0fa", trend(tickets.closed, last?.closedTickets)));
  s.push(box(tickets.open, "tickets open", "#fceef5", trend(tickets.open, last?.openTickets)));
  s.push(`</tr></table>`);
  if (unpushedCount > 0)
    s.push(`<div style="padding:10px 16px;background:#FFF3E0;border-left:4px solid #E65100;border-radius:0 6px 6px 0;margin-bottom:12px;font-size:13px;"><strong>${unpushedCount} unpushed commit(s)</strong></div>`);

  if (recentCommits) {
    const lines = recentCommits.split("\n").filter(Boolean).slice(0, 10).map((c) => {
      const [h, ...m] = c.split(" ");
      return `<code style="color:#888;">${h}</code> ${escapeHtml(m.join(" "))}`;
    }).join("<br>");
    s.push(`<h3 style="margin:16px 0 8px;color:#0b1020;">Shipped (last 24h)</h3><div style="padding:10px;background:#f7f7f9;border-radius:6px;font-size:12px;line-height:1.8;">${lines}</div>`);
  } else {
    s.push(`<p style="color:#999;font-style:italic;font-size:13px;">No commits in the last 24h.</p>`);
  }

  s.push(`<hr style="border:none;border-top:1px solid #eee;margin:24px 0;"><p style="font-size:11px;color:#999;text-align:center;">rankings123.com · automated daily digest</p>`);

  const html = `<div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#222;line-height:1.6;">${s.join("\n")}</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: TO, subject: `Rankings123 — Daily Digest (${dateStr})`, html }),
  });
  if (res.ok) {
    const data = await res.json();
    console.log(`daily-digest: sent (${data.id})`);
  } else {
    console.error(`daily-digest: failed ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("daily-digest: fatal", e);
  process.exit(1);
});
