import Link from "next/link";

import { footerNav } from "@/data/navigation";

// Cached so the footer can be prerendered with cacheComponents enabled.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[2fr_repeat(3,1fr)] md:py-20">
        <div className="max-w-xs">
          <Link
            href="/"
            className="font-serif text-2xl uppercase tracking-[0.32em]"
          >
            Atelier
          </Link>
          <p className="mt-4 text-muted">
            Considered pieces, made to be kept. Designed in small runs and
            finished by hand.
          </p>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="eyebrow">{group.title}</h2>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted link-quiet hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="hairline-t">
        <div className="container-page flex flex-col gap-2 py-6 text-caption text-muted sm:flex-row sm:justify-between">
          <p>
            © <CopyrightYear /> Atelier. All rights reserved.
          </p>
          <p>United States · English · USD</p>
        </div>
      </div>
    </footer>
  );
}
