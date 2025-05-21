"use client";

import { useEffect } from "react";
import { setTheme } from "@/functions/theme-set";

export default function ThemeInitializer({ serverTheme }) {
  useEffect(() => {
    if (!serverTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const userPref = mediaQuery.matches ? "dark" : "light";

      setTheme(userPref);
    }
  }, [serverTheme]);

  return null;
}
