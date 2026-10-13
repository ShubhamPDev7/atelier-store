"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import type { NavLink } from "@/data/navigation";

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="btn btn-icon -ml-3"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-overlay"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-paper"
          >
            <div className="flex h-(--header-h) items-center px-(--gutter) hairline-b">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-icon -ml-3"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Primary" className="flex-1 overflow-y-auto">
              <ul>
                {links.map((link) => (
                  <li key={link.href} className="hairline-b">
                    <Link
                      href={link.href}
                      className="block px-(--gutter) py-5 font-serif text-heading"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-4 px-(--gutter) py-8 hairline-t">
              <Link href="/account" className="eyebrow link-quiet">
                Sign in
              </Link>
              <Link href="/contact" className="eyebrow link-quiet">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
