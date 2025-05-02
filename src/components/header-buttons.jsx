"use client";

import { useState } from "react";
import { siGithub, siKofi } from "simple-icons";
import { Info, Moon, Sun } from "lucide-react";

import { swapTheme } from "@/functions/theme-swap";
import Firefox from "./firefox";
import Modal from "./modal";
import LocaleSwitcher from "./inputs/locale-switcher";

export default function HeaderButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchTheme = () => {
    swapTheme();
  };

  return (
    <>
      <Modal
        title="Credits"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <p>Remember to make this not look like shit before launch</p>
        <p>Created by Ethan Hazel</p>
        <p>Icons from Lucide and Simple Icons</p>
        <p>All Windows folder icons from Microsoft</p>
        <p>Apple macOS folder icons from Apple</p>
        <p>
          Linux Mint L folder icons from the Linux Mint project, and more
          specifically from{" "}
          <a href="https://github.com/linuxmint/mint-l-icons" target="_blank">
            this repository
          </a>
        </p>
        <p>German translation done by an anonymous translator</p>
        <p>Spanish translation done by AsRenCL</p>
        <p>
          Want to help translate?{" "}
          <a href="https://github.com/EthanHazel/flaredfolders">Help us out!</a>
        </p>
        <p>Special thanks to Von Caschy and MigPro</p>
        <p>Ko-Fi Donators:</p>
        <p>Contributors:</p>
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
          href="https://github.com/EthanHazel/flared-folders"
          target="_blank"
          className="header-button"
        >
          <svg viewBox="0 0 24 24" className="header-button-svg">
            <path d={siGithub.path} />
          </svg>
        </a>
        <div className="header-button-divider"></div>
        <LocaleSwitcher />
        <div className="header-button-divider"></div>
        <Firefox />
      </div>
    </>
  );
}
