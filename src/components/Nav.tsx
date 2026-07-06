"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import DesignSwitcher from "./DesignSwitcher";
import Logo from "./Logo";

const tabs = [
  { href: "/atp-live", label: "ATP" },
  { href: "/wta-live", label: "WTA" },
  { href: "/world-cup", label: "World Cup" },
  { href: "/cycling", label: "Cycling" },
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
                className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition ${
                  active
                    ? "bg-accent text-accentfg"
                    : "text-muted hover:bg-surface2 hover:text-fg"
                }`}
              >
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
