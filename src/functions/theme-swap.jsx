"use client";

import { setTheme } from "@/functions/theme-set";

export function swapTheme(theme) {
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}
