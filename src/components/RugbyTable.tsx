import type { RugbyTeam } from "@/types";
import FlagName from "./FlagName";

interface RugbyTableProps {
  rankings: RugbyTeam[];
}

export default function RugbyTable({ rankings }: RugbyTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">Team</th>
            <th className="px-4 py-3 text-center">P</th>
            <th className="px-4 py-3 text-center">W</th>
            <th className="px-4 py-3 text-center">D</th>
            <th className="px-4 py-3 text-center">L</th>
            <th className="px-4 py-3 text-center">PF</th>
            <th className="px-4 py-3 text-center">PA</th>
            <th className="px-4 py-3 text-center">BP</th>
            <th className="px-4 py-3 text-center font-bold">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rankings.map((team) => (
            <tr key={team.rank} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">{team.rank}</td>
              <td className="px-4 py-3">
                <FlagName flag={team.flag} name={team.name} />
              </td>
              <td className="px-4 py-3 text-center text-gray-600">{team.played}</td>
              <td className="px-4 py-3 text-center text-green-700 font-medium">{team.won}</td>
              <td className="px-4 py-3 text-center text-gray-500">{team.drawn}</td>
              <td className="px-4 py-3 text-center text-red-600">{team.lost}</td>
              <td className="px-4 py-3 text-center text-gray-600">{team.pointsFor}</td>
              <td className="px-4 py-3 text-center text-gray-600">{team.pointsAgainst}</td>
              <td className="px-4 py-3 text-center text-gray-500">{team.bonusPoints}</td>
              <td className="px-4 py-3 text-center font-bold text-gray-900">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
