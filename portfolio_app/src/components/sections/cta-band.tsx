import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type CtaBandProps = {
  /** where the band links to (defaults to the contact page) */
  href?: string;
};

export function CtaBand({ href = "/contact" }: CtaBandProps) {
  return (
    <section className="border-t border-border px-6 py-24 md:py-32">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="mono-label">Have an idea?</span>
        <Link href={href} className="group">
          <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            Let&apos;s make
            <br />
            it real.
          </h2>
        </Link>
        <Link
          href={href}
          className="mono-label inline-flex items-center gap-2 text-accent transition-opacity hover:opacity-80"
        >
          From idea to live
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
