import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/data";

const highlights = [
  { value: "3+", label: "Years building for the web" },
  { value: "15+", label: "Projects shipped" },
  { value: "∞", label: "Cups of coffee" },
];

export function About({ index = "01" }: { index?: string }) {
  return (
    <section id="about" className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        index={index}
        label="About Me"
        align="left"
        title={
          <>
            A bit about <span className="text-outline">who I am.</span>
          </>
        }
      />

      <div className="mt-14 grid gap-10 md:grid-cols-[1fr_0.8fr] md:gap-16">
        {/* Bio */}
        <Reveal className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed text-muted">
            {siteConfig.shortBio}
          </p>
          <p className="leading-relaxed text-muted">
            I care about the details that make software feel effortless — fast
            load times, accessible interfaces, and clean architecture that&apos;s
            a pleasure to maintain. Whether it&apos;s a pixel-perfect frontend or a
            resilient backend service, I enjoy owning problems end to end.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4 text-accent" />
            Based in {siteConfig.location} · Working worldwide
          </div>

          <div className="mt-2 grid grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-border bg-surface p-4"
              >
                <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {h.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">
                  {h.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Photo */}
        <Reveal delay={0.1} className="order-first md:order-last">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-surface-2">
            {/* Swap this placeholder for an <Image> of /profile.jpg */}
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-surface to-surface-2">
              <span className="font-mono text-7xl text-faint grayscale">
                {siteConfig.name.charAt(0)}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-background/60 px-4 py-3 backdrop-blur">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {siteConfig.name}
              </span>
              <span className="font-mono text-xs text-muted">{siteConfig.role}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
