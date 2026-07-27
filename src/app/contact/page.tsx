import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rankings123 — report data issues, suggest features, or ask questions about our live multi-sport rankings.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="type-title text-fg">Get in Touch</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Questions, feedback, or spotted a data issue? We&apos;d love to hear from you.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="space-y-8">
        {/* Email */}
        <div className="rounded-2xl bg-surface p-8 text-center shadow-md">
          <h2 className="mb-3 text-xl font-bold text-fg">Email</h2>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            The best way to reach us is by email. We typically respond within 1-2 business days.
          </p>
          <a
            href="mailto:loic.deniel@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accentfg transition-all hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            loic.deniel@gmail.com
          </a>
        </div>

        {/* What to include */}
        <div className="rounded-2xl bg-surface p-8 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-fg">What We Can Help With</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-fg">Data issues</strong> — incorrect rankings, missing players, or
                outdated tournament results
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-fg">Feature requests</strong> — sports or stats you&apos;d like to see
                covered
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-fg">Technical bugs</strong> — pages not loading, broken links, or
                display issues
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-fg">General questions</strong> — how our data works, sourcing
                transparency, or partnership inquiries
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-fg">Privacy concerns</strong> — questions about data collection or
                cookies (also see our <a href="/privacy" className="text-accent underline">Privacy Policy</a>)
              </span>
            </li>
          </ul>
        </div>

        {/* Response Time */}
        <div className="rounded-xl bg-surface2 p-6 text-center">
          <p className="text-sm text-muted">
            <strong className="text-fg">Note:</strong> Rankings123 is maintained by a single developer. While
            we aim to respond quickly, please allow 1-2 business days for a reply during busy periods.
          </p>
        </div>
      </div>
    </div>
  );
}
