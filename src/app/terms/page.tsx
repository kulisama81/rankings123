import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of Rankings123.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted">Last updated: June 15, 2026</p>

      <div className="legal mt-6 space-y-3 text-sm leading-relaxed">
        <p>By using rankings123.com you agree to these terms. If you do not agree, please do not use the site.</p>

        <h2>The service</h2>
        <p>
          Rankings123 provides live sports rankings, standings and related statistics for informational and
          entertainment purposes.
        </p>

        <h2>Accuracy of data</h2>
        <p>
          Rankings and results are aggregated from third-party sources and may be delayed, incomplete, or
          inaccurate. &quot;Live&quot; rankings are projections and are not official. We provide the data
          &quot;as is&quot;, without warranties of any kind, and are not liable for decisions made based on it.
          Do not rely on this site for betting or financial decisions.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>Don&apos;t scrape, overload, or attempt to disrupt the service.</li>
          <li>Don&apos;t use the site for unlawful purposes.</li>
        </ul>

        <h2>Third-party links &amp; ads</h2>
        <p>
          The site may link to or display third-party content and advertisements. We are not responsible for
          third-party sites or their content. Any betting or gambling promotions are subject to the operator&apos;s
          terms and applicable age and regional restrictions.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Team, player, league and tournament names and marks belong to their respective owners. We are not
          affiliated with or endorsed by any tour, league, or governing body.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms; continued use after changes means you accept them.</p>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href="mailto:hello@rankings123.com">hello@rankings123.com</a>.
        </p>
      </div>
    </div>
  );
}
