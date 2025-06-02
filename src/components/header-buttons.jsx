"use client";

import { useState, useEffect } from "react";
import { siGithub, siKofi, siDiscord } from "simple-icons";
import { Info, Moon, Sun, Bug, Send } from "lucide-react";

import { swapTheme } from "@/functions/theme-swap";
import { useTranslations } from "next-intl";
import Firefox from "./firefox";
import Modal from "./modal";
import LocaleSwitcher from "./inputs/locale-switcher";
import Credits from "./credits";
import HeaderButton from "./inputs/header-button";

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
          label="Credits"
          className="header-button"
          onClick={() => setIsModalOpen(true)}
          icon={<Info className="header-button-svg" />}
        />
        <HeaderButton
          label="Report Bug"
          href="https://github.com/EthanHazel/flaredfolders/issues/new?labels=bug"
          target="_blank"
          className="header-button"
          icon={<Bug className="header-button-svg" />}
        />
        <HeaderButton
          label="Request Feature"
          href="https://github.com/EthanHazel/flaredfolders/issues/new?labels=request"
          target="_blank"
          className="header-button"
          icon={<Send className="header-button-svg" />}
        />
        <div className="header-button-divider"></div>
        <HeaderButton
          label="Ko-fi"
          href="https://ko-fi.com/ethanhazel"
          target="_blank"
          className="header-button"
          icon={
            <svg viewBox="0 0 24 24" className="header-button-svg">
              <path d={siKofi.path} />
            </svg>
          }
        />
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
    </>
  );
}
