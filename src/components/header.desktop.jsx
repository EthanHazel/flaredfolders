import Image from "next/image";
import { Window } from "@tauri-apps/api/window";

import "@/styles/header.css";

export default function HeaderDesktop() {
  const appWindow = new Window("main");
  return (
    <>
      <div id="header-desktop-spacer"></div>
      <div id="header-desktop" data-tauri-drag-region>
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
    </>
  );
}
