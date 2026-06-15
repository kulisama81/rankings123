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
      className="block rounded-2xl border border-edge bg-surface p-5 transition hover:border-accent/50 hover:bg-surface2"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">{event.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-fg">{event.name}</h2>
            {event.status === "upcoming" && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                Upcoming
              </span>
            )}
          </div>
          <p className="text-xs text-muted">{event.location} · {event.year}</p>
        </div>
      </div>
      {topEntries.length > 0 ? (
        <ol className="space-y-1.5">
          {topEntries.map((entry, i) => (
            <li key={entry.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-fg">
                <span className="w-7 text-xs font-medium text-muted">{rankLabel(i)}</span>
                <FlagName flag={entry.flag} name={entry.name} />
              </span>
              <span className="font-mono text-xs tabular-nums text-muted">{entry.value}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-xs italic text-muted/60">Results not yet available</p>
      )}
    </Link>
  );
}
