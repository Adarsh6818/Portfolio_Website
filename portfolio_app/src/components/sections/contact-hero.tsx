import type { ComponentType } from "react";
import {
  ArrowUpRight,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { ContactFormPanel } from "@/components/sections/contact-form";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import { contactHero, siteConfig } from "@/lib/data";

type ContactCard = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
  /** shows a Copy button for `value` */
  copy?: boolean;
  external?: boolean;
  download?: boolean;
};

const cards: ContactCard[] = [
  {
    icon: Mail,
    title: "Email me",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    copy: true,
  },
  {
    icon: MapPin,
    title: "Based in",
    value: `${siteConfig.location} · ${siteConfig.availability}`,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.location)}`,
    external: true,
  },
  {
    icon: FileText,
    title: "Resume",
    value: "Download my CV",
    href: siteConfig.resumeUrl,
    download: true,
  },
];

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40">
      {/* Background: accent glow from the top + circuit traces at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 75%)",
        }}
      />
      {/* sized to the side gutters beside the max-w-5xl content so they never cross it */}
      <CircuitTraces
        id="left"
        className="absolute left-0 top-20 hidden w-[min(calc(50vw-31rem),420px)] xl:block"
      />
      <CircuitTraces
        id="right"
        className="absolute right-0 top-72 hidden w-[min(calc(50vw-31rem),420px)] -scale-x-100 xl:block"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Giant faded backdrop word */}
        <div
          aria-hidden
          className="pointer-events-none select-none whitespace-nowrap bg-linear-to-b from-foreground/25 via-foreground/10 to-transparent bg-clip-text text-center text-[clamp(4rem,17vw,12.5rem)] font-black uppercase leading-[0.85] tracking-tight text-transparent"
        >
          Contact
        </div>

        <div className="relative z-10 -mt-6 grid gap-10 sm:-mt-12 lg:-mt-20 lg:grid-cols-2 lg:gap-5">
          {/* Left: intro + contact cards */}
          <div className="flex flex-col gap-10 lg:justify-between">
            <Reveal className="flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/70 py-1.5 pl-1.5 pr-5 text-sm backdrop-blur">
                <span className="grid size-8 place-items-center rounded-full border border-border bg-surface-2">
                  <MessageCircle className="size-4" />
                </span>
                {contactHero.badge}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                {contactHero.title}
              </h1>
              <p className="max-w-sm text-balance leading-relaxed text-muted">
                {contactHero.subtitle}
              </p>
            </Reveal>

            <div className="flex flex-col gap-3">
              {cards.map((card, i) => (
                <Reveal key={card.title} delay={0.08 + i * 0.06}>
                  <ContactCardRow {...card} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: message form */}
          <Reveal delay={0.12} className="flex">
            <ContactFormPanel className="w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCardRow({
  icon: Icon,
  title,
  value,
  href,
  copy,
  external,
  download,
}: ContactCard) {
  return (
    <div className="group relative flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur transition-colors hover:border-accent/40 sm:gap-5 sm:p-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 transition-colors group-hover:text-accent">
        <Icon className="size-5" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-semibold">{title}</span>
        <span className="truncate text-sm text-muted">{value}</span>
      </div>
      {copy ? (
        // sits above the card-wide link overlay so it stays clickable
        <div className="relative z-10 hidden sm:block">
          <CopyButton value={value} />
        </div>
      ) : null}
      <a
        href={href}
        aria-label={`${title}: ${value}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
        // ::after stretches the link over the whole card
        className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface-2 transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:bg-foreground group-hover:text-background focus-visible:outline-2 focus-visible:outline-accent"
      >
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

/** Decorative PCB-style traces with node dots, drawn for the left edge (mirror for the right). */
function CircuitTraces({ id, className }: { id: string; className?: string }) {
  const glow = `trace-glow-${id}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 420 300"
      fill="none"
      className={`pointer-events-none -z-10 ${className ?? ""}`}
    >
      <defs>
        <linearGradient id={glow} x1="0" y1="0" x2="420" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--foreground)" stopOpacity="0.05" />
          <stop offset="0.35" stopColor="var(--foreground)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g stroke="var(--faint)" strokeOpacity="0.45" strokeWidth="1.25">
        <path d="M-10 10 L140 160" />
        <path d="M-10 110 L110 230 Q130 250 158 250 L392 250" />
      </g>
      {/* brighter highlight running along part of each trace */}
      <g stroke={`url(#${glow})`} strokeWidth="1.5">
        <path d="M30 50 L140 160" />
        <path d="M60 180 L110 230 Q130 250 158 250 L300 250" />
      </g>
      <g fill="var(--background)" stroke="var(--faint)" strokeWidth="1.5">
        <circle cx="146" cy="166" r="7" />
        <circle cx="400" cy="250" r="7" />
      </g>
    </svg>
  );
}
