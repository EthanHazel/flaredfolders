"use client";

import { useRef } from "react";

import useOS from "@/functions/fetch-os";
import DownloadCounter from "@/components/download-count";

import "@/styles/home.css";

export default function Home() {
  const os = useOS();
  const homeRef = useRef(null);

  const gotoEditor = () => {
    if (homeRef.current) {
      homeRef.current.style.animation = "0.05s fade-out ease-out forwards";
      setTimeout(() => {
        window.location.href = "/editor";
      }, 50);
    }
  };

  return (
    <div ref={homeRef} id="home">
      <h1 id="home-title">FlaredFolders</h1>
      <span id="home-subtitle">
        A Free, Open-Source Folder Customization Tool
        <DownloadCounter />
      </span>
      {os === "windows" && (
        <div className="home-links windows">
          <span className="home-links-buttons">
            <a href="https://www.google.com/" className="home-link primary">
              Download for Windows
            </a>
            <a onClick={gotoEditor} className="home-link secondary">
              Open Online Editor
            </a>
          </span>
          <a
            href="https://github.com/EthanHazel/flaredfolders"
            className="home-link-under"
            target="_blank"
          >
            Source Code
          </a>
        </div>
      )}
      {os !== "windows" && (
        <div className="home-links other">
          <span className="home-links-buttons">
            <a href="/editor" className="home-link primary">
              Open Editor
            </a>
            <a
              href="https://github.com/EthanHazel/flaredfolders"
              className="home-link secondary"
              target="_blank"
            >
              Source Code
            </a>
          </span>
        </div>
      )}
    </div>
  );
}
