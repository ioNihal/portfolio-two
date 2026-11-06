"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const order = ["system", "dark", "light"];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? theme : "system";
  const next = order[(order.indexOf(current) + 1) % order.length];

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      className={`fixed right-6 top-6 z-50 cursor-pointer font-mono text-xs text-muted underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:underline ${mounted ? "" : "invisible"
        }`}
    >
      {current}
    </button>
  );
}