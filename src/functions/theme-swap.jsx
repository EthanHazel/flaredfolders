"use client";

import { setTheme } from "@/functions/set-theme";

export function swapTheme() {
  const newTheme = document.body.classList.toggle("dark") ? "dark" : "light";
  setTheme(newTheme);
}
