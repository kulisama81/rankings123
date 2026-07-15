import type { UciRider } from "@/types";

interface UciRankingTableProps {
  riders: UciRider[];
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  // Convert IOC code to regional indicator symbols (flag emoji)
  // For codes like "SLO", we need the ISO 3166-1 alpha-2 code
  const codeMap: Record<string, string> = {
    SLO: "SI",
    GBR: "GB",
    DEN: "DK",
    SUI: "CH",
    GER: "DE",
    NED: "NL",
    BEL: "BE",
    FRA: "FR",
    ESP: "ES",
    ITA: "IT",
    USA: "US",
    AUS: "AU",
    COL: "CO",
    AUT: "AT",
    IRL: "IE",
    NZL: "NZ",
    POL: "PL",
    POR: "PT",
    NOR: "NO",
    SWE: "SE",
    CAN: "CA",
  };

  const alpha2 = codeMap[countryCode] || countryCode;
  if (alpha2.length !== 2) return "🏁"; // fallback flag

  // Convert to regional indicator symbols
  const codePoints = alpha2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function UciRankingTable({ riders }: UciRankingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-edge bg-surface text-left text-sm uppercase tracking-wider text-secondary">
            <th className="px-3 py-3 text-center font-semibold">Rank</th>
            <th className="px-3 py-3 font-semibold">Rider</th>
            <th className="px-3 py-3 font-semibold">Team</th>
            <th className="px-3 py-3 text-right font-semibold">Points</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, idx) => (
            <tr
              key={`${rider.rank}-${rider.name}`}
              className={`border-b border-edge transition-colors hover:bg-surface ${
                idx % 2 === 0 ? "bg-base" : "bg-surface"
              }`}
            >
              {/* Rank */}
              <td className="px-3 py-4 text-center">
                <span className="text-lg font-bold text-primary">{rider.rank}</span>
              </td>

              {/* Rider name + flag */}
              <td className="px-3 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-label={rider.country}>
                    {getFlagEmoji(rider.countryCode)}
                  </span>
                  <span className="font-semibold text-primary">{rider.name}</span>
                </div>
              </td>

              {/* Team */}
              <td className="px-3 py-4">
                <span className="text-sm text-secondary">{rider.team}</span>
              </td>

              {/* Points */}
              <td className="px-3 py-4 text-right">
                <span className="text-lg font-bold text-accent">{rider.points.toLocaleString()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
