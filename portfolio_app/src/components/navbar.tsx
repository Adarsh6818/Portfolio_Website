"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, Sparkles, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { adventureLink, navLinks, siteConfig } from "@/lib/data";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-5xl rounded-2xl border px-4 py-3 transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo / name — links Home */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="grid size-9 place-items-center rounded-lg border border-border bg-surface font-mono text-sm">
              {siteConfig.name.charAt(0)}
            </span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href={adventureLink.href}
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors md:inline-flex ${
                isActive(adventureLink.href)
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-border bg-surface text-foreground hover:border-accent/50 hover:text-accent"
              }`}
            >
              <Sparkles className="size-4" />
              {adventureLink.label}
            </Link>
            <ThemeToggle />
            <a
              href={siteConfig.resumeUrl}
              download
              className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 lg:inline-flex"
            >
              <Download className="size-4" />
              Resume
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-foreground md:hidden"
            >
              {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-surface ${
                  isActive(link.href) ? "text-foreground" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={adventureLink.href}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-accent"
            >
              <Sparkles className="size-4" />
              {adventureLink.label}
            </Link>
            <a
              href={siteConfig.resumeUrl}
              download
              className="mt-1 inline-flex items-center gap-2 rounded-lg border-t border-border px-3 pt-3 pb-1 text-sm font-medium text-foreground"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
