import { ArrowUpRight } from "lucide-react";
import { ContactBlockHeading } from "@/components/ui/contact-block-heading";
import { Reveal } from "@/components/ui/reveal";
import { socials } from "@/lib/data";

export function ContactSocial({ index = "03" }: { index?: string }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <ContactBlockHeading index={index} label="Social" title="Find me online" />

      <div className="mt-14 flex flex-col">
        {socials.map((social, i) => (
          <Reveal key={social.label} delay={i * 0.05}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-t border-border px-2 py-6 transition-colors hover:bg-surface md:py-7"
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="mono-label">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-3xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-4xl md:text-5xl">
                  {social.label}
                </span>
              </div>
              <span className="mono-label inline-flex items-center gap-1.5 transition-colors group-hover:text-foreground">
                Open profile
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
