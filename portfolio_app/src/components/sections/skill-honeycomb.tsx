import type { CSSProperties } from "react";
import {
  siCss,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJest,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import { Reveal } from "@/components/ui/reveal";
import { techStack } from "@/lib/data";

/** slug → logo path (monochrome, tinted with currentColor) */
const ICONS: Record<string, { path: string }> = {
  react: siReact,
  nextdotjs: siNextdotjs,
  typescript: siTypescript,
  nodedotjs: siNodedotjs,
  tailwindcss: siTailwindcss,
  postgresql: siPostgresql,
  javascript: siJavascript,
  html5: siHtml5,
  css: siCss,
  express: siExpress,
  mongodb: siMongodb,
  prisma: siPrisma,
  git: siGit,
  github: siGithub,
  docker: siDocker,
  vercel: siVercel,
  figma: siFigma,
  jest: siJest,
};

const SQ3 = Math.sqrt(3);

type Cell = { q: number; r: number };

/** Every axial cell within hex-distance 2 → a 1 + 6 + 12 = 19 cell flower. */
function buildCells(): Cell[] {
  const cells: Cell[] = [];
  for (let q = -2; q <= 2; q++) {
    for (let r = -2; r <= 2; r++) {
      const s = -q - r;
      if (Math.max(Math.abs(q), Math.abs(r), Math.abs(s)) <= 2) {
        cells.push({ q, r });
      }
    }
  }
  return cells;
}

/** Flat-top axial → pixel offset, in units of the hex radius (--s). */
function pos(q: number, r: number) {
  return { x: 1.5 * q, y: SQ3 * (r + q / 2) };
}

function HexCell({
  x,
  y,
  name,
  iconPath,
}: {
  x: number;
  y: number;
  name: string;
  iconPath?: string;
}) {
  const f = 0.92; // shrink vs the cell to leave a honeycomb gap
  return (
    <div
      title={name}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `calc(50% + var(--s) * ${x})`,
        top: `calc(50% + var(--s) * ${y})`,
        width: `calc(var(--s) * ${2 * f})`,
        height: `calc(var(--s) * ${SQ3 * f})`,
      }}
    >
      <div className="hexagon relative size-full bg-border transition-colors duration-300 group-hover:bg-accent/60">
        <div className="hexagon absolute inset-[7%] flex items-center justify-center bg-surface transition-colors duration-300 group-hover:bg-surface-2">
          {iconPath ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              fill="currentColor"
              className="text-muted transition-colors duration-300 group-hover:text-accent"
              style={{ width: "42%", height: "42%" }}
            >
              <path d={iconPath} />
            </svg>
          ) : (
            <span className="font-mono text-[10px] text-muted">{name}</span>
          )}
        </div>
      </div>
      <span className="sr-only">{name}</span>
    </div>
  );
}

function HexCenter() {
  const f = 1.12; // slightly bigger than the surrounding hexes
  return (
    <div
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `calc(var(--s) * ${2 * f})`,
        height: `calc(var(--s) * ${SQ3 * f})`,
      }}
    >
      <div className="hexagon relative size-full bg-accent/70">
        <div className="hexagon absolute inset-[6%] flex flex-col items-center justify-center gap-0.5 bg-surface px-3 text-center">
          <p
            className="font-semibold leading-tight tracking-tight"
            style={{ fontSize: "clamp(10px, 1.5vw, 15px)" }}
          >
            Right tools.
          </p>
          <p
            className="leading-tight text-muted"
            style={{ fontSize: "clamp(9px, 1.2vw, 12px)" }}
          >
            Better solutions.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SkillHoneycomb() {
  const outer = buildCells()
    .filter((c) => !(c.q === 0 && c.r === 0))
    .map((c) => {
      const p = pos(c.q, c.r);
      const dist = (Math.abs(c.q) + Math.abs(c.r) + Math.abs(c.q + c.r)) / 2;
      // start the outer ring from the top and go clockwise
      const angle = (Math.atan2(p.y, p.x) + Math.PI * 2.5) % (Math.PI * 2);
      return { ...p, dist, angle };
    })
    .sort((a, b) => a.dist - b.dist || a.angle - b.angle);

  const containerStyle = {
    "--s": "clamp(1.9rem, 6.5vw, 3.6rem)",
    width: "calc(var(--s) * 8)",
    height: "calc(var(--s) * 8.66)",
  } as CSSProperties;

  return (
    <Reveal className="mt-16 flex justify-center">
      <div className="relative" style={containerStyle}>
        <HexCenter />
        {outer.map((cell, i) => {
          const tech = techStack[i];
          if (!tech) return null;
          return (
            <HexCell
              key={tech.slug}
              x={cell.x}
              y={cell.y}
              name={tech.name}
              iconPath={ICONS[tech.slug]?.path}
            />
          );
        })}
      </div>
    </Reveal>
  );
}
