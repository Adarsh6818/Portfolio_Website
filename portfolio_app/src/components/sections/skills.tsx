import { SectionHeading } from "@/components/ui/section-heading";
import { SkillHoneycomb } from "@/components/sections/skill-honeycomb";

export function Skills({ index = "02" }: { index?: string }) {
  return (
    <section
      id="skills"
      className="scroll-mt-24 overflow-hidden border-y border-border py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading
          index={index}
          label="My Stack"
          title={
            <>
              Tools I use to <span className="text-outline">bring ideas</span> to
              life.
            </>
          }
          description="A curated set of modern technologies I reach for to build fast, scalable, and maintainable products."
        />
      </div>

      {/* Full-width honeycomb strip */}
      <div className="mt-16 w-full">
        <SkillHoneycomb />
      </div>
    </section>
  );
}
