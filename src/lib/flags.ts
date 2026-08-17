// IOC / ESPN-style 3-letter country codes → ISO 3166-1 alpha-2.
// Used for SVG flag rendering via FlagIcon component.
// Covers nationalities seen across ATP/WTA tennis, FIFA football, and UCI cycling.
export const IOC_TO_ISO2: Record<string, string> = {
  ARG: "AR", AUS: "AU", AUT: "AT", BEL: "BE", BIH: "BA", BLR: "BY", BOL: "BO",
  BRA: "BR", BUL: "BG", CAN: "CA", CHI: "CL", CHN: "CN", COL: "CO", CRO: "HR",
  CYP: "CY", CZE: "CZ", DEN: "DK", DOM: "DO", ECU: "EC", EGY: "EG", ESP: "ES",
  EST: "EE", FIN: "FI", FRA: "FR", GBR: "GB", GEO: "GE", GER: "DE", GRE: "GR",
  HKG: "HK", HUN: "HU", IND: "IN", IRL: "IE", ISR: "IL", ITA: "IT", JPN: "JP",
  KAZ: "KZ", KOR: "KR", LAT: "LV", LIB: "LB", LTU: "LT", LUX: "LU", MAR: "MA",
  MDA: "MD", MEX: "MX", MON: "MC", NED: "NL", NOR: "NO", NZL: "NZ", PAR: "PY",
  PER: "PE", PHI: "PH", POL: "PL", POR: "PT", ROM: "RO", ROU: "RO", RSA: "ZA", RUS: "RU",
  SER: "RS", SRB: "RS", SLO: "SI", SUI: "CH", SVK: "SK", SWE: "SE", THA: "TH",
  TPE: "TW", TUN: "TN", TUR: "TR", UKR: "UA", URU: "UY", USA: "US", UZB: "UZ",
  VEN: "VE", ZIM: "ZW",
};

/**
 * Convert IOC 3-letter country code to ISO 3166-1 alpha-2 code for flag rendering.
 * Returns the 3-letter code unchanged if no mapping exists (will show fallback flag).
 *
 * @deprecated Use IOC_TO_ISO2 directly and render with <FlagIcon code={...} />
 */
export function getCountryCode(countryCode: string): string {
  return IOC_TO_ISO2[countryCode.toUpperCase()] || countryCode;
}

/**
 * Legacy emoji flag function - DEPRECATED.
 * Use <FlagIcon code={countryCode} /> component instead for premium SVG flags.
 *
 * @deprecated Replaced by FlagIcon component
 */
export function flagEmoji(countryCode: string): string {
  const iso2 = IOC_TO_ISO2[countryCode.toUpperCase()];
  if (!iso2) return "🏳️";
  return String.fromCodePoint(
    ...[...iso2].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
