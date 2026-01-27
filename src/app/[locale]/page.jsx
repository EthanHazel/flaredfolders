"use client";

import { useRef } from "react";
import {
  LaptopMinimalCheck,
  PackageOpen,
  FolderPen,
  ImageUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

import DownloadCounter from "@/components/home/download-count";
import Credits from "@/components/home/credits";
import Navbar from "@/components/home/navbar";

import "@/styles/home/home.css";
import Carousel from "@/components/home/carousel";

export default function Home() {
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
      <Navbar />
      <div id="home-content">
        <div className="header">
          <h2 className="header-title">{t("subtitle")}</h2>
          <DownloadCounter />
          <div className="home-links other">
            <span className="home-links-buttons">
              <a
                href="https://github.com/EthanHazel/flaredfolders"
                className="home-link secondary"
                target="_blank"
              >
                {t("source")}
              </a>
              <a onClick={gotoEditor} className="home-link primary">
                {t("online")}
              </a>
            </span>
          </div>
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
