import { flagEmoji } from "./flags";

// FIFA/ESPN 3-letter codes → ISO 3166-1 alpha-2 for flag emoji. Several World
// Cup codes differ from the IOC/tennis set (e.g. ENG, SCO, POR, KSA), so this
// extends the shared `flags` helper without modifying it. ENG/SCO/WAL/NIR have
// no national-flag emoji code point, so they fall back to a generic flag.
const SOCCER_TO_ISO2: Record<string, string> = {
  ALG: "DZ", CIV: "CI", COD: "CD", CPV: "CV", GHA: "GH", IRN: "IR", IRQ: "IQ",
  JOR: "JO", KSA: "SA", NZL: "NZ", PAN: "PA", POR: "PT", QAT: "QA", RSA: "ZA",
  SEN: "SN", TUN: "TN", USA: "US", UZB: "UZ", CUW: "CW", BEL: "BE", AUT: "AT",
  COL: "CO", ECU: "EC", EGY: "EG", SWE: "SE", URU: "UY",
};

export function soccerFlag(code: string): string {
  const c = code.toUpperCase();
  const iso2 = SOCCER_TO_ISO2[c];
  if (iso2) {
    return String.fromCodePoint(
      ...[...iso2].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65)
    );
  }
  // Fall back to the shared IOC map (covers ARG, BRA, FRA, GER, ESP, NED…).
  return flagEmoji(c);
}
