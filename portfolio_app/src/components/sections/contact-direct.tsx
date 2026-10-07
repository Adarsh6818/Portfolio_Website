import { ContactBlockHeading } from "@/components/ui/contact-block-heading";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/data";

export function ContactDirect({ index = "01" }: { index?: string }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <ContactBlockHeading index={index} label="Direct" title="Get in touch" />

      <Reveal className="mt-14">
        <div className="group flex items-end justify-between gap-4 border-t border-border py-7">
          <div className="flex flex-col gap-2">
            <span className="mono-label">Email</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="break-all text-2xl font-medium tracking-tight transition-colors hover:text-accent sm:text-3xl md:text-4xl"
            >
              {siteConfig.email}
            </a>
          </div>
          <CopyButton value={siteConfig.email} />
        </div>
      </Reveal>
    </section>
  );
}
