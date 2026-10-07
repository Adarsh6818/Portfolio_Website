"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${value}`}
      className="mono-label inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-accent" />
          Copied
        </>
      ) : (
        "Copy"
      )}
    </button>
  );
}
