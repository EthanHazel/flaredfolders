"use client";

import { useRef, useEffect } from "react";
import {
  LaptopMinimalCheck,
  PackageOpen,
  FolderPen,
  ImageUp,
  Languages,
  Sun,
  Moon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { useOS } from "@/lib/client";
import DownloadCounter from "@/components/home/download-count";
import Credits from "@/components/home/credits";
import { swapTheme } from "@/lib/theme/theme-swap";
import LocaleSwitcher from "@/components/inputs/locale-switcher";

import "@/styles/home/home.css";
import Carousel from "@/components/home/carousel";

export default function Home() {
  useEffect(() => {
    const scroll = (event) => {
      const nav = document.getElementById("home-nav-container");
      if (nav) {
        if (window.scrollY > 0) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      }
    };
    window.addEventListener("scroll", scroll, false);
    return () => window.removeEventListener("scroll", scroll, false);
  }, []);

  const os = useOS();
  const homeRef = useRef(null);

  const t = useTranslations("home");

  const copyrightText = t("copyright");
  const year = new Date().getFullYear();

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
          <span id="home-nav-logo">
            <svg id="a" viewBox="0 0 149.74 124.78">
              <path
                d="M74.87,24.96v24.96h46.91c1.66,0,3,1.34,3,3v18.96c0,1.66-1.34,3-3,3h-46.91v21.96c0,1.66,1.34,3,3,3h43.91c1.66,0,3,1.34,3,3v21.96h14.96c5.52,0,10-4.48,10-10V34.96c0-5.52-4.48-10-10-10H74.87Z"
                fill="var(--tertiary)"
              ></path>
              <path
                d="M24.96,46.91V27.96c0-1.66,1.34-3,3-3h46.91L52.84,2.93c-1.88-1.88-4.42-2.93-7.07-2.93H10C4.48,0,0,4.48,0,10V114.78c0,5.52,4.48,10,10,10h14.96v-46.91c0-1.66,1.34-3,3-3h46.91v-24.96H27.96c-1.66,0-3-1.34-3-3Z"
                fill="var(--text)"
              ></path>
            </svg>
            <span id="home-nav-logo-text">FlaredFolders</span>
          </span>
          <div id="home-nav-buttons">
            <a
              className="home-nav-button"
              href="https://ko-fi.com/ethanhazel/tip"
            >
              Donate
            </a>
            <a
              className="home-nav-button"
              href="https://github.com/EthanHazel/FlaredFolders"
            >
              Github
            </a>
            <a className="home-nav-button" href="https://discord.gg/BkxtVZsf4E">
              Discord
            </a>
            <LocaleSwitcher variant="icon" />
            <a
              className="home-nav-icon-button"
              onClick={() => swapTheme(document.body.classList.value)}
            >
              <Sun className="sun" />
              <Moon className="moon" />
            </a>
          </div>
        </div>
      </div>
      <div id="home-content">
        <div id="home-header">
          <h2 id="home-title">{t("subtitle")}</h2>
          <DownloadCounter />
          {os === "windows" && (
            <div className="home-links windows">
              <span className="home-links-buttons">
                <a className="home-link primary disabled">
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
          <h2>{t("features.title")}</h2>
          <ul className="feature-list">
            <li>
              <LaptopMinimalCheck /> {t("features.list.0")}
            </li>
            <li>
              <PackageOpen /> {t("features.list.1")}
            </li>
            <li>
              <FolderPen /> {t("features.list.2")}
            </li>
            <li>
              <ImageUp /> {t("features.list.3")}
            </li>
          </ul>
        </div>
        <div id="home-credits">
          <Credits />
        </div>
        <div id="home-copyright">
          {(() => {
            const parts = copyrightText.replace("####", year).split(/(%.*?%)/g);

            return parts.map((part, i) => {
              if (!part.includes("%")) return part;

              return (
                <Fragment key={i}>
                  {i === 1 && (
                    <a
                      href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                      target="_blank"
                    >
                      {part.slice(1, -1)}
                    </a>
                  )}
                  {i === 3 && (
                    <a href="https://microsoft.com/" target="_blank">
                      {part.slice(1, -1)}
                    </a>
                  )}
                  {i === 5 && (
                    <a href="https://simpleicons.org/" target="_blank">
                      {part.slice(1, -1)}
                    </a>
                  )}
                  {i === 7 && (
                    <a href="https://lucide.dev/" target="_blank">
                      {part.slice(1, -1)}
                    </a>
                  )}
                  {i !== 1 && i !== 3 && i !== 5 && i !== 7 && part}
                </Fragment>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
