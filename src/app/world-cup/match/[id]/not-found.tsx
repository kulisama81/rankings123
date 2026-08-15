import Link from "next/link";

export default function MatchNotFound() {
  return (
    <div data-sport="worldcup" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-fg mb-4">Match Not Found</h1>
        <p className="text-lg text-muted mb-8">
          The World Cup match you&apos;re looking for doesn&apos;t exist or is no longer available.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-muted">
            This could happen if:
          </p>
          <ul className="text-sm text-muted space-y-2 text-left max-w-md mx-auto">
            <li>• The match ID is incorrect or from a previous tournament</li>
            <li>• The match has been removed from our data provider</li>
            <li>• The tournament has concluded and match details are no longer available</li>
          </ul>
        </div>
        <div className="mt-12">
          <Link
            href="/world-cup"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition hover:bg-accent/90"
          >
            ← Back to World Cup
          </Link>
        </div>
      </div>
    </div>
  );
}
