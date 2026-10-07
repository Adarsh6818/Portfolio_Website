import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { footerLinks, siteConfig } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto w-full max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid size-9 place-items-center rounded-lg border border-border bg-surface font-mono text-sm">
                {siteConfig.name.charAt(0)}
              </span>
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.shortBio}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="mono-label">Navigation</p>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <p className="mono-label">Connect</p>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-faint sm:flex-row">
          <p>
            © {year} {siteConfig.fullName}. All rights reserved.
          </p>
          <p className="font-mono text-xs">Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
