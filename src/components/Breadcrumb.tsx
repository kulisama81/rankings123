import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-wide text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-edge">
                  /
                </span>
              )}
              {item.url && !isLast ? (
                <Link
                  href={item.url}
                  className="hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-fg font-medium" : undefined}
                  {...(isLast && { "aria-current": "page" })}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
