"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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

const LOGOS = techStack.map((t) => ({ name: t.name, path: ICONS[t.slug]?.path }));

type Layout = {
  cols: number;
  rows: number;
  hexW: number;
  hexH: number;
  height: number;
  cc: number; // center column
  cr: number; // center row
};

/** The 6 neighbours of a cell in an odd-column-shifted flat-top grid. */
function neighbours(c: number, r: number): [number, number][] {
  if (c % 2 === 0) {
    return [
      [c, r - 1],
      [c, r + 1],
      [c - 1, r - 1],
      [c - 1, r],
      [c + 1, r - 1],
      [c + 1, r],
    ];
  }
  return [
    [c, r - 1],
    [c, r + 1],
    [c - 1, r],
    [c - 1, r + 1],
    [c + 1, r],
    [c + 1, r + 1],
  ];
}

function colsForWidth(width: number) {
  if (width < 600) return 5; // → 5 rows, 25 slots, 0 filler
  if (width < 900) return 7; // → 4 rows
  return 9; // → 3 rows
}

function LogoHex({
  name,
  path,
  x,
  y,
  w,
  h,
}: {
  name: string;
  path?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <div
      className="hex-item absolute"
      style={{ left: x, top: y, width: w, height: h }}
      title={name}
    >
      <div className="hex-shape hexagon relative size-full">
        <div className="hex-inner hexagon absolute inset-[1.5px] flex items-center justify-center">
          {path ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              fill="currentColor"
              className="hex-logo"
              style={{ width: "38%", height: "38%" }}
            >
              <path d={path} />
            </svg>
          ) : (
            <span className="hex-logo font-mono text-xs">{name}</span>
          )}
        </div>
      </div>
      <span className="sr-only">{name}</span>
    </div>
  );
}

function FillerHex({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <div
      className="hex-filler pointer-events-none absolute"
      style={{ left: x, top: y, width: w, height: h }}
      aria-hidden
    >
      <div className="hex-shape hexagon relative size-full">
        <div className="hex-inner hexagon absolute inset-[1.5px]" />
      </div>
    </div>
  );
}

export function SkillHoneycomb() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  const CARVE = 7; // center cell + 6 neighbours merged into the big tile

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const width = el.clientWidth;
      if (!width) return;
      const cols = colsForWidth(width);
      const rows = Math.ceil((LOGOS.length + CARVE) / cols);
      const hexW = width / (0.75 * (cols - 1) + 1);
      const hexH = hexW * (SQ3 / 2);
      const height = rows * hexH + hexH / 2;
      const cc = Math.floor(cols / 2);
      const cr = Math.floor(rows / 2);
      setLayout({ cols, rows, hexW, hexH, height, cc, cr });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cellX = (c: number, w: number) => c * 0.75 * w;
  const cellY = (c: number, r: number, h: number) => r * h + (c % 2) * (h / 2);

  const tiles: ReactNode[] = [];
  let bigTile: ReactNode = null;

  if (layout) {
    const { cols, rows, hexW, hexH, cc, cr } = layout;

    // Cells merged into the big central tile.
    const carved = new Set<string>([`${cc},${cr}`]);
    for (const [nc, nr] of neighbours(cc, cr)) carved.add(`${nc},${nr}`);

    let logoIdx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (carved.has(`${c},${r}`)) continue;
        const x = cellX(c, hexW);
        const y = cellY(c, r, hexH);
        if (logoIdx < LOGOS.length) {
          const logo = LOGOS[logoIdx++];
          tiles.push(
            <LogoHex
              key={`${c},${r}`}
              name={logo.name}
              path={logo.path}
              x={x}
              y={y}
              w={hexW}
              h={hexH}
            />,
          );
        } else {
          tiles.push(<FillerHex key={`${c},${r}`} x={x} y={y} w={hexW} h={hexH} />);
        }
      }
    }

    // Big central tile — a pointy-top hexagon covering the 7-cell flower.
    const centerX = cellX(cc, hexW) + hexW / 2;
    const centerY = cellY(cc, cr, hexH) + hexH / 2;
    const bigW = hexW * 2.4;
    const bigH = bigW * (2 / SQ3); // pointy-top aspect
    const line1 = Math.min(34, Math.max(14, bigW * 0.115));
    const line2 = Math.min(18, Math.max(10, bigW * 0.085));

    bigTile = (
      <div
        className="absolute z-10"
        style={{
          left: centerX - bigW / 2,
          top: centerY - bigH / 2,
          width: bigW,
          height: bigH,
        }}
        title="Right tools. Better solutions."
      >
        <div className="hexagon-pointy relative size-full bg-accent [filter:drop-shadow(0_0_18px_var(--accent))]">
          <div className="hexagon-pointy absolute inset-[2px] flex flex-col items-center justify-center gap-1 bg-surface px-[14%] text-center">
            <p
              className="font-semibold leading-none tracking-tight"
              style={{ fontSize: line1 }}
            >
              Right tools.
            </p>
            <p className="leading-tight text-muted" style={{ fontSize: line2 }}>
              Better solutions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: layout?.height ?? 320 }}
    >
      {tiles}
      {bigTile}
    </div>
  );
}
