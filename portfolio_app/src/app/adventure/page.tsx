import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Let's Adventure",
  description: "A travelling portfolio — coming soon.",
};

export default function AdventurePage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28">
      {/* Background grid + glow (mirrors the hero) */}
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

      <Reveal className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="grid size-14 place-items-center rounded-2xl border border-border bg-surface text-accent">
          <Compass className="size-6" />
        </span>
        <span className="mono-label text-accent">&lt; Let&apos;s Adventure /&gt;</span>
        <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
          Travelling <span className="text-outline">portfolio</span> page
        </h1>
        <p className="max-w-md text-balance text-muted">
          A space for my travels and adventures is on the way. Check back soon —
          the journey is just getting started.
        </p>
        <span className="mono-label">Coming soon</span>
      </Reveal>
    </section>
  );
}
