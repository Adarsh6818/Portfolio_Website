import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-y border-border bg-surface/30 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading
          index="02"
          label="My Stack"
          title={
            <>
              Tools I use to <span className="text-outline">bring ideas</span> to
              life.
            </>
          }
          description="A curated set of modern technologies I reach for to build fast, scalable, and maintainable products."
        />

        <div className="mt-14 flex flex-col gap-4">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                  <div className="flex shrink-0 items-center gap-3 sm:w-48">
                    <span className="mono-label text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-mono text-sm uppercase tracking-widest">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
