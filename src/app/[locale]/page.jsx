"use client";

import { useRef } from "react";
import Image from "next/image";

import useOS from "@/functions/fetch-os";
import DownloadCounter from "@/components/download-count";

import "@/styles/home.css";
import Carousel from "@/components/carousel";

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
      <div id="home-nav">
        <svg id="a" viewBox="0 0 149.74 124.78">
          <path
            d="M74.87,24.96v24.96h46.91c1.66,0,3,1.34,3,3v18.96c0,1.66-1.34,3-3,3h-46.91v21.96c0,1.66,1.34,3,3,3h43.91c1.66,0,3,1.34,3,3v21.96h14.96c5.52,0,10-4.48,10-10V34.96c0-5.52-4.48-10-10-10H74.87Z"
            fill="var(--tertiary)"
          />
          <path
            d="M24.96,46.91V27.96c0-1.66,1.34-3,3-3h46.91L52.84,2.93c-1.88-1.88-4.42-2.93-7.07-2.93H10C4.48,0,0,4.48,0,10V114.78c0,5.52,4.48,10,10,10h14.96v-46.91c0-1.66,1.34-3,3-3h46.91v-24.96H27.96c-1.66,0-3-1.34-3-3Z"
            fill="var(--text)"
          />
        </svg>
      </div>
      <div id="home-header">
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
      <Carousel />
    </div>
  );
}
