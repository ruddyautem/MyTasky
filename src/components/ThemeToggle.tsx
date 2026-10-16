"use client";

import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";

export const ThemeToggle = () => {
  const t = useTranslations("Theme");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionInProgress = useRef(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark);

    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (transitionInProgress.current) return;

    const nextDark = !isDark;
    const applyTheme = () => {
      setIsDark(nextDark);
      document.documentElement.classList.toggle("dark", nextDark);
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    };

    const viewTransitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => {
        finished: Promise<void>;
      };
    };

    if (!viewTransitionDocument.startViewTransition || !buttonRef.current) {
      applyTheme();
      return;
    }

    const { x, y, width, height } = buttonRef.current.getBoundingClientRect();
    const originX = x + width / 2;
    const originY = y + height / 2;
    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    );
    const root = document.documentElement;
    transitionInProgress.current = true;
    root.dataset.magicuiThemeVt = "active";
    root.style.setProperty("--theme-toggle-x", `${originX}px`);
    root.style.setProperty("--theme-toggle-y", `${originY}px`);
    root.style.setProperty("--theme-toggle-radius", `${maxRadius}px`);

    const transition = viewTransitionDocument.startViewTransition(() => {
      flushSync(applyTheme);
    });

    const cleanup = () => {
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--theme-toggle-x");
      root.style.removeProperty("--theme-toggle-y");
      root.style.removeProperty("--theme-toggle-radius");
      transitionInProgress.current = false;
    };
    void transition.finished.then(cleanup, cleanup);
  };

  if (!mounted) {
    return <div className="w-8 h-8 shrink-0" aria-hidden="true" />;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 rounded-xl transition-colors duration-300 cursor-pointer shrink-0 overflow-hidden"
      aria-label={isDark ? t("toLight") : t("toDark")}
      title={isDark ? t("light") : t("dark")}
    >
      <Sun
        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 absolute transition-all duration-500 ease-in-out ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0 pointer-events-none"
        }`}
      />
      <Moon
        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 absolute transition-all duration-500 ease-in-out ${
          isDark
            ? "rotate-90 scale-0 opacity-0 pointer-events-none"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
};
