/**
 * Structured Data (JSON-LD Schema.org) utilities for SEO
 * Generates JSON-LD markup for rich search results
 */

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface SportsEventSchema {
  "@context": "https://schema.org";
  "@type": "SportsEvent";
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    "@type": "Place";
    name: string;
    address?: {
      "@type": "PostalAddress";
      addressCountry: string;
    };
  };
  sport: string;
  organizer?: {
    "@type": "Organization";
    name: string;
  };
}

export interface PersonAthleteSchema {
  "@context": "https://schema.org";
  "@type": ["Person", "Athlete"];
  name: string;
  sport: string;
  nationality?: string;
  description?: string;
  url?: string;
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

/**
 * Generate Organization schema for Rankings123
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rankings123",
    url: "https://rankings123.com",
    logo: "https://rankings123.com/favicon.svg",
    description:
      "Live sports rankings and standings: ATP & WTA tennis, FIFA World Cup, Tour de France, and more. Real-time updates during tournaments.",
    sameAs: [
      // Add social media links when available
    ],
  };
}

/**
 * Generate WebSite schema for homepage
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rankings123",
    url: "https://rankings123.com",
    description:
      "Live sports rankings and standings: ATP & WTA tennis, FIFA World Cup, Tour de France, and more. Real-time updates during tournaments.",
    // Search action can be added when we have a search feature
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(
  crumbs: Array<{ name: string; url?: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.url && { item: `https://rankings123.com${crumb.url}` }),
    })),
  };
}

/**
 * Generate SportsEvent schema for tournaments
 */
export function generateSportsEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  sport,
  organizer,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: { name: string; country?: string };
  sport: string;
  organizer?: string;
}): SportsEventSchema {
  const schema: SportsEventSchema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name,
    description,
    startDate,
    sport,
  };

  if (endDate) schema.endDate = endDate;

  if (location) {
    schema.location = {
      "@type": "Place",
      name: location.name,
      ...(location.country && {
        address: {
          "@type": "PostalAddress",
          addressCountry: location.country,
        },
      }),
    };
  }

  if (organizer) {
    schema.organizer = {
      "@type": "Organization",
      name: organizer,
    };
  }

  return schema;
}

/**
 * Generate Person+Athlete schema for player pages
 */
export function generateAthleteSchema({
  name,
  sport,
  nationality,
  description,
  url,
}: {
  name: string;
  sport: string;
  nationality?: string;
  description?: string;
  url?: string;
}): PersonAthleteSchema {
  return {
    "@context": "https://schema.org",
    "@type": ["Person", "Athlete"],
    name,
    sport,
    ...(nationality && { nationality }),
    ...(description && { description }),
    ...(url && { url: `https://rankings123.com${url}` }),
  };
}

/**
 * Render JSON-LD script tag (use in Next.js pages/components)
 * Escapes < to prevent script injection
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
