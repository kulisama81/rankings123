// IOC / ESPN-style 3-letter country codes → ISO 3166-1 alpha-2,
// for rendering flag emoji. Covers nationalities seen on the ATP tour.
const IOC_TO_ISO2: Record<string, string> = {
  ARG: "AR", AUS: "AU", AUT: "AT", BEL: "BE", BIH: "BA", BLR: "BY", BOL: "BO",
  BRA: "BR", BUL: "BG", CAN: "CA", CHI: "CL", CHN: "CN", COL: "CO", CRO: "HR",
  CYP: "CY", CZE: "CZ", DEN: "DK", DOM: "DO", ECU: "EC", EGY: "EG", ESP: "ES",
  EST: "EE", FIN: "FI", FRA: "FR", GBR: "GB", GEO: "GE", GER: "DE", GRE: "GR",
  HKG: "HK", HUN: "HU", IND: "IN", IRL: "IE", ISR: "IL", ITA: "IT", JPN: "JP",
  KAZ: "KZ", KOR: "KR", LAT: "LV", LIB: "LB", LTU: "LT", LUX: "LU", MAR: "MA",
  MDA: "MD", MEX: "MX", MON: "MC", NED: "NL", NOR: "NO", NZL: "NZ", PAR: "PY",
  PER: "PE", PHI: "PH", POL: "PL", POR: "PT", ROU: "RO", RSA: "ZA", RUS: "RU",
  SER: "RS", SRB: "RS", SLO: "SI", SUI: "CH", SVK: "SK", SWE: "SE", THA: "TH",
  TPE: "TW", TUN: "TN", TUR: "TR", UKR: "UA", URU: "UY", USA: "US", UZB: "UZ",
  VEN: "VE", ZIM: "ZW",
};

export function flagEmoji(countryCode: string): string {
  const iso2 = IOC_TO_ISO2[countryCode.toUpperCase()];
  if (!iso2) return "🏳️";
  return String.fromCodePoint(
    ...[...iso2].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
