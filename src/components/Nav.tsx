import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 hover:text-gray-600">
            Rankings123
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Events</Link>
            <Link href="/atp-live" className="inline-flex items-center gap-1.5 font-medium text-gray-900 hover:text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              ATP Live
            </Link>
            <Link href="/atp-rankings" className="font-medium text-gray-900 hover:text-green-700">
              Top 1000
            </Link>
            <Link href="/wta-live" className="inline-flex items-center gap-1.5 font-medium text-gray-900 hover:text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              WTA Live
            </Link>
            <Link href="/world-cup" className="inline-flex items-center gap-1.5 font-medium text-gray-900 hover:text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              World Cup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
