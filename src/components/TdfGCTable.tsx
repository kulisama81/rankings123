"use client";

import type { TdfGCRider } from "@/types";
import FlagIcon from "./FlagIcon";

interface TdfGCTableProps {
  riders: TdfGCRider[];
}

export default function TdfGCTable({ riders }: TdfGCTableProps) {
  if (riders.length === 0) {
    return (
      <div className="animate-entrance-table rounded-2xl border border-edge bg-surface p-8 text-center text-secondary">
        <p className="text-lg">General Classification will be available once the race begins.</p>
        <p className="mt-2 text-sm text-muted">The race starts on July 4, 2026 in Barcelona.</p>
      </div>
    );
  }

  return (
    <div className="animate-entrance-table overflow-hidden rounded-2xl border border-edge bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-edge bg-surface2 text-sm uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2.5 text-center">Rank</th>
              <th className="px-3 py-2.5 text-left">Rider</th>
              <th className="px-3 py-2.5 text-left">Team</th>
              <th className="px-3 py-2.5 text-center">Country</th>
              <th className="px-3 py-2.5 text-right">Time</th>
              <th className="px-3 py-2.5 text-right">Gap</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, idx) => {
              const isLeader = rider.rank === 1;
              // Entrance stagger: first 20 rows
              const entranceStagger = idx < 20 ? `table-row-stagger table-row-stagger-${idx + 1}` : "table-row-stagger";

              return (
                <tr
                  key={`${rider.rank}-${rider.name}`}
                  className={`table-row-premium last:border-b-0 ${
                    isLeader ? "bg-warning/5" : ""
                  } ${entranceStagger}`}
                >
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`rank-hover-scale inline-flex items-center justify-center rounded-md ${
                        rider.rank === 1
                          ? "rank-scale-1 bg-warning/20 min-w-[48px] h-12"
                          : rider.rank <= 3
                            ? "rank-scale-2-3 bg-surface2 text-primary min-w-[42px] h-11"
                            : rider.rank <= 10
                              ? "rank-scale-4-10 text-secondary min-w-[38px] h-10"
                              : rider.rank <= 50
                                ? "rank-scale-11-50 text-secondary min-w-[34px] h-9"
                                : "rank-scale-default text-secondary min-w-[30px] h-8"
                      }`}
                    >
                      {rider.rank}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold text-primary">{rider.name}</td>
                  <td className="px-3 py-3 text-fg">{rider.team}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="mr-1.5" role="img" aria-label={rider.country}>
                      <FlagIcon code={rider.flag} size="md" />
                    </span>
                    <span className="text-muted">{rider.countryCode}</span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-fg">{rider.time}</td>
                  <td className="px-3 py-3 text-right font-mono text-secondary">
                    {rider.gap || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
