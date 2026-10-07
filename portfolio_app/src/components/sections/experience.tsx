import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-y border-border bg-surface/30 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading
          index="04"
          label="Experience"
          align="left"
          title={
            <>
              Where I&apos;ve <span className="text-outline">been working.</span>
            </>
          }
        />

        <div className="mt-14 flex flex-col">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.period}`} delay={i * 0.06}>
              <div className="group relative grid gap-3 border-t border-border py-8 md:grid-cols-[180px_1fr] md:gap-10">
                <div className="flex flex-col gap-1">
                  <span className="mono-label">{job.period}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {job.role}
                    </h3>
                    <span className="text-muted">— {job.company}</span>
                  </div>
                  <p className="max-w-2xl leading-relaxed text-muted">
                    {job.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
