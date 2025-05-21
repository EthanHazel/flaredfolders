"use client";

import { setTheme } from "@/functions/set-theme";

export function swapTheme() {
  const newTheme = document.documentElement.classList.toggle("dark")
    ? "dark"
    : "light";
  setTheme(newTheme);
}
