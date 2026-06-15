interface Stat {
  label: string;
  value: string;
}

interface HeroBannerProps {
  icon: string;
  title: string;
  subtitle?: string;
  live?: boolean;
  stats?: Stat[];
}

export default function HeroBanner({ icon, title, subtitle, live = true, stats }: HeroBannerProps) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl border border-edge bg-surface">
      {/* accent depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex items-center gap-3.5">
          <span className="text-4xl drop-shadow-sm sm:text-5xl" aria-hidden="true">{icon}</span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-display text-3xl font-extrabold leading-none text-fg sm:text-[2.6rem]">
                {title}
              </h1>
              {live && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accentfg">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-accentfg opacity-60"
                      style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accentfg" />
                  </span>
                  Live
                </span>
              )}
            </div>
            {subtitle && <p className="mt-2 truncate text-sm text-muted">{subtitle}</p>}
          </div>
        </div>

        {stats && stats.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-edge/60 pt-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-lg font-bold tabular-nums text-fg sm:text-xl">{s.value}</div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
