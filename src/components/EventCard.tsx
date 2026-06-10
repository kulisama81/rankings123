import Link from "next/link";
import type { EventSummary } from "@/types";
import FlagName from "./FlagName";

interface EventCardProps {
  summary: EventSummary;
}

function rankLabel(i: number) {
  return ["1st", "2nd", "3rd"][i] ?? `${i + 1}th`;
}

export default function EventCard({ summary }: EventCardProps) {
  const { event, topEntries } = summary;
  return (
    <Link
      href={`/events/${event.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-gray-300"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">{event.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-gray-900">{event.name}</h2>
            {event.status === "upcoming" && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                Upcoming
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{event.location} · {event.year}</p>
        </div>
      </div>
      {topEntries.length > 0 ? (
        <ol className="space-y-1.5">
          {topEntries.map((entry, i) => (
            <li key={entry.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="w-7 text-xs font-medium text-gray-400">{rankLabel(i)}</span>
                <FlagName flag={entry.flag} name={entry.name} />
              </span>
              <span className="font-mono text-xs text-gray-600">{entry.value}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-xs text-gray-400 italic">Results not yet available</p>
      )}
    </Link>
  );
}
