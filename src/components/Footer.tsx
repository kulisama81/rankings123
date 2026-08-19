import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const tennisLinks = [
    { href: "/atp-live", label: "ATP Live Rankings" },
    { href: "/wta-live", label: "WTA Live Rankings" },
    { href: "/atp-race", label: "ATP Race to Turin" },
    { href: "/wta-race", label: "WTA Race to Finals" },
    { href: "/atp-doubles", label: "ATP Doubles" },
    { href: "/wta-doubles", label: "WTA Doubles" },
  ];

  const eventsLinks = [
    { href: "/world-cup", label: "FIFA World Cup 2026" },
    { href: "/cycling", label: "Cycling" },
    { href: "/cycling/tour-de-france-2026", label: "Tour de France 2026" },
    { href: "/us-open-2026", label: "US Open 2026" },
  ];

  const aboutLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/changelog", label: "What's New" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  return (
    <footer className="mt-12 border-t border-edge bg-surface">
      {/* Sitemap */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Tennis Section */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fg">
              Tennis
            </h3>
            <ul className="space-y-2">
              {tennisLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events Section */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fg">
              Events
            </h3>
            <ul className="space-y-2">
              {eventsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fg">
              About
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fg">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-edge">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-sm text-muted sm:px-6 lg:px-8">
          <p>© {year} Rankings123 · Live sports rankings</p>
        </div>
      </div>
    </footer>
  );
}
