import Link from "next/link";
import { allEvents } from "@/data";
import EventCard from "@/components/EventCard";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Sports Rankings</h1>
      <p className="mb-6 text-gray-500">Olympic Games, Grand Tours, Rugby World Cup, Tennis</p>
      <Link
        href="/atp-live"
        className="mb-8 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-5 transition hover:border-green-300 hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🎾</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-900">ATP Live Ranking</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                LIVE
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Real-time ranking points, movement and tournament progress — updated as matches finish
            </p>
          </div>
        </div>
        <span className="text-sm font-medium text-green-700">View →</span>
      </Link>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allEvents.map((summary) => (
          <EventCard key={summary.event.id} summary={summary} />
        ))}
      </div>
    </div>
  );
}
