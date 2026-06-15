#!/usr/bin/env node

/**
 * Readability guard for the build loop.
 * Flags theme-unaware Tailwind color utilities (hardcoded grayscale / white / black)
 * in app + component files. These break in dark or light mode (e.g. text-gray-900 on a
 * dark canvas = invisible). Use the design tokens instead: text-fg / text-muted /
 * bg-bg / bg-surface / bg-surface2 / border-edge / text-accent / text-up / text-down.
 *
 * Exit 1 if any offenders are found outside the legacy allowlist.
 * Usage: node scripts/check-readability.mjs
 */

import { readFile, readdir } from "fs/promises";
import { join, relative } from "path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

// Legacy surfaces not yet migrated to the token system (tracked by a ticket).
// Remove entries as they get migrated.
const LEGACY = [
  "components/OlympicsTable.tsx",
  "components/CyclingTable.tsx",
  "components/RugbyTable.tsx",
  "components/TennisTable.tsx",
  "components/MedalBadge.tsx",
  "app/events/",
];

// Theme-unaware utilities that cause dark/light readability failures.
const BAD = /\b(?:text|bg|border|divide|ring|placeholder|from|to|via)-(?:gray|zinc|slate|neutral|stone)-(?:50|100|200|300|400|500|600|700|800|900|950)\b|\b(?:text|bg)-(?:white|black)\b/g;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

function isLegacy(rel) {
  return LEGACY.some((l) => rel.includes(l));
}

const files = await walk(SRC);
const offenders = [];

for (const file of files) {
  const rel = relative(SRC, file);
  if (isLegacy(rel)) continue;
  const lines = (await readFile(file, "utf-8")).split("\n");
  lines.forEach((line, i) => {
    const matches = line.match(BAD);
    if (matches) offenders.push({ rel, line: i + 1, hits: [...new Set(matches)].join(", ") });
  });
}

if (offenders.length === 0) {
  console.log("✓ readability: no theme-unaware colors in active surfaces.");
  process.exit(0);
}

console.error(`✗ readability: ${offenders.length} theme-unaware color use(s) — these break in dark/light mode.`);
console.error("  Use design tokens: text-fg / text-muted / bg-surface / border-edge / text-accent / text-up / text-down.\n");
for (const o of offenders) console.error(`  src/${o.rel}:${o.line}  →  ${o.hits}`);
process.exit(1);
