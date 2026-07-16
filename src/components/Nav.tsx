"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import DesignSwitcher from "./DesignSwitcher";
import Logo from "./Logo";
import SportIcon from "./SportIcon";

const tabs = [
  { href: "/atp-live", label: "ATP", sport: "atp", icon: "tennis" as const },
  { href: "/wta-live", label: "WTA", sport: "wta", icon: "tennis" as const },
  { href: "/world-cup", label: "World Cup", sport: "worldcup", icon: "football" as const },
  { href: "/cycling", label: "Cycling", sport: "cycling", icon: "cycling" as const },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-40 border-b border-edge bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          {/* Full wordmark on desktop, compact on mobile */}
          <Logo variant="full" className="hidden h-8 w-auto sm:block" />
          <Logo variant="compact" className="h-8 w-auto sm:hidden" />
        </Link>
        <div className="flex flex-1 items-center gap-1 overflow-x-auto text-sm">
          {tabs.map((t) => {
            const active = pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                data-nav-sport={t.sport}
                className={`btn-base whitespace-nowrap rounded-full flex items-center gap-1.5 ${
                  active ? "btn-nav-active" : "btn-nav-inactive"
                }`}
              >
                <SportIcon type={t.icon} size={16} className="opacity-80" />
                {t.label}
              </Link>
            );
          })}
        </div>
        <DesignSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
