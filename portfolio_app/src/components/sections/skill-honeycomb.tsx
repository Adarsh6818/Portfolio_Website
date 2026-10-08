"use client";

import { useEffect, useRef, useState } from "react";
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

type Item = { kind: "logo"; name: string; path?: string } | { kind: "center" };

const CENTER: Item = { kind: "center" };

const LOGOS: Item[] = techStack.map((t) => ({
  kind: "logo",
  name: t.name,
  path: ICONS[t.slug]?.path,
}));

type Layout = { cols: number; rows: number; hexW: number; hexH: number; height: number };

function Hex({
  item,
  x,
  y,
  w,
  h,
}: {
  item: Item;
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  const isCenter = item.kind === "center";
  return (
    <div
      className={`hex-item absolute${isCenter ? " is-center" : ""}`}
      style={{ left: x, top: y, width: w, height: h }}
      title={isCenter ? "Right tools. Better solutions." : item.name}
    >
      <div className="hex-shape hexagon relative size-full">
        <div className="hex-inner hexagon absolute inset-[1.5px] flex items-center justify-center text-center">
          {isCenter ? (
            <div className="px-[12%]">
              <p
                className="font-semibold leading-tight tracking-tight"
                style={{ fontSize: Math.max(10, w * 0.1) }}
              >
                Right tools.
              </p>
              <p
                className="leading-tight text-muted"
                style={{ fontSize: Math.max(8, w * 0.078) }}
              >
                Better solutions.
              </p>
            </div>
          ) : item.path ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              fill="currentColor"
              className="hex-logo"
              style={{ width: "38%", height: "38%" }}
            >
              <path d={item.path} />
            </svg>
          ) : (
            <span className="hex-logo font-mono text-xs">{item.name}</span>
          )}
        </div>
      </div>
      {!isCenter ? <span className="sr-only">{item.name}</span> : null}
    </div>
  );
}

export function SkillHoneycomb() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  const total = LOGOS.length + 1; // logos + center

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const width = el.clientWidth;
      if (!width) return;
      // Target hex width by breakpoint; derive column count, then fit exactly.
      const target = width < 500 ? 96 : width < 900 ? 130 : 168;
      let cols = Math.round(width / (target * 0.75));
      cols = Math.max(3, Math.min(cols, total));
      const hexW = width / (0.75 * (cols - 1) + 1);
      const hexH = hexW * (SQ3 / 2);
      const rows = Math.ceil(total / cols);
      const height = rows * hexH + hexH / 2;
      setLayout({ cols, rows, hexW, hexH, height });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [total]);

  // Assign items to grid slots: the center tile sits in the middle of the top row.
  let placed: { item: Item; row: number; col: number }[] = [];
  if (layout) {
    const centerSlot = Math.floor((layout.cols - 1) / 2); // row 0, middle column
    const items: Item[] = [];
    let li = 0;
    for (let s = 0; s < total; s++) {
      if (s === centerSlot) items.push(CENTER);
      else items.push(LOGOS[li++]);
    }
    placed = items.map((item, i) => ({
      item,
      row: Math.floor(i / layout.cols),
      col: i % layout.cols,
    }));
  }

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: layout?.height ?? 260 }}
    >
      {layout
        ? placed.map(({ item, row, col }, i) => {
            const x = col * 0.75 * layout.hexW;
            const y = row * layout.hexH + (col % 2) * (layout.hexH / 2);
            return (
              <Hex
                key={i}
                item={item}
                x={x}
                y={y}
                w={layout.hexW}
                h={layout.hexH}
              />
            );
          })
        : null}
    </div>
  );
}
