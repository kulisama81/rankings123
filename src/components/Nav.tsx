"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import DesignSwitcher from "./DesignSwitcher";

const tabs = [
  { href: "/atp-live", label: "ATP" },
  { href: "/wta-live", label: "WTA" },
  { href: "/world-cup", label: "World Cup" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-40 border-b border-edge bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold tracking-tight text-fg">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
              style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="hidden sm:inline">RANKINGS</span>
          <span className="sm:hidden">R</span>
          <span className="text-accent">123</span>
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
