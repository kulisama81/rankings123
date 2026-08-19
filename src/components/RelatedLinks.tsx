import Link from "next/link";

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

export default function RelatedLinks({ title = "Related Pages", links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-edge bg-surface p-6">
      <h2 className="mb-4 text-lg font-bold text-fg">{title}</h2>
      <nav className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-xl border border-edge bg-bg p-4 transition-all hover:border-accent hover:bg-surface"
          >
            <h3 className="mb-1 font-semibold text-fg group-hover:text-accent transition-colors">
              {link.title}
            </h3>
            <p className="text-sm text-muted">{link.description}</p>
          </Link>
        ))}
      </nav>
    </section>
  );
}
