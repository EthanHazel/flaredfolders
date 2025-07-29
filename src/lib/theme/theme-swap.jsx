"use client";

import { setTheme } from "@/lib/theme/theme-set";

export function swapTheme(theme) {
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}
