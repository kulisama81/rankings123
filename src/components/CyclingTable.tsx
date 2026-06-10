import type { CyclingRider } from "@/types";
import FlagName from "./FlagName";

interface CyclingTableProps {
  rankings: CyclingRider[];
}

export default function CyclingTable({ rankings }: CyclingTableProps) {
  if (rankings.length === 0) {
    return <p className="rounded-xl border border-gray-200 px-6 py-10 text-center text-sm text-gray-400 italic">Results not yet available — check back after the race.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">Rider</th>
            <th className="px-4 py-3 text-left">Team</th>
            <th className="px-4 py-3 text-right">Time / Gap</th>
            <th className="px-4 py-3 text-right">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rankings.map((rider) => (
            <tr key={rider.rank} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">{rider.rank}</td>
              <td className="px-4 py-3">
                <FlagName flag={rider.flag} name={rider.name} />
              </td>
              <td className="px-4 py-3 text-gray-500">{rider.team}</td>
              <td className="px-4 py-3 text-right font-mono text-gray-900">{rider.time}</td>
              <td className="px-4 py-3 text-right text-gray-600">{rider.points ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
