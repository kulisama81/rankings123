import { IOC_TO_ISO2 } from "./flags";

// FIFA/ESPN 3-letter codes → ISO 3166-1 alpha-2 for country code mapping.
// Several World Cup codes differ from the IOC/tennis set (e.g. POR, KSA), so this
// extends the shared `flags` helper without modifying it.
const SOCCER_TO_ISO2: Record<string, string> = {
  ALG: "DZ", CIV: "CI", COD: "CD", CPV: "CV", GHA: "GH", IRN: "IR", IRQ: "IQ",
  JOR: "JO", KSA: "SA", NZL: "NZ", PAN: "PA", POR: "PT", QAT: "QA", RSA: "ZA",
  SEN: "SN", TUN: "TN", USA: "US", UZB: "UZ", CUW: "CW", BEL: "BE", AUT: "AT",
  COL: "CO", ECU: "EC", EGY: "EG", SWE: "SE", URU: "UY",
  // Additional FIFA codes → ISO2 mappings
  SCO: "gb-sct", HAI: "ht", ISL: "is", CRC: "cr", NGA: "ng",
  ENG: "gb-eng", CMR: "cm", UGA: "ug",
};

/**
 * Convert FIFA country code to country code for flag rendering with FlagIcon component.
 * Returns the original code if no mapping exists (will show fallback flag).
 */
export function soccerFlag(code: string): string {
  const c = code.toUpperCase();
  // Try soccer-specific mapping first, then IOC mapping
  return SOCCER_TO_ISO2[c] || IOC_TO_ISO2[c] || c;
}

/**
 * Legacy emoji flag function - DEPRECATED.
 * Use <FlagIcon code={soccerFlag(code)} /> component instead.
 *
 * @deprecated Replaced by FlagIcon component
 */
export function soccerFlagEmoji(code: string): string {
  const c = code.toUpperCase();
  const iso2 = SOCCER_TO_ISO2[c] || IOC_TO_ISO2[c];
  if (!iso2) return "🏴";
  return String.fromCodePoint(
    ...[...iso2].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65)
  );
}
