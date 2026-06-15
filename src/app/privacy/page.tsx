import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Rankings123 collects and uses data: analytics, cookies, advertising partners, and your choices.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: June 15, 2026</p>

      <div className="legal mt-6 space-y-3 text-sm leading-relaxed">
        <p>
          Rankings123 (&quot;we&quot;, &quot;us&quot;) operates rankings123.com. This policy explains what
          information we collect, how we use it, and the choices you have.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Usage &amp; analytics.</strong> We use Google Analytics 4 to understand how the site is
            used — pages viewed, approximate (city-level) location, device and browser type, and the site
            that referred you. This may use cookies and a pseudonymous identifier. We do not collect your
            name, email, or other contact details unless you choose to send them to us.
          </li>
          <li>
            <strong>Your cookie choice.</strong> We store your consent preference in your browser&apos;s local
            storage so we can respect it.
          </li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use analytics cookies (Google Analytics) and, once advertising is enabled, advertising cookies.
          Analytics is on by default and you can opt out at any time; advertising cookies are only set after
          you accept in the cookie banner. See our <a href="/cookies">Cookie Policy</a> for details.
        </p>

        <h2>Third-party services</h2>
        <ul>
          <li><strong>Google Analytics</strong> — website analytics. See Google&apos;s privacy policy.</li>
          <li>
            <strong>Google AdSense and advertising partners</strong> (when ads are live) — may use cookies to
            serve and measure ads. These are gated on your consent.
          </li>
          <li>
            <strong>Sports data providers</strong> — we display public rankings and results sourced from
            third parties (e.g. ESPN, Ultimate Tennis Statistics, official tour APIs). This is public sports
            data, not your personal data.
          </li>
        </ul>

        <h2>Your choices</h2>
        <ul>
          <li>Use the cookie banner to opt out of analytics or decline advertising cookies.</li>
          <li>Block or delete cookies in your browser settings.</li>
          <li>
            Opt out of Google Analytics across all sites:{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </li>
        </ul>

        <h2>Data sharing &amp; retention</h2>
        <p>
          We do not sell your personal data. Analytics data is processed in aggregate and retained according
          to Google Analytics&apos; default retention settings.
        </p>

        <h2>Children</h2>
        <p>The site is not directed to children under 13, and we do not knowingly collect their data.</p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email <a href="mailto:privacy@rankings123.com">privacy@rankings123.com</a>.
        </p>

        <h2>Changes</h2>
        <p>We may update this policy from time to time; the &quot;last updated&quot; date reflects the latest version.</p>
      </div>
    </div>
  );
}
