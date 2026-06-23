import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-edge">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
        <p>© {year} Rankings123 · Live sports rankings</p>
        <nav className="flex gap-4">
          <Link href="/changelog" className="hover:text-fg">What&apos;s New</Link>
          <Link href="/privacy" className="hover:text-fg">Privacy</Link>
          <Link href="/cookies" className="hover:text-fg">Cookies</Link>
          <Link href="/terms" className="hover:text-fg">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
