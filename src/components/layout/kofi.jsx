"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { folderConfigStore } from "@/stores/folder-config";
import credits from "@/stores/credits.json";

import { siKofi } from "simple-icons";
import { X } from "lucide-react";

import "@/styles/layout/kofi.css";

export default function Kofi() {
  const [open, setOpen] = useState(true);
  const folderType = folderConfigStore((state) => state.folderType);
  const t = useTranslations("donation");
  const user = "@unclecomrade";

  return (
    <div id="kofi" className={open ? "" : "closed"}>
      <a
        className="kofi-contents"
        href="https://ko-fi.com/ethanhazel/tip"
        target="_blank"
      >
        <svg
          viewBox="0 0 24 24"
          className="header-button-svg"
          style={{ fill: "var(--primary)" }}
        >
          <path d={siKofi.path} />
        </svg>
        {t("front")}
        <span id="donator">
          @{credits.kofi[Math.floor(Math.random() * credits.kofi.length)]}
        </span>
        {t("back")}
      </a>
      <a className="kofi-close">
        <X className="header-button-svg" onClick={() => setOpen(false)} />
      </a>
    </div>
  );
}
