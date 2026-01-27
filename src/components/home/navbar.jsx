"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";

import { swapTheme } from "@/lib/theme/theme-swap";
import LocaleSwitcher from "@/components/inputs/locale-switcher";

export default function Navbar() {
  useEffect(() => {
    const scroll = (event) => {
      const nav = document.getElementById("home-nav-container");
      if (nav) {
        if (window.scrollY > 0) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      }
    };
    window.addEventListener("scroll", scroll, false);
    return () => window.removeEventListener("scroll", scroll, false);
  }, []);
  return (
    <div id="home-nav">
      <div id="home-nav-container">
        <span id="home-nav-logo">
          <svg id="a" viewBox="0 0 149.74 124.78">
            <path
              d="M74.87,24.96v24.96h46.91c1.66,0,3,1.34,3,3v18.96c0,1.66-1.34,3-3,3h-46.91v21.96c0,1.66,1.34,3,3,3h43.91c1.66,0,3,1.34,3,3v21.96h14.96c5.52,0,10-4.48,10-10V34.96c0-5.52-4.48-10-10-10H74.87Z"
              fill="var(--tertiary)"
            ></path>
            <path
              d="M24.96,46.91V27.96c0-1.66,1.34-3,3-3h46.91L52.84,2.93c-1.88-1.88-4.42-2.93-7.07-2.93H10C4.48,0,0,4.48,0,10V114.78c0,5.52,4.48,10,10,10h14.96v-46.91c0-1.66,1.34-3,3-3h46.91v-24.96H27.96c-1.66,0-3-1.34-3-3Z"
              fill="var(--text)"
            ></path>
          </svg>
          <span id="home-nav-logo-text">FlaredFolders</span>
        </span>
        <div id="home-nav-buttons">
          <a
            className="home-nav-button"
            href="https://ko-fi.com/ethanhazel/tip"
          >
            Donate
          </a>
          <a
            className="home-nav-button"
            href="https://github.com/EthanHazel/FlaredFolders"
          >
            Github
          </a>
          <a className="home-nav-button" href="https://discord.gg/BkxtVZsf4E">
            Discord
          </a>
          <LocaleSwitcher variant="icon" />
          <a
            className="home-nav-icon-button"
            onClick={() => swapTheme(document.body.classList.value)}
          >
            <Sun className="sun" />
            <Moon className="moon" />
          </a>
        </div>
      </div>
    </div>
  );
}
