import type { Metadata } from "next";
import { changelog } from "@/data/changelog";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "What's New",
  description:
    "Recent updates and improvements to Rankings123 — new features, data sources, and site enhancements.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "What's New | Rankings123",
    description:
      "Recent updates and improvements to Rankings123 — new features, data sources, and site enhancements.",
    url: "/changelog",
    type: "website",
  },
};

const areaLabels: Record<string, string> = {
  tennis: "Tennis",
  worldcup: "World Cup",
  cycling: "Cycling",
  site: "Site",
  all: "All",
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <HeroBanner
        icon="📋"
        title="What's New"
        subtitle="Recent updates, features, and improvements to Rankings123."
        live={false}
      />

      <div className="mt-8 space-y-6">
        {changelog.map((entry, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-edge bg-surface p-6 transition hover:border-accent/40"
          >
            <div className="mb-2 flex items-center gap-3">
              <time className="text-sm font-medium text-muted" dateTime={entry.date}>
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="rounded-full bg-surface2 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-muted">
                {areaLabels[entry.area] || entry.area}
              </span>
            </div>
            <h2 className="mb-2 text-xl font-bold text-fg">{entry.title}</h2>
            <p className="text-muted">{entry.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
