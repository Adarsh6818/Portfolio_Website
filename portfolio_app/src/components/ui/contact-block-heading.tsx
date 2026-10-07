import { Reveal } from "@/components/ui/reveal";

type ContactBlockHeadingProps = {
  /** e.g. "01" */
  index: string;
  /** e.g. "DIRECT" */
  label: string;
  /** big display title, e.g. "GET IN TOUCH" */
  title: string;
};

export function ContactBlockHeading({
  index,
  label,
  title,
}: ContactBlockHeadingProps) {
  return (
    <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <span className="mono-label whitespace-nowrap">
        {index} / {label}
      </span>
      <h2 className="text-right text-4xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}
