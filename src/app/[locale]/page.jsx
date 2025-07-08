"use client";

import { useRef } from "react";
import { Sun, Moon, HandHeart } from "lucide-react";
import { siDiscord, siGithub, siProducthunt } from "simple-icons";

import useOS from "@/functions/fetch-os";
import DownloadCounter from "@/components/download-count";
import HeaderButton from "@/components/inputs/header-button";
import LocaleSwitcher from "@/components/inputs/locale-switcher";
import Image from "next/image";
import { swapTheme } from "@/functions/theme-swap";

import "@/styles/home.css";
import Carousel from "@/components/carousel";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
        <div id="home-nav-container">
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
          <div id="home-nav-links">
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
            <HeaderButton
              label="Product Hunt"
              href="https://www.producthunt.com/products/flared-folders"
              target="_blank"
              className="header-button"
              icon={
                <svg viewBox="0 0 24 24" className="header-button-svg">
                  <path d={siProducthunt.path} />
                </svg>
              }
            />
            <div className="header-button-divider"></div>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
      <div id="home-header">
        <h1 id="home-title">
          <span>Flared</span>
          <span>Folders</span>
        </h1>
        <span id="home-subtitle">
          A Free, Open-Source Folder Customization Tool
          <DownloadCounter />
        </span>
        {os === "windows" && (
          <div className="home-links windows">
            <span className="home-links-buttons">
              <a href="https://www.google.com/" className="home-link primary">
                {/* microsoft are a group of dickheads and they don't allow their picture of four squares to be hosted on simpleicons so I gotta manually add it 💔 */}
                <svg
                  id="a"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="17"
                  height="17"
                  style={{ marginRight: "1rem" }}
                >
                  <path
                    fill="currentColor"
                    d="M0,0H7.58V7.58H0V0ZM8.42,0h7.58V7.58h-7.58V0ZM0,8.42H7.58v7.58H0v-7.58Zm8.42,0h7.58v7.58h-7.58"
                  />
                </svg>
                <span style={{ marginRight: "0.5rem" }}>
                  Download for Windows
                </span>
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
      <div id="home-features">
        <h2>Features</h2>
        <ul className="feature-list">
          <li>
            Create unique folders with custom backgrounds
            <ul>
              <li>Gradient background</li>
              <li>Solid color background</li>
              <li>Original background</li>
            </ul>
          </li>
          <li>
            Choose icons from a curated selection of sources
            <ul>
              <li>Lucide (General Icons)</li>
              <li>SimpleIcons (Brand Icons)</li>
              <li>Emojis</li>
              <li>Custom (Upload your own)</li>
            </ul>
          </li>
          <li>Compatibility with Windows 10 and Windows 11</li>
          <li>Completely free, open-source, and ad-free</li>
        </ul>
      </div>
    </div>
  );
}
