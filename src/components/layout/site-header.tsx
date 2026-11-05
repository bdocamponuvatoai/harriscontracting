"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { mainNav, site } from "@/config/site";

/** Matches the CSS breakpoint where the nav collapses into the menu. */
const MOBILE_NAV_QUERY = "(max-width: 800px)";

const stripSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function SiteHeader({ brand }: { brand: ReactNode }) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so it closes on navigation.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const mobileNav = window.matchMedia(MOBILE_NAV_QUERY);
    const onBreakpoint = () => {
      if (!mobileNav.matches) setOpenOnPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    mobileNav.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mobileNav.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        {brand}
        <nav aria-label="Main navigation" className={open ? "nav open" : "nav"}>
          {mainNav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={stripSlash(pathname) === stripSlash(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <a className="nav-phone" href={site.phone.href}>
            {site.phone.display}
          </a>
        </nav>
        <ButtonLink className="nav-cta" href="/start/">
          Start your project <span>↗</span>
        </ButtonLink>
        <button
          ref={toggleRef}
          className="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
      </header>
    </>
  );
}
