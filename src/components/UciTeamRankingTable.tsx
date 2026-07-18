import type { UciTeam } from "@/types";

interface UciTeamRankingTableProps {
  teams: UciTeam[];
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  // Convert IOC code to regional indicator symbols (flag emoji)
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
    UAE: "AE",
    BHR: "BH",
    KAZ: "KZ",
    ISR: "IL",
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

export default function UciTeamRankingTable({ teams }: UciTeamRankingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-edge bg-surface text-left text-sm uppercase tracking-wider text-secondary">
            <th className="px-3 py-3 text-center font-semibold">Rank</th>
            <th className="px-3 py-3 font-semibold">Team</th>
            <th className="px-3 py-3 font-semibold">Country</th>
            <th className="px-3 py-3 text-right font-semibold">Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr
              key={`${team.rank}-${team.name}`}
              className={`border-b border-edge transition-colors hover:bg-surface ${
                idx % 2 === 0 ? "bg-base" : "bg-surface"
              }`}
            >
              {/* Rank */}
              <td className="px-3 py-4 text-center">
                <span className="text-lg font-bold text-primary">{team.rank}</span>
              </td>

              {/* Team name */}
              <td className="px-3 py-4">
                <span className="font-semibold text-primary">{team.name}</span>
              </td>

              {/* Country + flag */}
              <td className="px-3 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-label={team.country}>
                    {getFlagEmoji(team.countryCode)}
                  </span>
                  <span className="text-sm text-secondary">{team.country}</span>
                </div>
              </td>

              {/* Points */}
              <td className="px-3 py-4 text-right">
                <span className="text-lg font-bold text-accent">{team.points.toLocaleString()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
