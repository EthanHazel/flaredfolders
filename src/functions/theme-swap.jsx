"use client";

import { setTheme } from "@/functions/set-theme";

export function swapTheme(theme) {
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}
