import Image from "next/image";
import { Window } from "@tauri-apps/api/window";

import PanelToggleDesktop from "./inputs/panel-toggle.desktop";

import { swapTheme } from "@/lib/theme-swap";

import "@/styles/header.css";

export default function HeaderDesktop() {
  const appWindow = new Window("main");
  return (
    <div id="header-desktop" data-tauri-drag-region>
      <div id="header-desktop-options">
        <a
          className="header-desktop-button"
          onClick={() => swapTheme(document.body.classList.value)}
        >
          <Image src="/nav/settings.png" width={16} height={16} alt="Theme" />
        </a>
        <PanelToggleDesktop />
      </div>
      <div className="header-desktop-separator" />
      <div id="header-desktop-buttons">
        <a
          className="header-desktop-button"
          onClick={() => appWindow.minimize()}
        >
          <Image src="/nav/min.png" width={10} height={10} alt="Minimize" />
        </a>
        <a
          className="header-desktop-button"
          onClick={() => appWindow.toggleMaximize()}
        >
          <Image src="/nav/max.png" width={10} height={10} alt="Maximize" />
        </a>
        <a
          className="header-desktop-button close"
          onClick={() => appWindow.close()}
        >
          <Image src="/nav/close.png" width={10} height={10} alt="Close" />
        </a>
      </div>
    </div>
  );
}
