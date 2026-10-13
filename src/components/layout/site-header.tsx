import Link from "next/link";

import { BagIcon, SearchIcon, UserIcon } from "@/components/icons";
import { primaryNav } from "@/data/navigation";

import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <>
      <div className="bg-ink text-paper">
        <p className="container-page py-2 text-center eyebrow">
          Complimentary express shipping and returns on every order
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-paper hairline-b">
        <div className="container-page grid h-(--header-h) grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center">
            <div className="xl:hidden">
              <MobileMenu links={primaryNav} />
            </div>
            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex gap-7">
                {primaryNav.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="eyebrow link-quiet">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link
            href="/"
            aria-label="Atelier home"
            className="font-serif text-2xl uppercase tracking-[0.32em] md:text-[1.75rem]"
          >
            Atelier
          </Link>

          <div className="-mr-3 flex items-center justify-end">
            <Link href="/search" aria-label="Search" className="btn btn-icon">
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="btn btn-icon hidden sm:inline-flex"
            >
              <UserIcon />
            </Link>
            <Link href="/bag" aria-label="Shopping bag, 0 items" className="btn btn-icon">
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
