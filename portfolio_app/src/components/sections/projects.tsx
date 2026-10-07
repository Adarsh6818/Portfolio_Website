import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/40">
      {/* Preview */}
      <div className="relative aspect-video overflow-hidden border-b border-border bg-surface-2">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-sm uppercase tracking-widest text-faint">
            {project.title}
          </span>
        </div>
        {project.featured ? (
          <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur">
            Featured
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <div className="flex items-center gap-1.5 text-muted">
            {project.sourceUrl ? (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="grid size-8 place-items-center rounded-lg border border-border transition-colors hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="grid size-8 place-items-center rounded-lg border border-border transition-colors hover:text-foreground"
              >
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24 md:py-32"
    >
      <SectionHeading
        index="03"
        label="Selected Work"
        title={
          <>
            Projects built <span className="text-outline">to go</span> live.
          </>
        }
        description="A selection of things I've designed, built, and shipped — from full products to focused tools."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition-colors hover:border-accent/50"
        >
          <GithubIcon className="size-4" />
          See more on GitHub
          <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </section>
  );
}
