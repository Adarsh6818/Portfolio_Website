import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  /** two-digit section number, e.g. "02" */
  index: string;
  /** monospace kicker label, e.g. "MY STACK" */
  label: string;
  /** main display heading; wrap emphasis words with <span className="text-outline"> */
  title: ReactNode;
  /** optional supporting copy */
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="mono-label text-accent">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span className="mono-label">{label}</span>
      </div>
      <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-xl text-base leading-relaxed text-muted sm:text-lg ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
