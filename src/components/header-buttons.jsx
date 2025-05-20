"use client";

import { useState, useEffect } from "react";
import { siGithub, siKofi, siDiscord } from "simple-icons";
import { Info, Moon, Sun } from "lucide-react";

import { swapTheme } from "@/functions/theme-swap";
import { useTranslations } from "next-intl";
import Firefox from "./firefox";
import Modal from "./modal";
import LocaleSwitcher from "./inputs/locale-switcher";
import Credits from "./credits";

import { isFirefox } from "@/functions/fetch-browser-type";

export default function HeaderButtons() {
  const t = useTranslations("credits");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirefoxOpen, setIsFirefoxOpen] = useState(false);

  useEffect(() => {
    if (isFirefox()) {
      setIsFirefoxOpen(true);
    }
  }, []);

  const switchTheme = () => {
    swapTheme();
  };

  return (
    <>
      <Modal
        title={t("title")}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Credits />
      </Modal>

      <div id="header-buttons">
        <a className="header-button" onClick={switchTheme}>
          <Sun className="header-button-svg" id="sun" />
          <Moon className="header-button-svg" id="moon" />
        </a>
        <a className="header-button" onClick={() => setIsModalOpen(true)}>
          <Info className="header-button-svg" />
        </a>
        <div className="header-button-divider"></div>
        <a
          href="https://ko-fi.com/ethanhazel"
          target="_blank"
          className="header-button"
        >
          <svg viewBox="0 0 24 24" className="header-button-svg">
            <path d={siKofi.path} />
          </svg>
        </a>
        <a
          href="https://discord.gg/BkxtVZsf4E"
          target="_blank"
          className="header-button"
        >
          <svg viewBox="0 0 24 24" className="header-button-svg">
            <path d={siDiscord.path} />
          </svg>
        </a>
        <a
          href="https://github.com/EthanHazel/flaredfolders"
          target="_blank"
          className="header-button"
        >
          <svg viewBox="0 0 24 24" className="header-button-svg">
            <path d={siGithub.path} />
          </svg>
        </a>
        <div className="header-button-divider"></div>
        <LocaleSwitcher />
        {isFirefoxOpen && (
          <>
            <div className="header-button-divider"></div>
            <Firefox />
          </>
        )}
      </div>
    </>
  );
}
