import type { F1ConstructorStanding } from "@/types";

interface F1ConstructorsTableProps {
  constructors: F1ConstructorStanding[];
}

export default function F1ConstructorsTable({ constructors }: F1ConstructorsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-surface-secondary">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary">
              Constructor
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-primary">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-edge">
          {constructors.map((constructor) => (
            <tr
              key={constructor.rank}
              className="transition-colors hover:bg-surface-hover"
            >
              <td className="px-4 py-3 text-sm font-medium text-primary">
                {constructor.rank}
              </td>
              <td className="px-4 py-3">
                <span className="text-sm font-medium text-primary">
                  {constructor.constructor}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                {constructor.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
