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

type Cell = { c: number; r: number; x: number; y: number; cx: number; cy: number; d: number };
type Layout = { hexW: number; hexH: number; width: number; height: number; cells: Cell[] };

function colsForWidth(w: number) {
  if (w >= 1000) return 8;
  if (w >= 640) return 6;
  return 5;
}

function LogoHex({
  name,
  path,
  cell,
  w,
  h,
}: {
  name: string;
  path?: string;
  cell: Cell;
  w: number;
  h: number;
}) {
  return (
    <div
      className="hex-item absolute"
      style={{ left: cell.x, top: cell.y, width: w, height: h }}
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

function FillerHex({ cell, w, h }: { cell: Cell; w: number; h: number }) {
  return (
    <div
      className="hex-filler pointer-events-none absolute"
      style={{ left: cell.x, top: cell.y, width: w, height: h }}
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const width = el.clientWidth;
      if (!width) return;
      const cols = colsForWidth(width);
      // enough rows to hold all logos plus the empty central zone
      const rows = Math.max(3, Math.ceil((LOGOS.length + 5) / cols));
      const hexW = width / (0.75 * (cols - 1) + 1);
      const hexH = hexW * (SQ3 / 2);
      const height = rows * hexH + hexH / 2;
      const midX = width / 2;
      const midY = height / 2;

      // Central empty zone (holds the "Right tools" text — no hexes here).
      const rx = width * 0.22;
      const ry = height * 0.3;

      const cells: Cell[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 0.75 * hexW;
          const y = r * hexH + (c % 2) * (hexH / 2);
          const cx = x + hexW / 2;
          const cy = y + hexH / 2;
          const inZone =
            ((cx - midX) / rx) ** 2 + ((cy - midY) / ry) ** 2 < 1;
          if (inZone) continue; // leave empty for the text
          cells.push({ c, r, x, y, cx, cy, d: Math.hypot(cx - midX, cy - midY) });
        }
      }
      // Farthest cells get logos; the few nearest the centre become faint
      // filler so the honeycomb thins out around the empty middle.
      cells.sort((a, b) => b.d - a.d);
      setLayout({ hexW, hexH, width, height, cells });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  let tiles: ReactNode = null;
  if (layout) {
    const { hexW, hexH, cells } = layout;
    tiles = cells.map((cell, i) =>
      i < LOGOS.length ? (
        <LogoHex
          key={`${cell.c}-${cell.r}`}
          name={LOGOS[i].name}
          path={LOGOS[i].path}
          cell={cell}
          w={hexW}
          h={hexH}
        />
      ) : (
        <FillerHex key={`${cell.c}-${cell.r}`} cell={cell} w={hexW} h={hexH} />
      ),
    );
  }

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: layout?.height ?? 320 }}
    >
      {tiles}

      {/* Central empty space — text only, no hexagon */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="max-w-[46%] text-center">
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Right tools.
          </p>
          <p className="mt-1 text-sm text-muted sm:text-base">
            Better solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
