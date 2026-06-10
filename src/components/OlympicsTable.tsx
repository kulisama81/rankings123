"use client";

import { useState, Fragment } from "react";
import type { OlympicCountry } from "@/types";
import FlagName from "./FlagName";
import MedalBadge from "./MedalBadge";

interface OlympicsTableProps {
  rankings: OlympicCountry[];
}

export default function OlympicsTable({ rankings }: OlympicsTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggle(code: string) {
    setExpanded((prev) => (prev === code ? null : code));
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">Country</th>
            <th className="px-4 py-3 text-center">🥇</th>
            <th className="px-4 py-3 text-center">🥈</th>
            <th className="px-4 py-3 text-center">🥉</th>
            <th className="px-4 py-3 text-center">Total</th>
            <th className="px-4 py-3 text-center">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rankings.map((country) => (
            <Fragment key={country.code}>
              <tr
                key={country.code}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => toggle(country.code)}
              >
                <td className="px-4 py-3 font-medium text-gray-700">{country.rank}</td>
                <td className="px-4 py-3">
                  <FlagName flag={country.flag} name={country.name} />
                </td>
                <td className="px-4 py-3 text-center font-semibold text-yellow-600">{country.gold}</td>
                <td className="px-4 py-3 text-center font-semibold text-gray-500">{country.silver}</td>
                <td className="px-4 py-3 text-center font-semibold text-orange-600">{country.bronze}</td>
                <td className="px-4 py-3 text-center font-bold text-gray-900">{country.total}</td>
                <td className="px-4 py-3 text-center text-gray-400">
                  {expanded === country.code ? "▲" : "▼"}
                </td>
              </tr>
              {expanded === country.code && (
                <tr key={`${country.code}-details`} className="bg-gray-50">
                  <td colSpan={7} className="px-6 py-4">
                    <div className="space-y-3">
                      {country.disciplines.map((disc) => (
                        <div key={disc.name}>
                          <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
                            {disc.name} — {disc.gold}G {disc.silver}S {disc.bronze}B
                          </p>
                          <ul className="space-y-1 pl-2">
                            {disc.events.map((ev) => (
                              <li key={ev.name} className="flex items-center gap-2 text-xs text-gray-700">
                                <MedalBadge medal={ev.medal} />
                                <span>{ev.name}</span>
                                <span className="text-gray-400">· {ev.athlete}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
