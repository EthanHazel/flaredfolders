"use client";

import { setTheme } from "./set-theme";

export function swapTheme() {
  const newTheme = document.body.classList.toggle("dark") ? "dark" : "light";
  setTheme(newTheme);
}
