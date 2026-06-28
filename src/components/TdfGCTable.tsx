"use client";

import type { TdfGCRider } from "@/types";

interface TdfGCTableProps {
  riders: TdfGCRider[];
}

export default function TdfGCTable({ riders }: TdfGCTableProps) {
  if (riders.length === 0) {
    return (
      <div className="rounded-2xl border border-edge bg-surface p-8 text-center text-secondary">
        <p className="text-lg">General Classification will be available once the race begins.</p>
        <p className="mt-2 text-sm text-muted">The race starts on July 4, 2026 in Barcelona.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-edge bg-surface2 text-[11px] uppercase tracking-wide text-muted">
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

              return (
                <tr
                  key={`${rider.rank}-${rider.name}`}
                  className={`border-b border-edge last:border-0 hover:bg-surface2 ${
                    isLeader ? "bg-warning/5" : ""
                  }`}
                >
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-bold ${
                        isLeader
                          ? "bg-warning text-base"
                          : idx < 3
                            ? "bg-surface2 text-primary"
                            : "text-secondary"
                      }`}
                    >
                      {rider.rank}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold text-primary">{rider.name}</td>
                  <td className="px-3 py-3 text-fg">{rider.team}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="mr-1.5 text-lg" role="img" aria-label={rider.country}>
                      {rider.flag}
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
