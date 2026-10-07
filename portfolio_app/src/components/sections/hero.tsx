import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* Background: subtle grid + radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <Reveal>
          <span className="mono-label text-accent">&lt; Software Developer /&gt;</span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Hi, I&apos;m {siteConfig.name}.
            <br />
            <span className="text-outline">I build for</span> the web.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View My Work
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition-colors hover:border-accent/50"
            >
              Get in Touch
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
              </span>
              {siteConfig.availability} · {siteConfig.location}
            </div>
            <SocialLinks />
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
