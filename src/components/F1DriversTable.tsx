import type { F1DriverStanding } from "@/types";

interface F1DriversTableProps {
  drivers: F1DriverStanding[];
}

export default function F1DriversTable({ drivers }: F1DriversTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-surface-secondary">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary">
              Driver
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary">
              Team
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-primary">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-edge">
          {drivers.map((driver) => (
            <tr
              key={driver.rank}
              className="transition-colors hover:bg-surface-hover"
            >
              <td className="px-4 py-3 text-sm font-medium text-primary">
                {driver.rank}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">
                    {driver.driver}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-secondary">
                {driver.team}
              </td>
              <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                {driver.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
