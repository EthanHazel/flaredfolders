"use client";

import { useEffect } from "react";
import { setTheme } from "@/functions/set-theme";

export default function ThemeInitializer({ serverTheme }) {
  useEffect(() => {
    if (!serverTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const userPref = mediaQuery.matches ? "dark" : "light";

      document.cookie = `theme=${userPref}; max-age=2147483647; path=/`;
      document.documentElement.classList.add(userPref);

      setTheme(userPref);
    }
  }, [serverTheme]);

  return null;
}
