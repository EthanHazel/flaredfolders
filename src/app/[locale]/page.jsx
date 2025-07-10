"use client";

import { useRef } from "react";
import { Sun, Moon, HandHeart, FolderOpen } from "lucide-react";
import { siDiscord, siGithub, siProducthunt } from "simple-icons";
import { useTranslations } from "next-intl";

import useOS from "@/lib/fetch-os";
import DownloadCounter from "@/components/download-count";
import HeaderButton from "@/components/inputs/header-button";
import LocaleSwitcher from "@/components/inputs/locale-switcher";
import Credits from "@/components/credits";
import { swapTheme } from "@/lib/theme-swap";
import packageJson from "../../../package.json";

import "@/styles/home.css";
import Carousel from "@/components/carousel";

export default function Home() {
  const os = useOS();
  const homeRef = useRef(null);
  const version = packageJson.version;

  const t = useTranslations("home");

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
            <span id="home-version">{version}</span>
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
          {t("subtitle")}
          <DownloadCounter />
        </span>
        {os === "windows" && (
          <div className="home-links windows">
            <span className="home-links-buttons">
              <a className="home-link primary windows-download">
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
                <span style={{ marginRight: "0.5rem" }}>{t("download")}</span>
              </a>
              <a onClick={gotoEditor} className="home-link secondary">
                {t("online")}
              </a>
            </span>
            <div className="home-links-buttons">
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
            </div>
          </div>
        )}
        {os !== "windows" && (
          <div className="home-links other">
            <span className="home-links-buttons">
              <a href="/editor" className="home-link primary">
                {t("online")}
              </a>
              <a
                href="https://github.com/EthanHazel/flaredfolders"
                className="home-link secondary"
                target="_blank"
              >
                {t("source")}
              </a>
            </span>
          </div>
        )}
      </div>
      <Carousel />
      <div id="home-features">
        <h2>
          <FolderOpen /> {t("features.title")}
        </h2>
        <ul className="feature-list">
          <li>{t("features.list.0")}</li>
          <li>{t("features.list.1")}</li>
          <li>{t("features.list.2")}</li>
          <li>{t("features.list.3")}</li>
        </ul>
      </div>
      <div id="home-credits">
        <Credits />
      </div>
      <div id="home-copyright">
        © 2025 FlaredFolders Contributors. Released under the{" "}
        <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank">
          GNU General Public License v3
        </a>
        . Folder visuals are derived from{" "}
        <a href="https://microsoft.com/" target="_blank">
          Microsoft's
        </a>{" "}
        original assets. Icons courtesy of{" "}
        <a href="https://simpleicons.org/">Simple Icons</a> and{" "}
        <a href="https://lucide.dev/">Lucide</a>.
      </div>
    </div>
  );
}
