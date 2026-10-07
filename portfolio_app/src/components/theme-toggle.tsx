"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid size-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-foreground"
    >
      {/* Avoid hydration mismatch: render a stable icon until mounted */}
      {mounted ? (
        isDark ? (
          <Sun className="size-[18px]" />
        ) : (
          <Moon className="size-[18px]" />
        )
      ) : (
        <Sun className="size-[18px] opacity-0" />
      )}
    </button>
  );
}
