"use client";

import { useState, useEffect } from "react";
import { siGithub, siDiscord } from "simple-icons";
import { Moon, Sun, Bug, HandHeart } from "lucide-react";

import { swapTheme } from "@/functions/theme-swap";
import Firefox from "./firefox";
import LocaleSwitcher from "./inputs/locale-switcher";
import HeaderButton from "./inputs/header-button";

import { isFirefox } from "@/functions/fetch-browser-type";

export default function HeaderButtons() {
  const [isFirefoxOpen, setIsFirefoxOpen] = useState(false);

  useEffect(() => {
    if (isFirefox()) {
      setIsFirefoxOpen(true);
    }
  }, []);

  return (
    <div id="header-buttons">
      <HeaderButton
        label="Swap Theme"
        className="header-button"
        onClick={() => swapTheme(document.body.classList.value)}
        icon={
          <>
            <Sun className="header-button-svg" id="sun" />
            <Moon className="header-button-svg" id="moon" />
          </>
        }
      />
      <HeaderButton
        label="Report Bug"
        href="https://github.com/EthanHazel/flaredfolders/issues/new?labels=bug"
        target="_blank"
        className="header-button"
        icon={<Bug className="header-button-svg" />}
      />
      <HeaderButton
        label="Donate"
        href="https://ko-fi.com/ethanhazel/tip"
        target="_blank"
        className="header-button"
        icon={<HandHeart className="header-button-svg" />}
      />
      <div className="header-button-divider"></div>
      <HeaderButton
        label="Discord"
        href="https://discord.gg/BkxtVZsf4E"
        target="_blank"
        className="header-button"
        icon={
          <svg viewBox="0 0 24 24" className="header-button-svg">
            <path d={siDiscord.path} />
          </svg>
        }
      />
      <HeaderButton
        label="GitHub"
        href="https://github.com/EthanHazel/flaredfolders"
        target="_blank"
        className="header-button"
        icon={
          <svg viewBox="0 0 24 24" className="header-button-svg">
            <path d={siGithub.path} />
          </svg>
        }
      />
      <div className="header-button-divider"></div>
      <LocaleSwitcher />
      {isFirefoxOpen && (
        <>
          <div className="header-button-divider"></div>
          <Firefox />
        </>
      )}
    </div>
  );
}
