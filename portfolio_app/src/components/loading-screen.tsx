"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per browser session, and never for reduced-motion users.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      seen = false;
    }
    if (reduced || seen) return;

    setShow(true);

    const start = performance.now();
    const duration = 1200;
    let hideTimer: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      const pct = Math.min(
        100,
        Math.round(((performance.now() - start) / duration) * 100),
      );
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        // Mark as seen only once the intro has actually completed, so a
        // double-invoked effect (React Strict Mode) still runs to the end.
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {
          /* ignore */
        }
        hideTimer = setTimeout(() => setShow(false), 250);
      }
    }, 16);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid size-16 place-items-center rounded-2xl border border-border bg-surface font-mono text-2xl"
          >
            {siteConfig.name.charAt(0)}
          </motion.div>

          <p className="mono-label mt-5">{siteConfig.name} / Portfolio</p>

          <div className="mt-5 h-px w-40 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mono-label mt-3 text-accent">
            {progress < 100 ? `${progress}%` : "Ready"}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
