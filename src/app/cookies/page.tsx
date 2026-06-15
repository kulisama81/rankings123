import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies Rankings123 uses for analytics and advertising, and how to control them.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">Cookie Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: June 15, 2026</p>

      <div className="legal mt-6 space-y-3 text-sm leading-relaxed">
        <p>
          Cookies are small files stored on your device. We use them to measure how the site is used and,
          once enabled, to support advertising.
        </p>

        <h2>Cookies we use</h2>
        <ul>
          <li>
            <strong>Analytics (Google Analytics 4).</strong> Measure page views, sessions, device type and
            approximate location to improve the site. On by default; you can opt out via the cookie banner.
          </li>
          <li>
            <strong>Consent preference.</strong> A small entry in your browser&apos;s local storage that
            records your cookie choice so we can honour it.
          </li>
          <li>
            <strong>Advertising (when enabled).</strong> Google AdSense and partners may set cookies to serve
            and measure ads. These load only after you accept in the cookie banner.
          </li>
        </ul>

        <h2>Managing cookies</h2>
        <ul>
          <li>Use the cookie banner on the site to accept or decline.</li>
          <li>Adjust or clear cookies in your browser settings at any time.</li>
          <li>
            Opt out of Google Analytics:{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </li>
        </ul>

        <p>
          For more on how we handle data, see our <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
