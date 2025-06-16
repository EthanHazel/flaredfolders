"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

import fetchClient from "@/functions/fetch-client";
import FooterDesktop from "./footer.desktop";
import Download from "./inputs/download";

import "@/styles/footer.css";

export default function Footer() {
  const t = useTranslations("donation");

  if (fetchClient() === "desktop") return <FooterDesktop />;

  const user = "@unclecomrade";

  return (
    <div id="footer">
      <a id="donators" href="https://ko-fi.com/ethanhazel/tip" target="_blank">
        <Heart size={16} />
        {t("front")}
        <span id="donator">{user}</span>
        {t("back")}
      </a>

      <Download />
    </div>
  );
}
