import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRankings } from "@/data";
import type { OlympicsRankings, CyclingRankings, RugbyRankings, TennisRankings } from "@/types";
import OlympicsTable from "@/components/OlympicsTable";
import CyclingTable from "@/components/CyclingTable";
import RugbyTable from "@/components/RugbyTable";
import TennisTable from "@/components/TennisTable";

interface EventPageProps {
  params: Promise<{ eventId: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { eventId } = await params;
  const data = getRankings(eventId);
  if (!data) return { title: "Event Rankings" };
  const { event } = data;
  const title = `${event.name} Results & Rankings`;
  const description = `${event.name} — final results, standings and rankings. ${event.location}, ${event.startDate}.`;
  return {
    title,
    description,
    alternates: { canonical: `/events/${eventId}` },
    openGraph: {
      title: `${title} | Rankings123`,
      description,
      url: `/events/${eventId}`,
      type: "website",
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { eventId } = await params;
  const data = getRankings(eventId);
  if (!data) notFound();

  const { event } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">{event.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
          <p className="text-sm text-gray-500">
            {event.location} · {event.startDate} – {event.endDate}
          </p>
        </div>
      </div>

      {event.sport === "olympics" && (
        <OlympicsTable rankings={(data as OlympicsRankings).rankings} />
      )}
      {event.sport === "cycling" && (
        <CyclingTable rankings={(data as CyclingRankings).rankings} />
      )}
      {event.sport === "rugby" && (
        <RugbyTable rankings={(data as RugbyRankings).rankings} />
      )}
      {event.sport === "tennis" && (
        <TennisTable rankings={(data as TennisRankings).rankings} />
      )}
    </div>
  );
}
