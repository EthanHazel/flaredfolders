import Image from "next/image";
import { Window } from "@tauri-apps/api/window";
import { swapTheme } from "@/lib/theme/theme-swap";

import { Sun, Moon, Bug, Languages } from "lucide-react";

import HeaderButton from "../inputs/header-button";

import "@/styles/layout/header.css";

export default function HeaderDesktop() {
  const appWindow = new Window("main");
  return (
    <div id="header-desktop" data-tauri-drag-region>
      <div id="header-desktop-left-container">
        <span id="header-desktop-title">FlaredFolders</span>
        <span id="header-desktop-separator" />
        <HeaderButton
          onClick={() => swapTheme(document.body.classList.value)}
          icon={
            <>
              <Sun className="header-button-svg sun" />
              <Moon className="header-button-svg moon" />
            </>
          }
        />
        <HeaderButton icon={<Bug className="header-button-svg" />} />
        <HeaderButton icon={<Languages className="header-button-svg" />} />
      </div>
      <div id="header-desktop-buttons">
        <a
          className="header-desktop-button"
          onClick={() => appWindow.minimize()}
        >
          <Image
            src="/images/nav/min.png"
            width={10}
            height={10}
            alt="Minimize"
          />
        </a>
        <a
          className="header-desktop-button"
          onClick={() => appWindow.toggleMaximize()}
        >
          <Image
            src="/images/nav/max.png"
            width={10}
            height={10}
            alt="Maximize"
          />
        </a>
        <a
          className="header-desktop-button close"
          onClick={() => appWindow.close()}
        >
          <Image
            src="/images/nav/close.png"
            width={10}
            height={10}
            alt="Close"
          />
        </a>
      </div>
    </div>
  );
}
