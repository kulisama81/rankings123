"use client";

import { useEffect, useState } from "react";

export interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
  sticky?: boolean;
}

export default function SectionNav({ sections, sticky = true }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (sections.length === 0) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the first visible section (from top)
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveSection(visible[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -70% 0px", // Activate when section is near top
      threshold: 0,
    });

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by nav height (60px) to prevent sticky nav from covering section heading
      const navHeight = 60;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav
      className={`-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0 ${
        sticky ? "sticky top-0 z-10 bg-bg/80 py-3 backdrop-blur-sm" : ""
      }`}
      aria-label="Jump to section"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-accent/20 text-accent"
                : "border border-edge bg-surface text-muted hover:border-accent/30 hover:text-fg"
            }`}
            aria-current={isActive ? "location" : undefined}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
