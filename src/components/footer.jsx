"use client";

import { useTranslations } from "next-intl";
import { folderConfigStore } from "@/stores/folder-config";
import { siKofi } from "simple-icons";
import Image from "next/image";

import fetchClient from "@/lib/fetch-client";
import FooterDesktop from "./footer.desktop";
import Download from "./inputs/download";

import "@/styles/footer.css";

export default function Footer() {
  const folderType = folderConfigStore((state) => state.folderType);
  const t = useTranslations("donation");

  if (fetchClient() === "desktop") return <FooterDesktop />;

  const user = "@unclecomrade";

  return (
    <div id="footer">
      <a id="donators" href="https://ko-fi.com/ethanhazel/tip" target="_blank">
        {folderType === "win95" ? (
          <Image
            src="/cheat/netscani.gif"
            unoptimized
            alt="Netscape NOW"
            width={88}
            height={31}
            style={{ marginRight: "2rem" }}
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="header-button-svg"
            style={{ fill: "var(--primary)" }}
          >
            <path d={siKofi.path} />
          </svg>
        )}
        {t("front")}
        <span id="donator">{user}</span>
        {t("back")}
      </a>

      <Download />
    </div>
  );
}
