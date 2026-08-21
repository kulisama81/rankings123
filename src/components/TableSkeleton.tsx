/**
 * Loading skeleton for ranking tables
 * Preserves table structure during fetch to prevent layout shift
 * Respects prefers-reduced-motion
 */

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({ rows = 10, columns = 10 }: TableSkeletonProps) {
  return (
    <div className="animate-pulse" role="status" aria-label="Loading rankings">
      {/* Desktop table skeleton */}
      <div className="hidden overflow-hidden rounded-2xl border border-edge bg-surface md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-surface2">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-3 py-2.5">
                  <div className="h-4 w-12 rounded bg-surface2" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-edge">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-3 py-2">
                    <div
                      className="h-4 rounded bg-surface2"
                      style={{
                        width: colIdx === 0 ? '2rem' : colIdx === 3 ? '10rem' : '4rem',
                        animationDelay: `${rowIdx * 30}ms`,
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card skeleton */}
      <div className="space-y-2 md:hidden">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-edge bg-surface p-3"
            style={{ animationDelay: `${idx * 30}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-surface2" />
                <div>
                  <div className="mb-1.5 h-4 w-24 rounded bg-surface2" />
                  <div className="h-3 w-16 rounded bg-surface2" />
                </div>
              </div>
              <div className="h-6 w-16 rounded bg-surface2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
