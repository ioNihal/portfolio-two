"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  };

  // Hydration-safe placeholder
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme (loading)"
        className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center 
                   rounded-full border border-border-main bg-card/70 backdrop-blur-md 
                   text-subtle shadow-lg hover:scale-105 hover:bg-card-hover 
                   active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
      >
        <FiMonitor size={18} className="opacity-55" />
      </button>
    );
  }

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}. Click to change.`}
      className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center 
                 rounded-full border border-border-main bg-card/70 backdrop-blur-md 
                 text-foreground shadow-lg hover:scale-105 hover:bg-card-hover 
                 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
    >
      {theme === "system" && <FiMonitor size={18} className="text-indigo-600 dark:text-indigo-400" />}
      {theme === "dark" && <FiMoon size={18} className="text-indigo-400" />}
      {theme === "light" && <FiSun size={18} className="text-indigo-600" />}
    </button>
  );
}
