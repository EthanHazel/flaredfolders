import { useTranslations } from "next-intl";
import Image from "next/image";
import { folderConfigStore } from "@/stores/folder-config";

import { siKofi } from "simple-icons";

import "@/styles/kofi.css";

export default function Kofi() {
  const folderType = folderConfigStore((state) => state.folderType);
  const t = useTranslations("donation");
  const user = "@unclecomrade";

  return (
    <a id="kofi" href="https://ko-fi.com/ethanhazel/tip" target="_blank">
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
  );
}
