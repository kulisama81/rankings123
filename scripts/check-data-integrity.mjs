#!/usr/bin/env node
/**
 * Data-integrity guardrail — fails the build/commit if the codebase tries to put
 * FABRICATED or PLACEHOLDER data in front of users. This is a fast, deterministic
 * tripwire for the classes of mistake we've actually hit:
 *   1. Synthetic data generators in the data layer (Math.random / Math.sin / faker)
 *      used to invent stats, odds, probabilities, etc.
 *   2. Placeholder / "coming soon" / stub monetization text in user-facing UI.
 *
 * It is NOT a substitute for the adversarial verifier (which judges *semantic* veracity —
 * "does this number trace to a real source?"). It's the cheap, always-on backstop that
 * runs in three places: the agent's verify step, the pre-commit hook, and `npm run build`
 * (so Vercel will not deploy a violation). Escape hatch: add `data-integrity-ok: <reason>`
 * in a comment on the offending line for a genuinely legitimate case.
 *
 * Usage: node scripts/check-data-integrity.mjs
 */
import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname } from "path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");
const ALLOW = "data-integrity-ok"; // inline escape hatch

/** Walk a dir, returning all .ts/.tsx files. */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if ([".ts", ".tsx"].includes(extname(p))) out.push(p);
  }
  return out;
}

const rel = (p) => p.slice(ROOT.length + 1);
const inDir = (p, d) => rel(p).startsWith(d);

// --- Rules -----------------------------------------------------------------

// 1) No synthetic-data generators in the data layer (src/lib, src/data).
const FABRICATION = [
  { re: /\bMath\.random\s*\(/, msg: "Math.random() in the data layer — looks like fabricated data" },
  { re: /\bMath\.sin\s*\([^)]*\)\s*\*/, msg: "Math.sin()-based generator — fabricated/synthetic data" },
  { re: /\bfaker\b/, msg: "faker — fabricated data" },
];

// 2) No placeholder / stub text in user-facing UI (src/app, src/components).
//    Curated phrases to avoid false positives (HTML `placeholder=` / Tailwind
//    `placeholder:` are explicitly excluded below).
const PLACEHOLDER = [
  { re: /coming soon/i, msg: '"coming soon" placeholder text' },
  { re: /lorem ipsum/i, msg: "lorem ipsum filler" },
  { re: /your ad here/i, msg: '"your ad here" ad placeholder' },
  { re: /future:\s*betting/i, msg: '"Future: betting…" placeholder' },
  { re: />\s*placeholder\s*</i, msg: '"Placeholder" shown as UI text' },
  { re: /todo:\s*replace with real/i, msg: "stub left in user-facing code" },
];

// 3) No fabricated mock event data (regression guard for purge-mock-events).
//    These exports/datasets were removed because they contained fabricated cross-sport
//    data (e.g. tennis player Carlos Alcaraz listed as a cyclist).
const MOCK_EVENTS_BANNED = [
  { re: /export\s+(const|function)\s+getRankings/, msg: "getRankings export — fabricated event data removed in purge-mock-events" },
  { re: /export\s+const\s+allEvents/, msg: "allEvents export — fabricated event data removed in purge-mock-events" },
  { re: /const\s+paris2024\s*:/, msg: "paris2024 Olympics mock data — fabricated, removed in purge-mock-events" },
  { re: /const\s+rwc2023\s*:/, msg: "rwc2023 rugby mock data — fabricated, removed in purge-mock-events" },
  { re: /const\s+(tdf|giro|vuelta|parisNice|stradeBianche|tirrenoAdriatico|parisRoubaix|milanSanRemo|tourOfFlanders|liegeBastogneLiege|ilLombardia)\d{4}\s*:/, msg: "cycling event mock data — fabricated, removed in purge-mock-events" },
];

const violations = [];

for (const file of walk(SRC)) {
  const isData = inDir(file, "src/lib") || inDir(file, "src/data");
  const isUi = inDir(file, "src/app") || inDir(file, "src/components");
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes(ALLOW)) return; // explicit, reviewed exception
    if (isData) {
      for (const r of FABRICATION) if (r.re.test(line)) violations.push({ file: rel(file), n: i + 1, msg: r.msg });
      // Check for banned mock event exports
      for (const r of MOCK_EVENTS_BANNED) if (r.re.test(line)) violations.push({ file: rel(file), n: i + 1, msg: r.msg });
    }
    if (isUi) {
      // Skip the HTML attribute and the Tailwind class form of "placeholder".
      const cleaned = line.replace(/placeholder=/gi, "").replace(/placeholder:/gi, "");
      for (const r of PLACEHOLDER) if (r.re.test(cleaned)) violations.push({ file: rel(file), n: i + 1, msg: r.msg });
    }
  });
}

if (violations.length) {
  console.error("✗ data-integrity: fabricated/placeholder data detected — never ship this to users:\n");
  for (const v of violations) console.error(`  ${v.file}:${v.n}  ${v.msg}`);
  console.error(
    `\nFix: use a real source (with a mock fallback + 'source' flag), hide the feature until real ` +
      `data exists, or — if genuinely legitimate — add a '${ALLOW}: <reason>' comment on the line.`
  );
  process.exit(1);
}

console.log("✓ data-integrity: no fabricated or placeholder data in user-facing surfaces.");
