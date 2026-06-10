import type { TennisPlayer } from "@/types";
import FlagName from "./FlagName";

interface TennisTableProps {
  rankings: TennisPlayer[];
}

function Movement({ value }: { value: number }) {
  if (value > 0) return <span className="text-green-600 font-medium">▲{value}</span>;
  if (value < 0) return <span className="text-red-500 font-medium">▼{Math.abs(value)}</span>;
  return <span className="text-gray-400">—</span>;
}

export default function TennisTable({ rankings }: TennisTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">Player</th>
            <th className="px-4 py-3 text-left">Nationality</th>
            <th className="px-4 py-3 text-center">Age</th>
            <th className="px-4 py-3 text-right">Points</th>
            <th className="px-4 py-3 text-center">Move</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rankings.map((player) => (
            <tr key={player.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">{player.rank}</td>
              <td className="px-4 py-3">
                <FlagName flag={player.flag} name={player.name} />
              </td>
              <td className="px-4 py-3 text-gray-500">{player.nationality}</td>
              <td className="px-4 py-3 text-center text-gray-600">{player.age}</td>
              <td className="px-4 py-3 text-right font-mono font-semibold text-gray-900">
                {player.points.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-xs">
                <Movement value={player.movement} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
